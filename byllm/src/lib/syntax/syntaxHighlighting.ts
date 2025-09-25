export const ONIGASM_WASM_PATH = "./lib/syntax/onigasm.wasm";
export const LANGUAGE_CONFIG_PATH = "./lib/syntax/language-configuration.json";
export const JAC_GRAMMAR_PATH = "./lib/syntax/jac.tmLanguage.json";

export async function loadJacLanguage(monaco: any) {
  const { loadWASM } = await import("onigasm");
  const { Registry } = await import("monaco-textmate");
  const { wireTmGrammars } = await import("monaco-editor-textmate");

  monaco.languages.register({ id: "jac" });

  try {
    await loadWASM(ONIGASM_WASM_PATH);
  } catch (e) {
    console.warn("WASM already loaded or failed to load:", e);
  }

  const grammerConfigRes = await fetch(LANGUAGE_CONFIG_PATH);
  const jacGrammarRes = await fetch(JAC_GRAMMAR_PATH);
  const grammerConfig = await grammerConfigRes.json();
  const jacGrammar = await jacGrammarRes.json();

  const registry = new Registry({
    getGrammarDefinition: async () => ({
      format: "json",
      content: jacGrammar,
    }),
  });

  const grammars = new Map();
  grammars.set("jac", "source.jac");

  monaco.languages.setLanguageConfiguration("jac", grammerConfig);
  
  // Define custom Jac theme
  monaco.editor.defineTheme("jac-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "storage.type.class.jac", foreground: "569CD6" },
      { token: "storage.type.function.jac", foreground: "569CD6" },
      { token: "keyword.control.flow.jac", foreground: "C678DD" },
      { token: "entity.name.type.class.jac", foreground: "3ac9b0" },
      { token: "keyword.control.jac", foreground: "C678DD" },
      { token: "keyword.operator.jac", foreground: "D4D4D4" },
      { token: "string.quoted.double.jac", foreground: "CE9178" },
      { token: "string.quoted.single.jac", foreground: "CE9178" },
      { token: "comment.line.jac", foreground: "6A9955" },
      { token: "comment.block.jac", foreground: "6A9955" },
      { token: "constant.numeric.jac", foreground: "B5CEA8" },
      { token: "entity.name.function.jac", foreground: "DCDCAA" },
      { token: "variable.other.jac", foreground: "9CDCFE" },
      { token: "punctuation.separator.jac", foreground: "D4D4D4" },
      { token: "punctuation.section.jac", foreground: "D4D4D4" },
    ],
    colors: {
      "editor.foreground": "#FFFFFF",
      "editor.background": "#1e1e1e",
    }
  });

  return { registry, grammars, grammerConfig };
}

export async function highlightJacCode(code: string): Promise<string> {
  const keywords = [
    'node', 'edge', 'walker', 'can', 'with', 'entry', 'exit', 'def', 'class', 'obj',
    'enum', 'has', 'ability', 'if', 'else', 'elif', 'for', 'while', 'return',
    'spawn', 'visit', 'disengage', 'yield', 'try', 'except', 'finally', 'assert',
    'import', 'include', 'from', 'as', 'global', 'async', 'await', 'lambda',
    'here', 'self', 'root', 'super', 'init', 'postinit', 'visitor', 'impl',
    'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'break', 'continue',
    'pass', 'del', 'raise', 'test', 'check'
  ];

  const types = ['str', 'int', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'any', 'type'];

  // Tokenize the code to handle proper highlighting without overlaps
  const tokens = tokenizeJacCode(code);
  
  return addLineNumbers(tokens.map(token => {
    switch (token.type) {
      case 'comment':
        return `<span class="jac-comment">${escapeHtml(token.value)}</span>`;
      case 'string':
        return `<span class="jac-string">${escapeHtml(token.value)}</span>`;
      case 'number':
        return `<span class="jac-number">${escapeHtml(token.value)}</span>`;
      case 'keyword':
        return `<span class="jac-keyword">${escapeHtml(token.value)}</span>`;
      case 'special-keyword':
        return `<span class="jac-special-keyword">${escapeHtml(token.value)}</span>`;
      case 'type':
        return `<span class="jac-type">${escapeHtml(token.value)}</span>`;
      case 'class-name':
        return `<span class="jac-class-name">${escapeHtml(token.value)}</span>`;
      case 'module':
        return `<span class="jac-module">${escapeHtml(token.value)}</span>`;
      case 'function':
        return `<span class="jac-function">${escapeHtml(token.value)}</span>`;
      case 'variable':
        return `<span class="jac-variable">${escapeHtml(token.value)}</span>`;
      case 'operator':
        return `<span class="jac-operator">${escapeHtml(token.value)}</span>`;
      case 'bracket':
        return `<span class="jac-bracket-level-${token.level % 4}">${escapeHtml(token.value)}</span>`;
      default:
        return escapeHtml(token.value);
    }
  }).join(''));
}

