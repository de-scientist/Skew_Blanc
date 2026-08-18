export const siteConfig = {
  name: "QLexNursing",
  shortName: "QLex",
  tagline: "Practice smarter. Understand your performance. Prepare with confidence.",
  description:
    "QLexNursing is a modern NCLEX-RN and RN nursing exam preparation platform. Practice exam-style questions, track your performance, and identify areas that need more attention.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://qlexnursing.vercel.app",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://api.qlexnursing.com",
  twitterHandle: "@qlexnursing",
  organization: "Skew Blanc LTD",
  locale: "en_US",
} as const;

export type SiteConfig = typeof siteConfig;
