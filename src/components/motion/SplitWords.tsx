import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "./Reveal";

interface SplitWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean;
}

/** Each word rises out of a mask — the signature headline motion. */
export function SplitWords({ text, className, delay = 0, stagger = 0.06, immediate = false }: SplitWordsProps) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-60px" } };

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
