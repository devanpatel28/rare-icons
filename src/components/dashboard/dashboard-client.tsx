"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { parseColor } from "@heroui/react";
import type { Color } from "@react-types/color";
import { ICON_CATEGORIES, RARE_ICONS } from "@/data/rare-icons-data";
import type { RareIconRecord } from "@/data/rare-icons-data";
import Navbar from "@/components/navbar";
import CategorySidebar from "./category-sidebar";
import CategoryDrawer from "./category-drawer";
import Toolbar from "./toolbar";
import IconGrid from "./icon-grid";
import IconDetailsDrawer from "./icon-details-drawer";

export type SortOrder = "asc" | "desc";

export interface DashboardFilters {
  search: string;
  category: string;
  sort: SortOrder;
}

const DEFAULT_ICON_SIZE = 28;

export default function DashboardClient() {
  const router = useRouter();
  usePathname(); // keep for potential future use
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false); // mobile category drawer
  const [selected, setSelected] = useState<RareIconRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [iconSize, setIconSize] = useState(DEFAULT_ICON_SIZE);
  const [iconColor, setIconColor] = useState<Color>(() => parseColor("#3a9ff2"));

  // Zero-lag direct CSS variable write on document root
  const handleIconColorChange = useCallback((newColor: Color) => {
    const hex = newColor.toString("hex");
    document.documentElement.style.setProperty("--icon-color", hex);
    setIconColor(newColor);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--icon-color", iconColor.toString("hex"));
  }, []);

  const basePath = "/icons";

  const filters: DashboardFilters = useMemo(
    () => ({
      search: searchParams.get("q") ?? "",
      category: searchParams.get("cat") ?? "",
      sort: (searchParams.get("sort") ?? "asc") as SortOrder,
    }),
    [searchParams]
  );

  const setFilter = useCallback(
    <K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "" || (key === "sort" && value === "asc")) {
        if (key === "search") params.delete("q");
        else if (key === "category") params.delete("cat");
        else params.delete(key);
      } else {
        if (key === "search") params.set("q", value as string);
        else if (key === "category") params.set("cat", value as string);
        else params.set(key, value as string);
      }
      const qs = params.toString();
      router.replace(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    },
    [router, searchParams, basePath]
  );

  const resetFilters = useCallback(() => {
    router.replace(basePath, { scroll: false });
  }, [router, basePath]);

  // Filtered & sorted icons
  const filteredIcons = useMemo(() => {
    let list = RARE_ICONS as readonly RareIconRecord[];
    if (filters.category) {
      list = list.filter((i) => i.categorySlug === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
      );
    }
    if (filters.sort === "desc") {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  }, [filters]);

  const activeCategory = useMemo(
    () =>
      filters.category
        ? ICON_CATEGORIES.find((c) => c.slug === filters.category) ?? null
        : null,
    [filters.category]
  );

  const handleSelectIcon = useCallback((icon: RareIconRecord) => {
    setSelected(icon);
    setDetailsOpen(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDetailsOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Body: sidebar + content */}
      <div className="max-w-7xl mx-auto w-full flex flex-1">

        {/* ── Fixed Left Category Sidebar (desktop) ── */}
        <CategorySidebar
          filters={filters}
          categories={ICON_CATEGORIES}
          onCategoryChange={(slug) => setFilter("category", slug)}
          onResetFilters={resetFilters}
        />

        {/* ── Mobile Category Drawer ── */}
        <CategoryDrawer
          filters={filters}
          categories={ICON_CATEGORIES}
          isOpen={drawerOpen}
          onOpenChange={setDrawerOpen}
          onCategoryChange={(slug) => setFilter("category", slug)}
          onResetFilters={resetFilters}
        />

        {/* ── Main Content ── */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="px-4 sm:px-6 flex flex-col">
            {/* Sticky Toolbar */}
              <Toolbar
                filters={filters}
                totalCount={filteredIcons.length}
                activeCategory={activeCategory}
                iconSize={iconSize}
                iconColor={iconColor}
                onSearchChange={(v) => setFilter("search", v)}
                onSortChange={(v) => setFilter("sort", v)}
                onToggleSidebar={() => setDrawerOpen((o) => !o)}
                onClearCategory={() => setFilter("category", "")}
                onIconSizeChange={setIconSize}
                onIconColorChange={handleIconColorChange}
              />

              {/* Icon Grid */}
              <IconGrid
                icons={filteredIcons}
                iconSize={iconSize}
                onSelect={handleSelectIcon}
              />
            </div>
          </main>
        </div>

        {/* ── Icon Details Drawer (HeroUI v3) ── */}
        <IconDetailsDrawer
          icon={selected}
          isOpen={detailsOpen}
          color={iconColor}
          onColorChange={handleIconColorChange}
          onOpenChange={(open) => {
            setDetailsOpen(open);
            if (!open) {
              // small delay so exit animation plays
              setTimeout(() => setSelected(null), 300);
            }
          }}
        />
      </div>
  );
}
