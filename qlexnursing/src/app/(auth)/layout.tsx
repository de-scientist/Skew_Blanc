import Link from "next/link";
import { SparkIcon } from "@/components/ui/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand-400/25 blur-3xl" />
        <Link href="/" className="flex items-center gap-2 font-extrabold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
            <SparkIcon className="h-5 w-5" />
          </span>
          QLex<span className="text-accent-300">Nursing</span>
        </Link>
        <div className="relative">
          <h2 className="max-w-md text-3xl font-extrabold leading-tight text-white">
            Prepare smarter. Practice confidently. Know where you stand.
          </h2>
          <p className="mt-4 max-w-md text-brand-100">
            Join thousands of nursing students building real exam readiness with
            QLexNursing — realistic questions, clear rationales and progress you
            can see.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-brand-100">
            {[
              "Practice across ATI, HESI, RN, LPN and NCLEX",
              "Detailed rationales for every answer",
              "Performance analytics and study streaks",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-brand-200">
          © {new Date().getFullYear()} Skew Blanc LTD. Independent study tool, not
          affiliated with NCSBN.
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
