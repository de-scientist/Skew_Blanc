"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";

export interface CarouselSlide {
  id: string;
  content: React.ReactNode;
}

export function Carousel({
  slides,
  autoPlay = true,
  intervalMs = 6000,
  className,
  ariaLabel = "Featured highlights",
}: {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const count = slides.length;

  React.useEffect(() => {
    setReduced(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const go = React.useCallback(
    (next: number) => setIndex((prev) => (next + count) % count),
    [count]
  );

  React.useEffect(() => {
    if (!autoPlay || paused || reduced || count <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, paused, reduced, intervalMs, count]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  function onTouchStart(e: React.TouchEvent) {
    const x = e.touches[0].clientX;
    (e.currentTarget as HTMLElement).dataset.x = String(x);
  }
  function onTouchEnd(e: React.TouchEvent) {
    const start = Number((e.currentTarget as HTMLElement).dataset.x || 0);
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="w-full shrink-0"
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-content flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/80 text-ink shadow-card backdrop-blur transition-colors hover:bg-surface"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-content flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/80 text-ink shadow-card backdrop-blur transition-colors hover:bg-surface"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index
                    ? "w-7 bg-brand-600"
                    : "w-2 bg-line hover:bg-muted"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
