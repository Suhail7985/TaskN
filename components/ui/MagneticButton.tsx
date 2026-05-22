"use client";

import { memo, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface MagneticButtonProps
  extends Pick<
    HTMLMotionProps<"button">,
    "children" | "className" | "disabled" | "type" | "onClick" | "aria-label"
  > {
  variant?: "primary" | "secondary";
}

function MagneticButtonComponent({
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary: cn(
      "bg-ink-emphasis text-white dark:bg-white dark:text-ink-emphasis",
      "shadow-[0_4px_24px_-4px_rgba(26_29_46_0.35)]",
      "hover:shadow-glow dark:hover:shadow-[0_0_40px_-8px_rgba(255_255_255_0.25)]",
      "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
    ),
    secondary: cn(
      "bg-white/80 text-ink-emphasis backdrop-blur-sm",
      "border border-ink-emphasis/10 dark:bg-white/10 dark:text-ink-dark-emphasis dark:border-white/15",
      "hover:border-brand-blue/30 hover:shadow-pill dark:hover:shadow-glow"
    ),
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reducedMotion ? {} : { scale: 1.03, y: -2 }}
      whileTap={reducedMotion ? {} : { scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5",
        "text-sm font-semibold tracking-tight transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
        "dark:focus-visible:ring-offset-canvas-dark",
        variants[variant],
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export const MagneticButton = memo(MagneticButtonComponent);
