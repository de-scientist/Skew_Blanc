"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import {
  BellIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/ui/icons";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/dashboard?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface/80 px-4 backdrop-blur lg:px-8">
      <button
        className="rounded-lg p-2 text-muted hover:bg-brand-50 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <form onSubmit={onSearch} className="relative hidden flex-1 max-w-md sm:block" role="search">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions, subjects, exams…"
          aria-label="Search"
          className="h-10 w-full rounded-xl border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="relative rounded-xl p-2.5 text-muted hover:bg-brand-50"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger-500" />
        </button>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl p-1 pr-3 hover:bg-brand-50"
        >
          <Avatar name="Jordan Student" />
          <span className="hidden text-sm font-medium text-ink sm:block">
            Jordan
          </span>
        </Link>
      </div>
    </header>
  );
}
