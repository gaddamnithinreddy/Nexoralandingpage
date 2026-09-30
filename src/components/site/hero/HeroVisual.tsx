import { useEffect, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import type { HeroState } from "./states";

interface HeroVisualProps {
  state: HeroState;
  scrollY: MotionValue<number>;
}

const CHIP_POS = [
  "left-[4%] top-[26%] md:left-[2%] md:top-[30%]",
  "right-[4%] top-[12%] md:right-[0%] md:top-[22%]",
  "right-[10%] bottom-[14%] md:right-[4%] md:bottom-[22%]",
];

/** The robot, its floating status chips and mouse-follow tilt. */
export function HeroVisual({ state, scrollY }: HeroVisualProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const lift = useTransform(scrollY, [0, 600], [0, -80]);

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <motion.div style={{ y: lift }} className="pointer-events-none relative h-full w-full" onMouseMove={stop}>
      {/* glow */}
      <div className="absolute left-1/2 top-[55%] h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px]" />

      <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} className="relative h-full w-full">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={state.image}
            src={state.image}
            alt={state.title}
            initial={{ opacity: 0, scale: 0.86, y: 40, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.06, y: -20, filter: "blur(14px)" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0 m-auto h-full w-full animate-float-y object-contain drop-shadow-[0_40px_60px_hsl(var(--foreground)/0.25)]"
          />
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={state.key} className="absolute inset-0">
          {state.chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease: EASE }}
              className={
                "absolute hidden items-center gap-2 whitespace-nowrap rounded-full border border-card/60 bg-card/70 px-3.5 py-2 font-mono text-[11px] tracking-wide text-foreground shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.45)] backdrop-blur-md sm:flex " +
                CHIP_POS[i]
              }
            >
              <span className={"h-1.5 w-1.5 rounded-full " + (i === 1 ? "bg-primary" : "bg-foreground/60")} />
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
