import type { Metadata } from "next";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { Chip } from "@heroui/react";

export const metadata: Metadata = {
  title: "Next.js Integration | Rare-Icons Documentation",
  description:
    "Learn how to use Rare-Icons in Next.js App Router, Server Components (RSC), and Client Components.",
};

export default function NextjsPage() {
  return (
    <article className="docs-content">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Chip
          size="sm"
          variant="secondary"
          className="font-mono text-2xs uppercase tracking-wider"
        >
          Core Guides
        </Chip>
        <Chip
          size="sm"
          variant="soft"
          color="accent"
          className="text-2xs font-mono font-semibold"
        >
          App Router &amp; RSC
        </Chip>
      </div>

      <h1>Next.js Integration</h1>
      <p>
        <strong>Rare-Icons</strong> is built for the Next.js App Router. Because
        icon components have no client-side state, DOM measurements, or
        browser-only side effects, they work immediately in React Server
        Components (RSC) and Client Components.
      </p>

      <h2>1. React Server Components (Default)</h2>
      <p>
        You do <strong>not</strong> need to add{" "}
        <code>&quot;use client&quot;</code> to render icons. Icons execute on
        the server during build or request time and ship as zero-JS static SVG
        markup to the browser:
      </p>
      <CodeBlock
        language="tsx"
        code={`// app/page.tsx — Server Component (RSC)
import { AiBrain1, Rocket } from "rare-icons";

export default function HomePage() {
  return (
    <section className="p-8 space-y-4">
      <div className="flex items-center gap-3">
        <AiBrain1 className="w-8 h-8 text-accent" />
        <h1 className="text-xl font-bold">AI Dashboard</h1>
      </div>
      <p className="text-sm text-muted">Zero client JavaScript bundle payload.</p>
    </section>
  );
}`}
      />

      <h2>2. Interactive Client Components</h2>
      <p>
        When icons are used alongside state, interactive click handlers, or
        animations inside Client Components, they work seamlessly:
      </p>
      <CodeBlock
        language="tsx"
        code={`"use client";

import { useState } from "react";
import { Sun1, Moon } from "rare-icons";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="p-2.5 rounded-xl border border-border bg-surface hover:bg-surface-secondary transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <Sun1 className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-accent" />}
    </button>
  );
}`}
      />

      <h2>3. Zero Context Providers Required</h2>
      <p>
        Unlike libraries that force wrapping your application in heavy React
        contexts (e.g., <code>&lt;IconContext.Provider&gt;</code>), Rare-Icons
        requires no setup in <code>app/layout.tsx</code>. Simply install and
        import.
      </p>

      <h2>4. Dynamic String Lookup (Registry Pattern)</h2>
      <p>
        If your application loads icon names dynamically from a CMS, database,
        or API response, use a static map rather than runtime string imports:
      </p>
      <CodeBlock
        language="tsx"
        code={`// Recommended: Type-safe registry lookup
import * as Icons from "rare-icons";
import type { ComponentType, SVGProps } from "react";

export function DynamicIcon({ name }: { name: string }) {
  const IconComponent = (Icons as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[name];

  if (!IconComponent) return null;
  return <IconComponent className="w-5 h-5" />;
}`}
      />

      <DocsPager
        prev={{ title: "Styling & Sizing", href: "/docs/styling" }}
        next={{ title: "TypeScript Integration", href: "/docs/typescript" }}
      />
    </article>
  );
}
