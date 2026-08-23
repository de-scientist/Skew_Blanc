import type { Metadata } from "next";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/Button";
import { CheckCircleIcon, MailIcon, ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Verify your email",
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <div className="space-y-5 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-50 text-success-600">
        <MailIcon className="h-7 w-7" />
      </span>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Check your inbox</h1>
        <p className="mt-2 text-sm text-muted">
          We sent a verification link to your email. Confirm it to unlock your
          full Nursora experience.
        </p>
      </div>
      <div className="rounded-xl border border-line bg-subtle px-3 py-3 text-sm text-muted">
        <CheckCircleIcon className="mr-1 inline h-4 w-4 text-success-600" />
        Demo mode: verification is simulated. You can continue right away.
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/dashboard" className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}>
          Go to dashboard
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link href="/login" className="text-sm font-semibold text-brand-700 hover:underline">
          Resend verification email
        </Link>
      </div>
    </div>
  );
}
