import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitWords } from "@/components/motion/SplitWords";
import { Magnetic } from "@/components/motion/Magnetic";
import { PRODUCTS } from "@/data/products";
import { Brand } from "./Brand";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const robotY = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["12%", "-4%"]);

  return (
    <footer ref={ref} className="dark relative overflow-hidden bg-background px-3 pb-3 text-foreground md:px-4 md:pb-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-stage px-6 pb-8 pt-20 md:px-12 md:pt-28">
        <div className="dot-grid-stage absolute inset-0 opacity-60" />
        <div className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-stage-muted">
              <span className="text-primary">●</span> One clear start
            </p>
            <h2 className="text-[clamp(2.6rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.055em] text-stage-foreground">
              <SplitWords text="Your work is hard enough." />{" "}
              <span className="font-serif font-normal italic text-primary">
                <SplitWords text="Start here." delay={0.25} />
              </span>
            </h2>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {PRODUCTS.map((p, i) => (
                <Magnetic key={p.id}>
                  <Button asChild variant={i === 0 ? "coral" : "pill"} size="xl" className="w-full gap-4 pr-2 sm:w-auto">
                    <a href={p.href} target="_blank" rel="noreferrer">
                      {p.cta}
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-stage text-stage-foreground">
                        <ArrowUpRight />
                      </span>
                    </a>
                  </Button>
                </Magnetic>
              ))}
            </div>
          </div>
          <motion.img
            style={{ y: robotY }}
            src="/assets/nexora-hero.webp"
            alt=""
            className="mx-auto -mb-10 h-[340px] w-auto object-contain md:h-[440px] lg:-mb-20"
          />
        </div>

        <motion.p
          style={{ x: wordX }}
          className="pointer-events-none relative mt-10 select-none whitespace-nowrap text-[26vw] font-semibold leading-[0.8] tracking-[-0.07em] text-stage-foreground/[0.06] lg:text-[20rem]"
        >
          nexora
        </motion.p>

        <div className="relative mt-6 flex flex-col items-start justify-between gap-4 border-t border-stage-border pt-6 text-sm text-stage-muted md:flex-row md:items-center">
          <Brand className="text-stage-foreground" />
          <p>AI workspaces for focused work.</p>
          <p className="font-mono text-xs">© {new Date().getFullYear()} Nexora</p>
        </div>
      </div>
    </footer>
  );
}
