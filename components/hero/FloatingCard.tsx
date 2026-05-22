"use client";

import { memo, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface FloatingCardProps {
  label: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  rotation: number;
  width: number;
  height: number;
  fontSize: number;
  shadow?: string;
  hoverShadow?: string;
  className?: string;
  zIndex?: number;
  floatDuration?: number;
  floatOffset?: number;
  entranceDelay?: number;
  paddingLeft?: number;
  iconGap?: number;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

function FloatingCardComponent({
  label,
  icon,
  bgColor,
  textColor,
  rotation,
  width,
  height,
  fontSize,
  shadow = "0 16px 36px -12px rgba(0,0,0,0.2)",
  hoverShadow,
  className,
  zIndex = 1,
  floatDuration = 6,
  floatOffset = 5,
  entranceDelay = 0,
  paddingLeft = 32,
  iconGap = 14,
  parallaxX,
  parallaxY,
}: FloatingCardProps) {
  const reducedMotion = useReducedMotion();
  const fallback = useMotionValue(0);
  const sx = parallaxX ?? fallback;
  const sy = parallaxY ?? fallback;
  const px = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const py = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const baseShadow = shadow;
  const activeHoverShadow = hoverShadow ?? shadow;

  return (
    <motion.div
      role="listitem"
      aria-label={label}
      style={{ zIndex, rotate: rotation, x: px, y: py }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: entranceDelay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={
        reducedMotion
          ? { zIndex: 30 }
          : {
              zIndex: 30,
              y: -10,
              scale: 1.05,
              rotate: 0,
              transition: { type: "spring", stiffness: 400, damping: 22 },
            }
      }
      className={cn(
        "absolute cursor-pointer gpu focus-within:outline-none",
        className
      )}
      tabIndex={0}
    >
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -floatOffset, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={
          reducedMotion
            ? {}
            : {
                boxShadow: activeHoverShadow,
                filter: "brightness(1.08)",
                transition: { duration: 0.25 },
              }
        }
        style={{
          width,
          height,
          backgroundColor: bgColor,
          color: textColor,
          boxShadow: baseShadow,
          paddingLeft,
          gap: iconGap,
        }}
        className={cn(
          "flex items-center rounded-[999px] font-semibold transition-[box-shadow,filter] duration-300",
          "dark:shadow-[0_18px_42px_rgba(0,0,0,0.55)]"
        )}
      >
        <span
          className="flex shrink-0 items-center justify-center"
          style={{ width: fontSize * 0.82, height: fontSize * 0.82 }}
          aria-hidden
        >
          {icon}
        </span>
        <span style={{ fontSize }} className="whitespace-nowrap pr-5">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export const FloatingCard = memo(FloatingCardComponent);
