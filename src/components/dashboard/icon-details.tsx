"use client";

import { useEffect, useRef, useCallback, useState, createElement } from "react";
import { Button, Card, Chip, CloseButton, Separator, Tabs, Tooltip } from "@heroui/react";
import { getIcon } from "@/data/icon-registry";
import type { RareIconRecord } from "@/data/rare-icons-data";
import { getCategoryBySlug } from "@/data/rare-icons-data";

interface IconDetailsProps {
  icon: RareIconRecord;
  onClose: () => void;
  onCopy: (msg: string) => void;
}

const TAILWIND_SIZES = [
  { label: "text-[11px]", cls: "text-[11px]" },
  { label: "text-xs",     cls: "text-xs" },
  { label: "text-sm",     cls: "text-sm" },
  { label: "text-base",   cls: "text-base" },
  { label: "text-lg",     cls: "text-lg" },
  { label: "text-xl",     cls: "text-xl" },
  { label: "text-2xl",    cls: "text-2xl" },
  { label: "text-3xl",    cls: "text-3xl" },
  { label: "text-4xl",    cls: "text-4xl" },
] as const;

export default function IconDetails({ icon, onClose, onCopy }: IconDetailsProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string>("text-2xl");
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedComp, setCopiedComp] = useState(false);
  const iconComp = getIcon(icon.name);
  const category = getCategoryBySlug(icon.categorySlug);

  // Trap focus & Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const importSnippet = `import { ${icon.name} } from "rare-icons";`;
  const componentSnippet = `<${icon.name} className="${selectedSize} text-violet-500" />`;
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

  const handleCopyAll = useCallback(async () => {
    await copyToClipboard(fullCodeSnippet);
    setCopiedAll(true);
    onCopy("Copied import + component code!");
    setTimeout(() => setCopiedAll(false), 1600);
  }, [fullCodeSnippet, onCopy]);

  const handleCopyComponentOnly = useCallback(async () => {
    await copyToClipboard(componentSnippet);
    setCopiedComp(true);
    onCopy(`Copied: ${componentSnippet}`);
    setTimeout(() => setCopiedComp(false), 1600);
  }, [componentSnippet, onCopy]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Side Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${icon.name} icon details`}
        className="fixed top-0 right-0 z-50 h-screen w-full max-w-md overflow-y-auto p-6 flex flex-col gap-5 border-l border-[var(--border)] bg-[var(--surface)] shadow-2xl"
        style={{
          animation: "slideInRight 0.2s ease-out",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                {icon.name}
              </h2>
              <Chip
                size="sm"
                variant="secondary"
                className="text-[11px] bg-[var(--accent-subtle)] text-[var(--accent-light)]"
              >
                1em SVG
              </Chip>
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              Category:{" "}
              <span className="text-[var(--foreground)] font-medium">
                {category?.name ?? icon.category}
              </span>
            </p>
          </div>

          <Tooltip delay={150}>
            <CloseButton
              aria-label="Close details"
              onPress={onClose}
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            />
            <Tooltip.Content>Close panel (Esc)</Tooltip.Content>
          </Tooltip>
        </div>

        {/* Live Interactive Preview using HeroUI Card Compound Component */}
        <Card className="border border-[var(--border)] bg-[var(--surface-secondary)] rounded-2xl overflow-hidden shadow-xs">
          <Card.Header className="p-4 pb-2">
            <Card.Title className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider">
              Interactive Preview
            </Card.Title>
            <Card.Description className="text-xs text-[var(--muted)]">
              Scales automatically using Tailwind font-size classes
            </Card.Description>
          </Card.Header>

          <Card.Content className="p-4 pt-1 flex flex-col items-center gap-5">
            {/* Main Stage */}
            <div className="w-24 h-24 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--background)] shadow-inner transition-all duration-200">
              {iconComp ? (
                createElement(iconComp, { className: `${selectedSize} text-[var(--foreground)] transition-all` })
              ) : (
                <span className="text-xs text-[var(--muted)]">Icon not found</span>
              )}
            </div>

            {/* Tailwind Font Size Selector Buttons */}
            <div className="w-full">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] text-center mb-2">
                Tailwind Font-Size Utility
              </div>
              <div className="flex gap-1.5 flex-wrap justify-center">
                {TAILWIND_SIZES.map((item) => (
                  <Button
                    key={item.cls}
                    size="sm"
                    variant={selectedSize === item.cls ? "primary" : "outline"}
                    onPress={() => setSelectedSize(item.cls)}
                    className="h-7 px-2 text-xs font-mono"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Multi-size preview strip */}
            {iconComp && (
              <div className="flex items-end justify-center gap-4 pt-3 border-t border-[var(--border)] w-full opacity-80">
                {[
                  { cls: "text-[11px]", label: "11px" },
                  { cls: "text-sm",     label: "sm" },
                  { cls: "text-base",   label: "base" },
                  { cls: "text-xl",     label: "xl" },
                  { cls: "text-2xl",    label: "2xl" },
                  { cls: "text-3xl",    label: "3xl" },
                ].map((item) => (
                  <div
                    key={item.cls}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110"
                    onClick={() => setSelectedSize(item.cls)}
                    title={`Click to preview ${item.cls}`}
                  >
                    {createElement(iconComp, { className: `${item.cls} text-[var(--muted)] hover:text-[var(--foreground)]` })}
                    <span className="text-[10px] text-[var(--muted)] font-mono">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>

        <Separator className="opacity-40" />

        {/* Code Example using HeroUI Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Code Example
            </div>
            <Chip
              size="sm"
              variant="secondary"
              className="text-[11px] font-mono text-[var(--muted)] border border-[var(--border)]"
            >
              rare-icons v1.0.0
            </Chip>
          </div>

          <Tabs defaultSelectedKey="full" className="w-full">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Code formats" className="w-full grid grid-cols-2 mb-2">
                <Tabs.Tab id="full" className="text-xs">
                  Import + JSX
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="jsx-only" className="text-xs">
                  JSX Only
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="full">
              <div className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono text-xs overflow-x-auto leading-relaxed space-y-2 text-[var(--foreground)]">
                <div>
                  <span className="text-purple-400">import</span>
                  <span className="text-gray-300"> {"{ "}</span>
                  <span className="text-sky-400 font-medium">{icon.name}</span>
                  <span className="text-gray-300">{" }"}</span>
                  <span className="text-purple-400"> from</span>
                  <span className="text-emerald-400"> &quot;rare-icons&quot;</span>
                  <span className="text-gray-400">;</span>
                </div>
                <div>
                  <span className="text-gray-400">&lt;</span>
                  <span className="text-violet-400 font-semibold">{icon.name}</span>
                  <span className="text-sky-400"> className</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-emerald-400">&quot;{selectedSize} text-violet-500&quot;</span>
                  <span className="text-gray-400"> /&gt;</span>
                </div>
              </div>
            </Tabs.Panel>

            <Tabs.Panel id="jsx-only">
              <div className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--background)] font-mono text-xs overflow-x-auto leading-relaxed text-[var(--foreground)]">
                <span className="text-gray-400">&lt;</span>
                <span className="text-violet-400 font-semibold">{icon.name}</span>
                <span className="text-sky-400"> className</span>
                <span className="text-gray-400">=</span>
                <span className="text-emerald-400">&quot;{selectedSize} text-violet-500&quot;</span>
                <span className="text-gray-400"> /&gt;</span>
              </div>
            </Tabs.Panel>
          </Tabs>

          {/* Action Buttons using HeroUI Button + onPress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <Button
              variant="primary"
              size="md"
              onPress={handleCopyAll}
              className="w-full font-medium text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              {copiedAll ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  All Copied!
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy Import + JSX
                </>
              )}
            </Button>

            <Button
              variant="secondary"
              size="md"
              onPress={handleCopyComponentOnly}
              className="w-full font-medium text-xs flex items-center justify-center gap-2 border border-[var(--border)]"
            >
              {copiedComp ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  JSX Copied!
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  Copy JSX Only
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
