import { ArrowDown } from "lucide-react";

/** Rotating type ring with a coral orb at its core. */
export function SpinRing({ onClick }: { onClick: () => void }) {
  const text = "SCROLL · TO · MEET · YOUR · AGENTS · ";
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to the agents"
      className="group relative grid h-28 w-28 place-items-center"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-foreground font-mono text-[8.4px] tracking-[0.18em]">
          <textPath href="#ring">{text}</textPath>
        </text>
      </svg>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_-8px_hsl(var(--primary)/0.7)] transition-transform duration-500 group-hover:scale-110">
        <ArrowDown className="h-5 w-5 transition-transform duration-500 group-hover:translate-y-0.5" />
      </span>
    </button>
  );
}
