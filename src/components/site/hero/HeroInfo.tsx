import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import type { HeroState } from "./states";

export function HeroInfo({ state }: { state: HeroState }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.key}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="text-[2.6rem] font-light leading-none tracking-[-0.05em] md:text-5xl">{state.code}</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.label}</p>
        <p className="mt-5 max-w-[17rem] text-[15px] leading-relaxed">
          <span className="font-medium underline decoration-foreground/40 decoration-1 underline-offset-4">{state.title}.</span>{" "}
          {state.body}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
