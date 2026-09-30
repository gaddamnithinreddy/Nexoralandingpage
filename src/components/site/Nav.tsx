import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/hooks/use-lenis";
import { Brand } from "./Brand";
import { EASE } from "@/components/motion/Reveal";
import { INTRO_DELAY } from "./timing";

const LINKS = [
  { id: "rag", label: "RAG Assistant" },
  { id: "browser", label: "Browser Agent" },
  { id: "choose", label: "Which one?" },
  { id: "faq", label: "FAQ" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: INTRO_DELAY, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] rounded-full px-2 py-2 transition-all duration-500",
          scrolled ? "bg-card/75 shadow-[0_8px_40px_-12px_hsl(var(--foreground)/0.18)] backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="flex items-center gap-1">
          <Button variant="ink" size="orb" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hidden md:inline-flex">
            <Sparkles />
          </Button>
          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative rounded-full px-3.5 py-2 text-[14px] text-foreground/75 transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>
          <Brand className="ml-2 md:hidden" />
        </div>

        <Brand className="hidden md:flex" />

        <div className="flex items-center justify-end gap-2">
          <Button variant="pill" className="hidden h-11 px-5 sm:inline-flex" onClick={() => go("choose")}>
            Help me choose
          </Button>
          <Button variant="pill" size="xl" className="hidden h-11 gap-3 pl-5 pr-1.5 md:inline-flex" onClick={() => go("rag")}>
            Get started
            <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-secondary-foreground">
              <ArrowUpRight />
            </span>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ink" size="orb" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85vw] max-w-sm flex-col gap-2 border-none bg-stage pt-16 text-stage-foreground">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              {LINKS.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="flex items-baseline gap-4 border-b border-stage-border py-4 text-left text-3xl font-medium tracking-tight"
                >
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>
                  {l.label}
                </button>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
