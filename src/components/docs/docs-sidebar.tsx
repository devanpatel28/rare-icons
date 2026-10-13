"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Chip, ScrollShadow, Separator } from "@heroui/react";
import {
  AiBook,
  CommandLine,
  Flash,
  Code,
  Colors,
  Global,
  Security,
  Folders,
  Search,
  Setting1,
} from "rare-icons";

export interface NavSection {
  group: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

export const DOCS_NAV_ITEMS: readonly NavSection[] = [
  {
    group: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs", icon: AiBook },
      { label: "Installation", href: "/docs/installation", icon: CommandLine, badge: "npm" },
      { label: "Quick Start", href: "/docs/quick-start", icon: Flash },
    ],
  },
  {
    group: "Core Guides",
    items: [
      { label: "Usage Patterns", href: "/docs/usage", icon: Code },
      { label: "Styling & Sizing", href: "/docs/styling", icon: Colors, badge: "Tailwind" },
      { label: "Next.js Integration", href: "/docs/nextjs", icon: Global, badge: "RSC" },
      { label: "TypeScript", href: "/docs/typescript", icon: Security },
    ],
  },
  {
    group: "Reference",
    items: [
      { label: "Icon Catalog", href: "/docs/catalog", icon: Search },
      { label: "Accessibility", href: "/docs/accessibility", icon: Setting1 },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col rounded-2xl w-60 shrink-0 h-[85vh] sticky top-[9vh] bg-surface overflow-hidden"
      aria-label="Documentation navigation"
    >
      {/* Header */}
      <div className="px-4 py-3.5 shrink-0 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-muted">
          Documentation
        </span>
        <Chip
          variant="secondary"
          size="sm"
          className="text-2xs font-mono shrink-0"
        >
          v1.0.0
        </Chip>
      </div>

      <Separator variant="secondary" />

      {/* Scrollable Navigation List */}
      <ScrollShadow
        hideScrollBar
        data-lenis-prevent
        className="flex-1 overflow-y-auto py-2 px-2 min-h-0 no-scrollbar"
      >
        <div className="space-y-3">
          {DOCS_NAV_ITEMS.map((section, sIdx) => (
            <div key={section.group} className="space-y-1">
              <div className="px-2 pt-1 pb-1 text-2xs font-bold uppercase tracking-wider text-muted select-none">
                {section.group}
              </div>

              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="no-underline block"
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      aria-current={isActive ? "page" : undefined}
                      className="w-full justify-between text-xs h-8 px-2.5 gap-0 font-normal"
                      fullWidth
                    >
                      <span className=" text-left flex items-center gap-2 font-medium">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? "text-accent" : "text-muted"
                          }`}
                        />
                        <span className={isActive ? "text-foreground font-semibold" : "text-muted hover:text-foreground"}>
                          {item.label}
                        </span>
                      </span>

                      {item.badge && (
                        <Chip
                          variant="secondary"
                          size="sm"
                          className="text-2xs shrink-0 ml-1.5 font-mono"
                        >
                          {item.badge}
                        </Chip>
                      )}
                    </Button>
                  </Link>
                );
              })}

              {sIdx < DOCS_NAV_ITEMS.length - 1 && (
                <Separator variant="secondary" className="my-2" />
              )}
            </div>
          ))}
        </div>
      </ScrollShadow>

      {/* Bottom Link to Explorer */}
      <div className="p-2.5 border-t border-border shrink-0">
        <Link href="/icons" className="no-underline block">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs justify-between h-8 px-2.5 text-accent font-medium hover:bg-accent-soft"
            fullWidth
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Browse All Icons</span>
            </span>
          </Button>
        </Link>
      </div>
    </aside>
  );
}
