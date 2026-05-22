"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const handler = () => setEnabled(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || !enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reducedMotion, enabled, x, y]);

  if (reducedMotion || !enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ x: springX, y: springY }}
    >
      <div
        className="absolute -left-[200px] -top-[200px] h-[400px] w-[400px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
