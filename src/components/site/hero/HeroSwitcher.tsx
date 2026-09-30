import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HeroKey, HeroState } from "./states";

interface HeroSwitcherProps {
  states: HeroState[];
  active: HeroKey;
  progressKey: number;
  paused: boolean;
  onSelect: (key: HeroKey) => void;
}

export const CYCLE_MS = 5200;

export function HeroSwitcher({ states, active, progressKey, paused, onSelect }: HeroSwitcherProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {states
        .filter((s) => s.key !== "all")
        .map((s) => {
          const isActive = s.key === active;
          return (
            <button
              key={s.key}
              onClick={() => onSelect(s.key)}
              className={cn(
                "group relative flex w-full items-center gap-3 overflow-hidden rounded-[1.4rem] bg-card/80 p-2 pr-5 text-left backdrop-blur transition-all duration-500",
                isActive ? "shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.5)]" : "opacity-70 hover:opacity-100",
              )}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-panel">
                <img src={s.image} alt="" className="h-[120%] w-[120%] object-contain transition-transform duration-700 group-hover:scale-110" />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold tracking-tight">{s.title}</span>
                <span className="block text-xs text-muted-foreground">{s.label}</span>
              </span>
              {isActive ? (
                <motion.span
                  key={progressKey}
                  className="absolute bottom-0 left-0 h-[2px] bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "100%" : "100%" }}
                  transition={{ duration: paused ? 0.4 : CYCLE_MS / 1000, ease: "linear" }}
                />
              ) : null}
            </button>
          );
        })}
    </div>
  );
}
