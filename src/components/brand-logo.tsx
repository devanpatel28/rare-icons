"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/theme/theme-provider";

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

/**
 * BrandLogo component that renders ONLY ONE active logo at any time:
 * - LOGO_BLACK.svg when light theme is active (dark text for light background)
 * - LOGO_WHITE.svg when dark theme is active (white text for dark background)
 * - Uses mounted state to guarantee 100% hydration matching with SSR (0 console errors).
 */
export function BrandLogo({ className = "h-5 w-auto", priority = true }: BrandLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and the initial client hydration pass, always render default dark logo
  // Once mounted, synchronously adapt to the client's resolvedTheme
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const logoSrc = isDark ? "/LOGO_WHITE.svg" : "/LOGO_BLACK.svg";

  return (
    <div className={`relative inline-flex items-center shrink-0 select-none ${className}`}>
      <Image
        key={mounted ? logoSrc : "initial"}
        src={logoSrc}
        alt="Rare Icons"
        width={1325}
        height={225}
        priority={priority}
        unoptimized
        suppressHydrationWarning
        className="h-full w-auto object-contain transition-opacity duration-200"
      />
    </div>
  );
}

export default BrandLogo;
