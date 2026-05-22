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
        className="fixed right-6 top-6 z-50 h-10 w-10 rounded-full bg-white/80"
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
        "fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full",
        "bg-white/90 shadow-sm transition-transform hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sub-blue focus-visible:ring-offset-2",
        "dark:bg-[#2a2840] dark:ring-offset-canvas-dark"
      )}
    >
      <Sun
        className={cn(
          "absolute h-[18px] w-[18px] text-[#ea7a22] transition-all",
          isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] text-sub-blue transition-all dark:text-sub-blue-dark",
          isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        aria-hidden
      />
    </button>
  );
}
