import { ArrowUpRight, Upload, MessageSquareText, GraduationCap, PenLine, ScanEye, CheckCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal, EASE } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { VideoFrame } from "./VideoFrame";
import { StepCard } from "./StepCard";
import { MobileAutoCarousel } from "@/components/site/MobileAutoCarousel";

const ICONS: Record<Product["id"], LucideIcon[]> = {
  rag: [Upload, MessageSquareText, GraduationCap],
  browser: [PenLine, ScanEye, CheckCheck],
};

interface ProductSectionProps {
  product: Product;
  dark?: boolean;
}

export function ProductSection({ product, dark = false }: ProductSectionProps) {
  return (
    <section id={product.id} className={cn(dark && "dark", "relative scroll-mt-10 bg-background text-foreground")}>
      <div className={cn("mx-auto max-w-[1400px] px-5 md:px-12", dark ? "py-28 md:py-40" : "pb-10 pt-28 md:pt-40")}>
        {/* header */}
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <span className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">{product.index}</span>
                {product.name}
                <span className="hidden text-foreground/30 sm:inline">/ {product.kicker}</span>
              </p>
            </Reveal>
            <h2 className="text-[clamp(2.6rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              <span className="block">
                <SplitWords text={product.headline} />
              </span>
              <span className="block font-serif font-normal italic tracking-[-0.03em] text-primary">
                <SplitWords text={product.headlineAccent} delay={0.15} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:pb-3">
            <p className="text-lg leading-relaxed text-foreground/80">{product.summary}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button asChild variant="ink" size="xl" className="gap-4 pr-2">
                  <a href={product.href} target="_blank" rel="noreferrer">
                    {product.cta}
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                      <ArrowUpRight />
                    </span>
                  </a>
                </Button>
              </Magnetic>
              <span className="font-mono text-xs text-muted-foreground">{product.href.replace("https://", "").replace(/\/$/, "")}</span>
            </div>
          </Reveal>
        </div>

        {/* film */}
        <div className="mt-16 md:mt-20">
          <VideoFrame product={product} />
        </div>

        {/* capabilities */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {product.capabilities.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="rounded-full border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {c}
            </motion.span>
          ))}
        </div>

        {/* steps — swipe on small screens, three-up on desktop */}
        <div className="mt-8 md:hidden">
          <MobileAutoCarousel
            label="Swipe through the steps"
            itemClassName="basis-[88%] pl-3"
            items={product.steps.map((s, i) => <StepCard key={s.title} step={s} index={i} icon={ICONS[product.id][i]} />)}
          />
        </div>
        <div className="mt-8 hidden gap-4 md:grid md:grid-cols-3">
          {product.steps.map((s, i) => (
            <StepCard key={s.title} step={s} index={i} icon={ICONS[product.id][i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
