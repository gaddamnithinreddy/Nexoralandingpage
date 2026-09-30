import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

/** Opening title card: a counter runs to 100, then the curtain lifts. */
export function IntroCurtain() {
  const [count, setCount] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-stage p-6 text-stage-foreground md:p-10"
          exit={{ y: "-100%", transition: { duration: 1, ease: EASE } }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-stage-muted">
            <span>Nexora</span>
            <span>Two agents / One workspace</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="max-w-md font-serif text-4xl italic leading-none md:text-6xl"
            >
              Learn faster.
              <br />
              <span className="text-primary">Click less.</span>
            </motion.p>
            <span className="font-sans text-7xl font-light tabular-nums tracking-tighter md:text-[10rem] md:leading-[0.8]">
              {count}
            </span>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-primary"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
