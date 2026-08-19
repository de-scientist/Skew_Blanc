import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { forumTopics } from "@/data/mock/content";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Avatar } from "@/components/ui/Avatar";
import { ReplyBox } from "@/components/forums/ReplyBox";
import { MessageIcon, EyeIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = forumTopics.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic not found" };
  return { title: topic.title, robots: { index: false, follow: false } };
}

const mockReplies = [
  { initials: "EO", name: "Amara O.", body: "What helped me was drilling one drug class per day and teaching it back out loud. Repetition beat rereading.", likes: 9 },
  { initials: "DR", name: "Daniel R.", body: "Second this. I also made a single-page cheat sheet per system — summarizing forced me to actually understand it.", likes: 6 },
];

export default async function ForumTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = forumTopics.find((t) => t.slug === slug);
  if (!topic) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ name: "Dashboard", href: "/dashboard" }, { name: "Forums", href: "/forums" }, { name: topic.title }]} className="mb-2" />
      <Card>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{topic.category}</Badge>
            {topic.pinned && <Badge tone="warning">Pinned</Badge>}
            {topic.solved && <Badge tone="success">Solved</Badge>}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink">{topic.title}</h1>
          <p className="mt-2 text-muted">{topic.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Avatar name={topic.author} className="h-8 w-8 text-xs" /> {topic.author}
            </span>
            <span className="inline-flex items-center gap-1"><MessageIcon className="h-4 w-4" /> {topic.replies} replies</span>
            <span className="inline-flex items-center gap-1"><EyeIcon className="h-4 w-4" /> {topic.views} views</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockReplies.map((r, i) => (
          <Card key={i}>
            <CardContent className="flex gap-3">
              <Avatar name={r.name} className="h-9 w-9 text-xs" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-muted">♥ {r.likes}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{r.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ReplyBox topic={topic.title} />

      <Link href="/forums" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
        <ArrowRightIcon className="h-4 w-4 rotate-180" /> Back to forums
      </Link>
    </div>
  );
}
