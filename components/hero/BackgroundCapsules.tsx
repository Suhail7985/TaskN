"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CapsuleSide = "left" | "right";

type CapsuleConfig = {
  id: string;
  width: number;
  height: number;
  left?: number;
  right?: number;
  top?: number;
  delay: number;
};

const CAPSULE_HEIGHT = 72;

/** Left — thinner strips, even spacing */
const LEFT_GAP = 20;
const LEFT_START_TOP = 260;
const LEFT_LEFT = -80;

const leftCapsuleWidths = [220, 300, 340] as const;

/** First left strip only — nudged northeast (up + slightly right) */
const LEFT_FIRST_TOP = 228;
const LEFT_FIRST_LEFT = -52;

const leftCapsules: CapsuleConfig[] = leftCapsuleWidths.map((width, i) => ({
  id: `left-${i + 1}`,
  width,
  height: CAPSULE_HEIGHT,
  top:
    i === 0
      ? LEFT_FIRST_TOP
      : LEFT_START_TOP + i * (CAPSULE_HEIGHT + LEFT_GAP),
  left: i === 0 ? LEFT_FIRST_LEFT : LEFT_LEFT,
  delay: i * 0.05,
}));

/** Right — longer strips, offset so they stay beside (not under) cards */
const RIGHT_GAP = 20;
const RIGHT_START_TOP = 100;
const RIGHT_OFFSETS = [-140, -200, -140] as const;

const rightCapsuleWidths = [280, 360, 280] as const;

const rightCapsules: CapsuleConfig[] = rightCapsuleWidths.map((width, i) => ({
  id: `right-${i + 1}`,
  width,
  height: CAPSULE_HEIGHT,
  top: RIGHT_START_TOP + i * (CAPSULE_HEIGHT + RIGHT_GAP),
  right: RIGHT_OFFSETS[i],
  delay: 0.03 + i * 0.05,
}));

const capsuleClass = cn(
  "pointer-events-none absolute z-0 rounded-full transition-colors duration-300",
  "bg-blob-capsule opacity-90",
  "dark:bg-blob-capsule-dark dark:opacity-95"
);

function Capsule({
  cap,
  side,
}: {
  cap: CapsuleConfig;
  side: CapsuleSide;
}) {
  const positionStyle =
    side === "left"
      ? {
          width: cap.width,
          height: cap.height,
          left: cap.left,
          top: cap.top,
        }
      : {
          width: cap.width,
          height: cap.height,
          top: cap.top,
          right: cap.right,
        };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: cap.delay, ease: "easeOut" }}
      className={capsuleClass}
      style={positionStyle}
    />
  );
}

export function BackgroundCapsules() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-screen overflow-hidden"
      aria-hidden
    >
      {leftCapsules.map((cap) => (
        <Capsule key={cap.id} cap={cap} side="left" />
      ))}
      {rightCapsules.map((cap) => (
        <Capsule key={cap.id} cap={cap} side="right" />
      ))}
    </div>
  );
}
