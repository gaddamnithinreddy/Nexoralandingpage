import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Star } from "lucide-react";
import { EASE } from "@/components/motion/Reveal";
import { scrollToId } from "@/hooks/use-lenis";
import { INTRO_DELAY } from "../timing";
import { HERO_STATES, type HeroKey } from "./states";
import { HeroHeadline } from "./HeroHeadline";
import { HeroVisual } from "./HeroVisual";
import { HeroInfo } from "./HeroInfo";
import { HeroSwitcher, CYCLE_MS } from "./HeroSwitcher";
import { SpinRing } from "./SpinRing";

function LiveCard() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {HERO_STATES.slice(1).map((s) => (
          <span key={s.key} className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border-2 border-background bg-panel">
            <img src={s.image} alt="" className="h-[130%] w-[130%] object-contain" />
          </span>
        ))}
        <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-background bg-secondary text-sm text-secondary-foreground">+</span>
      </div>
      <div className="text-[13px] leading-snug">
        <p className="flex items-center gap-1.5 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          2 agents live now
        </p>
        <p className="flex items-center gap-1 text-muted-foreground">
          Study + Browser
          {[0, 1, 2, 3].map((i) => (
            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
          ))}
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const [active, setActive] = useState<HeroKey>("all");
  const [tick, setTick] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const state = HERO_STATES.find((s) => s.key === active) ?? HERO_STATES[0];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      const i = HERO_STATES.findIndex((s) => s.key === active);
      setActive(HERO_STATES[(i + 1) % HERO_STATES.length].key);
      setTick((t) => t + 1);
    }, active === "all" ? CYCLE_MS + INTRO_DELAY * 1000 * (tick === 0 ? 1 : 0) : CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, paused, tick]);

  const select = (key: HeroKey) => {
    setPaused(true);
    setActive(key);
    setTick((t) => t + 1);
  };

  const d = INTRO_DELAY;

  return (
    <section id="top" className="relative mx-auto max-w-[1400px] px-3 pt-24 md:px-6 md:pt-28">
      <div className="px-2 md:px-6">
        <HeroHeadline />
      </div>

      {/* The sculpted panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: d + 0.2, ease: EASE }}
        className="relative mt-8 md:mt-10"
      >
        <div className="relative h-[430px] rounded-[2rem] bg-panel sm:h-[520px] md:rounded-[2.75rem] lg:h-[600px]">
          <div className="grain pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.18] mix-blend-multiply" />
          <div className="dot-grid pointer-events-none absolute inset-0 rounded-[inherit] opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          {/* top-right notch */}
          <div className="absolute right-0 top-0 hidden h-[118px] w-[330px] rounded-bl-[2.25rem] bg-background lg:block">
            <span className="inv-corner-bl absolute -left-9 top-0 h-9 w-9" />
            <span className="inv-corner-bl absolute -bottom-9 right-0 h-9 w-9" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: d + 0.9, ease: EASE }}
              className="flex h-full items-center justify-end pr-2"
            >
              <LiveCard />
            </motion.div>
          </div>

          {/* bottom-left cutout */}
          <div className="absolute bottom-0 left-0 hidden h-[290px] w-[340px] rounded-tr-[2.25rem] bg-background lg:block">
            <span className="inv-corner-tr absolute -top-9 left-0 h-9 w-9" />
            <span className="inv-corner-tr absolute -right-9 bottom-0 h-9 w-9" />
            <div className="h-full px-6 pt-10">
              <HeroInfo state={state} />
            </div>
          </div>

          {/* robot */}
          <div className="absolute inset-x-0 bottom-0 top-[-12%] lg:inset-x-[22%] lg:top-[-8%]">
            <HeroVisual state={state} scrollY={scrollY} />
          </div>

          {/* ring */}
          <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-[370px]">
            <SpinRing onClick={() => scrollToId(state.target)} />
          </div>

          {/* switcher */}
          <div className="absolute bottom-6 right-6 hidden w-[290px] lg:block">
            <HeroSwitcher states={HERO_STATES} active={active} progressKey={tick} paused={paused} onSelect={select} />
          </div>

          <p className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 lg:hidden">
            {state.code}
          </p>
        </div>
      </motion.div>

      {/* Mobile / tablet info */}
      <div className="mt-6 grid gap-6 px-2 md:grid-cols-2 lg:hidden">
        <HeroInfo state={state} />
        <HeroSwitcher states={HERO_STATES} active={active} progressKey={tick} paused={paused} onSelect={select} />
      </div>
    </section>
  );
}
