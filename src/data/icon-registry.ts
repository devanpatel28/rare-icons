/**
 * Icon registry — maps component name strings to actual React components
 * from the `rare-icons` npm package. This is the type-safe bridge between
 * the metadata in rare-icons-data.ts and the real rendered icons.
 *
 * The registry is a plain object keyed by component name (e.g. "AiBook").
 * It is imported once and used everywhere.
 */
import type { SVGProps, ComponentType } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

// We import the entire rare-icons namespace so tree-shaking can still apply
// at the bundler level while we get a dynamic lookup at runtime.
import * as RareIconsAll from "rare-icons";

export const iconRegistry = RareIconsAll as unknown as Record<string, IconComponent>;

export function getIcon(name: string): IconComponent | null {
  return iconRegistry[name] ?? null;
}
