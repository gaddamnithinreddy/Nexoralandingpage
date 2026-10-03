import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import type { Product } from "@/data/products";

/** Cinematic frame for the launch film. Falls back to an animated poster until a video is set. */
export function VideoFrame({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState<boolean>(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 28]);
  const imgY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <motion.div
      ref={ref}
      style={{ scale, borderRadius: radius }}
      className="relative aspect-video w-full overflow-hidden bg-stage text-stage-foreground shadow-[0_60px_120px_-40px_hsl(var(--foreground)/0.45)]"
    >
      {/* chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-stage-muted md:px-7 md:py-5 md:text-[11px]">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          {product.video ? "Now playing" : "Launch film"}
        </span>
        <span className="hidden sm:inline">nexora / {product.id}_launch.mp4</span>
        <span>{product.index} / 02</span>
      </div>

      {product.video ? (
        <>
          <video
            ref={videoRef}
            src={product.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-contain lg:object-cover"
          />
          <button
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full bg-stage/70 px-3 py-2 text-[11px] font-medium backdrop-blur-md transition-colors hover:bg-stage sm:bottom-5 sm:right-5 sm:px-4 sm:py-2.5 sm:text-xs"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muted ? "Sound off" : "Sound on"}
          </button>
        </>
      ) : (
        <>
          <div className="dot-grid-stage absolute inset-0" />
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[100px]" />
          <motion.img
            style={{ y: imgY }}
            src={product.image}
            alt={product.name}
            className="absolute inset-0 m-auto h-[82%] w-[82%] animate-float-y object-contain"
          />
          {/* scanline */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="h-1/3 w-full animate-scan bg-gradient-to-b from-transparent via-stage-foreground/[0.05] to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-stage via-stage/70 to-transparent p-5 pt-24 md:p-8">
            <div>
              <p className="text-2xl font-medium tracking-[-0.03em] md:text-4xl">{product.name}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stage-muted">Launch film · premiering soon</p>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground md:h-20 md:w-20">
              <Play className="ml-1 h-6 w-6 fill-current md:h-8 md:w-8" />
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}
