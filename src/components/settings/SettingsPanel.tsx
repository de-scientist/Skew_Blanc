"use client";

import * as React from "react";
import { useTheme, type Theme } from "@/components/theme/ThemeProvider";
import { ThemeRadioGroup } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { CheckIcon, ArrowRightIcon, LockIcon, MailIcon, BellIcon, ShieldIcon } from "@/components/ui/icons";

function Toggle({ label, desc, defaultOn = false }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-brand-600" : "bg-track"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

export function SettingsPanel() {
  const { theme, setTheme } = useTheme();
  const [pwSaved, setPwSaved] = React.useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-brand-600"><ShieldIcon className="h-5 w-5" /></span> Appearance
          </CardTitle>
          <CardDescription>Choose how Nursora looks. System follows your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeRadioGroup value={theme as Theme} onChange={setTheme} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-brand-600"><BellIcon className="h-5 w-5" /></span> Notifications
          </CardTitle>
          <CardDescription>Control what we email and surface in your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-line">
          <Toggle label="Email notifications" desc="Summaries and streak reminders." defaultOn />
          <Toggle label="Study reminders" desc="A nudge when your daily goal is open." defaultOn />
          <Toggle label="Exam updates" desc="New exams and question sets." />
          <Toggle label="Community notifications" desc="Replies and mentions in forums." defaultOn />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-brand-600"><LockIcon className="h-5 w-5" /></span> Security
          </CardTitle>
          <CardDescription>Keep your account safe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="password" placeholder="New password" className="input" />
            <input type="password" placeholder="Confirm new password" className="input" />
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" onClick={() => setPwSaved(true)}>
              Change password
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            {pwSaved && (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-success-600">
                <CheckIcon className="h-4 w-4" /> Updated (demo)
              </span>
            )}
          </div>
          <p className="text-xs text-muted">Active sessions: 1 device (this browser).</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-brand-600"><ShieldIcon className="h-5 w-5" /></span> Privacy
          </CardTitle>
          <CardDescription>Your data preferences.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-line">
          <Toggle label="Personalized recommendations" desc="Use my performance to suggest focus areas." defaultOn />
          <Toggle label="Anonymous usage analytics" desc="Help improve the product." defaultOn />
          <div className="flex items-center justify-between gap-4 py-3">
            <p className="text-sm font-semibold text-danger-600">Delete account</p>
            <Button variant="danger" size="sm" type="button">Request deletion</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
