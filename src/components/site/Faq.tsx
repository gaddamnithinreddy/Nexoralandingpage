import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";

const FAQS = [
  {
    q: "What exactly is Nexora?",
    a: "Nexora is a home for two focused AI agents. The Multi-AI RAG Assistant helps you learn from your own documents. The Browser Automation Agent does repetitive web work for you. Each one opens in its own workspace.",
  },
  {
    q: "What does “RAG” mean?",
    a: "Retrieval-Augmented Generation. In plain words: before answering, the assistant looks up the relevant parts of the PDFs you uploaded, so answers are grounded in your material instead of guesswork.",
  },
  {
    q: "Why “Multi-AI”?",
    a: "Instead of relying on a single model, the assistant uses a team of AI models working together — so you get clearer summaries, better explanations and stronger practice questions.",
  },
  {
    q: "What kind of tasks can the Browser Agent handle?",
    a: "Routine, multi-step things you'd normally click through yourself — navigating between pages, filling in forms, gathering information and repeating the same steps across sites.",
  },
  {
    q: "Am I still in control?",
    a: "Always. You describe the result you want and review the outcome. The agent handles the repetition; the decisions stay with you.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[1400px] scroll-mt-10 px-5 pb-28 md:px-12 md:pb-40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Reveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="text-primary">●</span> Questions
            </p>
          </Reveal>
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.05em]">
            <SplitWords text="Clear answers," />{" "}
            <span className="font-serif font-normal italic">
              <SplitWords text="no jargon." delay={0.15} />
            </span>
          </h2>
        </div>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-foreground/15">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-foreground/15">
                <AccordionTrigger className="py-6 text-left text-lg font-medium tracking-tight hover:no-underline md:text-xl [&>svg]:h-5 [&>svg]:w-5 [&[data-state=open]]:text-primary">
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-10 text-base leading-relaxed text-foreground/70">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
