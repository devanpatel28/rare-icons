import type { Metadata } from "next";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { Chip } from "@heroui/react";

export const metadata: Metadata = {
  title: "TypeScript | Rare-Icons Documentation",
  description:
    "Learn about TypeScript typings, icon interfaces, SVGProps extension, and type-safe registries.",
};

export default function TypeScriptPage() {
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
          TypeScript First
        </Chip>
      </div>

      <h1>TypeScript Integration</h1>
      <p>
        <strong>Rare-Icons</strong> provides first-class TypeScript declarations
        bundled directly in <code>dist/index.d.ts</code>. There is zero need to
        install separate <code>@types/rare-icons</code> packages.
      </p>

      <h2>1. Component Type Signature</h2>
      <p>
        Every icon component extends React&apos;s standard{" "}
        <code>SVGProps&lt;SVGSVGElement&gt;</code>. This ensures auto-completion
        for all standard SVG attributes:
      </p>
      <CodeBlock
        language="tsx"
        code={`import type { SVGProps, ComponentType } from "react";
import { AiBook } from "rare-icons";

// Type representing any Rare-Icons component
export type RareIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconRef: RareIconComponent = AiBook; // Type-safe`}
      />

      <h2>2. Typing Icon Props in Custom Components</h2>
      <p>
        When building reusable design system components that receive icons as
        props, type them using{" "}
        <code>ComponentType&lt;SVGProps&lt;SVGSVGElement&gt;&gt;</code>:
      </p>
      <CodeBlock
        language="tsx"
        code={`import type { SVGProps, ComponentType } from "react";
import { AiBook } from "rare-icons";

interface ActionCardProps {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function ActionCard({ title, description, icon: Icon }: ActionCardProps) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-surface flex items-start gap-3">
      <div className="p-2 rounded-xl bg-accent-soft text-accent">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="text-xs text-muted">{description}</p>
      </div>
    </div>
  );
}

// Caller usage:
<ActionCard
  title="AI Copilot"
  description="Generate components instantly"
  icon={AiBook}
/>`}
      />

      <h2>3. Type-Safe Dynamic Registries</h2>
      <p>
        If your app accesses icons dynamically, use an indexed registry type
        with TypeScript&apos;s <code>Record</code> utility:
      </p>
      <CodeBlock
        language="tsx"
        code={`import * as Icons from "rare-icons";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
type IconMap = Record<string, ComponentType<IconProps> | undefined>;

const registry = Icons as IconMap;

export function getIconByName(name: string): ComponentType<IconProps> | undefined {
  return registry[name];
}`}
      />

      <DocsPager
        prev={{ title: "Next.js Integration", href: "/docs/nextjs" }}
        next={{ title: "Icon Catalog & Categories", href: "/docs/catalog" }}
      />
    </article>
  );
}
