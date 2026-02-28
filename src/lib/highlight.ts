function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface Token {
  type: string;
  value: string;
  level?: number;
}

const JAC_KEYWORDS = new Set([
  "node", "edge", "walker", "can", "with", "entry", "exit", "def", "class", "obj",
  "enum", "has", "ability", "if", "else", "elif", "for", "while", "return",
  "spawn", "yield", "try", "except", "finally", "assert",
  "import", "include", "from", "as", "global", "async", "await", "lambda",
  "here", "self", "root", "super", "init", "postinit", "visitor", "impl",
  "and", "or", "not", "in", "is", "True", "False", "None", "break", "continue",
  "pass", "del", "raise", "test", "check", "glob", "sem", "new",
]);

const JAC_VISIT_KEYWORDS = new Set(["visit", "disengage"]);

const JAC_TYPES = new Set([
  "str", "int", "float", "bool", "list", "dict", "tuple", "set", "any", "type",
]);

const OPERATORS = new Set([
  "=", "+", "-", "*", "/", "%", "==", "!=", "<", ">", "<=", ">=",
  "+=", "-=", "*=", "/=", "|", "&", "^", "~", "<<", ">>", "**",
  "->", "++>", "-->", "<++", "<--",
]);

function tokenizeJac(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const bracketStack: string[] = [];

  while (i < code.length) {
    if (/\s/.test(code[i])) {
      let ws = "";
      while (i < code.length && /\s/.test(code[i])) { ws += code[i]; i++; }
      tokens.push({ type: "ws", value: ws });
      continue;
    }

    if (code[i] === "#") {
      let comment = "";
      while (i < code.length && code[i] !== "\n") { comment += code[i]; i++; }
      tokens.push({ type: "comment", value: comment });
      continue;
    }

    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let s = q;
      i++;
      while (i < code.length && code[i] !== q) {
        if (code[i] === "\\" && i + 1 < code.length) { s += code[i] + code[i + 1]; i += 2; }
        else { s += code[i]; i++; }
      }
      if (i < code.length) { s += code[i]; i++; }
      tokens.push({ type: "string", value: s });
      continue;
    }

    if (/\d/.test(code[i])) {
      let num = "";
      while (i < code.length && /[\d.]/.test(code[i])) { num += code[i]; i++; }
      tokens.push({ type: "number", value: num });
      continue;
    }

    if ("{([".includes(code[i])) {
      bracketStack.push(code[i]);
      tokens.push({ type: "bracket", value: code[i], level: bracketStack.length - 1 });
      i++;
      continue;
    }

    if ("})]".includes(code[i])) {
      const expected = code[i] === "}" ? "{" : code[i] === ")" ? "(" : "[";
      if (bracketStack.length > 0 && bracketStack[bracketStack.length - 1] === expected) {
        bracketStack.pop();
      }
      tokens.push({ type: "bracket", value: code[i], level: bracketStack.length });
      i++;
      continue;
    }

    let op = "";
    let j = i;
    while (j < code.length && /[=+\-*/%<>!&|^~]/.test(code[j])) { op += code[j]; j++; }
    if (op && OPERATORS.has(op)) {
      tokens.push({ type: "operator", value: op });
      i = j;
      continue;
    }

    if (/[a-zA-Z_`]/.test(code[i])) {
      let id = "";
      if (code[i] === "`") { id += code[i]; i++; }
      while (i < code.length && /[a-zA-Z0-9_?]/.test(code[i])) { id += code[i]; i++; }

      const prev = tokens.slice().reverse().find((t) => t.type !== "ws");
      const isAfterImport = prev && ["import", "include", "from"].includes(prev.value);
      const isAfterArchetype = prev && ["walker", "node", "edge", "obj", "class", "enum"].includes(prev.value);
      const isAfterCan = prev && prev.value === "can";
      const isAfterWith = prev && prev.value === "with";

      if (isAfterImport) {
        while (i < code.length && code[i] === ".") {
          id += code[i]; i++;
          while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) { id += code[i]; i++; }
        }
        tokens.push({ type: "module", value: id });
      } else if (["entry", "exit"].includes(id) && (isAfterWith || isAfterCan)) {
        tokens.push({ type: "special-keyword", value: id });
      } else if (JAC_VISIT_KEYWORDS.has(id)) {
        tokens.push({ type: "visit-keyword", value: id });
      } else if (JAC_KEYWORDS.has(id)) {
        tokens.push({ type: "keyword", value: id });
      } else if (JAC_TYPES.has(id)) {
        tokens.push({ type: "type", value: id });
      } else if (isAfterArchetype || /^[A-Z]/.test(id)) {
        tokens.push({ type: "class-name", value: id });
      } else if (isAfterCan) {
        tokens.push({ type: "function", value: id });
      } else {
        let k = i;
        while (k < code.length && /\s/.test(code[k])) k++;
        tokens.push({ type: k < code.length && code[k] === "(" ? "function" : "variable", value: id });
      }
      continue;
    }

    tokens.push({ type: "punctuation", value: code[i] });
    i++;
  }

  return tokens;
}

export function highlightJac(code: string): string {
  return tokenizeJac(code)
    .map((t) => {
      const v = escapeHtml(t.value);
      switch (t.type) {
        case "comment": return `<span class="jac-comment">${v}</span>`;
        case "string": return `<span class="jac-string">${v}</span>`;
        case "number": return `<span class="jac-number">${v}</span>`;
        case "keyword": return `<span class="jac-keyword">${v}</span>`;
        case "special-keyword": return `<span class="jac-special-keyword">${v}</span>`;
        case "visit-keyword": return `<span class="jac-visit-keyword">${v}</span>`;
        case "type": return `<span class="jac-type">${v}</span>`;
        case "class-name": return `<span class="jac-class-name">${v}</span>`;
        case "module": return `<span class="jac-module">${v}</span>`;
        case "function": return `<span class="jac-function">${v}</span>`;
        case "variable": return `<span class="jac-variable">${v}</span>`;
        case "operator": return `<span class="jac-operator">${v}</span>`;
        case "bracket": return `<span class="jac-bracket-level-${(t.level ?? 0) % 4}">${v}</span>`;
        default: return v;
      }
    })
    .join("");
}