export async function highlightPythonCode(code: string): Promise<string> {
  // Tokenize the code to handle proper highlighting without overlaps
  const tokens = tokenizePythonCode(code);
  
  return addLineNumbers(tokens.map(token => {
    switch (token.type) {
      case 'comment':
        return `<span class="python-comment">${escapeHtml(token.value)}</span>`;
      case 'string':
        return `<span class="python-string">${escapeHtml(token.value)}</span>`;
      case 'number':
        return `<span class="python-number">${escapeHtml(token.value)}</span>`;
      case 'keyword':
        return `<span class="python-keyword">${escapeHtml(token.value)}</span>`;
      case 'builtin':
        return `<span class="python-builtin">${escapeHtml(token.value)}</span>`;
      case 'type':
        return `<span class="python-type">${escapeHtml(token.value)}</span>`;
      case 'class-name':
        return `<span class="python-class-name">${escapeHtml(token.value)}</span>`;
      case 'function':
        return `<span class="python-function">${escapeHtml(token.value)}</span>`;
      case 'decorator':
        return `<span class="python-decorator">${escapeHtml(token.value)}</span>`;
      case 'operator':
        return `<span class="python-operator">${escapeHtml(token.value)}</span>`;
      case 'bracket':
        return `<span class="python-bracket-level-${token.level % 4}">${escapeHtml(token.value)}</span>`;
      default:
        return escapeHtml(token.value);
    }
  }).join(''));
}

