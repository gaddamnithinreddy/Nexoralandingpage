import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, EASE } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { PRODUCTS, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

function ChoiceCard({ product, dark, index }: { product: Product; dark: boolean; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={product.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: EASE }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn(
        "group relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[2.25rem] p-7 md:min-h-[600px] md:p-10",
        dark ? "bg-secondary text-secondary-foreground" : "bg-card text-card-foreground",
      )}
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", dark ? "text-secondary-foreground/50" : "text-muted-foreground")}>
            If you think…
          </p>
          <p className="mt-4 max-w-sm text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            “{product.bestFor}”
          </p>
        </div>
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
          <ArrowUpRight className="h-6 w-6" />
        </span>
      </div>

      <img
        src={product.image}
        alt=""
        className="pointer-events-none absolute bottom-[-6%] right-[-8%] h-[72%] w-[72%] object-contain transition-transform duration-1000 ease-out group-hover:-translate-y-4 group-hover:scale-105"
      />

      <div className="relative z-10">
        <p className={cn("text-sm", dark ? "text-secondary-foreground/60" : "text-muted-foreground")}>→ use the</p>
        <p className="text-2xl font-semibold tracking-tight md:text-3xl">{product.name}</p>
        <p className="mt-1 font-serif text-xl italic text-primary">{product.short}</p>
      </div>
    </motion.a>
  );
}

export function Chooser() {
  return (
    <section id="choose" className="mx-auto max-w-[1400px] scroll-mt-10 px-5 py-28 md:px-12 md:py-40">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-3xl text-[clamp(2.4rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.05em]">
          <SplitWords text="Not sure which one?" />{" "}
          <span className="font-serif font-normal italic text-primary">
            <SplitWords text="Start with your problem." delay={0.2} />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="max-w-xs text-foreground/70">Pick the sentence that sounds like you. That's your workspace — no setup, no guesswork.</p>
        </Reveal>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {PRODUCTS.map((p, i) => (
          <ChoiceCard key={p.id} product={p} dark={i === 1} index={i} />
        ))}
      </div>
    </section>
  );
}
