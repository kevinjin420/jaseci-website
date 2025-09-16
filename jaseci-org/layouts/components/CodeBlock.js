import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-python';
import '../../lib/syntax/jacSyntax.css';
import { highlightJacCode } from '../../lib/syntax/syntaxHighlighting';

export const CodeBlock = ({
  code,
  language = 'bash',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [highlightedJac, setHighlightedJac] = useState('');

  useEffect(() => {
    if (language === 'jac') {
      let isMounted = true;
      (async () => {
        const result = code ? await highlightJacCode(code.trim()) : '';
        if (isMounted) setHighlightedJac(result);
      })();
      return () => { isMounted = false; };
    } else {
      Prism.highlightAll();
    }
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (language === 'jac') {
    // Use custom Jac syntax highlighting with line numbers
    return (
      <div className={`relative group rounded-lg overflow-hidden ${className}`}>
        <pre className="jac-code line-numbers p-4 overflow-x-auto">
          <code
            className="jac-code-block font-mono text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightedJac }}
          />
        </pre>
      </div>
    );
  }

  // Use PrismJS for Python and other languages
  return (
    <div className={`relative group bg-[hsl(var(--code-bg))] rounded-lg overflow-hidden ${className}`}>
      <pre className={`line-numbers p-4 overflow-x-auto`}>
        <code className={`language-${language} text-[hsl(var(--code-text))] font-mono text-sm leading-relaxed`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};