function tokenizeJacCode(code: string): Array<{type: string, value: string, level?: number}> {
  const tokens: Array<{type: string, value: string, level?: number}> = [];
  const keywords = new Set([
    'node', 'edge', 'walker', 'can', 'with', 'entry', 'exit', 'def', 'class', 'obj',
    'enum', 'has', 'ability', 'if', 'else', 'elif', 'for', 'while', 'return',
    'spawn', 'visit', 'disengage', 'yield', 'try', 'except', 'finally', 'assert',
    'import', 'include', 'from', 'as', 'global', 'async', 'await', 'lambda',
    'here', 'self', 'root', 'super', 'init', 'postinit', 'visitor', 'impl',
    'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'break', 'continue',
    'pass', 'del', 'raise', 'test', 'check'
  ]);
  
  const types = new Set(['str', 'int', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'any', 'type']);
  const operators = new Set(['=', '+', '-', '*', '/', '%', '==', '!=', '<', '>', '<=', '>=', '+=', '-=', '*=', '/=', '|', '&', '^', '~', '<<', '>>', '**']);

  let i = 0;
  let bracketStack: string[] = [];

  while (i < code.length) {
    // Skip whitespace
    if (/\s/.test(code[i])) {
      let whitespace = '';
      while (i < code.length && /\s/.test(code[i])) {
        whitespace += code[i];
        i++;
      }
      tokens.push({ type: 'whitespace', value: whitespace });
      continue;
    }

    // Handle comments
    if (code[i] === '#') {
      if (code[i + 1] === '*') {
        // Block comment
        let comment = '';
        while (i < code.length && !(code[i] === '*' && code[i + 1] === '#')) {
          comment += code[i];
          i++;
        }
        if (i < code.length) {
          comment += code[i] + code[i + 1]; // Add closing */
          i += 2;
        }
        tokens.push({ type: 'comment', value: comment });
      } else {
        // Line comment
        let comment = '';
        while (i < code.length && code[i] !== '\n') {
          comment += code[i];
          i++;
        }
        tokens.push({ type: 'comment', value: comment });
      }
      continue;
    }

    // Handle strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let string = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < code.length) {
          string += code[i] + code[i + 1];
          i += 2;
        } else {
          string += code[i];
          i++;
        }
      }
      if (i < code.length) {
        string += code[i]; // Add closing quote
        i++;
      }
      tokens.push({ type: 'string', value: string });
      continue;
    }

    // Handle numbers
    if (/\d/.test(code[i])) {
      let number = '';
      while (i < code.length && /[\d.]/.test(code[i])) {
        number += code[i];
        i++;
      }
      tokens.push({ type: 'number', value: number });
      continue;
    }

    // Handle brackets with nesting
    if (code[i] === '{') {
      bracketStack.push('{');
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length - 1 });
      i++;
      continue;
    }
    
    if (code[i] === '}') {
      if (bracketStack.length > 0 && bracketStack[bracketStack.length - 1] === '{') {
        bracketStack.pop();
      }
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length });
      i++;
      continue;
    }

    // Handle other brackets (parentheses and square brackets)
    if (code[i] === '(' || code[i] === '[') {
      bracketStack.push(code[i]);
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length - 1 });
      i++;
      continue;
    }
    
    if (code[i] === ')' || code[i] === ']') {
      const expectedOpen = code[i] === ')' ? '(' : '[';
      if (bracketStack.length > 0 && bracketStack[bracketStack.length - 1] === expectedOpen) {
        bracketStack.pop();
      }
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length });
      i++;
      continue;
    }

    // Handle operators
    let operator = '';
    let j = i;
    while (j < code.length && /[=+\-*/%<>!&|^~]/.test(code[j])) {
      operator += code[j];
      j++;
    }
    if (operator && operators.has(operator)) {
      tokens.push({ type: 'operator', value: operator });
      i = j;
      continue;
    }

    // Handle identifiers (keywords, types, functions, variables)
    if (/[a-zA-Z_]/.test(code[i])) {
      let identifier = '';
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        identifier += code[i];
        i++;
      }
      
      // Handle dotted module names (like settings.config)
      const prevNonWhitespaceToken = tokens.slice().reverse().find(t => t.type !== 'whitespace');
      const isAfterImport = prevNonWhitespaceToken && 
        ['import', 'include', 'from'].includes(prevNonWhitespaceToken.value);
      
      if (isAfterImport) {
        // For imports, handle the full dotted path
        while (i < code.length && code[i] === '.') {
          identifier += code[i];
          i++;
          while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
            identifier += code[i];
            i++;
          }
        }
        tokens.push({ type: 'module', value: identifier });
        continue;
      }
      
      // Check context for class names and functions
      const isAfterArchetypeKeyword = prevNonWhitespaceToken && 
        ['walker', 'node', 'edge', 'obj', 'class', 'enum'].includes(prevNonWhitespaceToken.value);
      const isAfterCan = prevNonWhitespaceToken && prevNonWhitespaceToken.value === 'can';
      const isAfterWith = prevNonWhitespaceToken && prevNonWhitespaceToken.value === 'with';
      
      // Special keywords like 'entry', 'exit' in certain contexts (check BEFORE general keywords)
      if (['entry', 'exit'].includes(identifier) && (isAfterWith || isAfterCan)) {
        tokens.push({ type: 'special-keyword', value: identifier });
      } else if (keywords.has(identifier)) {
        tokens.push({ type: 'keyword', value: identifier });
      } else if (types.has(identifier)) {
        tokens.push({ type: 'type', value: identifier });
      } else if (isAfterArchetypeKeyword || /^[A-Z]/.test(identifier)) {
        // Capitalized identifiers or identifiers after archetype keywords are class names
        tokens.push({ type: 'class-name', value: identifier });
      } else if (isAfterCan) {
        // Function names after 'can' keyword
        tokens.push({ type: 'function', value: identifier });
      } else {
        // Check if it's followed by '(' to determine if it's a function
        let k = i;
        while (k < code.length && /\s/.test(code[k])) k++;
        if (k < code.length && code[k] === '(') {
          tokens.push({ type: 'function', value: identifier });
        } else {
          tokens.push({ type: 'variable', value: identifier });
        }
      }
      continue;
    }

    // Handle single characters (punctuation, etc.)
    tokens.push({ type: 'punctuation', value: code[i] });
    i++;
  }

  return tokens;
}

