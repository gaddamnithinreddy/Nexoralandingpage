import { motion } from "framer-motion";
import { FileText, MousePointer2 } from "lucide-react";
import { SplitWords } from "@/components/motion/SplitWords";
import { EASE } from "@/components/motion/Reveal";
import { INTRO_DELAY } from "../timing";

function Badge({ dark, delay, children }: { dark?: boolean; delay: number; children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
      className={
        "ml-3 hidden sm:inline-grid h-[0.78em] w-[0.78em] translate-y-[0.06em] place-items-center rounded-full align-baseline shadow-[0_10px_30px_-10px_hsl(var(--foreground)/0.4)] md:ml-4 " +
        (dark ? "bg-secondary text-primary" : "bg-card text-foreground")
      }
    >
      {children}
    </motion.span>
  );
}

export function HeroHeadline() {
  const d = INTRO_DELAY;
  return (
    <div className="relative z-20">
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: d, ease: EASE }}
        className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        <span className="h-2 w-2 rounded-full bg-primary" />
        Two AI agents for everyday work
      </motion.p>
      <h1 className="text-[clamp(2rem,8.6vw,5.4rem)] sm:text-[clamp(2.5rem,6.4vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.05em]">
        <span className="block whitespace-nowrap">
          <SplitWords immediate delay={d + 0.1} text="Understand" />{" "}
          <span className="font-serif font-normal italic tracking-[-0.02em]">
            <SplitWords immediate delay={d + 0.18} text="any" />
          </span>{" "}
          <SplitWords immediate delay={d + 0.26} text="PDF." />
          <Badge delay={d + 0.7}>
            <FileText className="h-[0.4em] w-[0.4em]" strokeWidth={2.2} />
          </Badge>
        </span>
        <span className="block whitespace-nowrap">
          <SplitWords immediate delay={d + 0.3} text="Automate" />{" "}
          <span className="font-serif font-normal italic tracking-[-0.02em]">
            <SplitWords immediate delay={d + 0.38} text="any" />
          </span>{" "}
          <SplitWords immediate delay={d + 0.46} text="website." />
          <Badge dark delay={d + 0.85}>
            <MousePointer2 className="h-[0.4em] w-[0.4em]" strokeWidth={2.2} fill="currentColor" />
          </Badge>
        </span>
      </h1>
    </div>
  );
}
