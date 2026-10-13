import type { Metadata } from "next";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { Chip } from "@heroui/react";

export const metadata: Metadata = {
  title: "Styling & Sizing | Rare-Icons Documentation",
  description:
    "Learn how to style Rare-Icons using Tailwind CSS, HeroUI v3 tokens, and custom CSS.",
};

export default function StylingPage() {
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
          Tailwind CSS &amp; Theming
        </Chip>
      </div>

      <h1>Styling &amp; Sizing</h1>
      <p>
        Rare-Icons components are clean, semantic SVG elements without embedded
        fill colors or rigid dimensions. They integrate smoothly with Tailwind
        CSS v4, HeroUI v3 design tokens, CSS variables, and inline attributes.
      </p>

      <h2>1. Tailwind CSS Sizing Scale</h2>
      <p>
        Control icon dimensions using Tailwind&apos;s standard width and height
        utilities. Icons maintain an intrinsic 1:1 square aspect ratio:
      </p>
      <CodeBlock
        language="tsx"
        code={`<AiBook className="w-3.5 h-3.5" /> {/* 14px - Extra small badge icons */}
<AiBook className="w-4 h-4" />     {/* 16px - Form inputs and button controls */}
<AiBook className="w-5 h-5" />     {/* 20px - Navigation items and table rows */}
<AiBook className="w-6 h-6" />     {/* 24px - Standard default icon size */}
<AiBook className="w-8 h-8" />     {/* 32px - Feature cards and list headers */}
<AiBook className="w-10 h-10" />   {/* 40px - Large dashboard stage banners */}`}
      />

      <h2>2. Color Styling &amp; HeroUI Theming</h2>
      <p>
        Because all SVG paths use <code>currentColor</code>, any Tailwind text
        color class or HeroUI theme token applies immediately:
      </p>
      <CodeBlock
        language="tsx"
        code={`{/* HeroUI v3 Semantic Tokens */}
<AiBook className="w-6 h-6 text-accent" />
<AiBook className="w-6 h-6 text-muted" />
<AiBook className="w-6 h-6 text-foreground" />

{/* Status Indicators */}
<AiBook className="w-6 h-6 text-emerald-500" />
<AiBook className="w-6 h-6 text-amber-500" />
<AiBook className="w-6 h-6 text-rose-500" />`}
      />

      <h2>3. Micro-Animations &amp; Interactive Transitions</h2>
      <p>
        Icons support GPU-accelerated CSS transforms. You can pair them with
        hover, focus, and group triggers:
      </p>
      <CodeBlock
        language="tsx"
        code={`<button className="group flex items-center gap-2 p-3 rounded-2xl border border-border bg-surface hover:border-accent/60 transition-all">
  <AiBook className="w-5 h-5 text-muted group-hover:text-accent group-hover:scale-115 group-hover:rotate-6 transition-transform duration-200" />
  <span className="text-sm font-medium text-foreground">Interactive Action</span>
</button>`}
      />

      <h2>4. Direct SVG Dimensions (Non-Tailwind)</h2>
      <p>
        If your project doesn&apos;t use Tailwind CSS or requires explicit SVG
        pixel dimensions, pass <code>width</code>, <code>height</code>, and{" "}
        <code>style</code> directly:
      </p>
      <CodeBlock
        language="tsx"
        code={`<AiBook
  width={24}
  height={24}
  style={{ color: "var(--accent)", verticalAlign: "middle" }}
/>`}
      />

      <DocsPager
        prev={{ title: "Usage Patterns", href: "/docs/usage" }}
        next={{ title: "Next.js Integration", href: "/docs/nextjs" }}
      />
    </article>
  );
}
