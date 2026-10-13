"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-provider";
import { Button } from "@heroui/react";
import { BrandLogo } from "@/components/brand-logo";

export default function Navbar() {
  const pathname = usePathname();
  const isIcons = pathname === "/icons" || pathname.startsWith("/icons");
  const isDocs = pathname.startsWith("/docs");

  return (
    <header className="sticky top-0 z-40 h-14 w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        {/* Left: Brand + Nav Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center no-underline transition-opacity hover:opacity-90"
            aria-label="Rare Icons Home"
          >
            <BrandLogo className="h-6 w-auto" />
          </Link>
          <div
            className="h-4 w-px bg-border shrink-0"
            role="separator"
            aria-orientation="vertical"
          />

          {/* Navigation links */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            <Button
              variant={isIcons ? "secondary" : "ghost"}
              size="sm"
              onClick={() => window.open("/icons", "_self")}
            >
              Icons
            </Button>
            <Button
              variant={isDocs ? "secondary" : "ghost"}
              size="sm"
              onClick={() => window.open("/docs", "_self")}
            >
              Docs
            </Button>
          </nav>
        </div>

        {/* Right: Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="rounded-full w-8 h-8" />
        </div>
      </div>
    </header>
  );
}
