import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { EASE } from "@/components/motion/Reveal";
import type { ProductStep } from "@/data/products";

interface StepCardProps {
  step: ProductStep;
  index: number;
  icon: LucideIcon;
}

export function StepCard({ step, index, icon: Icon }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -6 }}
      className="group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-card p-6 md:p-7"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-muted-foreground">STEP 0{index + 1}</span>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:rotate-[-10deg] group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div>
        <p className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">{step.title}</p>
        <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
      </div>
      <span className="absolute -bottom-10 -right-4 select-none text-[9rem] font-semibold leading-none tracking-tighter text-foreground/[0.04] transition-transform duration-700 group-hover:-translate-y-3">
        {index + 1}
      </span>
    </motion.div>
  );
}
