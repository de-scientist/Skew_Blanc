"use client";

import { Carousel } from "@/components/ui/Carousel";
import { testimonials } from "@/data/mock/testimonials";
import { StarIcon } from "@/components/ui/icons";

export function Testimonials() {
  return (
    <Carousel
      ariaLabel="Student testimonials"
      className="mt-10"
      slides={testimonials.map((t) => ({
        id: t.id,
        content: (
          <div className="rounded-2xl border border-line bg-surface p-8 shadow-card">
            <div className="flex items-center gap-1 text-warning-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${i < t.rating ? "fill-warning-500" : "text-line"}`}
                />
              ))}
            </div>
            <p className="mt-4 text-balance text-lg leading-relaxed text-ink">
              “{t.quote}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {t.avatarInitials}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">
                  {t.role} · {t.program}
                  {t.verified && (
                    <span className="ml-1 text-success-600">· Verified</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ),
      }))}
    />
  );
}
