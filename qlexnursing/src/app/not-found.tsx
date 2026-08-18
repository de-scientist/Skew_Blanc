import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <p className="text-6xl font-bold text-brand-700">404</p>
      <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-md text-muted">
        The page you are looking for doesn’t exist or may have been moved.
      </p>
      <Link href="/" className={buttonVariants({ variant: "primary" })}>
        Back to home
      </Link>
    </main>
  );
}
