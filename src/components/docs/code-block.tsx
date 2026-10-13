"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Button, Chip, Tooltip } from "@heroui/react";
import { Copy1, Tick2 } from "rare-icons";
import Prism from "prismjs";

// Load language definitions
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

// Enhance CSS and SCSS with hex colors, variables, and numbers
const cssGrammar = Prism.languages.css as Record<string, unknown> | undefined;
if (cssGrammar && !cssGrammar["hex-color"]) {
  Prism.languages.insertBefore("css", "punctuation", {
    "hex-color": /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/,
    number: /\b\d+(?:\.\d+)?%?(?:px|rem|em|vh|vw|s|ms)?\b/,
    "css-var": /--(?:[0-9a-zA-Z_-]+)/,
  });
}

const scssGrammar = Prism.languages.scss as Record<string, unknown> | undefined;
if (scssGrammar && !scssGrammar["hex-color"]) {
  Prism.languages.insertBefore("scss", "punctuation", {
    "hex-color": /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/,
    number: /\b\d+(?:\.\d+)?%?(?:px|rem|em|vh|vw|s|ms)?\b/,
    "css-var": /--(?:[0-9a-zA-Z_-]+)/,
    "scss-var": /\$(?:[0-9a-zA-Z_-]+)/,
  });
}

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

function renderPrismToken(token: string | Prism.Token, key: string | number): ReactNode {
  if (typeof token === "string") {
    return token;
  }

  const { type, content } = token;
  const renderedContent = Array.isArray(content)
    ? content.map((child, i) => renderPrismToken(child, `${key}-${i}`))
    : typeof content === "object" && content !== null
    ? renderPrismToken(content as Prism.Token, `${key}-0`)
    : content;

  let colorClass = "text-foreground";

  switch (type) {
    case "comment":
    case "prolog":
    case "doctype":
    case "cdata":
      // Comments in muted slate gray
      colorClass = "text-zinc-500 dark:text-zinc-400 italic";
      break;

    // Variables, properties, keywords in warm vibrant orange (like user reference)
    case "property":
    case "css-var":
    case "scss-var":
    case "variable":
    case "keyword":
    case "attr-name":
      colorClass = "text-orange-500 dark:text-orange-400 font-medium";
      break;

    // Hex colors, strings, numbers, percentages in vibrant sky blue (like user reference)
    case "hex-color":
    case "number":
    case "string":
    case "char":
    case "attr-value":
    case "unit":
      colorClass = "text-sky-500 dark:text-sky-400";
      break;

    // Tag names and component classes
    case "tag":
      colorClass = "text-emerald-500 dark:text-emerald-400";
      break;
    case "class-name":
      colorClass = "text-emerald-500 dark:text-emerald-400 font-semibold";
      break;

    // Functions
    case "function":
      colorClass = "text-indigo-600 dark:text-indigo-400 font-medium";
      break;

    // Punctuation and operators
    case "punctuation":
    case "operator":
      colorClass = "text-foreground/70 dark:text-zinc-400";
      break;

    // Booleans & constants
    case "boolean":
    case "constant":
      colorClass = "text-amber-500 dark:text-amber-400";
      break;

    default:
      colorClass = "text-foreground";
      break;
  }

  return (
    <span key={key} className={colorClass}>
      {renderedContent}
    </span>
  );
}

export default function CodeBlock({ code, language = "tsx", className = "mb-5" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const highlightedTokens = useMemo(() => {
    const normalizedLang = language.toLowerCase();
    const grammar =
      Prism.languages[normalizedLang] ||
      (normalizedLang === "sh" || normalizedLang === "shell"
        ? Prism.languages.bash
        : normalizedLang === "js"
        ? Prism.languages.javascript
        : normalizedLang === "ts"
        ? Prism.languages.typescript
        : Prism.languages.tsx || Prism.languages.plain);

    if (!grammar) {
      return code;
    }

    try {
      const tokens = Prism.tokenize(code, grammar);
      return tokens.map((t, idx) => renderPrismToken(t, idx));
    } catch {
      return code;
    }
  }, [code, language]);

  return (
    <div className={`rounded-2xl border bg-surface overflow-hidden transition-colors ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background-secondary">
        <Chip
          size="sm"
          variant="soft"
          color="accent"
          className="text-2xs uppercase font-bold px-2"
        >
          {language}
        </Chip>

        <Tooltip delay={150}>
          <Button
            variant="secondary"
            size="sm"
            onPress={handleCopy}
            className="rounded-xl px-2.5 h-7 text-xs font-medium"
          >
            {copied ? (
              <>
                <Tick2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy1 className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </Button>
          <Tooltip.Content>
            {copied ? "Copied to clipboard" : "Copy code"}
          </Tooltip.Content>
        </Tooltip>
      </div>

      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed bg-surface selection:bg-accent/20">
        <code>{highlightedTokens}</code>
      </pre>
    </div>
  );
}
