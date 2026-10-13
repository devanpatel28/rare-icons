import { createElement } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button, Card, Chip } from "@heroui/react";
import { ICON_CATEGORIES } from "@/data/rare-icons-data";
import { getIcon } from "@/data/icon-registry";
import {
  Flash,
  Colors,
  Rocket,
  Security,
  Sparkles,
  Code,
  CommandLine,
} from "rare-icons";
import {
  HeroInstallPill,
  HeroSearchBar,
  InteractiveIconPlayground,
} from "@/components/home/home-showcase";
import HeroDecorations from "@/components/home/hero-decorations";
import CodeBlock from "@/components/docs/code-block";
import { BrandLogo } from "@/components/brand-logo";

export const metadata = {
  title: "Rare-Icons | 3,700+ Premium SVG Icons for React & Next.js",
  description:
    "Explore 3,700+ meticulously crafted, open-source React SVG icons across 59 categories. Pure HeroUI v3 synergy, zero runtime bloat, and Next.js 16 ready.",
};

const TOP_CATEGORIES = [
  {
    name: "Settings & Controls",
    slug: "settings",
    previewIcons: ["Setting1", "Bot", "MachineRobot", "AlarmClock"],
    description: "System toggles, sliders, gear wheels, and preferences",
  },
  {
    name: "Arrows & Direction",
    slug: "arrows",
    previewIcons: [
      "Acceleration",
      "ArrowAllDirectionRound",
      "ArrowDiagonalRound",
      "ArrowLeftRightRound",
    ],
    description: "Navigation chevrons, pointers, circular loops, and flows",
  },
  {
    name: "Add, Remove & Actions",
    slug: "add-and-remove",
    previewIcons: ["AddCircle", "AddSquare", "Add1", "Add2"],
    description: "CRUD controls, creation buttons, modifiers, and actions",
  },
  {
    name: "Communications & Social",
    slug: "communications",
    previewIcons: ["ChatBot", "AddressBook", "AiBook", "Folders"],
    description: "Messages, chat bubbles, contact books, and mail",
  },
  {
    name: "Devices & Hardware",
    slug: "devices",
    previewIcons: [
      "BatteryCharging2",
      "AdobePhotoshop",
      "AdobeIllustrator",
      "Sun1",
    ],
    description: "Laptops, phones, displays, batteries, and peripherals",
  },
  {
    name: "Weather & Nature",
    slug: "weather",
    previewIcons: ["Sun1", "Moon", "Sparkles", "Flash"],
    description: "Sun, moon, forecasts, cloud cover, and elements",
  },
].map((cat) => ({
  ...cat,
  count: ICON_CATEGORIES.find((c) => c.slug === cat.slug)?.iconCount ?? 0,
}));

