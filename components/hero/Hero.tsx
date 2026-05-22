"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Receipt, ListChecks, FileText } from "lucide-react";
import { BackgroundCapsules } from "./BackgroundCapsules";
import { FloatingCard } from "./FloatingCard";
import { PortalCard } from "./PortalCard";
import { MattersIcon } from "./MattersIcon";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 24 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = sceneRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      className="relative isolate min-h-screen w-full overflow-hidden bg-canvas transition-colors duration-300 dark:bg-canvas-dark"
      aria-labelledby="hero-heading"
    >
      <ThemeToggle />
      <BackgroundCapsules />

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] items-center",
          "px-6 md:px-10 lg:px-14 xl:px-16"
        )}
      >
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:gap-10">
          <div className="w-full shrink-0 lg:w-[52%]">
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "max-w-[460px] text-heading-base transition-colors duration-300 dark:text-heading-base-dark",
                "text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem]",
                "leading-[0_95] tracking-[-0_05em]"
              )}
            >
              <span className="block font-light">A single platform to</span>
              <span className="block font-light">
                <span className="font-bold">manage</span> every part of
              </span>
              <span className="block font-light">
                your <span className="font-bold">legal work</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              className={cn(
                "mt-6 max-w-[420px] text-sm font-normal leading-[1_6] md:text-base lg:mt-8",
                "text-sub-blue transition-colors duration-300 dark:text-sub-blue-dark"
              )}
            >
              Track matters, coordinate schedules, manage clients, centralize
              documents, and handle communication - all in one system.
            </motion.p>
          </div>

          {/* Separated floating cards — no overlap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="relative w-full lg:w-[48%]"
            role="list"
            aria-label="Platform features"
          >
            <div
              ref={sceneRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className={cn(
                "relative mx-auto w-full max-w-[500px]",
                "h-[420px] sm:h-[440px] md:h-[460px]",
                "translate-x-5 translate-y-6 sm:translate-x-6 sm:translate-y-7",
                "lg:mx-0 lg:ml-2 lg:mr-auto lg:max-w-[520px]"
              )}
            >
              {/* Top row */}
              <FloatingCard
                label="Billing"
                icon={<Receipt size={22} strokeWidth={2} />}
                bgColor="#2f43ff"
                textColor="#ffffff"
                rotation={6}
                width={250}
                height={64}
                fontSize={24}
                paddingLeft={28}
                shadow="0 14px 36px rgba(47, 67, 255, 0.2)"
                hoverShadow="0 22px 50px rgba(47, 67, 255, 0.45)"
                zIndex={5}
                floatDuration={7}
                floatOffset={5}
                entranceDelay={0.28}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="left-[28%] top-8"
              />

              <FloatingCard
                label="Matters"
                icon={<MattersIcon size={22} />}
                bgColor="#ea7a22"
                textColor="#ffffff"
                rotation={-6}
                width={230}
                height={62}
                fontSize={24}
                paddingLeft={28}
                shadow="0 14px 36px rgba(234, 122, 34, 0.22)"
                hoverShadow="0 22px 48px rgba(234, 122, 34, 0.45)"
                zIndex={3}
                floatDuration={8}
                floatOffset={4}
                entranceDelay={0.32}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="left-3 top-[30%] sm:top-[31%] lg:top-[32%]"
              />

              {/* Middle — portal centered */}
              <PortalCard
                rotation={2}
                zIndex={4}
                width={270}
                height={78}
                entranceDelay={0.36}
                floatDuration={6.5}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="left-1/2 top-[38%] -translate-x-1/2"
              />

              {/* Bottom row — staggered so Tasks & Documents don't touch */}
              <FloatingCard
                label="Tasks"
                icon={<ListChecks size={20} strokeWidth={2} />}
                bgColor="#2c1f4d"
                textColor="#ff8c20"
                rotation={-4}
                width={230}
                height={62}
                fontSize={22}
                paddingLeft={24}
                shadow="0 14px 32px rgba(44, 31, 77, 0.25)"
                hoverShadow="0 20px 44px rgba(255, 140, 32, 0.25)"
                zIndex={2}
                floatDuration={5.5}
                floatOffset={4}
                entranceDelay={0.44}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="bottom-[88px] left-4"
              />

              <FloatingCard
                label="Documents"
                icon={<FileText size={22} strokeWidth={2} />}
                bgColor="#2c1f4d"
                textColor="#ff8c20"
                rotation={8}
                width={268}
                height={64}
                fontSize={24}
                paddingLeft={26}
                shadow="0 14px 32px rgba(44, 31, 77, 0.25)"
                hoverShadow="0 20px 44px rgba(255, 140, 32, 0.25)"
                zIndex={1}
                floatDuration={9}
                floatOffset={5}
                entranceDelay={0.5}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="bottom-2 left-[49%]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
