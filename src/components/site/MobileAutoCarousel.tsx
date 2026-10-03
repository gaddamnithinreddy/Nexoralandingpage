import { useEffect, useState, type ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

interface MobileAutoCarouselProps {
  items: ReactNode[];
  itemClassName: string;
  label: string;
  delay?: number;
}

/** Touch-first carousel: advances quietly, while always remaining swipeable. */
export function MobileAutoCarousel({ items, itemClassName, label, delay = 4800 }: MobileAutoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, delay);

    return () => window.clearInterval(timer);
  }, [api, delay]);

  return (
    <Carousel className="md:hidden" opts={{ align: "start", loop: true }} setApi={setApi}>
      <CarouselContent className="-ml-3">
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label} · auto-advances</p>
    </Carousel>
  );
}
