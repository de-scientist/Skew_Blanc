import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/form";
import { LockIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Set a new password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Set a new password</h1>
        <p className="mt-1 text-sm text-muted">
          Choose a strong password you don&apos;t use elsewhere.
        </p>
      </div>
      <form className="space-y-4" action="/login">
        <Field label="New password" htmlFor="password">
          <Input id="password" type="password" name="password" required leftIcon={<LockIcon className="h-4 w-4" />} placeholder="••••••••" />
        </Field>
        <Field label="Confirm password" htmlFor="confirm">
          <Input id="confirm" type="password" name="confirm" required leftIcon={<LockIcon className="h-4 w-4" />} placeholder="••••••••" />
        </Field>
        <Button type="submit" size="lg" className="w-full">
          Update password
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </form>
      <p className="flex items-center justify-center gap-1.5 rounded-xl border border-success-200 bg-success-50 px-3 py-2 text-xs text-success-700">
        <CheckCircleIcon className="h-3.5 w-3.5" />
        Demo mode: link accepted. Set a password to finish.
      </p>
    </div>
  );
}
