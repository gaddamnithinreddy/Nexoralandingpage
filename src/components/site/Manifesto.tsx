import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const TEXT =
  "Nexora is two AI agents in one place. One reads your documents and teaches you what's inside. The other goes onto the web and does the clicking for you. You bring the work — they move it forward.";
const ACCENT = new Set(["reads", "teaches", "clicking", "forward."]);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = ACCENT.has(word);
  return (
    <motion.span style={{ opacity }} className={accent ? "font-serif font-normal italic text-primary" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-28 md:px-12 md:pt-40">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-primary">●</span> What is Nexora?
          </p>
        </Reveal>
        <p ref={ref} className="text-balance text-[clamp(1.9rem,4.2vw,3.9rem)] font-medium leading-[1.08] tracking-[-0.04em]">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
