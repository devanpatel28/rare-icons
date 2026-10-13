"use client";

import {
  AiBook,
  Rocket,
  Sparkles,
  Code,
  CommandLine,
  Flash,
  Colors,
  Security,
  Folders,
  Setting1,
  Sun1,
  Moon,
  Bot,
  ChatBot,
  MachineRobot,
  AlarmClock,
  BatteryCharging2,
  AddressBook,
  AddCircle,
  AddSquare,
  Acceleration,
  Compass,
  Global,
  Copy1,
  Search,
  Tick1,
  AdobePhotoshop,
  AdobeIllustrator,
} from "rare-icons";

interface FloatingIconConfig {
  Icon: React.ComponentType<{ className?: string }>;
  position: string;
  sizeClass: string;
  colorClass: string;
  animationClass: string;
  delayStyle: string;
  rotateClass: string;
  ariaLabel: string;
  hideOnMobile?: boolean;
}

const HERO_DECORATIONS: FloatingIconConfig[] = [
  // ──────────────────────────────────────────
  // ── FAR-LEFT WING (Desktop Viewport Edges)
  // ──────────────────────────────────────────
  {
    Icon: AiBook,
    position: "top-[8%] left-[2%] xl:left-[4%]",
    sizeClass: "w-8 h-8 lg:w-9 lg:h-9",
    colorClass: "text-accent/60 hover:text-accent",
    animationClass: "animate-hero-float-a",
    delayStyle: "0s",
    rotateClass: "-rotate-12",
    ariaLabel: "AiBook icon",
  },
  {
    Icon: Compass,
    position: "top-[24%] left-[1%] xl:left-[3%]",
    sizeClass: "w-6 h-6 lg:w-7 lg:h-7",
    colorClass: "text-sky-500/50 hover:text-sky-400",
    animationClass: "animate-hero-float-d",
    delayStyle: "1.8s",
    rotateClass: "rotate-6",
    ariaLabel: "Compass icon",
  },
  {
    Icon: Code,
    position: "top-[42%] left-[2%] xl:left-[4%]",
    sizeClass: "w-9 h-9 lg:w-10 lg:h-10",
    colorClass: "text-emerald-500/60 hover:text-emerald-400",
    animationClass: "animate-hero-float-b",
    delayStyle: "2.6s",
    rotateClass: "-rotate-6",
    ariaLabel: "Code icon",
  },
  {
    Icon: Folders,
    position: "top-[62%] left-[1.5%] xl:left-[3%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-muted/60 hover:text-foreground",
    animationClass: "animate-hero-float-c",
    delayStyle: "0.9s",
    rotateClass: "rotate-12",
    ariaLabel: "Folders icon",
  },
  {
    Icon: AdobePhotoshop,
    position: "top-[80%] left-[3%] xl:left-[5%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-sky-400/50 hover:text-sky-400",
    animationClass: "animate-hero-float-e",
    delayStyle: "3.4s",
    rotateClass: "-rotate-12",
    ariaLabel: "Photoshop icon",
  },

  // ──────────────────────────────────────────
  // ── MID-LEFT FLANK (Surrounding Left of Hero)
  // ──────────────────────────────────────────
  {
    Icon: Sparkles,
    position: "top-[14%] left-[10%] lg:left-[13%]",
    sizeClass: "w-6 h-6 lg:w-7 lg:h-7",
    colorClass: "text-violet-500/70 hover:text-violet-400",
    animationClass: "animate-hero-float-b",
    delayStyle: "1.2s",
    rotateClass: "rotate-12",
    ariaLabel: "Sparkles icon",
  },
  {
    Icon: Bot,
    position: "top-[32%] left-[8%] lg:left-[11%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-accent/50 hover:text-accent",
    animationClass: "animate-hero-float-a",
    delayStyle: "3.0s",
    rotateClass: "-rotate-6",
    ariaLabel: "Bot icon",
  },
  {
    Icon: CommandLine,
    position: "top-[50%] left-[9%] lg:left-[12%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-amber-500/60 hover:text-amber-400",
    animationClass: "animate-hero-float-d",
    delayStyle: "0.5s",
    rotateClass: "rotate-6",
    ariaLabel: "CommandLine icon",
  },
  {
    Icon: ChatBot,
    position: "top-[68%] left-[8%] lg:left-[11%]",
    sizeClass: "w-6 h-6 lg:w-7 lg:h-7",
    colorClass: "text-emerald-400/50 hover:text-emerald-300",
    animationClass: "animate-hero-float-e",
    delayStyle: "2.1s",
    rotateClass: "-rotate-12",
    ariaLabel: "ChatBot icon",
  },
  {
    Icon: BatteryCharging2,
    position: "top-[85%] left-[11%] lg:left-[14%]",
    sizeClass: "w-6 h-6 lg:w-7 lg:h-7",
    colorClass: "text-emerald-500/60 hover:text-emerald-400",
    animationClass: "animate-hero-float-c",
    delayStyle: "1.7s",
    rotateClass: "rotate-45",
    ariaLabel: "Battery icon",
  },

  // ──────────────────────────────────────────
  // ── INNER-LEFT CORNER ACCENTS (Near headline)
  // ──────────────────────────────────────────
  {
    Icon: AddressBook,
    position: "top-[20%] left-[20%] lg:left-[22%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-muted/40 hover:text-foreground",
    animationClass: "animate-hero-float-c",
    delayStyle: "2.8s",
    rotateClass: "rotate-6",
    ariaLabel: "AddressBook icon",
    hideOnMobile: true,
  },
  {
    Icon: AddCircle,
    position: "top-[76%] left-[19%] lg:left-[22%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-accent/40 hover:text-accent",
    animationClass: "animate-hero-float-a",
    delayStyle: "1.1s",
    rotateClass: "-rotate-6",
    ariaLabel: "AddCircle icon",
    hideOnMobile: true,
  },

  // ──────────────────────────────────────────
  // ── FAR-RIGHT WING (Desktop Viewport Edges)
  // ──────────────────────────────────────────
  {
    Icon: Rocket,
    position: "top-[8%] right-[2%] xl:right-[4%]",
    sizeClass: "w-8 h-8 lg:w-9 lg:h-9",
    colorClass: "text-accent/70 hover:text-accent",
    animationClass: "animate-hero-float-c",
    delayStyle: "0.6s",
    rotateClass: "rotate-12",
    ariaLabel: "Rocket icon",
  },
  {
    Icon: Flash,
    position: "top-[24%] right-[1%] xl:right-[3%]",
    sizeClass: "w-6 h-6 lg:w-7 lg:h-7",
    colorClass: "text-amber-400/70 hover:text-amber-300",
    animationClass: "animate-hero-float-a",
    delayStyle: "2.3s",
    rotateClass: "-rotate-12",
    ariaLabel: "Flash icon",
  },
  {
    Icon: Colors,
    position: "top-[42%] right-[2%] xl:right-[4%]",
    sizeClass: "w-9 h-9 lg:w-10 lg:h-10",
    colorClass: "text-sky-500/60 hover:text-sky-400",
    animationClass: "animate-hero-float-d",
    delayStyle: "1.4s",
    rotateClass: "rotate-12",
    ariaLabel: "Colors icon",
  },
  {
    Icon: Security,
    position: "top-[62%] right-[1.5%] xl:right-[3%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-indigo-500/60 hover:text-indigo-400",
    animationClass: "animate-hero-float-b",
    delayStyle: "3.7s",
    rotateClass: "-rotate-6",
    ariaLabel: "Security icon",
  },
  {
    Icon: AdobeIllustrator,
    position: "top-[80%] right-[3%] xl:right-[5%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-amber-500/50 hover:text-amber-400",
    animationClass: "animate-hero-float-e",
    delayStyle: "0.8s",
    rotateClass: "rotate-6",
    ariaLabel: "Illustrator icon",
  },

  // ──────────────────────────────────────────
  // ── MID-RIGHT FLANK (Surrounding Right of Hero)
  // ──────────────────────────────────────────
  {
    Icon: MachineRobot,
    position: "top-[14%] right-[10%] lg:right-[13%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-violet-500/60 hover:text-violet-400",
    animationClass: "animate-hero-float-e",
    delayStyle: "2.0s",
    rotateClass: "-rotate-6",
    ariaLabel: "MachineRobot icon",
  },
  {
    Icon: Global,
    position: "top-[32%] right-[8%] lg:right-[11%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-accent/60 hover:text-accent",
    animationClass: "animate-hero-float-b",
    delayStyle: "0.3s",
    rotateClass: "rotate-12",
    ariaLabel: "Global icon",
  },
  {
    Icon: Setting1,
    position: "top-[50%] right-[9%] lg:right-[12%]",
    sizeClass: "w-7 h-7 lg:w-8 lg:h-8",
    colorClass: "text-muted/60 hover:text-foreground",
    animationClass: "animate-hero-float-a",
    delayStyle: "3.1s",
    rotateClass: "-rotate-12",
    ariaLabel: "Setting1 icon",
  },
  {
    Icon: AlarmClock,
    position: "top-[68%] right-[8%] lg:right-[11%]",
    sizeClass: "w-6 h-6 lg:w-7 lg:h-7",
    colorClass: "text-rose-400/50 hover:text-rose-400",
    animationClass: "animate-hero-float-d",
    delayStyle: "1.9s",
    rotateClass: "rotate-6",
    ariaLabel: "AlarmClock icon",
  },
  {
    Icon: Acceleration,
    position: "top-[85%] right-[11%] lg:right-[14%]",
    sizeClass: "w-6 h-6 lg:w-7 lg:h-7",
    colorClass: "text-amber-500/60 hover:text-amber-400",
    animationClass: "animate-hero-float-c",
    delayStyle: "2.5s",
    rotateClass: "-rotate-6",
    ariaLabel: "Acceleration icon",
  },

  // ──────────────────────────────────────────
  // ── INNER-RIGHT CORNER ACCENTS (Near headline)
  // ──────────────────────────────────────────
  {
    Icon: AddSquare,
    position: "top-[20%] right-[20%] lg:right-[22%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-muted/40 hover:text-foreground",
    animationClass: "animate-hero-float-a",
    delayStyle: "3.3s",
    rotateClass: "-rotate-6",
    ariaLabel: "AddSquare icon",
    hideOnMobile: true,
  },
  {
    Icon: Tick1,
    position: "top-[76%] right-[19%] lg:right-[22%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-emerald-500/50 hover:text-emerald-400",
    animationClass: "animate-hero-float-b",
    delayStyle: "1.4s",
    rotateClass: "rotate-6",
    ariaLabel: "Tick1 icon",
    hideOnMobile: true,
  },

  // ──────────────────────────────────────────
  // ── TOP & BOTTOM AMBIENT ACCENTS (Subtle)
  // ──────────────────────────────────────────
  {
    Icon: Sun1,
    position: "top-[4%] left-[28%] md:left-[32%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-amber-400/40 hover:text-amber-400",
    animationClass: "animate-hero-float-a",
    delayStyle: "1.5s",
    rotateClass: "rotate-45",
    ariaLabel: "Sun1 icon",
    hideOnMobile: true,
  },
  {
    Icon: Moon,
    position: "top-[4%] right-[28%] md:right-[32%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-violet-400/40 hover:text-violet-400",
    animationClass: "animate-hero-float-b",
    delayStyle: "0.7s",
    rotateClass: "-rotate-12",
    ariaLabel: "Moon icon",
    hideOnMobile: true,
  },
  {
    Icon: Copy1,
    position: "bottom-[5%] left-[30%] md:left-[34%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-muted/30 hover:text-foreground",
    animationClass: "animate-hero-float-d",
    delayStyle: "2.2s",
    rotateClass: "-rotate-6",
    ariaLabel: "Copy1 icon",
    hideOnMobile: true,
  },
  {
    Icon: Search,
    position: "bottom-[5%] right-[30%] md:right-[34%]",
    sizeClass: "w-5 h-5 lg:w-6 lg:h-6",
    colorClass: "text-accent/30 hover:text-accent",
    animationClass: "animate-hero-float-e",
    delayStyle: "1.1s",
    rotateClass: "rotate-12",
    ariaLabel: "Search icon",
    hideOnMobile: true,
  },
];

export default function HeroDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      {HERO_DECORATIONS.map((item, idx) => {
        const IconComponent = item.Icon;

        return (
          <div
            key={idx}
            style={{ animationDelay: item.delayStyle }}
            className={`absolute ${item.position} ${item.animationClass} ${
              item.hideOnMobile ? "hidden md:block" : "hidden sm:block"
            }`}
          >
            <div
              className={`pointer-events-auto transition-all duration-300 ease-out hover:scale-135 hover:rotate-12 hover:opacity-100 hover:text-accent active:scale-95 cursor-pointer ${item.rotateClass} ${item.colorClass}`}
              title={item.ariaLabel}
            >
              <IconComponent className={`${item.sizeClass} drop-shadow-xs transition-colors`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
