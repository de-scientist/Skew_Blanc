"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/form";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, AlertIcon, CheckIcon } from "@/components/ui/icons";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await login({ email, password, remember });
      router.replace(next && next.startsWith("/") ? next : "/dashboard");
    } catch {
      setError("We couldn't sign you in. Please check your details and try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">
          Sign in to continue your nursing exam preparation.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-danger-200 bg-danger-50 px-3 py-2.5 text-sm text-danger-700">
          <AlertIcon className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <Field label="Email" htmlFor="email">
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          leftIcon={<MailIcon className="h-4 w-4" />}
          invalid={!!error}
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <div className="relative">
          <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            id="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-icon pr-10"
            invalid={!!error}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted hover:bg-brand-50"
          >
            {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
      </Field>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-muted">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-500"
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="font-semibold text-brand-700 hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
        {!loading && <ArrowRightIcon className="h-4 w-4" />}
      </Button>

      <p className="text-center text-sm text-muted">
        New to Nursora?{" "}
        <Link href="/register" className="font-semibold text-brand-700 hover:underline">
          Create a free account
        </Link>
      </p>

      <p className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-subtle px-3 py-2 text-xs text-muted">
        <CheckIcon className="h-3.5 w-3.5 text-success-600" />
        Demo mode: any email and password will sign you in.
      </p>
    </form>
  );
}

export { Field } from "@/components/ui/form";
