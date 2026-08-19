import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { examCategories } from "@/data/mock/examCategories";
import { accentStyles } from "@/lib/accents";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatNumber } from "@/lib/utils";
import { LayersIcon, ArrowRightIcon, ClipboardIcon, BookIcon, GraduationIcon, StethoscopeIcon, HeartPulseIcon } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "Nursing Exam Prep",
  description:
    "Explore QLexNursing exam prep across ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN and NCLEX-PN. Pick your pathway and start practicing.",
  path: "/exams",
  keywords: ["nursing exams", "ATI TEAS", "HESI A2", "NCLEX", "RN Nursing", "LPN Nursing"],
});

const catIcon: Record<string, React.ReactNode> = {
  "ati-teas": <BookIcon className="h-5 w-5" />,
  "hesi-a2": <ClipboardIcon className="h-5 w-5" />,
  "rn-nursing": <GraduationIcon className="h-5 w-5" />,
  "lpn-nursing": <StethoscopeIcon className="h-5 w-5" />,
  "nclex-rn": <HeartPulseIcon className="h-5 w-5" />,
  "nclex-pn": <StethoscopeIcon className="h-5 w-5" />,
};

export default function ExamsIndexPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Exams", path: "/exams" },
  ]);
  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white sm:p-12">
        <Badge tone="accent" className="bg-white/15 text-accent-200">Exam library</Badge>
        <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Choose your exam. Start where you are.
        </h1>
        <p className="mt-3 max-w-2xl text-brand-100">
          Every track includes practice, tutor, test and exam modes with detailed
          rationales and performance tracking. Realistic questions, clear feedback.
        </p>
      </div>

      <div className="mt-10">
        <SectionHeading title="All exam pathways" description="Six focused tracks, one calm study system." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examCategories.map((cat) => {
            const a = accentStyles[cat.accent];
            return (
              <Link key={cat.id} href={`/exams/${cat.slug}`} className="group">
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.soft} ${a.text}`}>
                        {catIcon[cat.slug] ?? <LayersIcon className="h-5 w-5" />}
                      </span>
                      <Badge tone="neutral">{cat.audience}</Badge>
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-ink">{cat.name}</h2>
                    <p className="mt-1 text-sm text-muted">{cat.description}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted">
                      <span>{formatNumber(cat.questionCount)} questions</span>
                      <span className={`inline-flex items-center gap-1 font-semibold ${a.text}`}>
                        Open {cat.shortName}
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
