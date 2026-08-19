"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRightIcon, SparkIcon } from "@/components/ui/icons";

interface Slide {
  id: string;
  image: string;
  eyebrow: string;
  headline: string;
  text?: string;
  cta: { label: string; href: string };
}

const slides: Slide[] = [
  {
    id: "s1",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a0543919b60?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Your nursing journey starts here",
    headline: "Your Nursing Journey Starts Here",
    cta: { label: "Start Preparing", href: "/register" },
  },
  {
    id: "s2",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Practice with purpose",
    headline: "Practice With Purpose",
    text: "Realistic question experiences designed to strengthen clinical reasoning.",
    cta: { label: "Explore Practice Exams", href: "/exams" },
  },
  {
    id: "s3",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Know where you stand",
    headline: "Know Where You Stand",
    text: "Track accuracy, progress, study streaks and the areas that need improvement.",
    cta: { label: "View Your Progress", href: "/dashboard" },
  },
  {
    id: "s4",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Study smarter",
    headline: "Study Smarter With Intelligent Tools",
    text: "Turn your practice activity into actionable study insights.",
    cta: { label: "Explore Resources", href: "/resources" },
  },
  {
    id: "s5",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Turn preparation into confidence",
    headline: "Turn Preparation Into Confidence",
    cta: { label: "Get Started", href: "/register" },
  },
];

export function HeroCarousel() {
  return (
    <Carousel
      ariaLabel="QLexNursing highlights"
      className="rounded-3xl border border-line shadow-card-hover"
      slides={slides.map((slide) => ({
        id: slide.id,
        content: (
          <div className="relative h-[460px] overflow-hidden rounded-3xl sm:h-[520px]">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={slide.id === "s1"}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-900/55 to-transparent" />
            <div className="absolute inset-0 glass m-3 rounded-2xl sm:m-5" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-6 sm:px-12">
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
                <Link
                  href={slide.cta.href}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className: "mt-7 bg-white text-brand-800 hover:bg-brand-50",
                  })}
                >
                  {slide.cta.label}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ),
      }))}
    />
  );
}