const CODE_EXAMPLE = `import { Flash, Sun1, Moon, SearchField } from "rare-icons";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-surface text-foreground">
      <div className="flex items-center gap-2">
        <Flash className="size-5 text-accent" />
        <span className="font-bold">Rare-Icons</span>
      </div>
      <div className="flex items-center gap-2">
        <Sun1 className="size-4 text-amber-500" />
      </div>
    </header>
  );
}`;

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative selection:bg-accent selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* ── 1. Hero Section (Full Width & First Whole Screen) ── */}
      <section className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 sm:px-6 py-12 overflow-hidden border-b border-border/40">
        {/* Subtle Background Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-accent/10 blur-[150px] rounded-full -z-10"
        />

        {/* Pure Icon Ambient Decorations (Full width canvas, zero bg, zero names) */}
        <HeroDecorations />

        {/* Hero Central Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface shadow-xs text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="font-semibold text-foreground">
              3,700+ Pure React Icons
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-muted font-mono text-[11px]">
              59 Categories
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] max-w-4xl">
            Meticulously Crafted Icons for{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--accent) 0%, color-mix(in oklch, var(--accent) 80%, #fff) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              React &amp; Next.js
            </span>
          </h1>

          {/* Hero Quick Search Bar */}
          <div className="w-full pt-1">
            <HeroSearchBar />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/icons" className="no-underline">
              <Button variant="primary" size="lg">
                Browse All 3,700+ Icons
              </Button>
            </Link>

            <Link href="/docs" className="no-underline">
              <Button variant="secondary" size="lg">
                Documentation
              </Button>
            </Link>
          </div>

          {/* Interactive Install Pill */}
          <div className="pt-2">
            <HeroInstallPill />
          </div>
        </div>
      </section>

      {/* Main Container for rest of page */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24 flex flex-col gap-24 relative">
        {/* ── 2. Interactive Icon Playground ── */}
        <section className="w-full">
          <InteractiveIconPlayground />
        </section>

        {/* ── 3. Bento Grid Architectural Features ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                Architecture &amp; Performance
              </div>
              <h2 className="text-2xl font-bold text-foreground mt-1">
                Built for Enterprise Performance
              </h2>
            </div>
            <p className="text-xs text-muted max-w-md">
              Engineered with modern build systems to provide maximum speed and
              developer ergonomics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <Card className="p-6 border border-border bg-surface rounded-2xl flex flex-col justify-between">
              <Card.Header className="p-0 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent/10 text-accent">
                  <Flash className="w-5 h-5" />
                </div>
                <Card.Title className="text-base font-bold text-foreground">
                  Zero Runtime Overhead
                </Card.Title>
                <Card.Description className="text-xs text-muted mt-2 leading-relaxed">
                  Named ESM exports guarantee 100% tree-shaking. Unused icons
                  are completely eliminated from your production bundle.
                </Card.Description>
              </Card.Header>
              <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Bundle cost</span>
                <span className="text-emerald-500 font-semibold">
                  &lt; 1 KB / icon
                </span>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="p-6 border border-border bg-surface rounded-2xl flex flex-col justify-between">
              <Card.Header className="p-0 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent/10 text-accent">
                  <Colors className="w-5 h-5" />
                </div>
                <Card.Title className="text-base font-bold text-foreground">
                  Tailwind &amp; currentColor
                </Card.Title>
                <Card.Description className="text-xs text-muted mt-2 leading-relaxed">
                  Native 1em dimensions automatically inherit font sizes (
                  <code>text-sm</code>, <code>text-2xl</code>) and CSS text
                  color utilities.
                </Card.Description>
              </Card.Header>
              <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted">
                <span>CSS synergy</span>
                <span className="text-accent font-semibold">
                  Tailwind CSS v4
                </span>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="p-6 border border-border bg-surface rounded-2xl flex flex-col justify-between">
              <Card.Header className="p-0 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent/10 text-accent">
                  <Rocket className="w-5 h-5" />
                </div>
                <Card.Title className="text-base font-bold text-foreground">
                  Server Components Ready
                </Card.Title>
                <Card.Description className="text-xs text-muted mt-2 leading-relaxed">
                  Renders directly in Next.js Server Components with zero{" "}
                  <code>&quot;use client&quot;</code> directives required,
                  providing instant TTFB.
                </Card.Description>
              </Card.Header>
              <div className="pt-3 border-t border-border flex items-center justify-between text-sm font-mono text-muted">
                <span>Next.js App Router</span>
                <span className="text-emerald-500 font-semibold">
                  Native RSC
                </span>
              </div>
            </Card>

            {/* Card 4 */}
            <Card className="p-6 border border-border bg-surface rounded-2xl flex flex-col justify-between">
              <Card.Header className="p-0 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-accent/10 text-accent">
                  <Security className="w-5 h-5" />
                </div>
                <Card.Title className="text-base font-bold text-foreground">
                  Strict TypeScript Support
                </Card.Title>
                <Card.Description className="text-xs text-muted mt-2 leading-relaxed">
                  Bundled TypeScript types extend full <code>SVGProps</code>{" "}
                  with rich IDE autocompletion, type safety, and accessibility
                  hints.
                </Card.Description>
              </Card.Header>
              <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Type safety</span>
                <span className="text-accent font-semibold">
                  TypeScript 5.x
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* ── 4. Curated Category Showcase ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                Catalog Taxonomy
              </div>
              <h2 className="text-2xl font-bold text-foreground mt-1">
                59 Curated Categories
              </h2>
            </div>
            <Link
              href="/icons"
              className="text-xs font-semibold text-accent hover:underline no-underline"
            >
              Browse all 59 categories in explorer
            </Link>
          </div>

          {/* Top 6 Category Cards with Icon Previews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/icons?cat=${cat.slug}`}
                className="group p-5 rounded-2xl border border-border bg-surface hover:bg-surface-secondary hover:border-accent/60 transition-all duration-150 flex flex-col justify-between gap-4 no-underline"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                      {cat.name}
                    </h3>
                    <Chip
                      size="sm"
                      variant="secondary"
                      className="text-xs px-2"
                    >
                      {cat.count} icons
                    </Chip>
                  </div>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* 4 Icon Previews */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                  {cat.previewIcons.map((iconName) => {
                    const Comp = getIcon(iconName);
                    return (
                      <div
                        key={iconName}
                        className="w-9 h-9 rounded-xl border border-border bg-background flex items-center justify-center text-foreground group-hover:text-accent transition-colors shrink-0"
                        title={iconName}
                      >
                        {Comp ? (
                          <span className="text-lg">{createElement(Comp)}</span>
                        ) : null}
                      </div>
                    );
                  })}
                  <div className="text-[11px] text-muted font-medium ml-auto flex items-center gap-1 group-hover:text-accent transition-colors">
                    <span>View</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Category Chips */}
          <div className="pt-2">
            <div className="text-xs font-medium text-muted mb-2.5">
              Quick explore other categories:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ICON_CATEGORIES.slice(6, 32).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/icons?cat=${cat.slug}`}
                  className="no-underline"
                >
                  <Chip
                    variant="soft"
                    size="sm"
                    color="accent"
                    className="text-xs py-1 px-3"
                  >
                    {cat.name} ({cat.iconCount})
                  </Chip>
                </Link>
              ))}
              <Link href="/icons" className="no-underline">
                <Chip
                  variant="soft"
                  size="sm"
                  className="cursor-pointer text-xs py-1 px-2 bg-accent text-accent-foreground font-medium"
                >
                  +27 more categories...
                </Chip>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. Quick Integration Code Example ── */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                Developer Ergonomics
              </div>
              <h2 className="text-2xl font-bold text-foreground mt-1">
                Effortless 30-Second Integration
              </h2>
            </div>
            <Link
              href="/docs/quick-start"
              className="text-xs font-semibold text-accent hover:underline no-underline"
            >
              Read complete quick start guide
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            <div className="space-y-3 lg:col-span-1">
              <div className="p-4 rounded-2xl shadow-sm bg-surface space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <CommandLine className="w-4 h-4 text-accent" />
                  <span>1. Install Package</span>
                </div>
                <p className="text-xs text-muted">
                  Install directly via npm with zero extra peer dependencies.
                </p>
                <div className="p-2 rounded-xl bg-background-secondary font-mono text-xs text-foreground select-all">
                  npm install rare-icons
                </div>
              </div>

              <div className="p-4 rounded-2xl shadow-sm bg-surface space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Code className="w-4 h-4 text-accent" />
                  <span>2. Import Named Icons</span>
                </div>
                <p className="text-xs text-muted">
                  Import only what you need. Full TypeScript autocomplete with
                  all SVG attributes.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <CodeBlock language="tsx" code={CODE_EXAMPLE} />
            </div>
          </div>
        </section>

        {/* ── 7. Clean Footer ── */}
        <footer className="pt-8 pb-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center no-underline"
              aria-label="Rare Icons Home"
            >
              <BrandLogo className="h-5 w-auto opacity-75 hover:opacity-100 transition-opacity" />
            </Link>
            <span className="text-border">|</span>
            <span>
              Crafted by <strong>Designer</strong> for{" "}
              <strong>Designers</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hover:text-foreground no-underline transition-colors"
            >
              Home
            </Link>
            <Link
              href="/icons"
              className="hover:text-foreground no-underline transition-colors"
            >
              Catalog
            </Link>
            <Link
              href="/docs"
              className="hover:text-foreground no-underline transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/docs/quick-start"
              className="hover:text-foreground no-underline transition-colors"
            >
              Quick Start
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
