import type { Metadata } from "next";
import { Chip } from "@heroui/react";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { CommandLine, Security, Tick1 } from "rare-icons";

export const metadata: Metadata = {
  title: "Installation | Rare-Icons Documentation",
  description:
    "Install rare-icons via npm and configure your React or Next.js project.",
};

export default function InstallationPage() {
  return (
    <article className="docs-content">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Chip
          size="sm"
          variant="secondary"
          className="font-mono text-2xs uppercase tracking-wider"
        >
          Getting Started
        </Chip>
        <Chip
          size="sm"
          variant="soft"
          color="accent"
          className="text-2xs font-mono font-semibold"
        >
          npm install
        </Chip>
      </div>

      <h1>Package Installation</h1>
      <p>
        Install <strong>rare-icons</strong> directly from the npm registry. The
        package is pre-compiled as an optimized CommonJS and modern ESM dual
        bundle, with bundled TypeScript definitions ready out of the box.
      </p>

      <h2>Recommended: Install via npm</h2>
      <p>Run the following command in your project terminal:</p>
      <CodeBlock language="bash" code={`npm install rare-icons`} />

      <div className="p-4 rounded-2xl border border-border bg-surface-secondary my-6 not-prose flex items-start gap-3">
        <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
          <Tick1 className="w-4 h-4" />
        </span>
        <div className="text-xs space-y-1">
          <div className="font-semibold text-foreground">
            Zero Peer Dependency Headaches
          </div>
          <p className="text-muted leading-relaxed">
            <code>rare-icons</code> has zero external dependencies beyond
            standard React. No icon fonts, no heavy runtimes, and no external
            CSS stylesheets required.
          </p>
        </div>
      </div>

      {/* <h2>Alternative Package Managers</h2>
      <p>
        If your project uses an alternative manager:
      </p>

      <div className="space-y-4 my-4">
        <div>
          <div className="text-xs font-semibold text-muted mb-1.5">pnpm</div>
          <CodeBlock language="bash" code={`pnpm add rare-icons`} />
        </div>
        <div>
          <div className="text-xs font-semibold text-muted mb-1.5">yarn</div>
          <CodeBlock language="bash" code={`yarn add rare-icons`} />
        </div>
        <div>
          <div className="text-xs font-semibold text-muted mb-1.5">bun</div>
          <CodeBlock language="bash" code={`bun add rare-icons`} />
        </div>
      </div> */}

      <h2>Peer Dependencies &amp; Compatibility</h2>
      <p>
        <code>rare-icons</code> lists <code>react</code> and{" "}
        <code>react-dom</code> as peer dependencies:
      </p>
      <table>
        <thead>
          <tr>
            <th>Dependency</th>
            <th>Required Version</th>
            <th>Tested Environments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>react</code>
            </td>
            <td>
              <code>&gt;= 18.0.0</code>
            </td>
            <td>React 18.2, React 19.0, React 19.3</td>
          </tr>
          <tr>
            <td>
              <code>react-dom</code>
            </td>
            <td>
              <code>&gt;= 18.0.0</code>
            </td>
            <td>React 18.2, React 19.0, React 19.3</td>
          </tr>
          <tr>
            <td>
              <code>next</code> (optional)
            </td>
            <td>
              <code>&gt;= 14.0.0</code>
            </td>
            <td>Next.js 14, Next.js 15, Next.js 16 (App Router &amp; Pages)</td>
          </tr>
        </tbody>
      </table>

      <h2>Verification Step</h2>
      <p>
        Confirm that your bundler resolves the package by testing an import in
        your application:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { AiBook } from "rare-icons";

export function Test() {
  return <AiBook className="w-6 h-6 text-accent" />;
}`}
      />

      <DocsPager
        prev={{ title: "Introduction", href: "/docs" }}
        next={{ title: "Quick Start Guide", href: "/docs/quick-start" }}
      />
    </article>
  );
}
