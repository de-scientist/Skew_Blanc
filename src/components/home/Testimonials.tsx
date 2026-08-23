"use client";

import { Carousel } from "@/components/ui/Carousel";
import { TestimonialCard } from "@/components/ui/cards";
import { testimonials } from "@/data/mock/testimonials";

export function Testimonials() {
  return (
    <Carousel
      ariaLabel="Student testimonials"
      className="mt-10"
      slides={testimonials.map((t) => ({
        id: t.id,
        content: (
          <TestimonialCard
            quote={t.quote}
            name={t.name}
            role={t.role}
            program={t.program}
            rating={t.rating}
            initials={t.avatarInitials}
            verified={t.verified}
            glass
          />
        ),
      }))}
    />
  );
}
