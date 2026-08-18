import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  ArrowRightIcon,
  ClipboardIcon,
  BookIcon,
  ChartIcon,
  TargetIcon,
  SparkIcon,
} from "@/components/ui/icons";
import {
  websiteJsonLd,
  organizationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "NCLEX-RN & RN Nursing Exam Prep",
  description:
    "QLexNursing helps nursing students practice smarter, understand their performance, and prepare for the NCLEX-RN and RN nursing exams with confidence.",
  alternates: { canonical: "/" },
};

const features = [
  {
    icon: ClipboardIcon,
    title: "Exam-style questions",
    text: "Practice with questions modeled on the NCLEX-RN and RN nursing blueprints.",
  },
  {
    icon: ChartIcon,
    title: "Track performance",
    text: "See accuracy trends, time management, and subject-level breakdowns.",
  },
  {
    icon: TargetIcon,
    title: "Focus your study",
    text: "Get a recommended focus area based on your weakest subjects.",
  },
  {
    icon: BookIcon,
    title: "Review every answer",
    text: "Detailed explanations for each question help you learn, not just score.",
  },
];

export default function HomePage() {
  const jsonLd = [websiteJsonLd(), organizationJsonLd()];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main id="main-content">
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-16 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
              <SparkIcon className="h-4 w-4" /> Built for nursing students
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Practice smarter. Understand your performance. Prepare with
              confidence.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted">
              QLexNursing is a modern exam-preparation platform for the NCLEX-RN
              and RN nursing exams. Build stamina, target weak areas, and walk
              into your exam ready.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/exams/nclex-rn"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Prepare for the NCLEX-RN
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/exams/rn-nursing"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                RN Nursing practice
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardContent>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-4 text-base font-semibold text-ink">
                      {feature.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted">{feature.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="border-t border-line bg-surface">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center lg:px-8">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Ready to start your first practice exam?
            </h2>
            <p className="max-w-xl text-muted">
              Jump straight into a focused session and see your results in
              minutes.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Go to your dashboard
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted lg:px-8">
          <p>
            © {new Date().getFullYear()} {`Skew Blanc LTD`}. QLexNursing is a
            preparation tool and is not affiliated with the official NCLEX
            examination.
          </p>
        </div>
      </footer>
    </>
  );
}
