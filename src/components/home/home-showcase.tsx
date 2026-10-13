"use client";

import { useState, useCallback, createElement, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Kbd, SearchField, Tooltip, toast } from "@heroui/react";
import { getIcon } from "@/data/icon-registry";
import { Copy1, Search, Tick1 } from "rare-icons";

// ── Hero Install Pill ──
export function HeroInstallPill() {
  const [copied, setCopied] = useState(false);
  const command = "npm install rare-icons";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("Copied to clipboard!", {
        description: command,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full  bg-surface shadow-sm font-mono text-xs">
      <span className="text-emerald-500 font-bold select-none">$</span>
      <span className="text-foreground select-all font-mono font-medium">
        {command}
      </span>
      <Tooltip delay={150}>
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          onPress={handleCopy}
          aria-label="Copy install command"
          className="w-7 h-7 rounded-xl text-muted hover:text-foreground hover:bg-surface-secondary shrink-0"
        >
          {copied ? (
            <Tick1 className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy1 className="w-3.5 h-3.5" />
          )}
        </Button>
        <Tooltip.Content showArrow placement="top">
          <Tooltip.Arrow />
          {copied ? "Copied!" : "Copy command"}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

// ── Hero Search Bar (HeroUI v3 SearchField) ──
export function HeroSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed) {
        router.push(`/icons?q=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/icons");
      }
    },
    [router],
  );

  // Global hotkey: Cmd+K / Ctrl+K to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <SearchField
        aria-label="Search 3,700+ icons"
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        variant="primary"
        fullWidth
        className="w-full flex flex-row"
      >
        <SearchField.Group >
          <SearchField.SearchIcon className="shrink-0 mr-2 text-muted">
            <Search className="w-4 h-4" />
          </SearchField.SearchIcon>
          <SearchField.Input
            ref={inputRef}
            id="hero-search-input"
            placeholder="Search 3,700+ icons (e.g. arrow, ai, sun, user, settings)..."
            className="flex-1 bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted pr-2 min-w-0"
          />
         
       
        </SearchField.Group>
           {/* <Button
            variant="primary"
            onPress={() => handleSearch(query)}
            className="ml-1.5"
          >
            Search
          </Button> */}
      </SearchField>
    </div>
  );
}

// ── Interactive Icon Showcase Playground ──
const SHOWCASE_ICONS = [
  "AiBook",
  "Sun1",
  "Moon",
  "Bot",
  "ChatBot",
  "MachineRobot",
  "AlarmClock",
  "BatteryCharging2",
  "Setting1",
  "Folders",
  "AddressBook",
  "AddCircle",
  "AddSquare",
  "AdobePhotoshop",
  "AdobeIllustrator",
  "Acceleration",
  "Flash",
  "Colors",
  "Rocket",
  "Sparkles",
  "Security",
  "Code",
  "CommandLine",
  "Copy1",
];

const PREVIEW_SIZES = [
  { label: "16px", cls: "text-base", px: 16 },
  { label: "24px", cls: "text-2xl", px: 24 },
  { label: "32px", cls: "text-3xl", px: 32 },
  { label: "40px", cls: "text-4xl", px: 40 },
];

const PREVIEW_COLORS = [
  {
    label: "Default",
    textCls: "text-foreground",
    activeCls: "bg-default-soft text-default-soft-foreground",
  },
  {
    label: "Accent",
    textCls: "text-accent",
    activeCls: "bg-accent-soft text-accent-soft-foreground",
  },
  {
    label: "Success",
    textCls: "text-success",
    activeCls: "bg-success-soft text-success-soft-foreground",
  },
  {
    label: "Warning",
    textCls: "text-warning",
    activeCls: "bg-warning-soft text-warning-soft-foreground",
  },
  {
    label: "Danger",
    textCls: "text-danger",
    activeCls: "bg-danger-soft text-danger-soft-foreground",
  },
];

export function InteractiveIconPlayground() {
  const [selectedName, setSelectedName] = useState("AiBook");
  const [sizeIdx, setSizeIdx] = useState(1); // default 24px
  const [colorIdx, setColorIdx] = useState(1); // default accent
  const [copied, setCopied] = useState(false);

  const selectedSize = PREVIEW_SIZES[sizeIdx];
  const selectedColor = PREVIEW_COLORS[colorIdx];
  const IconComp = getIcon(selectedName);

  const codeSnippet = `<${selectedName} className="${selectedSize.cls} ${selectedColor.textCls}" />`;
  const importSnippet = `import { ${selectedName} } from "rare-icons";`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(`${importSnippet}\n\n${codeSnippet}`);
      setCopied(true);
      toast.success(`Copied <${selectedName} /> snippet!`, {
        description: codeSnippet,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>

          <h3 className="text-xl font-bold text-foreground mt-1">
            Live Icon Playground
          </h3>
          <p className="text-xs text-muted">
            Click any icon to test sizes, dynamic colors, and copy
            ready-to-paste JSX
          </p>
        </div>

        <Link
          href="/icons"
          className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto no-underline"
        >
          <span>Explore all 3,700+ in catalog</span>
        </Link>
      </div>

      {/* Grid of showcase icons */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2.5">
        {SHOWCASE_ICONS.map((name) => {
          const Comp = getIcon(name);
          const isSelected = selectedName === name;
          return (
            <Tooltip key={name} delay={100}>
              <button
                type="button"
                onClick={() => setSelectedName(name)}
                className={`group relative flex items-center justify-center aspect-square rounded-2xl transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? " bg-accent/10"
                    : " bg-background-secondary"
                }`}
              >
                <span
                  className={`text-2xl transition-transform duration-150 group-hover:scale-115 ${
                    isSelected
                      ? "text-accent scale-110"
                      : "text-foreground group-hover:text-accent"
                  }`}
                >
                  {Comp ? createElement(Comp) : null}
                </span>
              </button>
              <Tooltip.Content showArrow placement="top">
                <Tooltip.Arrow />
                <span>{name}</span>
              </Tooltip.Content>
            </Tooltip>
          );
        })}
      </div>

      {/* Interactive Controls & Live Code Output */}
      <div className="rounded-2xl  bg-background-secondary p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left: Active Icon Stage */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-16 h-16 rounded-2xl border border-border bg-surface flex items-center justify-center shrink-0 shadow-inner">
            {IconComp
              ? createElement(IconComp, {
                  className: `${selectedSize.cls} ${selectedColor.textCls} transition-all duration-150`,
                })
              : null}
          </div>

          <div>
            <div className="text-sm font-bold text-foreground">
              &lt;{selectedName} /&gt;
            </div>
            <div className="text-xs text-muted font-mono mt-0.5">
              rare-icons/{selectedName}
            </div>
          </div>
        </div>

        {/* Center: Controls (Sizes & Colors) */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-start md:justify-center">
          {/* Size picker */}
          <div className="flex items-center rounded-full border bg-surface p-1 gap-1">
            {PREVIEW_SIZES.map((size, idx) => (
              <button
                key={size.label}
                type="button"
                onClick={() => setSizeIdx(idx)}
                className={`px-2 py-1 text-xs rounded-full transition-colors font-medium duration-200 cursor-pointer ${
                  sizeIdx === idx
                    ? "bg-accent-soft text-accent-soft-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>

          {/* Color picker */}
          <div className="flex items-center rounded-full border border-border bg-surface p-1 gap-1">
            {PREVIEW_COLORS.map((col, idx) => (
              <button
                key={col.label}
                type="button"
                onClick={() => setColorIdx(idx)}
                className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors cursor-pointer ${
                  colorIdx === idx
                    ? col.activeCls
                    : "text-muted hover:text-foreground"
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>
        </div>

      
      </div>
    </div>
  );
}
