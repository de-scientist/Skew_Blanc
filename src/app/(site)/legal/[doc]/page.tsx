import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";

interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

const docs: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    updated: "2026-08-01",
    intro:
      "This privacy policy explains, in plain language, how Nursora handles information. It is provided as a template and should be reviewed by counsel before launch.",
    sections: [
      { heading: "Information we collect", body: "We collect account details you provide (such as name and email) and study activity (practice attempts, accuracy and streaks) to personalize your experience." },
      { heading: "How we use information", body: "Your activity powers performance analytics, recommendations and streak tracking. We use aggregated, anonymized data to improve the product." },
      { heading: "Your choices", body: "You can update or delete your data from Settings, and control notification and analytics preferences at any time." },
      { heading: "Data retention", body: "We retain account data while your account is active and for a limited period afterward, as described in our retention schedule." },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "2026-08-01",
    intro:
      "These terms govern your use of Nursora. This is a template and should be reviewed by counsel before launch.",
    sections: [
      { heading: "Use of the service", body: "Nursora is provided for personal exam preparation. You agree to use it lawfully and not to misuse or disrupt the service." },
      { heading: "Accounts", body: "You are responsible for keeping your account credentials secure and for activity under your account." },
      { heading: "Content", body: "Practice content is original and for preparation only. It is not affiliated with or endorsed by NCSBN or any trademark holder." },
      { heading: "Limitation of liability", body: "The service is provided as-is. Preparation results vary and Nursora does not guarantee any exam outcome." },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    updated: "2026-08-01",
    intro:
      "Our refund approach for paid plans. This summary should be reviewed by counsel before launch.",
    sections: [
      { heading: "Free trial", body: "A free account includes core practice. Paid features are clearly labeled before purchase." },
      { heading: "Refunds", body: "Eligible refunds are processed to the original payment method within a reasonable period after approval." },
      { heading: "How to request", body: "Contact support from your account email with your order details to start a refund request." },
    ],
  },
  accessibility: {
    title: "Accessibility Statement",
    updated: "2026-08-01",
    intro:
      "We aim to make Nursora usable by everyone, including keyboard and screen-reader users.",
    sections: [
      { heading: "Standards", body: "We follow WCAG-conscious practices: semantic HTML, visible focus, keyboard navigation, skip links and reduced-motion support." },
      { heading: "Compatible technologies", body: "The product is designed to work with modern browsers and common assistive technologies." },
      { heading: "Feedback", body: "If you encounter a barrier, contact us and we will work to address it." },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    updated: "2026-08-01",
    intro:
      "Important disclaimer about Nursora's relationship to official nursing exams.",
    sections: [
      { heading: "Not affiliated", body: "Nursora is an independent study tool and is not affiliated with, endorsed by, or sponsored by NCSBN, ATI, HESI or any trademark holder." },
      { heading: "Preparation only", body: "Practice exams and questions are original preparation material and are not the official exams." },
      { heading: "No guarantee", body: "Using Nursora does not guarantee a passing score on any official examination." },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const d = docs[doc];
  if (!d) return { title: "Not found" };
  return createMetadata({
    title: d.title,
    description: d.intro,
    path: `/${doc}`,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const d = docs[doc];
  if (!d) notFound();
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: d.title, path: `/${doc}` },
  ]);
  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{d.title}</h1>
        <p className="mt-1 text-xs text-muted">Last updated {d.updated}</p>
        <p className="mt-4 text-muted">{d.intro}</p>
        <div className="mt-8 space-y-6">
          {d.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-semibold text-ink">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 rounded-xl border border-line bg-subtle p-4 text-xs text-muted">
          These documents are provided as starting-point legal copy and should be reviewed by counsel before launch.
        </p>
      </div>
    </div>
  );
}
