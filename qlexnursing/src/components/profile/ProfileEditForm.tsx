"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Field } from "@/components/auth/LoginForm";
import { CheckIcon, ArrowRightIcon, UserIcon, MailIcon, PhoneIcon, GraduationIcon } from "@/components/ui/icons";
import type { NursingPath } from "@/types/domain";

export function ProfileEditForm() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    nursingLevel: (user?.nursingLevel ?? "RN") as NursingPath,
    institution: user?.institution ?? "",
    studyGoal: user?.studyGoal ?? "",
    preferredLanguage: user?.preferredLanguage ?? "English",
    timezone: user?.timezone ?? "America/New_York",
  });

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateProfile(form);
    setSaved(true);
    setTimeout(() => router.push("/profile"), 700);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-subtle p-4">
        <Avatar name={`${form.firstName} ${form.lastName}`} className="h-16 w-16 text-xl" />
        <div>
          <p className="text-sm font-semibold text-ink">Profile photo</p>
          <p className="text-xs text-muted">Upload support is coming soon. Initials are used for now.</p>
        </div>
        <Button type="button" variant="outline" size="sm" className="ml-auto" disabled>
          Replace
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName">
          <div className="relative">
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input id="firstName" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="input-icon" />
          </div>
        </Field>
        <Field label="Last name" htmlFor="lastName">
          <input id="lastName" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="input" />
        </Field>
        <Field label="Email" htmlFor="email">
          <div className="relative">
            <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input-icon" />
          </div>
        </Field>
        <Field label="Phone" htmlFor="phone">
          <div className="relative">
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input id="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input-icon" placeholder="+1 (555) 000-0000" />
          </div>
        </Field>
        <Field label="Nursing level" htmlFor="nursingLevel">
          <div className="relative">
            <GraduationIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <select id="nursingLevel" value={form.nursingLevel} onChange={(e) => set("nursingLevel", e.target.value)} className="input-icon">
              <option value="RN">RN</option>
              <option value="LPN">LPN</option>
              <option value="Pre-Nursing">Pre-Nursing</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </Field>
        <Field label="Institution" htmlFor="institution">
          <input id="institution" value={form.institution} onChange={(e) => set("institution", e.target.value)} className="input" placeholder="School of Nursing" />
        </Field>
      </div>

      <Field label="Study goal" htmlFor="studyGoal">
        <input id="studyGoal" value={form.studyGoal} onChange={(e) => set("studyGoal", e.target.value)} className="input" placeholder="Answer 40 questions on weekdays" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred language" htmlFor="lang">
          <select id="lang" value={form.preferredLanguage} onChange={(e) => set("preferredLanguage", e.target.value)} className="input">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </Field>
        <Field label="Timezone" htmlFor="tz">
          <select id="tz" value={form.timezone} onChange={(e) => set("timezone", e.target.value)} className="input">
            <option>America/New_York</option>
            <option>America/Chicago</option>
            <option>America/Denver</option>
            <option>America/Los_Angeles</option>
          </select>
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit">
          Save changes
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-success-600">
            <CheckIcon className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
