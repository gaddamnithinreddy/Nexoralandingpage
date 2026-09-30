import { Asterisk } from "lucide-react";

const ITEMS = [
  "Upload PDFs",
  "Ask anything",
  "Instant summaries",
  "Practice MCQs",
  "Exam prep",
  "Describe a task",
  "Auto-navigate",
  "Fill forms",
  "Multi-step flows",
  "Time back",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative my-20 -rotate-[1.5deg] overflow-hidden bg-secondary py-5 text-secondary-foreground md:my-28 md:py-6">
      <div className="flex w-max animate-marquee">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-2xl font-medium tracking-[-0.03em] md:text-4xl">
            {i % 3 === 1 ? <em className="font-serif font-normal">{item}</em> : item}
            <Asterisk className="h-6 w-6 text-primary md:h-8 md:w-8" strokeWidth={2.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
