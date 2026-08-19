import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createMetadata, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import { SparkIcon, TargetIcon, ShieldIcon, UsersIcon, ArrowRightIcon, HeartPulseIcon, BookIcon, ChartIcon } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "About QLexNursing",
  description: "Our mission: help nursing students prepare smarter and practice with confidence through realistic questions and clear performance insights.",
  path: "/about",
});

const values = [
  { icon: TargetIcon, title: "Clarity over noise", text: "We turn scattered studying into a clear, measurable plan." },
  { icon: BookIcon, title: "Learn, don't memorize", text: "Every answer comes with a rationale that builds understanding." },
  { icon: ChartIcon, title: "Progress you can see", text: "Honest analytics show exactly where to focus next." },
  { icon: ShieldIcon, title: "Trustworthy & calm", text: "A focused, professional environment built for serious study." },
];

export default function AboutPage() {
  const jsonLd = [organizationJsonLd(), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])];
  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white sm:p-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          <SparkIcon className="h-3.5 w-3.5" /> Our mission
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Prepare smarter. Practice confidently. Know where you stand.
        </h1>
        <p className="mt-3 max-w-2xl text-brand-100">
          QLexNursing exists to help nursing students build real exam readiness with
          realistic practice, detailed rationales and performance insights designed
          around the way people actually learn.
        </p>
      </div>

      <section className="py-12">
        <SectionHeading title="What we believe" description="Principles behind every screen you use." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <Card key={v.title} className="h-full">
                <CardContent>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted">{v.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Built for nursing students, by people who get it</h2>
            <p className="mt-3 text-muted">
              From ATI TEAS to NCLEX-PN, we cover the exams that decide your next
              step. Our content is original, preparation-focused and constantly
              improving based on how students actually practice.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/exams" className={buttonVariants({ variant: "primary", size: "lg" })}>
                Explore exams
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/register" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Create free account
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: HeartPulseIcon, v: "6", l: "Exam pathways" },
              { icon: UsersIcon, v: "100k+", l: "Practice questions" },
              { icon: BookIcon, v: "240", l: "Study notes" },
              { icon: ChartIcon, v: "Real-time", l: "Performance" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.l}>
                  <CardContent>
                    <span className="text-brand-600"><Icon className="h-5 w-5" /></span>
                    <p className="mt-3 text-2xl font-extrabold text-ink">{s.v}</p>
                    <p className="text-xs text-muted">{s.l}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-muted">
        QLexNursing is an independent study tool and is not affiliated with, endorsed
        by, or sponsored by NCSBN or any trademark holder.
      </p>
    </div>
  );
}
