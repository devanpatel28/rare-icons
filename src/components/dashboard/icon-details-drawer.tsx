"use client";

import { useCallback, useState, useEffect, useRef, createElement } from "react";
import {
  Drawer,
  Button,
  Chip,
  Slider,
  ColorPicker,
  ColorSwatch,
  ColorArea,
  ColorSlider,
  Label,
  parseColor,
  toast,
  Separator,
} from "@heroui/react";
import type { Color } from "@react-types/color";
import { Copy1, Tick1 } from "rare-icons";
import { getIcon } from "@/data/icon-registry";
import type { RareIconRecord } from "@/data/rare-icons-data";
import { getCategoryBySlug } from "@/data/rare-icons-data";
import CodeBlock from "@/components/docs/code-block";
import { useLenis } from "@/components/lenis-provider";

interface IconDetailsDrawerProps {
  icon: RareIconRecord | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCopy?: (msg: string) => void;
  color?: Color;
  onColorChange?: (color: Color) => void;
}

// Fixed sizes: [20, 24, 28, 32, 40, 48, 64]
const SIZE_STEPS = [
  { px: 20, label: "20px", cls: "text-[20px]" },
  { px: 24, label: "24px", cls: "text-2xl" }, // 24px matches Tailwind text-2xl
  { px: 28, label: "28px", cls: "text-[28px]" },
  { px: 32, label: "32px", cls: "text-[32px]" },
  { px: 40, label: "40px", cls: "text-[40px]" },
  { px: 48, label: "48px", cls: "text-[48px]" },
  { px: 64, label: "64px", cls: "text-[64px]" },
] as const;

