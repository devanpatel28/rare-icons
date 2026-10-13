import type { Metadata } from "next";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { Chip } from "@heroui/react";

export const metadata: Metadata = {
  title: "Quick Start Guide | Rare-Icons Documentation",
  description:
    "Learn how to import and use Rare-Icons components in 3 minutes.",
};

export default function QuickStartPage() {
  return (
    <article className="docs-content">
      {/* Top Header Badge Row */}
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
          3-Minute Walkthrough
        </Chip>
      </div>

      <h1>Quick Start Guide</h1>
      <p>
        Every icon in <strong>rare-icons</strong> is exported as a standalone
        React SVG component with 100% TypeScript type safety. There is zero
        configuration needed — install, import, and style.
      </p>

      <h2>1. Basic Component Import</h2>
      <p>
        Import any icon directly by its PascalCase name from{" "}
        <code>rare-icons</code>:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { AiBook } from "rare-icons";

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <AiBook className="w-6 h-6 text-accent" />
      <span className="font-medium text-foreground">AI Documentation</span>
    </div>
  );
}`}
      />

      <h2>2. HeroUI v3 Synergy</h2>
      <p>
        Rare-Icons components drop directly into HeroUI v3 Buttons, Chips,
        Tooltips, and Form Fields:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { Button, Chip, Tooltip } from "@heroui/react";
import { Sun1, Sparkles, Copy1 } from "rare-icons";

export function HeroUIIntegration() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Icon Button */}
      <Button variant="primary" size="sm" className="gap-2">
        <Sparkles className="w-4 h-4" />
        <span>Generate AI</span>
      </Button>

      {/* Chip with Icon */}
      <Chip variant="soft" color="accent" size="sm" className="gap-1.5">
        <Sun1 className="w-3.5 h-3.5" />
        <span>Light Mode</span>
      </Chip>

      {/* Tooltip trigger icon */}
      <Tooltip delay={150}>
        <Button variant="ghost" size="sm" isIconOnly aria-label="Copy code">
          <Copy1 className="w-4 h-4" />
        </Button>
        <Tooltip.Content>Copy to clipboard</Tooltip.Content>
      </Tooltip>
    </div>
  );
}`}
      />

      <h2>3. Next.js App Router (RSC)</h2>
      <p>
        Icons are pure SVG elements without browser-only hooks, making them
        ideal for React Server Components:
      </p>
      <CodeBlock
        language="tsx"
        code={`// app/page.tsx — Server Component (RSC)
import { AiBook, Bot, ChatBot } from "rare-icons";

export default function HomePage() {
  return (
    <main className="flex gap-4 p-8">
      {/* Zero client JavaScript bundle overhead */}
      <AiBook className="w-8 h-8 text-accent" />
      <Bot className="w-8 h-8 text-blue-500" />
      <ChatBot className="w-8 h-8 text-emerald-500" />
    </main>
  );
}`}
      />

      <h2>4. Tailwind CSS v4 Styling</h2>
      <p>
        Icons respond naturally to standard Tailwind sizing and color tokens:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { MachineRobot } from "rare-icons";

export function RobotCard() {
  return (
    <button className="group p-4 rounded-2xl border border-border bg-surface hover:border-accent/50 transition-all">
      <MachineRobot
        className="w-10 h-10 text-muted group-hover:text-accent group-hover:scale-110 transition-transform"
      />
    </button>
  );
}`}
      />

      <DocsPager
        prev={{ title: "Package Installation", href: "/docs/installation" }}
        next={{ title: "Usage Patterns", href: "/docs/usage" }}
      />
    </article>
  );
}
