import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/ui/cards";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/icons";
import { blogPosts, blogCategories } from "@/data/mock/blog";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: "Nursing exam tips, study strategies and NCLEX, ATI, HESI and RN preparation insights from the QLexNursing team.",
  path: "/blog",
  keywords: ["nursing blog", "NCLEX tips", "ATI TEAS", "HESI A2", "study tips"],
});

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);
  const jsonLd = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]);

  return (
    <div className="container-page py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading
        title="The QLexNursing blog"
        description="Practical study strategies and exam insights for nursing students."
        action={
          <div className="flex flex-wrap gap-2">
            {blogCategories.slice(0, 5).map((c) => (
              <span key={c} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">{c}</span>
            ))}
          </div>
        }
      />

      <Link href={`/blog/${featured.slug}`} className="group mt-8 block">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-56 lg:h-full">
              <ImageFrame
                src={featured.cover}
                alt={featured.title}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <Badge tone="brand">Featured · {featured.category}</Badge>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
                {featured.title}
              </h2>
              <p className="mt-2 text-muted">{featured.excerpt}</p>
              <p className="mt-4 text-xs text-muted">
                {featured.author} · {formatDate(featured.publishedAt)} · {featured.readingMinutes} min read
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
                Read article <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-10">
        <SectionHeading title="Latest posts" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <BlogCard
              key={p.slug}
              href={`/blog/${p.slug}`}
              image={p.cover}
              alt={p.title}
              category={p.category}
              title={p.title}
              excerpt={p.excerpt}
              author={p.author}
              date={formatDate(p.publishedAt)}
              readingMinutes={p.readingMinutes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
