import { NotesProvider } from "@/components/notes/NotesProvider";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return <NotesProvider>{children}</NotesProvider>;
}
