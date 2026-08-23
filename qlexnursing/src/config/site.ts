export const siteConfig = {
  name: "Nursora",
  shortName: "Nursora",
  tagline: "Learn. Practice. Advance.",
  description:
    "Nursora is a modern nursing education and examination preparation platform. Practice exam-style questions, track your performance, follow a study plan, and advance toward your professional goals.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nursora.vercel.app",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://api.nursora.com",
  twitterHandle: "@nursora",
  organization: "Skew Blanc LTD",
  locale: "en_US",
} as const;

export type SiteConfig = typeof siteConfig;
