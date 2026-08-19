import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DonutChart } from "@/components/ui/DonutChart";
import { examCategories } from "@/data/mock/examCategories";
import { studyResources } from "@/data/mock/content";
import { forumTopics } from "@/data/mock/content";
import { mockStreak } from "@/data/mock/user";
import { accentStyles } from "@/lib/accents";
import { formatNumber } from "@/lib/utils";
import {
  ArrowRightIcon,
  ClipboardIcon,
  BookIcon,
  ChartIcon,
  TargetIcon,
  SparkIcon,
  FlameIcon,
  LayersIcon,
  CheckCircleIcon,
  MessageIcon,
  FileTextIcon,
  UsersIcon,
  PlayIcon,
  FlagIcon,
  ClockIcon,
  EyeIcon,
} from "@/components/ui/icons";

export function QuickPaths() {
  return (
    <section className="container-page py-16">
      <SectionHeading
        title="What are you preparing for?"
        description="Choose your pathway. Every track is built around the subjects and question styles that matter for your exam."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examCategories.map((cat) => {
          const a = accentStyles[cat.accent];
          return (
            <Link key={cat.id} href={`/exams/${cat.slug}`} className="group">
              <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="relative h-32">
                  <Image
                    src={cat.heroImage}
                    alt={`${cat.name} preparation`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/10" />
                  <Badge
                    tone="accent"
                    className="absolute left-3 top-3 bg-white/90 text-brand-700"
                  >
                    {cat.highlight}
                  </Badge>
                </div>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-ink">{cat.name}</h3>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${a.soft} ${a.text}`}
                    >
                      <LayersIcon className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{cat.tagline}</p>
                  <p className="mt-3 text-sm text-muted">{cat.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted">
                      {formatNumber(cat.questionCount)} questions
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-semibold ${a.text}`}
                    >
                      Explore {cat.shortName}
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const processSteps = [
  { n: "01", title: "Prepare", text: "Pick your exam and a clear study goal.", icon: BookIcon },
  { n: "02", title: "Practice", text: "Answer realistic, exam-style questions.", icon: ClipboardIcon },
  { n: "03", title: "Understand", text: "Read the rationale behind every answer.", icon: SparkIcon },
  { n: "04", title: "Track", text: "Watch accuracy and readiness improve.", icon: ChartIcon },
  { n: "05", title: "Improve", text: "Focus automatically on weak areas.", icon: TargetIcon },
  { n: "06", title: "Succeed", text: "Walk into exam day with confidence.", icon: CheckCircleIcon },
];

export function ProcessSection() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page py-16">
        <SectionHeading
          title="How QLexNursing works"
          description="A simple loop that turns scattered studying into measurable progress."
        />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.n} className="relative">
                <Card className="h-full">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-3xl font-extrabold text-line">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{step.text}</p>
                  </CardContent>
                </Card>
                {i < processSteps.length - 1 && (
                  <ArrowRightIcon className="absolute -bottom-3 left-1/2 hidden h-5 w-5 -translate-x-1/2 text-brand-300 lg:block" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const whyFeatures = [
  {
    icon: ClipboardIcon,
    title: "Practice Questions",
    text: "A large question bank across every nursing exam category.",
  },
  {
    icon: BookIcon,
    title: "Detailed Rationales",
    text: "Understand why an answer is correct, not just which one.",
  },
  {
    icon: PlayIcon,
    title: "Realistic Exams",
    text: "Practice under realistic examination conditions and timers.",
  },
  {
    icon: ChartIcon,
    title: "Performance Analytics",
    text: "See your strengths, weaknesses and readiness at a glance.",
  },
  {
    icon: LayersIcon,
    title: "Study Resources",
    text: "Notes, flashcards and learning materials for every subject.",
  },
  {
    icon: FlameIcon,
    title: "Study Streak",
    text: "Build consistency through structured, daily practice.",
  },
];

export function WhySection() {
  return (
    <section className="container-page py-16">
      <SectionHeading
        title="Everything you need to prepare with confidence"
        description="One calm, focused place for practice, review and progress."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyFeatures.map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title} className="h-full">
              <CardContent>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{f.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function AnalyticsShowcase() {
  const stats = [
    { label: "Exam Readiness", value: "78%", sub: "Good" },
    { label: "Questions Answered", value: "1,248", sub: "+36 this week" },
    { label: "Accuracy", value: "82%", sub: "+4 pts" },
    { label: "Study Streak", value: "14 days", sub: "Personal best" },
  ];
  const subjects = [
    { name: "Fundamentals", value: 86 },
    { name: "Pharmacology", value: 61 },
    { name: "Medical-Surgical", value: 68 },
    { name: "Pediatrics", value: 74 },
  ];
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page py-16">
        <SectionHeading
          title="See how it works"
          description="A preview of the performance dashboard students use to stay on track."
          action={
            <Link
              href="/register"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Try the dashboard
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardContent className="flex flex-col items-center gap-4">
              <DonutChart value={78} sublabel="Readiness" label="Exam readiness" />
              <div className="grid w-full grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-success-50 p-2">
                  <p className="text-sm font-bold text-success-700">Fundamentals</p>
                  <p className="text-xs text-muted">Strongest</p>
                </div>
                <div className="rounded-lg bg-warning-50 p-2">
                  <p className="text-sm font-bold text-warning-700">Pharmacology</p>
                  <p className="text-xs text-muted">Needs work</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {stats.map((s) => (
              <Card key={s.label} className="p-5">
                <p className="text-sm text-muted">{s.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-ink">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-success-600">{s.sub}</p>
              </Card>
            ))}
            <Card className="p-5 sm:col-span-2">
              <p className="text-sm font-semibold text-ink">Subject mastery</p>
              <div className="mt-4 space-y-3">
                {subjects.map((s) => (
                  <ProgressBar
                    key={s.name}
                    label={s.name}
                    value={s.value}
                    showValue
                    tone={s.value >= 80 ? "success" : s.value >= 70 ? "brand" : "warning"}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExamPreview() {
  return (
    <section className="container-page py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge tone="brand">Exam experience</Badge>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Practice like the real thing
          </h2>
          <p className="mt-4 text-muted">
            Build confidence through realistic exam experiences designed to help
            you think, practice and review — with a clean timer, question
            navigator and flagging.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Clearly labeled question and answer options",
              "Live timer and progress tracking",
              "Flag questions to revisit before submitting",
              "Instant review with full rationales",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-ink">
                <CheckCircleIcon className="h-5 w-5 shrink-0 text-success-600" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/exams/nclex-rn"
            className={buttonVariants({ variant: "primary", size: "lg", className: "mt-7" })}
          >
            Explore the exam experience
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="glass absolute -right-4 -top-4 h-24 w-24 rounded-2xl" />
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-line bg-subtle px-5 py-3">
              <span className="text-sm font-semibold text-ink">NCLEX-RN</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-danger-50 px-2.5 py-1 text-xs font-semibold text-danger-700">
                <ClockIcon className="h-3.5 w-3.5" /> 41:12
              </span>
            </div>
            <CardContent>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
                Pharmacology
              </p>
              <p className="mt-2 text-base font-semibold text-ink">
                A nurse is preparing to administer digoxin. Which finding would
                lead the nurse to withhold the dose?
              </p>
              <div className="mt-4 space-y-2">
                {[
                  { t: "Apical pulse 48 beats/min", c: true },
                  { t: "Blood pressure 118/76 mm Hg", c: false },
                  { t: "Potassium 4.2 mEq/L", c: false },
                  { t: "Oxygen saturation 97%", c: false },
                ].map((o, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
                      o.c
                        ? "border-success-500 bg-success-50 text-ink"
                        : "border-line text-muted"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                        o.c
                          ? "border-success-600 bg-success-600 text-white"
                          : "border-line text-muted"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {o.t}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-warning-700">
                  <FlagIcon className="h-3.5 w-3.5" /> Flagged
                </span>
                <span className="text-xs text-muted">Question 12 of 50</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function ResourceSection() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page py-16">
        <SectionHeading
          title="Study resources, all in one place"
          description="Notes, flashcards and guides linked to the subjects you actually practice."
          action={
            <Link
              href="/resources"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Browse resources
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studyResources.slice(0, 6).map((r) => (
            <Link key={r.id} href={r.href} className="group">
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge tone="brand">{r.type}</Badge>
                    <span className="text-xs text-muted">{r.count} items</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{r.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StreakSection() {
  const days = Object.entries(mockStreak.thisWeek) as [
    keyof typeof mockStreak.thisWeek,
    boolean,
  ][];
  return (
    <section className="container-page py-16">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Badge tone="warning" className="bg-white/15 text-warning-200">
              Build your study momentum
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Build your study momentum
            </h2>
            <p className="mt-3 max-w-lg text-brand-100">
              Small, consistent sessions beat cramming. Keep your streak alive and
              watch your readiness climb week over week.
            </p>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "mt-6 bg-white text-brand-800 hover:bg-brand-50",
              })}
            >
              Continue studying
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-100">Current streak</p>
                <p className="text-4xl font-extrabold">🔥 {mockStreak.current} days</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-brand-100">Longest</p>
                <p className="text-2xl font-bold">{mockStreak.longest} days</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2 text-center">
              {days.map(([day, done]) => (
                <div key={day} className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-brand-100">{day}</p>
                  {done ? (
                    <CheckCircleIcon className="mx-auto mt-1 h-5 w-5 text-success-400" />
                  ) : (
                    <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-white/30" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-brand-100">
              Weekly goal: {mockStreak.weeklyGoalMinutes} minutes · On track
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section className="container-page py-16">
      <SectionHeading
        title="Learn together"
        description="Recent discussions from the QLexNursing community."
        action={
          <Link
            href="/forums"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Open forums
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {forumTopics.slice(0, 3).map((t) => (
          <Link key={t.id} href={`/forums/${t.slug}`} className="group">
            <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge tone="brand">{t.category}</Badge>
                  {t.solved && <Badge tone="success">Solved</Badge>}
                </div>
                <h3 className="mt-3 text-base font-semibold text-ink group-hover:text-brand-700">
                  {t.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {t.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <MessageIcon className="h-3.5 w-3.5" /> {t.replies}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <EyeIcon className="h-3.5 w-3.5" /> {t.views}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5">
                    <UsersIcon className="h-3.5 w-3.5" /> {t.author}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomeFaq() {
  const items = [
    {
      q: "What is QLexNursing?",
      a: "A nursing exam-preparation platform with realistic practice questions, detailed rationales and performance tracking across ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN and NCLEX-PN.",
    },
    {
      q: "Which nursing exams are available?",
      a: "ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN and NCLEX-PN — each with practice, tutor, test and exam modes.",
    },
    {
      q: "How does the study streak work?",
      a: "Completing practice each day extends your streak. Streaks encourage consistent study, which research consistently links to better retention and exam performance.",
    },
    {
      q: "How is my performance calculated?",
      a: "After every attempt we compute accuracy by subject, a trend over time, and a recommended focus area based on your weakest subjects versus your overall average.",
    },
  ];
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page py-16">
        <SectionHeading
          title="Frequently asked questions"
          description="The essentials, answered plainly."
        />
        <div className="mt-8 max-w-3xl space-y-3">
          {items.map((item) => (
            <Card key={item.q}>
              <CardContent>
                <h3 className="font-semibold text-ink">{item.q}</h3>
                <p className="mt-1 text-sm text-muted">{item.a}</p>
              </CardContent>
            </Card>
          ))}
          <Link
            href="/faq"
            className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-2" })}
          >
            See all FAQs
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="container-page py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-16 text-center text-white sm:px-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/30 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-400/30 blur-2xl" />
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your nursing goal is within reach.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-brand-100">
          Start preparing today with tools designed to help you understand more,
          practice better and build confidence.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className={buttonVariants({
              variant: "secondary",
              size: "lg",
              className: "bg-white text-brand-800 hover:bg-brand-50",
            })}
          >
            Create free account
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/exams"
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
              className: "text-white hover:bg-white/10",
            })}
          >
            Explore exams
          </Link>
        </div>
      </div>
    </section>
  );
}
