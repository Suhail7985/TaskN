"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Left-side background strips (3) — reference layout */
const leftStrips = [
  { width: 280, top: 170, left: -120, delay: 0 },
  { width: 340, top: 470, left: -140, delay: 0.06 },
  { width: 520, top: 760, left: -170, delay: 0.12 },
] as const;

/** Right-side background strips (3) — reference layout */
const rightStrips = [
  { width: 620, top: 40, right: -180, delay: 0.03 },
  { width: 520, top: 260, right: -140, delay: 0.09 },
  { width: 500, top: 420, right: -120, delay: 0.15 },
] as const;

const stripBase = cn(
  "absolute h-[110px] rounded-full",
  "bg-[#dfe5ff] opacity-[0.55]",
  "dark:bg-[#2a2d47] dark:opacity-80"
);

export function BackgroundCapsules() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {leftStrips.map((strip, i) => (
        <motion.div
          key={`left-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: strip.delay, ease: "easeOut" }}
          className={stripBase}
          style={{
            width: strip.width,
            top: strip.top,
            left: strip.left,
          }}
        />
      ))}

      {rightStrips.map((strip, i) => (
        <motion.div
          key={`right-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: strip.delay, ease: "easeOut" }}
          className={stripBase}
          style={{
            width: strip.width,
            top: strip.top,
            right: strip.right,
          }}
        />
      ))}
    </div>
  );
}
