"use client";

import { useState } from "react";
import DocsSidebar from "./docs-sidebar";
import DocsMobileDrawer from "./docs-mobile-drawer";
import { Button } from "@heroui/react";

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-1">
      {/* Desktop Sidebar (matching CategorySidebar: hidden lg:flex rounded-2xl w-60 h-[85vh] sticky top-[9vh] bg-surface) */}
      <DocsSidebar />

      {/* Mobile Drawer */}
      <DocsMobileDrawer isOpen={mobileOpen} onOpenChange={setMobileOpen} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Navigation Trigger bar (< lg) */}
        <div className="lg:hidden px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between border-b border-border bg-background">
          <Button
            variant="secondary"
            size="sm"
            onPress={() => setMobileOpen(true)}
            className="rounded-xl text-xs font-medium gap-2"
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
            <span>Documentation Menu</span>
          </Button>

          <span className="text-2xs font-mono text-muted uppercase">v1.0.0</span>
        </div>

        <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8 max-w-4xl w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
