"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/auth/LoginForm";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, CheckIcon, AlertIcon, UserIcon } from "@/components/ui/icons";
import type { ExamGoal, NursingPath } from "@/types/domain";

function passwordStrength(pw: string): { score: number; label: string; tone: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "Too weak", tone: "bg-danger-500" },
    { label: "Weak", tone: "bg-danger-500" },
    { label: "Fair", tone: "bg-warning-500" },
    { label: "Good", tone: "bg-accent-500" },
    { label: "Strong", tone: "bg-success-500" },
  ];
  return { score, ...map[score] };
}

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    nursingLevel: "RN" as NursingPath,
    primaryGoal: "NCLEX-RN" as ExamGoal,
  });
  const [show, setShow] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Enter your first name.";
    if (!form.lastName.trim()) e.lastName = "Enter your last name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.password.length < 8) e.password = "Use at least 8 characters.";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    if (!agree) e.agree = "Please accept the terms to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        nursingLevel: form.nursingLevel,
        primaryGoal: form.primaryGoal,
      });
      router.replace("/onboarding");
    } catch {
      setErrors({ form: "Something went wrong creating your account." });
      setLoading(false);
    }
  }

  const strength = passwordStrength(form.password);

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Create your account</h1>
        <p className="mt-1 text-sm text-muted">
          Start free. Personalize your study plan in the next step.
        </p>
      </div>

      {errors.form && (
        <div className="flex items-center gap-2 rounded-xl border border-danger-200 bg-danger-50 px-3 py-2.5 text-sm text-danger-700">
          <AlertIcon className="h-4 w-4" /> {errors.form}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="First name" htmlFor="firstName">
          <div className="relative">
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input id="firstName" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="input-icon" placeholder="Jane" aria-invalid={!!errors.firstName} />
          </div>
          {errors.firstName && <p className="mt-1 text-xs text-danger-600">{errors.firstName}</p>}
        </Field>
        <Field label="Last name" htmlFor="lastName">
          <input id="lastName" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="input" placeholder="Doe" aria-invalid={!!errors.lastName} />
          {errors.lastName && <p className="mt-1 text-xs text-danger-600">{errors.lastName}</p>}
        </Field>
      </div>

      <Field label="Email" htmlFor="email">
        <div className="relative">
          <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input-icon" placeholder="you@email.com" aria-invalid={!!errors.email} />
        </div>
        {errors.email && <p className="mt-1 text-xs text-danger-600">{errors.email}</p>}
      </Field>

      <Field label="Password" htmlFor="password">
        <div className="relative">
          <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="password" type={show ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} className="input-icon pr-10" placeholder="At least 8 characters" aria-invalid={!!errors.password} />
          <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted hover:bg-brand-50">
            {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
        {form.password && (
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-track">
              <div className={`h-full rounded-full ${strength.tone}`} style={{ width: `${(strength.score / 4) * 100}%` }} />
            </div>
            <p className="mt-1 text-xs text-muted">Strength: {strength.label}</p>
          </div>
        )}
        {errors.password && <p className="mt-1 text-xs text-danger-600">{errors.password}</p>}
      </Field>

      <Field label="Confirm password" htmlFor="confirm">
        <div className="relative">
          <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="confirm" type={show ? "text" : "password"} value={form.confirm} onChange={(e) => set("confirm", e.target.value)} className="input-icon" placeholder="Re-enter password" aria-invalid={!!errors.confirm} />
        </div>
        {errors.confirm && <p className="mt-1 text-xs text-danger-600">{errors.confirm}</p>}
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Nursing level" htmlFor="nursingLevel">
          <select id="nursingLevel" value={form.nursingLevel} onChange={(e) => set("nursingLevel", e.target.value)} className="input">
            <option value="RN">RN</option>
            <option value="LPN">LPN</option>
            <option value="Pre-Nursing">Pre-Nursing</option>
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field label="Exam goal" htmlFor="primaryGoal">
          <select id="primaryGoal" value={form.primaryGoal} onChange={(e) => set("primaryGoal", e.target.value)} className="input">
            <option value="ATI">ATI</option>
            <option value="HESI">HESI</option>
            <option value="NCLEX-RN">NCLEX-RN</option>
            <option value="NCLEX-PN">NCLEX-PN</option>
            <option value="RN Nursing">RN Nursing</option>
            <option value="LPN Nursing">LPN Nursing</option>
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-500" />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="font-semibold text-brand-700 hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-semibold text-brand-700 hover:underline">Privacy Policy</Link>.
        </span>
      </label>
      {errors.agree && <p className="text-xs text-danger-600">{errors.agree}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
        {!loading && <ArrowRightIcon className="h-4 w-4" />}
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