export default function IconDetailsDrawer({
  icon,
  isOpen,
  onOpenChange,
  onCopy,
  color,
  onColorChange,
}: IconDetailsDrawerProps) {
  const [sizeIdx, setSizeIdx] = useState(1); // default 24px (text-2xl)
  const [internalColor, setInternalColor] = useState<Color>(() => color ?? parseColor("#3a9ff2"));
  const activeColor = internalColor;
  const colorSyncTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (color) {
      setInternalColor(color);
    }
  }, [color]);

  const handleColorChange = useCallback(
    (c: Color) => {
      // 1. Direct CSS variable update on document root — instant 120fps GPU repaint, zero lag!
      const hex = c.toString("hex");
      document.documentElement.style.setProperty("--icon-color", hex);

      // 2. Update local state immediately so icon preview and hex text reflect the drag
      setInternalColor(c);

      // 3. Debounce notifying parent DashboardClient so it doesn't re-render whole dashboard on every mousemove!
      clearTimeout(colorSyncTimer.current);
      colorSyncTimer.current = setTimeout(() => {
        if (onColorChange) onColorChange(c);
      }, 120);
    },
    [onColorChange],
  );

  useEffect(() => {
    return () => clearTimeout(colorSyncTimer.current);
  }, []);

  const lenis = useLenis();

  // 1. Pause Lenis smooth scrolling while drawer is open so scrolling in backdrop doesn't scroll background page
  useEffect(() => {
    if (!isOpen || !lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [isOpen, lenis]);

  // 2. Prevent React Aria's useCloseOnScroll from dismissing the ColorPicker popover when scrolling on backdrop or inside drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollCapture = (e: Event) => {
      // Halts React Aria's capture-phase useCloseOnScroll listener on window
      e.stopImmediatePropagation();
    };

    window.addEventListener("scroll", handleScrollCapture, true);
    return () => {
      window.removeEventListener("scroll", handleScrollCapture, true);
    };
  }, [isOpen]);

  const [copiedJSX, setCopiedJSX] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  const selectedSize = SIZE_STEPS[sizeIdx];
  const iconComp = icon ? getIcon(icon.name) : null;
  const category = icon ? getCategoryBySlug(icon.categorySlug) : null;

  const hexColor = activeColor.toString("hex");
  const colorClass =
    hexColor.toLowerCase() === "#3a9ff2"
      ? "text-accent"
      : hexColor.toLowerCase() === "#ffffff"
        ? "text-white"
        : `text-[${hexColor}]`;

  const importSnippet = icon ? `import { ${icon.name} } from "rare-icons";` : "";
  const componentSnippet = icon
    ? `<${icon.name} className="${selectedSize.cls} ${colorClass}" />`
    : "";
  const fullCodeSnippet = `${importSnippet}\n\n${componentSnippet}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  const handleCopyJSX = useCallback(async () => {
    if (!icon) return;
    await copyToClipboard(componentSnippet);
    setCopiedJSX(true);
    toast.success("Copied JSX snippet!", {
      description: componentSnippet,
    });
    onCopy?.(`Copied: ${componentSnippet}`);
    setTimeout(() => setCopiedJSX(false), 1000);
  }, [componentSnippet, icon, onCopy]);

  const handleCopyName = useCallback(async () => {
    if (!icon) return;
    await copyToClipboard(icon.name);
    setCopiedName(true);
    toast.success("Copied icon name!", {
      description: icon.name,
    });
    onCopy?.(`Copied name: ${icon.name}`);
    setTimeout(() => setCopiedName(false), 1000);
  }, [icon, onCopy]);

  if (!icon) return null;

  return (
    <Drawer>
      <Drawer.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="opaque"
        data-lenis-prevent
        className="overscroll-contain"
        onWheel={(e) => {
          const target = e.target as HTMLElement | null;
          if (e.target === e.currentTarget || !target?.closest('[data-lenis-prevent]')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onTouchMove={(e) => {
          const target = e.target as HTMLElement | null;
          if (e.target === e.currentTarget || !target?.closest('[data-lenis-prevent]')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <Drawer.Content placement="bottom">
          <Drawer.Dialog
            aria-label={`${icon.name} icon details`}
            className="w-full max-w-4xl mx-auto rounded-t-4xl! border-t border-x border-border bg-surface shadow-2xl p-0 flex flex-col overflow-hidden"
          >
            <Drawer.CloseTrigger />

            {/* ── Header ── */}
            <Drawer.Header className="flex items-center pb-3 border-b">
              <Drawer.Heading className="text-lg font-bold tracking-tight text-foreground leading-tight">
                {icon.name}
              </Drawer.Heading>
            </Drawer.Header>

            {/* ── Body: Left Icon Preview, Right 1 Code Block + (ColorPicker & Size in 1 Row) ── */}
            <Drawer.Body
              data-lenis-prevent
              className="px-6 py-5 overflow-y-auto min-h-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 items-stretch">
                {/* Left: Icon Preview Box (clean, size text removed from bottom) */}
                <div className="rounded-2xl bg-background-secondary flex items-center justify-center p-6 min-h-40 h-full transition-all duration-200">
                  {iconComp ? (
                    createElement(iconComp, {
                      className: `${selectedSize.cls} transition-all duration-200 shrink-0`,
                      style: { color: hexColor },
                    })
                  ) : (
                    <span className="text-xs text-muted">Not found</span>
                  )}
                </div>

                {/* Right: 1 Code Block + Controls (Color Picker & Size in one row) */}
                <div className="flex flex-col gap-4 justify-between">
                  {/* Single Unified Code Block using code-block.tsx */}
                  <CodeBlock
                    code={fullCodeSnippet}
                    language="tsx"
                    className="mb-0 shadow-xs"
                  />

                  {/* Single Row: HeroUI v3 ColorPicker + Size Slider */}
                  <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 items-start">
                    {/* HeroUI v3 Composable ColorPicker (no dots/swatches) */}
                    <div className="space-y-1.5 flex flex-col border-r pr-4">
                      <div className="flex items-center justify-between text-2xs text-muted">
                        <span className="font-semibold uppercase tracking-wider px-1">
                          Color
                        </span>
                      </div>
                      <ColorPicker
                        value={activeColor}
                        onChange={handleColorChange}
                        aria-label="Icon color"
                      >
                        <ColorPicker.Trigger className="rounded-xl! bg-surface border px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-surface-secondary transition-colors">
                          <ColorSwatch size="sm" />
                          <Label className="text-xs w-16 font-medium text-foreground cursor-pointer select-none">
                            {hexColor.toUpperCase()}
                          </Label>
                        </ColorPicker.Trigger>
                        <ColorPicker.Popover>
                          <ColorArea
                            aria-label="Color area"
                            className="w-full !max-w-none aspect-square"
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
                    </div>

                    {/* Size Slider in the same row: [20, 24, 28, 32, 40, 48, 64] */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between text-2xs text-muted">
                        <span className="font-semibold uppercase tracking-wider">
                          Icon Size
                        </span>
                        <span className="font-mono text-foreground font-semibold">
                          {selectedSize.label}
                        </span>
                      </div>
                      <Slider
                        aria-label="Icon size"
                        minValue={0}
                        maxValue={SIZE_STEPS.length - 1}
                        step={1}
                        value={sizeIdx}
                        onChange={(v) => {
                          if (typeof v === "number") setSizeIdx(v);
                        }}
                        className="w-full"
                      >
                        <Slider.Track>
                          <Slider.Fill />
                          <Slider.Thumb />
                        </Slider.Track>
                      </Slider>
                      <div className="flex justify-between text-2xs text-muted font-mono">
                        {SIZE_STEPS.map((s) => (
                          <span key={s.px}>{s.label}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer.Body>

            {/* ── Footer: ONLY Copy Name and Copy JSX buttons ── */}
            <Drawer.Footer className="px-6 py-4 border-t border-border shrink-0 flex items-center justify-end gap-3 bg-surface">
              <Button
                variant="secondary"
                size="md"
                onPress={handleCopyName}
                className="text-xs font-semibold gap-2"
              >
                {copiedName ? (
                  <>
                    <Tick1 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied Name!</span>
                  </>
                ) : (
                  <>
                    <Copy1 className="w-3.5 h-3.5" />
                    <span>Copy Name</span>
                  </>
                )}
              </Button>

              <Button
                variant="primary"
                size="md"
                onPress={handleCopyJSX}
                className="text-xs font-semibold gap-2"
              >
                {copiedJSX ? (
                  <>
                    <Tick1 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied JSX!</span>
                  </>
                ) : (
                  <>
                    <Copy1 className="w-3.5 h-3.5" />
                    <span>Copy JSX</span>
                  </>
                )}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
