"use client";

import { Button, Chip, ScrollShadow, Separator } from "@heroui/react";
import type { IconCategory } from "@/data/rare-icons-data";
import { RARE_ICONS } from "@/data/rare-icons-data";
import type { DashboardFilters } from "./dashboard-client";
import { Cancel1, X } from "rare-icons";

interface CategorySidebarProps {
  filters: DashboardFilters;
  categories: readonly IconCategory[];
  onCategoryChange: (slug: string) => void;
  onResetFilters: () => void;
}

const totalIconCount = RARE_ICONS.length;

export default function CategorySidebar({
  filters,
  categories,
  onCategoryChange,
  onResetFilters,
}: CategorySidebarProps) {
  return (
    <aside
      className="hidden lg:flex flex-col rounded-2xl w-60 shrink-0 h-[85vh] sticky top-[9vh] bg-surface overflow-hidden"
      aria-label="Icon categories navigation"
    >
      {/* Header */}
      <div className="px-4 py-3.5 shrink-0 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-muted">
          Categories
        </span>
      </div>

      <Separator variant="secondary" />

      {/* Scrollable Category List */}
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

      {/* Reset Footer */}
      {(filters.search || filters.category) && (
        <div>
          <Separator variant="secondary" />
          <div className="px-3 py-3 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onPress={onResetFilters}
              fullWidth
            >
              Reset filters
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
