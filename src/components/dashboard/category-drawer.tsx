"use client";

import { Drawer, Button, Chip, ScrollShadow, Separator } from "@heroui/react";
import type { IconCategory } from "@/data/rare-icons-data";
import { RARE_ICONS } from "@/data/rare-icons-data";
import type { DashboardFilters } from "./dashboard-client";

interface CategoryDrawerProps {
  filters: DashboardFilters;
  categories: readonly IconCategory[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCategoryChange: (slug: string) => void;
  onResetFilters: () => void;
}

const totalIconCount = RARE_ICONS.length;

export default function CategoryDrawer({
  filters,
  categories,
  isOpen,
  onOpenChange,
  onCategoryChange,
  onResetFilters,
}: CategoryDrawerProps) {
  return (
    <Drawer>
      <Drawer.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur"
      >
        <Drawer.Content placement="left">
          <Drawer.Dialog
            aria-label="Icon categories"
            className="w-80 max-w-[85vw] p-0 flex flex-col h-full bg-surface border-r border-border shadow-2xl"
          >
            <Drawer.CloseTrigger />

            {/* Categories Header */}
            <Drawer.Header className="px-5 py-4 shrink-0 border-b border-border flex items-center justify-between pr-12">
              <Drawer.Heading className="text-xs font-bold uppercase tracking-wider text-foreground">
                Categories
              </Drawer.Heading>
              <Chip
                size="sm"
                variant="secondary"
                className="text-[10px] font-mono h-5 px-1.5 "
              >
                {totalIconCount.toLocaleString()}
              </Chip>
            </Drawer.Header>

            {/* Categories List with ScrollShadow */}
            <Drawer.Body data-lenis-prevent className="flex-1 p-2 overflow-y-auto min-h-0 no-scrollbar">
               <ScrollShadow
                      hideScrollBar
                      data-lenis-prevent
                      className="flex-1 overflow-y-auto py-2 px-2 min-h-0 no-scrollbar"
                    >
                      <div className="space-y-1">
                        {/* All Categories */}
                        <Button
                          variant={!filters.category ? "secondary" : "ghost"}
                          size="sm"
                          onPress={() => onCategoryChange("")}
                          aria-current={!filters.category ? "page" : undefined}
                          className={`w-full justify-between text-xs h-8 px-2.5 gap-0`}
                          fullWidth
                        >
                          <span className="truncate text-left">All Icons</span>
                          <Chip
                            variant="secondary"
                            size="sm"
                            className="text-2xs shrink-0 ml-1.5"
                          >
                            {totalIconCount.toLocaleString()}
                          </Chip>
                        </Button>
                        <Separator variant="secondary" />
                        {/* Category list */}
                        {categories.map((cat) => {
                          const isActive = filters.category === cat.slug;
                          return (
                            <Button
                              key={cat.slug}
                              variant={isActive ? "secondary" : "ghost"}
                              size="sm"
                              onPress={() => onCategoryChange(cat.slug)}
                              aria-current={isActive ? "page" : undefined}
                              className="w-full justify-between text-xs h-8 px-2.5 gap-0"
                              fullWidth
                            >
                              <span className="truncate text-left">{cat.name}</span>
                              <Chip
                                variant="secondary"
                                size="sm"
                                className="text-2xs shrink-0 ml-1.5"
                              >
                                {cat.iconCount}
                              </Chip>
                            </Button>
                          );
                        })}
                      </div>
                    </ScrollShadow>
            </Drawer.Body>

            {/* Reset filter button in Footer */}
            {(filters.search || filters.category) && (
              <Drawer.Footer className="p-3 border-t border-[var(--border)] shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onPress={() => {
                    onResetFilters();
                    onOpenChange(false);
                  }}
                  className="w-full text-xs font-medium border border-[var(--border)]"
                >
                  ✕ Reset filters
                </Button>
              </Drawer.Footer>
            )}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
