import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import '../../lib/prism-jac';
import 'prismjs/components/prism-python';
import './CodeBlock.css'; // Your custom styles for code blocks

export const CodeBlock = ({
  code,
  language = 'bash',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group bg-[hsl(var(--code-bg))] rounded-lg overflow-hidden ${className}`}>
      {/* <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <button
          onClick={handleCopy}
          className="h-6 w-6 p-0 opacity-60 hover:opacity-100 text-white hover:text-white hover:bg-white/10"
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          {copied ? '✔️' : '📋'}
        </button>
      </div> */}
      <pre className={`line-numbers p-4 overflow-x-auto`}>
        <code className={`language-${language} text-[hsl(var(--code-text))] font-mono text-sm leading-relaxed`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};