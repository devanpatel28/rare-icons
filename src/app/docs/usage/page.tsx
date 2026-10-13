import type { Metadata } from "next";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { Chip } from "@heroui/react";

export const metadata: Metadata = {
  title: "Usage Patterns | Rare-Icons Documentation",
  description:
    "Learn component usage patterns, props, named imports, and reusable icon wrappers.",
};

export default function UsagePage() {
  return (
    <article className="docs-content">
      {/* Top Header Badge Row */}
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
          Component Patterns
        </Chip>
      </div>

      <h1>Usage Patterns</h1>
      <p>
        Every icon in <strong>rare-icons</strong> is an individual named export.
        This guide covers named import patterns, prop pass-through, building
        reusable design system wrappers, and color inheritance.
      </p>

      <h2>1. Named Imports &amp; Tree Shaking</h2>
      <p>
        Import icons by their exact PascalCase name. Modern bundlers (Turbopack,
        webpack, Vite, Rollup) automatically tree-shake unused icons from your
        client bundle:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { AiBook, Sun1, CommandLine, Setting1 } from "rare-icons";`}
      />

      <h2>2. SVG Props &amp; className Forwarding</h2>
      <p>
        All icon components forward props directly to the underlying{" "}
        <code>&lt;svg&gt;</code> element, including <code>className</code>,{" "}
        <code>style</code>, <code>role</code>, <code>aria-*</code>, and mouse
        event listeners:
      </p>
      <CodeBlock
        language="tsx"
        code={`<AiBook
  className="w-6 h-6 text-accent hover:opacity-80 transition-opacity cursor-pointer"
  onClick={() => console.log("Clicked icon")}
  role="img"
  aria-label="AI Documentation"
/>`}
      />

      <h2>3. Reusable Design System Wrapper</h2>
      <p>
        In enterprise codebases, creating a unified <code>&lt;Icon /&gt;</code>{" "}
        wrapper ensures standardized size scales and theme consistency across
        all views:
      </p>
      <CodeBlock
        language="tsx"
        code={`import type { SVGProps, ComponentType } from "react";

const SIZES = {
  xs: "w-3.5 h-3.5",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
} as const;

interface AppIconProps extends SVGProps<SVGSVGElement> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: keyof typeof SIZES;
}

export function AppIcon({ icon: Icon, size = "md", className = "", ...props }: AppIconProps) {
  return <Icon className={\`\${SIZES[size]} \${className}\`} {...props} />;
}

// In your application components:
import { AiBook } from "rare-icons";

export function Header() {
  return <AppIcon icon={AiBook} size="lg" className="text-accent" />;
}`}
      />

      <h2>4. Color Inheritance via currentColor</h2>
      <p>
        All icon paths utilize <code>currentColor</code> for stroke and fill
        properties. This means icons automatically mirror the typography color
        of their container or active state:
      </p>
      <CodeBlock
        language="tsx"
        code={`{/* Container sets the color; both child icons inherit it */}
<div className="flex items-center gap-2 text-accent">
  <AiBook className="w-5 h-5" />
  <span className="font-semibold text-sm">Active Section</span>
</div>

{/* On button hover, text and icon transition in sync */}
<button className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
  <Setting1 className="w-4 h-4" />
  <span>Settings</span>
</button>`}
      />

      <DocsPager
        prev={{ title: "Quick Start Guide", href: "/docs/quick-start" }}
        next={{ title: "Styling & Sizing", href: "/docs/styling" }}
      />
    </article>
  );
}
