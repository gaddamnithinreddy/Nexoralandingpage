export type HeroKey = "all" | "rag" | "browser";

export interface HeroState {
  key: HeroKey;
  code: string;
  title: string;
  label: string;
  body: string;
  image: string;
  target: string;
  chips: [string, string, string];
}

export const HERO_STATES: HeroState[] = [
  {
    key: "all",
    code: "N—00",
    title: "The Nexora duo",
    label: "Two agents, one home",
    body: "One agent reads and explains your study material. The other clicks through the web for you.",
    image: "/assets/nexora-hero.webp",
    target: "choose",
    chips: ["IN · PDFs, questions, tasks", "OUT · clarity + time back", "2 agents live"],
  },
  {
    key: "rag",
    code: "N—01",
    title: "RAG Assistant",
    label: "Study workspace",
    body: "Upload PDFs and ask anything. Get summaries, notes, MCQs and exam prep from your own material.",
    image: "/assets/nexora-rag.webp",
    target: "rag",
    chips: ["lecture-04.pdf · uploaded", "Summary ready ✓", "12 MCQs generated"],
  },
  {
    key: "browser",
    code: "N—02",
    title: "Browser Agent",
    label: "Browser workspace",
    body: "Describe the result you need. The agent navigates, clicks and fills in — you stay in charge.",
    image: "/assets/nexora-browser.webp",
    target: "browser",
    chips: ["Opening portal…", "Form filled ✓", "Step 3 of 3 · done"],
  },
];