function tokenizePythonCode(code: string): Array<{type: string, value: string, level?: number}> {
  const tokens: Array<{type: string, value: string, level?: number}> = [];
  const keywords = new Set([
    'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else',
    'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in',
    'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while',
    'with', 'yield', 'async', 'await', 'nonlocal'
  ]);
  
  const builtins = new Set([
    'True', 'False', 'None', 'self', 'super', '__init__', '__name__', '__main__',
    'len', 'str', 'int', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'range',
    'print', 'input', 'open', 'type', 'isinstance', 'hasattr', 'getattr', 'setattr',
    'abs', 'min', 'max', 'sum', 'sorted', 'reversed', 'enumerate', 'zip', 'map',
    'filter', 'all', 'any', 'iter', 'next', 'round', 'pow', 'divmod'
  ]);
  
  const types = new Set([
    'str', 'int', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'frozenset',
    'bytes', 'bytearray', 'complex', 'object', 'type', 'Exception', 'BaseException'
  ]);
  
  const operators = new Set([
    '=', '+', '-', '*', '/', '//', '%', '**', '==', '!=', '<', '>', '<=', '>=',
    '+=', '-=', '*=', '/=', '//=', '%=', '**=', '&=', '|=', '^=', '>>=', '<<=',
    'and', 'or', 'not', 'in', 'is', '&', '|', '^', '~', '<<', '>>'
  ]);

  let i = 0;
  let bracketStack: string[] = [];
  let prevToken: {type: string, value: string, level?: number} | null = null;

  while (i < code.length) {
    // Skip whitespace
    if (/\s/.test(code[i])) {
      let whitespace = '';
      while (i < code.length && /\s/.test(code[i])) {
        whitespace += code[i];
        i++;
      }
      tokens.push({ type: 'whitespace', value: whitespace });
      continue;
    }

    // Handle comments
    if (code[i] === '#') {
      let comment = '';
      while (i < code.length && code[i] !== '\n') {
        comment += code[i];
        i++;
      }
      tokens.push({ type: 'comment', value: comment });
      continue;
    }

    // Handle triple-quoted strings (docstrings and multiline strings)
    if ((code.substr(i, 3) === '"""' || code.substr(i, 3) === "'''")) {
      const quote = code.substr(i, 3);
      let string = quote;
      i += 3;
      while (i < code.length - 2 && code.substr(i, 3) !== quote) {
        string += code[i];
        i++;
      }
      if (i <= code.length - 3) {
        string += code.substr(i, 3);
        i += 3;
      }
      tokens.push({ type: 'string', value: string });
      continue;
    }

    // Handle strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let string = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < code.length) {
          string += code[i] + code[i + 1];
          i += 2;
        } else {
          string += code[i];
          i++;
        }
      }
      if (i < code.length) {
        string += code[i]; // Add closing quote
        i++;
      }
      tokens.push({ type: 'string', value: string });
      continue;
    }

    // Handle decorators
    if (code[i] === '@') {
      let decorator = '@';
      i++;
      while (i < code.length && /[a-zA-Z0-9_.]/.test(code[i])) {
        decorator += code[i];
        i++;
      }
      tokens.push({ type: 'decorator', value: decorator });
      continue;
    }

    // Handle numbers
    if (/\d/.test(code[i])) {
      let number = '';
      while (i < code.length && /[\d._oxbOXB]/.test(code[i])) {
        number += code[i];
        i++;
      }
      // Handle scientific notation
      if (i < code.length && (code[i] === 'e' || code[i] === 'E')) {
        number += code[i];
        i++;
        if (i < code.length && (code[i] === '+' || code[i] === '-')) {
          number += code[i];
          i++;
        }
        while (i < code.length && /\d/.test(code[i])) {
          number += code[i];
          i++;
        }
      }
      tokens.push({ type: 'number', value: number });
      continue;
    }

    // Handle brackets with nesting
    if (code[i] === '{') {
      bracketStack.push('{');
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length - 1 });
      prevToken = tokens[tokens.length - 1];
      i++;
      continue;
    }
    
    if (code[i] === '}') {
      if (bracketStack.length > 0 && bracketStack[bracketStack.length - 1] === '{') {
        bracketStack.pop();
      }
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length });
      prevToken = tokens[tokens.length - 1];
      i++;
      continue;
    }

    // Handle other brackets (parentheses and square brackets)
    if (code[i] === '(' || code[i] === '[') {
      bracketStack.push(code[i]);
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length - 1 });
      prevToken = tokens[tokens.length - 1];
      i++;
      continue;
    }
    
    if (code[i] === ')' || code[i] === ']') {
      const expectedOpen = code[i] === ')' ? '(' : '[';
      if (bracketStack.length > 0 && bracketStack[bracketStack.length - 1] === expectedOpen) {
        bracketStack.pop();
      }
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length });
      prevToken = tokens[tokens.length - 1];
      i++;
      continue;
    }

    // Handle operators
    let operator = '';
    let j = i;
    while (j < code.length && /[=+\-*/%<>!&|^~]/.test(code[j])) {
      operator += code[j];
      j++;
    }
    if (operator && operators.has(operator)) {
      tokens.push({ type: 'operator', value: operator });
      prevToken = tokens[tokens.length - 1];
      i = j;
      continue;
    }

    // Handle identifiers (keywords, functions, variables, etc.)
    if (/[a-zA-Z_]/.test(code[i])) {
      let identifier = '';
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        identifier += code[i];
        i++;
      }

      // Get previous non-whitespace token
      let prevNonWhitespaceToken = prevToken;
      for (let k = tokens.length - 1; k >= 0; k--) {
        if (tokens[k].type !== 'whitespace') {
          prevNonWhitespaceToken = tokens[k];
          break;
        }
      }

      // Context-based classification
      const isAfterClass = prevNonWhitespaceToken && prevNonWhitespaceToken.value === 'class';
      const isAfterDef = prevNonWhitespaceToken && prevNonWhitespaceToken.value === 'def';
      const isAfterImport = prevNonWhitespaceToken && 
        (prevNonWhitespaceToken.value === 'import' || prevNonWhitespaceToken.value === 'from');
      
      if (keywords.has(identifier)) {
        tokens.push({ type: 'keyword', value: identifier });
      } else if (builtins.has(identifier)) {
        tokens.push({ type: 'builtin', value: identifier });
      } else if (types.has(identifier)) {
        tokens.push({ type: 'type', value: identifier });
      } else if (isAfterClass || /^[A-Z]/.test(identifier)) {
        // Capitalized identifiers or identifiers after 'class' are class names
        tokens.push({ type: 'class-name', value: identifier });
      } else if (isAfterDef) {
        // Function names after 'def' keyword
        tokens.push({ type: 'function', value: identifier });
      } else {
        // Check if it's followed by '(' to determine if it's a function call
        let k = i;
        while (k < code.length && /\s/.test(code[k])) k++;
        if (k < code.length && code[k] === '(') {
          tokens.push({ type: 'function', value: identifier });
        } else {
          tokens.push({ type: 'identifier', value: identifier });
        }
      }
      
      prevToken = tokens[tokens.length - 1];
      continue;
    }

    // Handle single characters (punctuation, etc.)
    tokens.push({ type: 'punctuation', value: code[i] });
    prevToken = tokens[tokens.length - 1];
    i++;
  }

  return tokens;
}

function addLineNumbers(highlightedCode: string): string {
  const lines = highlightedCode.split('\n');
  const lineCount = lines.length;
  const maxDigits = lineCount.toString().length;
  
  return lines.map((line, index) => {
    const lineNumber = (index + 1).toString().padStart(maxDigits, ' ');
    return `<span class="line-number">${lineNumber}</span>${line}`;
  }).join('\n');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}