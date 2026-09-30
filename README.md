# Nexora — Landing Page

Motion-graphics landing page for Nexora's two AI agents.

## Run locally
```
bun install   # or npm install
bun run dev
```

## Stack
React + Vite + Tailwind + Framer Motion + Lenis (smooth scroll). Lives in the repo root. ``.

## Sections (src/components/site)
- `IntroCurtain` — 0→100 counter title card that lifts on load
- `Nav` — floating pill nav, glass on scroll, sheet menu on mobile
- `hero/` — sculpted panel (notched corners), robot with mouse tilt, auto-cycling product switcher, spinning ring CTA
- `Manifesto` — scroll-driven word-by-word highlight
- `product/ProductSection` — per-product header, launch film frame (`VideoFrame`), capabilities, 3 steps
- `Marquee`, `Chooser` ("Which one?" tilt cards), `Faq`, `FinalCta` (footer)

## Content
All product copy/links live in `src/data/products.ts`.

## Launch films
Put videos in `public/videos/` and set `video: "/videos/<file>.mp4"` on the product in `products.ts`.
Until set, `VideoFrame` shows an animated poster ("premiering soon").

## Images
`public/assets/` — `nexora-hero.webp` (duo robot), `nexora-rag.webp`, `nexora-browser.webp` (AI-generated, transparent).
