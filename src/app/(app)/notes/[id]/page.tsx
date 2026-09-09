import type { Metadata } from "next";
import { NoteViewerClient } from "@/components/notes/NoteViewerClient";

export const metadata: Metadata = {
  title: "Note",
  robots: { index: false, follow: false },
};

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NoteViewerClient id={id} />;
}
