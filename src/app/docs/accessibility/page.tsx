import type { Metadata } from "next";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { Chip } from "@heroui/react";

export const metadata: Metadata = {
  title: "Accessibility | Rare-Icons Documentation",
  description:
    "Best practices for accessible icon usage, screen readers, ARIA labels, and WCAG contrast.",
};

export default function AccessibilityPage() {
  return (
    <article className="docs-content">
      {/* Header Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Chip
          size="sm"
          variant="secondary"
          className="font-mono text-2xs uppercase tracking-wider"
        >
          Reference
        </Chip>
        <Chip
          size="sm"
          variant="soft"
          color="accent"
          className="text-2xs font-mono font-semibold"
        >
          WCAG 2.1 AA
        </Chip>
      </div>

      <h1>Accessibility </h1>
      <p>
        Icons play a significant role in user interfaces, but they must be
        accessible to people relying on screen readers, high-contrast display
        modes, and keyboard navigation.
      </p>

      <h2>1. Decorative Icons (Hidden from Screen Readers)</h2>
      <p>
        When an icon is accompanied by visible adjacent text that conveys the
        same intent, mark the icon as decorative using{" "}
        <code>aria-hidden=&quot;true&quot;</code> so screen readers do not
        announce redundant noise:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { AiBook } from "rare-icons";

<button className="flex items-center gap-2">
  <AiBook aria-hidden="true" className="w-4 h-4" />
  <span>Open AI Documentation</span>
</button>`}
      />

      <h2>2. Interactive Icon-Only Buttons</h2>
      <p>
        When an icon appears inside a clickable button with{" "}
        <strong>no visible text</strong>, provide an accessible name via{" "}
        <code>aria-label</code> on the button:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { Copy1 } from "rare-icons";
import { Tooltip, Button } from "@heroui/react";

<Tooltip delay={150}>
  <Button
    variant="secondary"
    size="sm"
    isIconOnly
    aria-label="Copy code to clipboard"
  >
    <Copy1 aria-hidden="true" className="w-4 h-4" />
  </Button>
  <Tooltip.Content>Copy code</Tooltip.Content>
</Tooltip>`}
      />

      <h2>3. Status Icons &amp; Color Independence</h2>
      <p>
        According to <strong>WCAG 1.4.1 (Use of Color)</strong>, status
        indicators must not rely solely on color to communicate meaning. Pair
        icons with descriptive text or distinct shapes:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { Cancel1, Tick1 } from "rare-icons";

{/* Recommended: Color + Shape + Explicit Text Label */}
<div className="flex items-center gap-2 text-rose-500">
  <Cancel1 className="w-4 h-4" aria-hidden="true" />
  <span className="text-xs font-semibold">Build Failed</span>
</div>

<div className="flex items-center gap-2 text-emerald-500">
  <Tick1 className="w-4 h-4" aria-hidden="true" />
  <span className="text-xs font-semibold">Tests Passed</span>
</div>`}
      />

      <h2>4. Keyboard Focus Visibility</h2>
      <p>
        Never suppress focus rings without an accessible alternative. Ensure
        interactive triggers wrapping icons use visible focus rings:
      </p>
      <CodeBlock
        language="tsx"
        code={`<button className="p-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
  <Copy1 className="w-4 h-4" aria-hidden="true" />
</button>`}
      />

      <DocsPager
        prev={{ title: "Icon Catalog", href: "/docs/catalog" }}
        next={{ title: "Introduction", href: "/docs" }}
      />
    </article>
  );
}
