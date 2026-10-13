"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

interface PagerLink {
  title: string;
  href: string;
}

interface DocsPagerProps {
  prev?: PagerLink;
  next?: PagerLink;
}

export default function DocsPager({ prev, next }: DocsPagerProps) {
  if (!prev && !next) return null;

  return (
    <div className="not-prose pt-8 mt-12 border-t border-border flex flex-col sm:flex-row items-stretch justify-between gap-4">
      {prev ? (
        <Link href={prev.href} className="no-underline group flex-1">
          <div className="p-4 rounded-2xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all flex flex-col gap-1">
            <span className="text-2xs uppercase tracking-wider text-muted font-bold flex items-center gap-1.5">
              <span>←</span>
              <span>Previous</span>
            </span>
            <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex-1 hidden sm:block" />
      )}

      {next ? (
        <Link href={next.href} className="no-underline group flex-1">
          <div className="p-4 rounded-2xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-secondary transition-all flex flex-col gap-1 text-right">
            <span className="text-2xs uppercase tracking-wider text-muted font-bold flex items-center justify-end gap-1.5">
              <span>Next</span>
              <span>→</span>
            </span>
            <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              {next.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex-1 hidden sm:block" />
      )}
    </div>
  );
}
