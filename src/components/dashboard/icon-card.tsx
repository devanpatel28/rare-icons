"use client";

import { memo, createElement } from "react";
import { Button, Tooltip } from "@heroui/react";
import { getIcon } from "@/data/icon-registry";
import type { RareIconRecord } from "@/data/rare-icons-data";

interface IconCardProps {
  icon: RareIconRecord;
  onSelect: (icon: RareIconRecord) => void;
}

function IconCard({ icon, onSelect }: IconCardProps) {
  const iconComp = getIcon(icon.name);

  return (
    <Tooltip delay={0} closeDelay={0}>
      <Button
        variant="secondary"
        onPress={() => onSelect(icon)}
        aria-label={`Open ${icon.name} details`}
        className="group w-full aspect-square flex items-center justify-center p-0 cursor-pointer h-auto min-w-0 transition-colors duration-150"
      >
        <span
          className="flex items-center justify-center duration-150 group-hover:scale-120 transition-transform pointer-events-none shrink-0"
          style={{
            width: "var(--icon-size, 24px)",
            height: "var(--icon-size, 24px)",
            fontSize: "var(--icon-size, 24px)",
            color: "var(--icon-color, var(--foreground))",
          }}
        >
          {iconComp ? (
            createElement(iconComp, {
              className: "w-full h-full shrink-0",
            })
          ) : (
            <svg
              className="w-full h-full shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="9" />
            </svg>
          )}
        </span>
      </Button>
      <Tooltip.Content showArrow placement="bottom">
        <Tooltip.Arrow />
        <span>{icon.name}</span>
      </Tooltip.Content>
    </Tooltip>
  );
}

export default memo(IconCard);
