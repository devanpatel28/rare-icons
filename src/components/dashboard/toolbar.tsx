"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Button,
  Chip,
  Kbd,
  SearchField,
  Slider,
  Tooltip,
  ColorPicker,
  ColorSwatch,
  ColorArea,
  ColorSlider,
  Label,
} from "@heroui/react";
import type { Color } from "@react-types/color";
import type { DashboardFilters, SortOrder } from "./dashboard-client";
import type { IconCategory } from "@/data/rare-icons-data";
import { ArrangeByLettersAZ, ArrangeByLettersZA, Text } from "rare-icons";

// Exported so IconGrid and IconCard can read it
export const ICON_SIZES = [20, 24, 28, 32, 40, 48, 64] as const;
export type IconSizeValue = (typeof ICON_SIZES)[number];

interface ToolbarProps {
  filters: DashboardFilters;
  totalCount: number;
  activeCategory?: IconCategory | null;
  iconSize: number;
  iconColor: Color;
  onSearchChange: (v: string) => void;
  onSortChange: (v: SortOrder) => void;
  onToggleSidebar: () => void;
  onClearCategory?: () => void;
  onIconSizeChange: (size: number) => void;
  onIconColorChange: (color: Color) => void;
}

export default function Toolbar({
  filters,
  totalCount,
  activeCategory,
  iconSize,
  iconColor,
  onSearchChange,
  onSortChange,
  onToggleSidebar,
  onClearCategory,
  onIconSizeChange,
  onIconColorChange,
}: ToolbarProps) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const [prevFilterSearch, setPrevFilterSearch] = useState(filters.search);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Sync internal search if external changes
  if (prevFilterSearch !== filters.search) {
    setPrevFilterSearch(filters.search);
    setSearchValue(filters.search);
  }

  const handleSearchChange = useCallback(
    (val: string) => {
      setSearchValue(val);
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onSearchChange(val);
      }, 160);
    },
    [onSearchChange],
  );

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  // Find current slider index
  const sizeIdx =
    ICON_SIZES.findIndex((s) => s >= iconSize) === -1
      ? ICON_SIZES.length - 1
      : ICON_SIZES.findIndex((s) => s >= iconSize);

  // Local color state for instant, 120fps lag-free interaction
  const [currentColor, setCurrentColor] = useState<Color>(iconColor);
  const colorSyncTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Sync internal color if external iconColor prop changes (e.g. from drawer)
  useEffect(() => {
    setCurrentColor(iconColor);
  }, [iconColor]);

  const handleColorChange = useCallback(
    (newColor: Color) => {
      // 1. Direct CSS variable update on document root — instant 120fps GPU repaint, zero lag!
      const hex = newColor.toString("hex");
      document.documentElement.style.setProperty("--icon-color", hex);

      // 2. Update local state in Toolbar so swatch & hex text reflect the drag immediately
      setCurrentColor(newColor);

      // 3. Debounce notifying parent DashboardClient so it doesn't re-render 120+ icons on every pixel move!
      clearTimeout(colorSyncTimer.current);
      colorSyncTimer.current = setTimeout(() => {
        onIconColorChange(newColor);
      }, 120);
    },
    [onIconColorChange],
  );

  useEffect(() => {
    return () => clearTimeout(colorSyncTimer.current);
  }, []);

  return (
    <div className="sticky top-14 z-20 pt-6 pb-2 shrink-0 bg-background border-b border-border space-y-2.5">
      {/* ── Row 1: Toggle + Search + Sort + Size Slider ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full ">
        <div className="flex gap-2 w-full sm:w-1/2 ">
          {/* Categories toggle (mobile only — on desktop the sidebar is fixed) */}
          <Tooltip delay={200}>
            <Button
              variant="secondary"
              size="sm"
              isIconOnly
              onPress={onToggleSidebar}
              aria-label="Toggle categories drawer"
              className="lg:hidden w-9 h-9 rounded-xl shrink-0 border-border "
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </Button>
            <Tooltip.Content showArrow placement="bottom">
              <Tooltip.Arrow />
              Toggle Categories
            </Tooltip.Content>
          </Tooltip>

          {/* Search Field */}
          <SearchField
            aria-label="Search icons"
            value={searchValue}
            onChange={handleSearchChange}
            variant="primary"
            fullWidth
          >
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                id="search-input"
                placeholder="Search icons..."
              />
              <Kbd className="mr-1 transition-all duration-200">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>K</Kbd.Content>
              </Kbd>
              <SearchField.ClearButton
                className={`transition-all duration-200 ${filters.search.length === 0 ? "hidden" : ""}`}
              />
            </SearchField.Group>
          </SearchField>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-fit">
          {/* Color Picker (HeroUI v3) */}
          <ColorPicker
            value={currentColor}
            onChange={handleColorChange}
            aria-label="Icon color"
          >
            <ColorPicker.Trigger className="rounded-xl! bg-surface border px-2  py-1 flex items-center gap-2 cursor-pointer hover:bg-surface-secondary transition-colors">
              <ColorSwatch size="sm" />
              <Label className="text-xs w-16 font-medium text-foreground cursor-pointer select-none">
                {currentColor.toString("hex").toUpperCase()}
              </Label>
            </ColorPicker.Trigger>
            <ColorPicker.Popover>
              <ColorArea
                aria-label="Color area"
                className="w-full max-w-none aspect-square"
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
              >
                <ColorArea.Thumb />
              </ColorArea>
              <ColorSlider
                channel="hue"
                className="gap-1 px-1"
                colorSpace="hsb"
              >
                <Label>Hue</Label>
                <ColorSlider.Output className="text-muted" />
                <ColorSlider.Track>
                  <ColorSlider.Thumb />
                </ColorSlider.Track>
              </ColorSlider>
            </ColorPicker.Popover>
          </ColorPicker>

          {/* Icon Size Slider */}
          <Tooltip delay={150}>
            <div className="flex w-full sm:w-fit px-2.5 py-1.5 bg-surface border border-border shadow-xs items-center justify-center gap-1.5 rounded-xl">
              {/* Small icon indicator */}
              <div className="w-5 h-5 flex items-center justify-center ">
                <Text className="text-xs" />
              </div>
              <Slider
                aria-label="Icon size"
                minValue={0}
                maxValue={ICON_SIZES.length - 1}
                step={1}
                value={sizeIdx}
                onChange={(v) => {
                  if (typeof v === "number") onIconSizeChange(ICON_SIZES[v]);
                }}
                className="w-full sm:w-36 flex"
              >
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider>
              {/* Large icon indicator */}
              <div className="w-5 h-5 flex items-center justify-center ">
                <Text className="text-base" />
              </div>
            </div>
            <Tooltip.Content showArrow placement="bottom">
              <Tooltip.Arrow />
              <span>Icon size: {iconSize}px</span>
            </Tooltip.Content>
          </Tooltip>

          {/* Sort Button */}
          <Tooltip delay={200}>
            <Button
              variant="secondary"
              size="md"
              onPress={() =>
                onSortChange(filters.sort === "asc" ? "desc" : "asc")
              }
              aria-label="Toggle sort order"
              isIconOnly
              className="aspect-square"
            >
              {filters.sort === "asc" ? (
                <ArrangeByLettersAZ />
              ) : (
                <ArrangeByLettersZA />
              )}
            </Button>
            <Tooltip.Content showArrow placement="bottom">
              <Tooltip.Arrow />
              Sort order
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>

      {/* ── Row 2: Count + Active Category ── */}
      <div className="flex items-center gap-2">
        <Chip
          size="sm"
          variant="soft"
          color="accent"
          className="text-xs  h-5 px-2"
        >
          {totalCount.toLocaleString()} icons
        </Chip>
        {activeCategory && (
          <Chip
            size="sm"
            variant="primary"
            color="accent"
            className="text-xs h-5 px-2 flex items-center justify-center gap-1"
          >
            {activeCategory.name}
            {onClearCategory && (
              <button
                type="button"
                onClick={onClearCategory}
                className="ml-1 opacity-60 hover:opacity-100 cursor-pointer text-xs leading-none"
                aria-label={`Clear ${activeCategory.name} filter`}
              >
                ✕
              </button>
            )}
          </Chip>
        )}
      </div>
    </div>
  );
}
