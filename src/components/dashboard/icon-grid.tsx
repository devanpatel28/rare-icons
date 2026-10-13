"use client";

import { useMemo, useCallback, useState, useEffect, useRef, memo } from "react";
import type { RareIconRecord } from "@/data/rare-icons-data";
import IconCard from "./icon-card";

interface IconGridProps {
  icons: readonly RareIconRecord[];
  iconSize: number;
  onSelect: (icon: RareIconRecord) => void;
}

const INITIAL_BATCH = 120;
const BATCH_SIZE = 80;

function IconGrid({ icons, iconSize, onSelect }: IconGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [prevIcons, setPrevIcons] = useState(icons);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset visibleCount when the filtered icon set changes
  if (prevIcons !== icons) {
    setPrevIcons(icons);
    setVisibleCount(INITIAL_BATCH);
  }

  const visible = useMemo(
    () => icons.slice(0, visibleCount),
    [icons, visibleCount],
  );
  const hasMore = visibleCount < icons.length;

  const handleSelect = useCallback(
    (icon: RareIconRecord) => onSelect(icon),
    [onSelect],
  );

  // Infinite Scroll IntersectionObserver
  useEffect(() => {
    if (!hasMore) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, icons.length));
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, icons.length]);

  if (icons.length === 0) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center p-12 text-center"
        aria-live="polite"
        aria-label="No icons found"
      >
        <div className="flex flex-col items-center gap-3 max-w-sm">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-muted"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <div className="text-base font-semibold text-foreground">
            No matching icons
          </div>
          <p className="text-xs text-muted">
            Try adjusting your search query or choosing another category from
            the categories drawer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Icon catalog grid"
      className="pt-2 pb-16"
    >
      {/* 9 Column Grid */}
      <div
        className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2"
        style={{ "--icon-size": `${iconSize}px` } as React.CSSProperties}
      >
        {visible.map((icon, idx) => (
          <IconCard
            key={`${icon.name}-${icon.categorySlug}-${idx}`}
            icon={icon}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Infinite Scroll Sentinel (auto loads next icons as user scrolls near bottom) */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="h-14 w-full flex items-center justify-center text-xs text-[var(--muted)] py-4 opacity-70"
          aria-hidden="true"
        >
          Loading more icons...
        </div>
      )}
    </div>
  );
}

export default memo(IconGrid);
