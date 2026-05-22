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
        className="fixed right-6 top-6 z-50 h-11 w-11 rounded-full border border-[#d8dcf0] bg-white"
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
        "fixed right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full",
        "border transition-all duration-300 hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sub-blue focus-visible:ring-offset-2",
        "border-[#d0d6f0] bg-white shadow-[0_4px_22px_rgba(74,84,255,0.22)]",
        "dark:border-[#5c5a78] dark:bg-[#1e1d2e] dark:shadow-[0_4px_28px_rgba(154,163,255,0.4)]",
        "dark:ring-offset-canvas-dark"
      )}
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 text-[#e86a10] transition-all duration-300",
          isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 text-[#4a54ff] transition-all duration-300",
          "dark:text-[#9aa3ff]",
          isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        aria-hidden
      />
    </button>
  );
}
