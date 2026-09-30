import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group flex items-center gap-2.5", className)} aria-label="Nexora home">
      <img
        src="/assets/nexora-mark.png"
        alt=""
        className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-12deg]"
      />
      <span className="text-[1.35rem] font-semibold tracking-[-0.04em]">
        Nexora<span className="text-primary">.</span>
      </span>
    </a>
  );
}
