"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Button, Tooltip } from "@heroui/react";
import { Moon, Moon1, Sun1 } from "rare-icons";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  const applyThemeToDom = (t: Theme): "dark" | "light" => {
    const root = document.documentElement;
    let effective: "dark" | "light" = "dark";

    if (t === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      effective = prefersDark ? "dark" : "light";
    } else {
      effective = t;
    }

    // Switch class smoothly without stripping dark class to prevent light-theme flash
    if (effective === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    root.setAttribute("data-theme", effective);
    root.style.colorScheme = effective;

    return effective;
  };

  // On mount, sync React state with DOM
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rare-icons-theme") as Theme | null;
      const initialTheme = stored || "dark";
      let effective: "dark" | "light" = "dark";
      if (initialTheme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        effective = prefersDark ? "dark" : "light";
      } else {
        effective = initialTheme;
      }
      applyThemeToDom(initialTheme);
      queueMicrotask(() => {
        setThemeState(initialTheme);
        setResolvedTheme(effective);
      });
    } catch {
      applyThemeToDom("dark");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("rare-icons-theme", newTheme);
    } catch {}
    const effective = applyThemeToDom(newTheme);
    setResolvedTheme(effective);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip delay={150}>
      <Button
        variant="outline"
        size="sm"
        isIconOnly
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        onPress={toggleTheme}
        className={`bg-background-secondary  ${className ?? ""}`}
      >
        {isDark ? (
          <Sun1 className="w-4 h-4 text-warning" />
        ) : (
          <Moon1 className="w-4 h-4 text-accent" />
        )}
      </Button>
      <Tooltip.Content>
        {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Tooltip.Content>
    </Tooltip>
  );
}