const PY_KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break",
  "class", "continue", "def", "del", "elif", "else", "except", "finally",
  "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
  "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
]);

const PY_BUILTINS = new Set([
  "print", "len", "range", "int", "str", "float", "bool", "list", "dict",
  "set", "tuple", "type", "isinstance", "open", "enumerate", "zip", "map",
  "filter", "sorted", "reversed", "super", "self", "cls",
]);

function tokenizePython(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    if (/\s/.test(code[i])) {
      let ws = "";
      while (i < code.length && /\s/.test(code[i])) { ws += code[i]; i++; }
      tokens.push({ type: "ws", value: ws });
      continue;
    }

    if (code[i] === "#") {
      let comment = "";
      while (i < code.length && code[i] !== "\n") { comment += code[i]; i++; }
      tokens.push({ type: "comment", value: comment });
      continue;
    }

    if ((code[i] === '"' && code[i + 1] === '"' && code[i + 2] === '"') ||
        (code[i] === "'" && code[i + 1] === "'" && code[i + 2] === "'")) {
      const q = code.slice(i, i + 3);
      let s = q;
      i += 3;
      while (i < code.length && code.slice(i, i + 3) !== q) {
        if (code[i] === "\\" && i + 1 < code.length) { s += code[i] + code[i + 1]; i += 2; }
        else { s += code[i]; i++; }
      }
      if (i < code.length) { s += q; i += 3; }
      tokens.push({ type: "string", value: s });
      continue;
    }

    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let fPrefix = "";
      let s = q;
      i++;
      while (i < code.length && code[i] !== q) {
        if (code[i] === "\\" && i + 1 < code.length) { s += code[i] + code[i + 1]; i += 2; }
        else { s += code[i]; i++; }
      }
      if (i < code.length) { s += code[i]; i++; }
      tokens.push({ type: "string", value: fPrefix + s });
      continue;
    }

    if (/\d/.test(code[i])) {
      let num = "";
      while (i < code.length && /[\d.xXoObB_a-fA-F]/.test(code[i])) { num += code[i]; i++; }
      tokens.push({ type: "number", value: num });
      continue;
    }

    if (code[i] === "f" && (code[i + 1] === '"' || code[i + 1] === "'")) {
      const q = code[i + 1];
      let s = "f" + q;
      i += 2;
      while (i < code.length && code[i] !== q) {
        if (code[i] === "\\" && i + 1 < code.length) { s += code[i] + code[i + 1]; i += 2; }
        else { s += code[i]; i++; }
      }
      if (i < code.length) { s += code[i]; i++; }
      tokens.push({ type: "string", value: s });
      continue;
    }

    if ("{([".includes(code[i])) {
      tokens.push({ type: "bracket", value: code[i] });
      i++;
      continue;
    }

    if ("})]".includes(code[i])) {
      tokens.push({ type: "bracket", value: code[i] });
      i++;
      continue;
    }

    if (/[=+\-*/%<>!&|^~@:]/.test(code[i])) {
      let op = "";
      while (i < code.length && /[=+\-*/%<>!&|^~@:]/.test(code[i])) { op += code[i]; i++; }
      tokens.push({ type: "operator", value: op });
      continue;
    }

    if (code[i] === "." || code[i] === ",") {
      tokens.push({ type: "punctuation", value: code[i] });
      i++;
      continue;
    }

    if (/[a-zA-Z_]/.test(code[i])) {
      let id = "";
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) { id += code[i]; i++; }

      const prev = tokens.slice().reverse().find((t) => t.type !== "ws");
      const isAfterDef = prev && ["def", "class"].includes(prev.value);

      if (PY_KEYWORDS.has(id)) {
        tokens.push({ type: "keyword", value: id });
      } else if (isAfterDef) {
        tokens.push({ type: "function", value: id });
      } else if (/^[A-Z]/.test(id)) {
        tokens.push({ type: "class-name", value: id });
      } else if (PY_BUILTINS.has(id)) {
        tokens.push({ type: "builtin", value: id });
      } else {
        let k = i;
        while (k < code.length && /\s/.test(code[k])) k++;
        tokens.push({ type: k < code.length && code[k] === "(" ? "function" : "variable", value: id });
      }
      continue;
    }

    tokens.push({ type: "punctuation", value: code[i] });
    i++;
  }

  return tokens;
}

export function highlightPython(code: string): string {
  return tokenizePython(code)
    .map((t) => {
      const v = escapeHtml(t.value);
      switch (t.type) {
        case "comment": return `<span class="hljs-comment">${v}</span>`;
        case "string": return `<span class="hljs-string">${v}</span>`;
        case "number": return `<span class="hljs-number">${v}</span>`;
        case "keyword": return `<span class="hljs-keyword">${v}</span>`;
        case "builtin": return `<span class="hljs-built_in">${v}</span>`;
        case "type":
        case "class-name": return `<span class="hljs-type">${v}</span>`;
        case "function": return `<span class="hljs-title function_">${v}</span>`;
        case "variable": return `<span class="hljs-variable">${v}</span>`;
        case "operator": return `<span class="hljs-operator">${v}</span>`;
        default: return v;
      }
    })
    .join("");
}
