import type { Metadata } from "next";
import { createMetadata, websiteJsonLd, organizationJsonLd } from "@/lib/seo";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import {
  QuickPaths,
  ProcessSection,
  WhySection,
  AnalyticsShowcase,
  ExamPreview,
  ResourceSection,
  StreakSection,
  CommunitySection,
  HomeFaq,
  FinalCta,
} from "@/components/home/sections";

export const metadata: Metadata = createMetadata({
  title: "Smart Nursing Exam Preparation",
  description:
    "QLexNursing helps nursing students practice smarter, understand their performance and prepare for ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN and NCLEX-PN with confidence.",
  path: "/",
  keywords: [
    "nursing exam prep",
    "NCLEX-RN",
    "NCLEX-PN",
    "RN Nursing",
    "LPN Nursing",
    "ATI TEAS",
    "HESI A2",
  ],
});

export default function HomePage() {
  const jsonLd = [websiteJsonLd(), organizationJsonLd()];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container-page pt-8 sm:pt-10">
        <HeroCarousel />
      </section>
      <QuickPaths />
      <ProcessSection />
      <WhySection />
      <AnalyticsShowcase />
      <ExamPreview />
      <ResourceSection />
      <StreakSection />
      <CommunitySection />
      <section id="testimonials" className="container-page scroll-mt-20 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink">
            Loved by nursing students
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Real stories from students using QLexNursing to prepare. Demonstration
            testimonials shown for product preview.
          </p>
        </div>
        <Testimonials />
      </section>
      <HomeFaq />
      <FinalCta />
    </>
  );
}
