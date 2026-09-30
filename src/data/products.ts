export type ProductId = "rag" | "browser";

export interface ProductStep {
  title: string;
  body: string;
}

export interface Product {
  id: ProductId;
  index: string;
  name: string;
  short: string;
  kicker: string;
  headline: string;
  headlineAccent: string;
  summary: string;
  image: string;
  /** Launch film. Drop the file in /public/videos and set the path here. */
  video?: string;
  href: string;
  cta: string;
  steps: ProductStep[];
  capabilities: string[];
  bestFor: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "rag",
    index: "01",
    name: "Multi-AI RAG Assistant",
    short: "Study workspace",
    kicker: "Learning & research",
    headline: "Upload a PDF.",
    headlineAccent: "Ask it anything.",
    summary:
      "Drop in course notes, papers or books. A team of AI models reads them for you and answers from your own material — with summaries, notes, explanations and practice questions on demand.",
    image: "/assets/nexora-rag.webp",
    video: undefined,
    href: "https://agent.nexorabuilds.in/",
    cta: "Open Study workspace",
    steps: [
      { title: "Upload", body: "Add your PDFs — lecture slides, textbooks, research papers." },
      { title: "Ask", body: "Chat in plain words. Answers come straight from your documents." },
      { title: "Master", body: "Turn it into notes, MCQs and exam-ready revision in one click." },
    ],
    capabilities: ["Summaries", "Smart notes", "Explanations", "Practice MCQs", "Exam prep", "Multi-model answers"],
    bestFor: "I have documents I need to understand",
  },
  {
    id: "browser",
    index: "02",
    name: "Browser Automation Agent",
    short: "Browser workspace",
    kicker: "Web action",
    headline: "Describe the task.",
    headlineAccent: "Watch it get done.",
    summary:
      "Tell the agent the result you want. It opens pages, clicks, types and moves through multi-step web flows for you — while you stay in charge of the outcome.",
    image: "/assets/nexora-browser.webp",
    video: undefined,
    href: "https://browser.nexorabuilds.in/",
    cta: "Open Browser workspace",
    steps: [
      { title: "Describe", body: "Write what you need, like you'd ask a teammate." },
      { title: "Watch", body: "The agent navigates, clicks and fills in, step by step." },
      { title: "Done", body: "Review the result. Hours of clicking, handled in minutes." },
    ],
    capabilities: ["Multi-step flows", "Form filling", "Site navigation", "Data gathering", "Repetitive clicks", "You stay in control"],
    bestFor: "I have web tasks I need done",
  },
];
