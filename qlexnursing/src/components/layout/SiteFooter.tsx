import Link from "next/link";
import { SparkIcon, FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon, MailIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

const columns = [
  {
    title: "QLexNursing",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Mission", href: "/about" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Exams",
    links: [
      { label: "ATI TEAS", href: "/exams/ati-teas" },
      { label: "HESI A2", href: "/exams/hesi-a2" },
      { label: "RN Nursing", href: "/exams/rn-nursing" },
      { label: "LPN Nursing", href: "/exams/lpn-nursing" },
      { label: "NCLEX-RN", href: "/exams/nclex-rn" },
      { label: "NCLEX-PN", href: "/exams/nclex-pn" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Study Notes", href: "/study-notes" },
      { label: "Flashcards", href: "/study-notes" },
      { label: "Blog", href: "/blog" },
      { label: "Forums", href: "/forums" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white">
                <SparkIcon className="h-5 w-5" />
              </span>
              QLex<span className="text-brand-600">Nursing</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Prepare smarter, practice confidently, and know where you stand.
              Nursing exam preparation built around the way you actually learn.
            </p>
            <form className="mt-6 max-w-sm" action="/contact" method="get">
              <p className="text-sm font-semibold text-ink">
                Get smarter about your study
              </p>
              <p className="mt-1 text-xs text-muted">
                Nursing exam tips and platform updates. No spam.
              </p>
              <div className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    required
                    name="newsletter"
                    placeholder="you@email.com"
                    aria-label="Email address"
                    className="h-11 w-full rounded-xl border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Subscribe
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 flex items-center gap-1 text-xs text-success-600">
                <CheckIcon className="h-3.5 w-3.5" /> We respect your inbox.
              </p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-bold text-ink">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-brand-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Skew Blanc LTD. QLexNursing is an
            independent study tool and is not affiliated with, endorsed by, or
            sponsored by NCSBN or any trademark holder.
          </p>
          <div className="flex items-center gap-2">
            {[FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
