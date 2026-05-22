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
      className="relative isolate min-h-screen w-full overflow-hidden bg-canvas dark:bg-canvas-dark"
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
                "max-w-[520px] text-heading-base dark:text-heading-base-dark",
                "text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] xl:text-[3.5rem]",
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
                "mt-8 max-w-[480px] text-base font-normal leading-[1_6] md:text-lg lg:mt-10",
                "text-sub-blue dark:text-sub-blue-dark"
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
                "relative mx-auto w-full max-w-[600px]",
                "h-[520px] sm:h-[540px] md:h-[560px]",
                "lg:mx-0 lg:ml-auto lg:max-w-[620px]"
              )}
            >
              {/* Top row */}
              <FloatingCard
                label="Billing"
                icon={<Receipt size={26} strokeWidth={2} />}
                bgColor="#2f43ff"
                textColor="#ffffff"
                rotation={6}
                width={300}
                height={80}
                fontSize={30}
                paddingLeft={32}
                shadow="0 14px 36px rgba(47, 67, 255, 0.2)"
                hoverShadow="0 22px 50px rgba(47, 67, 255, 0.45)"
                zIndex={5}
                floatDuration={7}
                floatOffset={5}
                entranceDelay={0.28}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="right-2 top-0"
              />

              <FloatingCard
                label="Matters"
                icon={<MattersIcon size={26} />}
                bgColor="#ea7a22"
                textColor="#ffffff"
                rotation={-6}
                width={280}
                height={76}
                fontSize={30}
                paddingLeft={32}
                shadow="0 14px 36px rgba(234, 122, 34, 0.22)"
                hoverShadow="0 22px 48px rgba(234, 122, 34, 0.45)"
                zIndex={3}
                floatDuration={8}
                floatOffset={4}
                entranceDelay={0.32}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="left-0 top-2"
              />

              {/* Middle — portal centered */}
              <PortalCard
                rotation={2}
                zIndex={4}
                width={320}
                height={92}
                entranceDelay={0.36}
                floatDuration={6.5}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="left-1/2 top-[38%] -translate-x-1/2"
              />

              {/* Bottom row — staggered so Tasks & Documents don't touch */}
              <FloatingCard
                label="Tasks"
                icon={<ListChecks size={24} strokeWidth={2} />}
                bgColor="#2c1f4d"
                textColor="#ff8c20"
                rotation={-4}
                width={280}
                height={76}
                fontSize={28}
                paddingLeft={28}
                shadow="0 14px 32px rgba(44, 31, 77, 0.25)"
                hoverShadow="0 20px 44px rgba(255, 140, 32, 0.25)"
                zIndex={2}
                floatDuration={5.5}
                floatOffset={4}
                entranceDelay={0.44}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="bottom-[108px] left-4"
              />

              <FloatingCard
                label="Documents"
                icon={<FileText size={26} strokeWidth={2} />}
                bgColor="#2c1f4d"
                textColor="#ff8c20"
                rotation={6}
                width={300}
                height={80}
                fontSize={30}
                paddingLeft={30}
                shadow="0 14px 32px rgba(44, 31, 77, 0.25)"
                hoverShadow="0 20px 44px rgba(255, 140, 32, 0.25)"
                zIndex={1}
                floatDuration={9}
                floatOffset={5}
                entranceDelay={0.5}
                parallaxX={smoothX}
                parallaxY={smoothY}
                className="bottom-4 right-2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
