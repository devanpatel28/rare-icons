import type { Metadata } from "next";
import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import {
  Flash,
  Colors,
  Rocket,
  Security,
  Tick1,
  CommandLine,
} from "rare-icons";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";

export const metadata: Metadata = {
  title: "Introduction | Rare-Icons Documentation",
  description:
    "Get started with Rare-Icons — an ultra-fast, beautifully designed SVG icon library for React, Next.js, and HeroUI v3.",
};

export default function DocsIntroPage() {
  return (
    <article className="docs-content">
      {/* Top Header Badge Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Chip
          size="sm"
          variant="secondary"
          className="font-mono text-2xs uppercase tracking-wider"
        >
          Documentation
        </Chip>
        <Chip
          size="sm"
          variant="soft"
          color="accent"
          className="text-2xs font-mono font-semibold"
        >
          v1.0.0
        </Chip>
        <span className="text-xs text-muted">
          Updated for Next.js 16 &amp; HeroUI v3
        </span>
      </div>

      <h1>Introduction to Rare-Icons</h1>
      <p>
        <strong>Rare-Icons</strong> is an open-source SVG icon library designed
        specifically for modern React and Next.js applications. Engineered with{" "}
        <strong>HeroUI v3</strong> design tokens and Tailwind CSS synergy, every
        icon is a self-contained, tree-shakable component that inherits color
        seamlessly via <code>currentColor</code> and scales flawlessly to any
        resolution.
      </p>

      {/* Feature highlight cards using HeroUI Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
        <Card className="p-4 border border-border bg-surface rounded-2xl shadow-xs hover:border-accent/40 transition-colors">
          <Card.Header className="p-0 mb-1">
            <Card.Title className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-accent-soft text-accent">
                <Flash className="w-4 h-4" />
              </span>
              <span>3,700+ Pure SVG Icons</span>
            </Card.Title>
            <Card.Description className="text-xs text-muted mt-1 leading-relaxed">
              Curated into 59 practical domains — from UI controls and developer
              tools to AI and finances.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card className="p-4 border border-border bg-surface rounded-2xl shadow-xs hover:border-accent/40 transition-colors">
          <Card.Header className="p-0 mb-1">
            <Card.Title className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-accent-soft text-accent">
                <Colors className="w-4 h-4" />
              </span>
              <span>Zero-Config Theming</span>
            </Card.Title>
            <Card.Description className="text-xs text-muted mt-1 leading-relaxed">
              All strokes default to <code>currentColor</code>, instantly
              adapting to light/dark themes and hover triggers.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card className="p-4 border border-border bg-surface rounded-2xl shadow-xs hover:border-accent/40 transition-colors">
          <Card.Header className="p-0 mb-1">
            <Card.Title className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-accent-soft text-accent">
                <Rocket className="w-4 h-4" />
              </span>
              <span>Next.js App Router Ready</span>
            </Card.Title>
            <Card.Description className="text-xs text-muted mt-1 leading-relaxed">
              Functions seamlessly as React Server Components (RSC) with zero
              client bundle overhead or hydration delays.
            </Card.Description>
          </Card.Header>
        </Card>

        <Card className="p-4 border border-border bg-surface rounded-2xl shadow-xs hover:border-accent/40 transition-colors">
          <Card.Header className="p-0 mb-1">
            <Card.Title className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-accent-soft text-accent">
                <Security className="w-4 h-4" />
              </span>
              <span>100% TypeScript Typed</span>
            </Card.Title>
            <Card.Description className="text-xs text-muted mt-1 leading-relaxed">
              Exhaustive typings extending standard{" "}
              <code>SVGProps&lt;SVGSVGElement&gt;</code> with IDE auto-complete.
            </Card.Description>
          </Card.Header>
        </Card>
      </div>

      <h2>Quick Preview</h2>
      <p>
        Import icons directly by their PascalCase names and style them with
        simple Tailwind utility classes:
      </p>

      <CodeBlock
        language="tsx"
        code={`import { AiBook, Sun1, CommandLine } from "rare-icons";

export function HeaderIcons() {
  return (
    <div className="flex items-center gap-3">
      {/* 24px icon with accent color */}
      <AiBook className="w-6 h-6 text-accent" />

      {/* 20px icon with hover transition */}
      <Sun1 className="w-5 h-5 text-muted hover:text-foreground transition-colors" />

      {/* Accessible icon with aria-label */}
      <CommandLine className="w-5 h-5 text-emerald-500" aria-label="Terminal" />
    </div>
  );
}`}
      />

      <h2>Supported Ecosystem &amp; Frameworks</h2>
      <table>
        <thead>
          <tr>
            <th>Platform / Library</th>
            <th>Compatibility Level</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>HeroUI v3 + Tailwind CSS v4</strong>
            </td>
            <td>
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold text-xs">
                <Tick1 className="w-3.5 h-3.5" /> Full Native Synergy
              </span>
            </td>
            <td>
              Inherits <code>text-accent</code>, <code>text-muted</code>, and
              all HeroUI theme variables
            </td>
          </tr>
          <tr>
            <td>
              <strong>Next.js 15 &amp; 16 (App Router)</strong>
            </td>
            <td>
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold text-xs">
                <Tick1 className="w-3.5 h-3.5" /> Server &amp; Client Components
              </span>
            </td>
            <td>
              Renders as static SVG on server with zero JavaScript runtime
              payload
            </td>
          </tr>
          <tr>
            <td>
              <strong>React 19 &amp; React 18</strong>
            </td>
            <td>
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold text-xs">
                <Tick1 className="w-3.5 h-3.5" /> Fully Certified
              </span>
            </td>
            <td>
              Dual ESM and CommonJS exports for universal bundler compatibility
            </td>
          </tr>
          <tr>
            <td>
              <strong>Vite, Astro, Remix</strong>
            </td>
            <td>
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold text-xs">
                <Tick1 className="w-3.5 h-3.5" /> Tree-Shakable
              </span>
            </td>
            <td>
              Bundlers extract only the icons you import, eliminating unused
              code
            </td>
          </tr>
          <tr>
            <td>
              <strong>TypeScript 5.x</strong>
            </td>
            <td>
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold text-xs">
                <Tick1 className="w-3.5 h-3.5" /> First-Class Typings
              </span>
            </td>
            <td>Strict types bundled directly with full JSDoc hints</td>
          </tr>
        </tbody>
      </table>

      <h2>Explore Next</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <Link href="/docs/installation" className="no-underline">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            className="justify-between h-9 text-xs rounded-xl"
          >
            <span className="flex items-center gap-2 font-medium">
              <CommandLine className="w-4 h-4 text-accent" />
              <span>Installation</span>
            </span>
            <span>→</span>
          </Button>
        </Link>
        <Link href="/docs/quick-start" className="no-underline">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            className="justify-between h-9 text-xs rounded-xl"
          >
            <span className="flex items-center gap-2 font-medium">
              <Flash className="w-4 h-4 text-accent" />
              <span>Quick Start</span>
            </span>
            <span>→</span>
          </Button>
        </Link>
        <Link href="/icons" className="no-underline">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            className="justify-between h-9 text-xs rounded-xl"
          >
            <span className="flex items-center gap-2 font-medium">
              <Colors className="w-4 h-4 text-accent" />
              <span>Browse Catalog</span>
            </span>
            <span>→</span>
          </Button>
        </Link>
      </div>

      <DocsPager
        next={{ title: "Installation Guide", href: "/docs/installation" }}
      />
    </article>
  );
}
