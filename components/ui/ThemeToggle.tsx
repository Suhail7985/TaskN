"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-full border border-ink-emphasis/10 bg-white/60 dark:border-white/10 dark:bg-white/5"
        disabled
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center rounded-full",
        "border border-ink-emphasis/10 bg-white/70 backdrop-blur-md",
        "transition-all duration-300 hover:scale-105 hover:shadow-pill",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
        "dark:border-white/15 dark:bg-white/10 dark:hover:shadow-glow"
      )}
    >
      <Sun
        className={cn(
          "absolute h-[18px] w-[18px] text-brand-orange transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] text-brand-blue transition-all duration-300 dark:text-blue-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        )}
        aria-hidden
      />
    </button>
  );
}
