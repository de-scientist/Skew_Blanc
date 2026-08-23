import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buttonVariants } from "@/components/ui/Button";
import { BlogCard } from "@/components/ui/cards";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { blogPosts, getBlogPost } from "@/data/mock/blog";
import { createMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { BookIcon, ClockIcon } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found" };
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    keywords: [post.category, "nursing study"],
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
    ]),
    articleJsonLd({
      title: post.title,
      description: post.excerpt,
      author: post.author,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
    }),
  ];

  return (
    <article className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} className="mb-6" />
      <div className="mx-auto max-w-3xl">
        <Badge tone="brand">{post.category}</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1"><BookIcon className="h-4 w-4" /> {post.author}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><ClockIcon className="h-4 w-4" /> {post.readingMinutes} min</span>
        </div>
      </div>

      <ImageFrame
        src={post.cover}
        alt={post.title}
        ratio="wide"
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="mt-6 rounded-3xl"
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink">
        <p className="text-lg font-medium text-ink">{post.excerpt}</p>
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface p-4">
          <span className="text-sm font-semibold text-ink">Share</span>
          <span className="text-sm text-muted">· Help a classmate by passing this along.</span>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-10 max-w-3xl">
          <h2 className="text-lg font-bold text-ink">Related articles</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <BlogCard
                key={r.slug}
                href={`/blog/${r.slug}`}
                image={r.cover}
                alt={r.title}
                category={r.category}
                title={r.title}
                excerpt={r.excerpt}
                author={r.author}
                date={formatDate(r.publishedAt)}
                readingMinutes={r.readingMinutes}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-3xl">
        <Link href="/blog" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Back to blog
        </Link>
      </div>
    </article>
  );
}
