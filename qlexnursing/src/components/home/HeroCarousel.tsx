"use client";

import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { buttonVariants } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/cards";
import { ImageFrame } from "@/components/ui/ImageFrame";
import {
  ArrowRightIcon,
  SparkIcon,
  TrophyIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface Slide {
  id: string;
  image: string;
  eyebrow: string;
  headline: string;
  text?: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

const slides: Slide[] = [
  {
    id: "s1",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a0543919b60?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Your nursing journey starts here",
    headline: "Your Nursing Journey Starts Here",
    cta: { label: "Start Preparing", href: "/register" },
    ctaSecondary: { label: "Explore Exams", href: "/exams" },
  },
  {
    id: "s2",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Practice with purpose",
    headline: "Practice With Purpose",
    text: "Realistic question experiences designed to strengthen clinical reasoning and build exam-day confidence.",
    cta: { label: "Explore Practice Exams", href: "/exams" },
    ctaSecondary: { label: "View Progress", href: "/dashboard" },
  },
  {
    id: "s3",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Know where you stand",
    headline: "Know Where You Stand",
    text: "Track accuracy, progress, study streaks and the exact areas that need improvement.",
    cta: { label: "View Your Progress", href: "/dashboard" },
    ctaSecondary: { label: "Study Resources", href: "/resources" },
  },
  {
    id: "s4",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Study smarter",
    headline: "Study Smarter With Intelligent Tools",
    text: "Turn your practice activity into actionable study insights and a clearer plan.",
    cta: { label: "Explore Resources", href: "/resources" },
    ctaSecondary: { label: "Get Started", href: "/register" },
  },
];

function FloatingReadiness() {
  return (
    <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden lg:block animate-floaty">
      <GlassCard className="w-56 rounded-2xl p-4 text-white">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
            <TrophyIcon className="h-5 w-5 text-warning-300" />
          </span>
          <div>
            <p className="text-xs text-white/70">Exam readiness</p>
            <p className="text-lg font-extrabold leading-none">78%</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-accent-400 to-accent-500" />
        </div>
        <p className="mt-2 text-[11px] text-white/60">
          Based on your recent practice
        </p>
      </GlassCard>
    </div>
  );
}

export function HeroCarousel() {
  return (
    <Carousel
      ariaLabel="QLexNursing highlights"
      className="overflow-hidden rounded-3xl border border-line shadow-card-hover"
      slides={slides.map((slide, i) => ({
        id: slide.id,
        content: (
          <div className="relative min-h-[72vh] sm:min-h-[78vh]">
            <ImageFrame
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              overlay="bg-gradient-to-r from-brand-950/95 via-brand-900/70 to-brand-950/30"
            />
            <div
              aria-hidden="true"
              className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl"
            />

            <div className="relative z-10 flex min-h-[72vh] items-center sm:min-h-[78vh]">
              <div className="container-page w-full">
                <GlassCard className="max-w-2xl rounded-2xl p-7 sm:p-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                    <SparkIcon className="h-3.5 w-3.5" /> {slide.eyebrow}
                  </span>
                  <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                    {slide.headline}
                  </h2>
                  {slide.text && (
                    <p className="mt-4 max-w-lg text-balance text-sm text-white/85 sm:text-base">
                      {slide.text}
                    </p>
                  )}
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={slide.cta.href}
                      className={buttonVariants({
                        variant: "secondary",
                        size: "lg",
                        className: "bg-white text-brand-800 hover:bg-brand-50",
                      })}
                    >
                      {slide.cta.label}
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                    {slide.ctaSecondary && (
                      <Link
                        href={slide.ctaSecondary.href}
                        className={buttonVariants({
                          variant: "ghost",
                          size: "lg",
                          className:
                            "text-white hover:bg-white/10 hover:text-white",
                        })}
                      >
                        {slide.ctaSecondary.label}
                      </Link>
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>

            <FloatingReadiness />
          </div>
        ),
      }))}
    />
  );
}
