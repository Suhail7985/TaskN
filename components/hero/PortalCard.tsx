"use client";

import { memo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface PortalCardProps {
  className?: string;
  rotation?: number;
  zIndex?: number;
  entranceDelay?: number;
  floatDuration?: number;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
  width?: number;
  height?: number;
}

function PortalCardComponent({
  className,
  rotation = 3,
  zIndex = 4,
  entranceDelay = 0.2,
  floatDuration = 7,
  parallaxX,
  parallaxY,
  width = 320,
  height = 92,
}: PortalCardProps) {
  const reducedMotion = useReducedMotion();
  const fallback = useMotionValue(0);
  const sx = parallaxX ?? fallback;
  const sy = parallaxY ?? fallback;
  const px = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const py = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const avatar = Math.round(height * 0.58);

  return (
    <motion.article
      aria-label="Client portal message from John Doe"
      style={{
        zIndex,
        rotate: rotation,
        x: px,
        y: py,
        boxShadow: "0 14px 32px -12px rgba(55, 45, 91, 0.14)",
      }}
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
        animate={reducedMotion ? {} : { y: [0, -5, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={
          reducedMotion
            ? {}
            : {
                boxShadow: "0 20px 48px -10px rgba(168, 168, 239, 0.45)",
                filter: "brightness(1.06)",
                transition: { duration: 0.25 },
              }
        }
        style={{ width, height }}
        className={cn(
          "relative flex items-center rounded-[999px] bg-[#a8a8ef] pl-3 pr-4",
          "transition-[box-shadow,filter] duration-300",
          "dark:bg-[#4a4878]"
        )}
      >
        <div
          className="absolute left-3 top-1/2 w-[3px] -translate-y-1/2 rounded-full bg-[#ea7a22]"
          style={{ height: height - 20 }}
          aria-hidden
        />

        <div
          className="relative z-[1] ml-3 flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5c4ad]"
          style={{ width: avatar, height: avatar }}
          role="img"
          aria-label="John Doe avatar"
        >
          <span
            className="leading-none"
            style={{ fontSize: avatar * 0.52 }}
            aria-hidden
          >
            👨🏻
          </span>
        </div>

        <div className="min-w-0 flex-1 pl-2.5 pr-1">
          <h3 className="truncate text-[15px] font-bold leading-tight text-[#352c5a] dark:text-[#e8e4f8]">
            John Doe - Portal
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-[#5b5480] dark:text-[#b8b2d0]">
            Hey! Could you please review a document for me?
          </p>
          <p className="mt-0.5 text-[11px] text-[#7c75a5] dark:text-[#9490b0]">
            MAT-2233 - 2 h ago
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export const PortalCard = memo(PortalCardComponent);
