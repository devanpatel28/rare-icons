import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/docs/code-block";
import DocsPager from "@/components/docs/docs-pager";
import { Chip, Button } from "@heroui/react";
import { Search, Copy1, Tick1 } from "rare-icons";

export const metadata: Metadata = {
  title: "Icon Catalog | Rare-Icons Documentation",
  description:
    "Learn how to discover, copy, and programmatically query icons in Rare-Icons.",
};

export default function CatalogPage() {
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
          Explorer Guide
        </Chip>
      </div>

      <h1>Icon Catalog Reference</h1>
      <p>
        The full <strong>3,700+ icon collection</strong> can be browsed live on
        the <Link href="/icons">Interactive Catalog</Link>. Use instant search,
        category filtering, size sliders, and the click-to-inspect drawer to
        copy ready-to-paste snippets.
      </p>

      <h2>Component Naming Conventions</h2>
      <p>
        Every icon has a unique PascalCase component export that maps directly
        to its semantic representation:
      </p>
      <table>
        <thead>
          <tr>
            <th>Component Name</th>
            <th>Domain / Category</th>
            <th>Typical Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>AiBook</code>
            </td>
            <td>AI</td>
            <td>AI prompts, model documentation, notebook guides</td>
          </tr>
          <tr>
            <td>
              <code>CommandLine</code>
            </td>
            <td>Development</td>
            <td>Terminal interfaces, script execution, CLI tools</td>
          </tr>
          <tr>
            <td>
              <code>Setting1</code>
            </td>
            <td>Settings</td>
            <td>Preferences modal, user controls, configuration panels</td>
          </tr>
          <tr>
            <td>
              <code>Search</code>
            </td>
            <td>Search</td>
            <td>Search bars, filtered inputs, query dialogs</td>
          </tr>
          <tr>
            <td>
              <code>Copy1</code>
            </td>
            <td>Files &amp; Folders</td>
            <td>Copy to clipboard actions, duplicate item triggers</td>
          </tr>
          <tr>
            <td>
              <code>Tick1</code>
            </td>
            <td>Status &amp; Checks</td>
            <td>Success feedback, verified checks, completed steps</td>
          </tr>
        </tbody>
      </table>

      <h2>Interactive Details Drawer</h2>
      <p>
        Clicking any icon in the catalog opens its inspector drawer, providing:
      </p>
      <ul>
        <li>
          <strong>Interactive preview</strong> with live SVG scaling (20px to
          64px)
        </li>
        <li>
          <strong>1-click copy</strong> for ESM import statements (
          <code>import &#123; Icon &#125; from &quot;rare-icons&quot;</code>)
        </li>
        <li>
          <strong>1-click copy</strong> for JSX elements with Tailwind classes
        </li>
        <li>
          <strong>Raw SVG string copy</strong> for Figma, Illustrator, or
          non-React contexts
        </li>
      </ul>

      <h2>Programmatic Access</h2>
      <p>
        You can also query the static registry in your own Next.js or React
        code:
      </p>
      <CodeBlock
        language="tsx"
        code={`import { RARE_ICONS, ICON_CATEGORIES } from "@/data/rare-icons-data";

// Total number of icons available
console.log(RARE_ICONS.length); // 3,700+

// Filter icons by category slug
const aiIcons = RARE_ICONS.filter((icon) => icon.categorySlug === "ai");`}
      />

      <div className="not-prose my-6">
        <Link href="/icons" className="no-underline">
          <Button variant="primary" size="md" className="gap-2 rounded-xl">
            <Search className="w-4 h-4" />
            <span>Open Interactive Catalog Explorer</span>
          </Button>
        </Link>
      </div>

      <DocsPager
        prev={{ title: "TypeScript & Autocomplete", href: "/docs/typescript" }}
        next={{ title: "Accessibility (a11y)", href: "/docs/accessibility" }}
      />
    </article>
  );
}
