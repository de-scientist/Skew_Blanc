import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  ArrowRightIcon,
  BookIcon,
  ClipboardIcon,
  ClockIcon,
  TargetIcon,
} from "@/components/ui/icons";
import type { Exam } from "@/types";
import type { Accent } from "@/lib/accents";

export interface Faq {
  q: string;
  a: string;
}

export function ExamLanding({
  exam,
  intro,
  faqs,
  breadcrumbLabel,
  banner,
}: {
  exam: Exam;
  intro: string;
  faqs: Faq[];
  breadcrumbLabel: string;
  banner?: { image: string; accent: Accent; highlight?: string };
}) {
  const overview = [
    {
      icon: ClipboardIcon,
      label: "Questions",
      value: String(exam.totalQuestions),
    },
    {
      icon: ClockIcon,
      label: "Duration",
      value: `${exam.durationMinutes} min`,
    },
    {
      icon: TargetIcon,
      label: "Passing score",
      value: `${exam.passingScore}%`,
    },
    { icon: BookIcon, label: "Level", value: exam.level },
  ];

  return (
    <div className="space-y-10">
      <Breadcrumb items={[{ name: "Home", href: "/dashboard" }, { name: breadcrumbLabel }]} />

      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge tone="brand">{exam.level} level</Badge>
          {banner?.highlight && (
            <Badge tone="accent" className="ml-2">
              {banner.highlight}
            </Badge>
          )}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Prepare for the {exam.shortTitle}
          </h1>
          <p className="mt-4 text-lg text-muted">{exam.description}</p>
          <p className="mt-3 text-base text-ink">{intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/exam/${exam.id}`}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Start {exam.shortTitle} practice
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View performance
            </Link>
          </div>
        </div>
        <div className="relative">
          {banner ? (
            <div className="relative h-56 overflow-hidden rounded-2xl border border-line shadow-card sm:h-64">
              <Image
                src={banner.image}
                alt={`${exam.shortTitle} preparation`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-semibold text-white">
                  {exam.totalQuestions} questions · {exam.durationMinutes} min ·{" "}
                  {exam.passingScore}% passing
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {overview.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label}>
                    <CardContent className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs text-muted">{item.label}</p>
                        <p className="text-lg font-bold text-ink">{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-ink">Practice categories</h2>
        <p className="mt-1 text-sm text-muted">
          Questions are organized by the core subjects tested on the{" "}
          {exam.shortTitle}.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exam.subjects.map((subject) => (
            <Card key={subject}>
              <CardContent className="flex items-center justify-between">
                <span className="font-medium text-ink">{subject}</span>
                <Link
                  href={`/exam/${exam.id}`}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Practice
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-brand-50 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-ink">
          Track your progress
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Every attempt is recorded so you can see accuracy trends, time
          management, and the subjects that need the most attention.
        </p>
        <Link
          href={`/exam/${exam.id}`}
          className={buttonVariants({ variant: "primary", size: "lg", className: "mt-4" })}
        >
          Start a practice exam
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.q}>
              <CardContent>
                <h3 className="font-semibold text-ink">{faq.q}</h3>
                <p className="mt-1 text-sm text-muted">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
