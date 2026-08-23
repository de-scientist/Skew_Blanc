"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CheckIcon, TargetIcon, CalendarIcon, ClockIcon, ArrowRightIcon } from "@/components/ui/icons";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const subjects = ["Pharmacology", "Medical-Surgical", "Fundamentals", "Pediatrics", "Mental Health"];

export function StudyPlanBoard() {
  const [daily, setDaily] = React.useState(40);
  const [weeklyMin, setWeeklyMin] = React.useState(210);
  const [targetDate, setTargetDate] = React.useState("2026-10-15");
  const [activeDays, setActiveDays] = React.useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [saved, setSaved] = React.useState(false);

  const toggleDay = (d: string) =>
    setActiveDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TargetIcon className="h-5 w-5 text-brand-600" /> Your goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-ink">Daily questions</label>
            <input type="range" min={10} max={100} step={5} value={daily} onChange={(e) => setDaily(Number(e.target.value))} className="mt-2 w-full accent-brand-600" />
            <p className="text-sm text-muted">{daily} questions / day</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-ink">Weekly study time</label>
            <input type="range" min={60} max={600} step={30} value={weeklyMin} onChange={(e) => setWeeklyMin(Number(e.target.value))} className="mt-2 w-full accent-brand-600" />
            <p className="text-sm text-muted">{Math.floor(weeklyMin / 60)}h {weeklyMin % 60}m / week</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-ink">Target exam date</label>
            <div className="relative mt-2">
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="input-icon" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-ink">Preferred study days</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {days.map((d) => (
                <button key={d} type="button" onClick={() => toggleDay(d)} className={`rounded-xl border px-3 py-1.5 text-sm font-semibold ${activeDays.includes(d) ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200" : "border-line text-muted"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <Button type="button" onClick={() => setSaved(true)}>
            Save study plan
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          {saved && <p className="text-sm font-semibold text-success-600"><CheckIcon className="mr-1 inline h-4 w-4" /> Plan saved (demo)</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-brand-600" /> This week
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {days.map((d, i) => {
            const on = activeDays.includes(d);
            const subject = subjects[i % subjects.length];
            return (
              <div key={d} className={`flex items-center justify-between gap-3 rounded-xl border border-line p-3 ${on ? "bg-surface" : "bg-subtle opacity-60"}`}>
                <div className="flex items-center gap-3">
                  <span className="w-10 text-sm font-bold text-ink">{d}</span>
                  {on ? (
                    <div>
                      <p className="text-sm font-semibold text-ink">{daily} Questions</p>
                      <p className="text-xs text-muted">{subject}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted">Rest day</p>
                  )}
                </div>
                {on && <ClockIcon className="h-4 w-4 text-muted" />}
              </div>
            );
          })}
          <div className="rounded-xl bg-brand-50 p-3 dark:bg-brand-900/30">
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">Weekly total</p>
            <ProgressBar value={Math.round((activeDays.length / 7) * 100)} showValue className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
