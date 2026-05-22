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
  rotate?: number;
  delay: number;
};

const CAPSULE_HEIGHT = 72;

/** Left strips — 1st tilted NE, 2nd large at “manage”, 3rd at subtext */
const leftCapsuleConfigs = [
  { width: 200, top: 178, left: -58, rotate: -8 },
  { width: 300, top: 318, left: -88, rotate: 0 },
  { width: 340, top: 438, left: -72, rotate: 0 },
] as const;

const leftCapsules: CapsuleConfig[] = leftCapsuleConfigs.map((cfg, i) => ({
  id: `left-${i + 1}`,
  width: cfg.width,
  height: CAPSULE_HEIGHT,
  top: cfg.top,
  left: cfg.left,
  rotate: cfg.rotate,
  delay: i * 0.05,
}));

/** Right — long edge strips */
const RIGHT_GAP = 20;
const RIGHT_START_TOP = 108;
const RIGHT_OFFSETS = [-120, -180, -120] as const;
const rightCapsuleWidths = [300, 380, 300] as const;

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
  "bg-blob-capsule/80",
  "dark:bg-blob-capsule-dark/90"
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
          transform: cap.rotate ? `rotate(${cap.rotate}deg)` : undefined,
          transformOrigin: "left center",
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
