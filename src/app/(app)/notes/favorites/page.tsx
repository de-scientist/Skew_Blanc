import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button";
import { NotesExplorer } from "@/components/notes/NotesExplorer";
import { NotesTabs } from "@/components/notes/NotesTabs";

export const metadata: Metadata = {
  title: "Favorite Notes",
  description: "Your saved high-value notes for faster revision.",
  robots: { index: false, follow: false },
};

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ name: "My Notes", href: "/notes" }, { name: "Favorites" }]}
        className="mb-2"
      />
      <PageHeader
        title="Favorite Notes"
        description="Save important concepts here for faster revision."
        action={
          <Link href="/notes" className={buttonVariants({ variant: "outline" })}>
            Explore My Notes
          </Link>
        }
      />
      <NotesTabs />
      <NotesExplorer view="favorites" />
    </div>
  );
}
