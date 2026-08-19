import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const staticRoutes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/exams", priority: 0.9, freq: "weekly" as const },
    { path: "/resources", priority: 0.8, freq: "weekly" as const },
    { path: "/study-notes", priority: 0.7, freq: "weekly" as const },
    { path: "/forums", priority: 0.6, freq: "weekly" as const },
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
    { path: "/about", priority: 0.6, freq: "monthly" as const },
    { path: "/faq", priority: 0.8, freq: "monthly" as const },
    { path: "/contact", priority: 0.5, freq: "monthly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
    { path: "/refund-policy", priority: 0.3, freq: "yearly" as const },
    { path: "/accessibility", priority: 0.3, freq: "yearly" as const },
    { path: "/disclaimer", priority: 0.3, freq: "yearly" as const },
  ];

  const categoryRoutes = [
    "ati-teas",
    "hesi-a2",
    "rn-nursing",
    "lpn-nursing",
    "nclex-rn",
    "nclex-pn",
  ].map((slug) => ({
    path: `/exams/${slug}`,
    priority: 0.9,
    freq: "weekly" as const,
  }));

  const blogRoutes = ["how-to-build-a-nclex-study-plan", "ati-teas-math-made-simple", "clinical-judgment-for-nclex", "hesi-a2-anatomy-tips", "rn-vs-lpn-prep"].map(
    (slug) => ({ path: `/blog/${slug}`, priority: 0.6, freq: "monthly" as const })
  );

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...blogRoutes,
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
