import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { SparkIcon } from "@/components/ui/icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <SparkIcon className="h-5 w-5" />
          </span>
          QLexNursing
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/exams/nclex-rn" className="hover:text-brand-700">
            NCLEX-RN
          </Link>
          <Link href="/exams/rn-nursing" className="hover:text-brand-700">
            RN Nursing
          </Link>
          <Link href="/dashboard" className="hover:text-brand-700">
            Dashboard
          </Link>
        </nav>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "primary", size: "sm" })}
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
