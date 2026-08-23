"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CheckIcon, ArrowRightIcon, ChevronLeftIcon } from "@/components/ui/icons";
import type { ExamGoal, NursingPath } from "@/types/domain";

const steps = [
  "What are you studying?",
  "Which exam are you preparing for?",
  "When do you plan to test?",
  "How much can you study per day?",
  "Which subjects feel difficult?",
];

const options = {
  level: ["RN", "LPN", "Pre-Nursing"] as NursingPath[],
  goal: ["ATI", "HESI", "NCLEX-RN", "NCLEX-PN", "RN Nursing", "LPN Nursing", "Other"] as ExamGoal[],
  timeline: ["In 30 days", "1–3 months", "3–6 months", "Just exploring"],
  daily: ["15 min", "30 min", "1 hour", "2+ hours"],
  subjects: ["Pharmacology", "Medical-Surgical", "Fundamentals", "Pediatrics", "Mental Health", "Maternal-Newborn"],
};

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [sel, setSel] = React.useState<Record<string, string[]>>({});

  const toggle = (group: string, value: string) =>
    setSel((s) => {
      const cur = s[group] ?? [];
      const next = cur.includes(value)
        ? cur.filter((v) => v !== value)
        : [...cur, value];
      return { ...s, [group]: next };
    });

  const isMulti = step === 4;
  const groupKey = ["level", "goal", "timeline", "daily", "subjects"][step];
  const current = sel[groupKey] ?? [];

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <p className="text-center text-sm font-semibold text-brand-700 dark:text-brand-300">
        Step {step + 1} of {steps.length}
      </p>
      <ProgressBar value={((step + 1) / steps.length) * 100} className="mt-2" tone="brand" />
      <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Let&apos;s personalize your study experience
      </h1>
      <p className="mt-2 text-center text-muted">{steps[step]}</p>

      <div className="mt-8 grid gap-3">
        {options[groupKey as keyof typeof options].map((opt) => {
          const active = current.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => (isMulti ? toggle(groupKey, opt) : setSel({ ...sel, [groupKey]: [opt] }))}
              className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm font-semibold transition-colors ${
                active
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-line bg-surface text-ink hover:bg-brand-50"
              }`}
            >
              {opt}
              {active && <CheckIcon className="h-5 w-5 text-brand-600" />}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-muted hover:text-ink disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-4 w-4" /> Back
        </button>
        {step < steps.length - 1 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={current.length === 0}
          >
            Continue
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => router.replace("/dashboard")}>
            Finish setup
            <CheckIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <button
        type="button"
        onClick={() => router.replace("/dashboard")}
        className="mx-auto mt-4 block text-xs text-muted hover:text-brand-700"
      >
        Skip for now
      </button>
    </div>
  );
}
