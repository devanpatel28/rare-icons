"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Button, Chip, ScrollShadow, Separator } from "@heroui/react";
import { DOCS_NAV_ITEMS } from "./docs-sidebar";

interface DocsMobileDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DocsMobileDrawer({
  isOpen,
  onOpenChange,
}: DocsMobileDrawerProps) {
  const pathname = usePathname();

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Content placement="left">
        <Drawer.Dialog
          aria-label="Documentation navigation"
          className="w-80 max-w-[85vw] p-0 flex flex-col h-full bg-surface border-r border-border shadow-2xl"
        >
          <Drawer.CloseTrigger />

          <Drawer.Header className="px-5 py-4  border-b border-border flex items-center justify-between pr-12">
            <Drawer.Heading className="text-xs font-bold uppercase tracking-wider text-foreground">
              Documentation
            </Drawer.Heading>
            <Chip
              size="sm"
              variant="secondary"
              className="text-2xs font-mono h-5 px-1.5"
            >
              v1.0.0
            </Chip>
          </Drawer.Header>

          <Drawer.Body
            data-lenis-prevent
            className="flex-1 p-2 overflow-y-auto min-h-0 no-scrollbar"
          >
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
                          onClick={() => onOpenChange(false)}
                          className="no-underline block"
                        >
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            size="sm"
                            aria-current={isActive ? "page" : undefined}
                            className="w-full justify-between text-xs h-8 px-2.5 gap-0"
                            fullWidth
                          >
                            <span className="text-left flex items-center gap-2 font-medium">
                              <Icon
                                className={`w-4 h-4 ${
                                  isActive ? "text-accent" : "text-muted"
                                }`}
                              />
                              <span
                                className={
                                  isActive
                                    ? "text-foreground font-semibold"
                                    : "text-muted"
                                }
                              >
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
          </Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer>
  );
}
