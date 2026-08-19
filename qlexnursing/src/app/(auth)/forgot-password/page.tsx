import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MailIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import { Field } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Forgot password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Reset your password</h1>
        <p className="mt-1 text-sm text-muted">
          Enter your email and we&apos;ll send secure reset instructions.
        </p>
      </div>
      <form
        className="space-y-4"
        action="/reset-password"
      >
        <Field label="Email" htmlFor="email">
          <div className="relative">
            <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input id="email" type="email" name="email" required className="input-icon" placeholder="you@email.com" />
          </div>
        </Field>
        <Button type="submit" size="lg" className="w-full">
          Send reset link
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </form>
      <p className="text-center text-sm text-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:underline">Back to sign in</Link>
      </p>
      <p className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-subtle px-3 py-2 text-xs text-muted">
        <CheckIcon className="h-3.5 w-3.5 text-success-600" />
        Demo mode: no email is actually sent.
      </p>
    </div>
  );
}
