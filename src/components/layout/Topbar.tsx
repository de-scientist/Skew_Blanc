"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { useAuth } from "@/components/auth/AuthProvider";
import { SearchIcon, MenuIcon } from "@/components/ui/icons";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  const name = user ? `${user.firstName} ${user.lastName}` : "Guest";

  return (
    <header className="sticky top-0 z-header flex h-16 items-center gap-3 border-b border-line bg-surface/80 px-4 backdrop-blur lg:px-8">
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
          placeholder="Search exams, notes, discussions…"
          aria-label="Search Nursora"
          className="input-icon"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <NotificationBell />
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-xl border border-line bg-surface p-1 pr-3 hover:bg-brand-50"
        >
          <Avatar name={name} />
          <span className="hidden text-sm font-semibold text-ink sm:block">
            {user?.firstName ?? "Guest"}
          </span>
        </Link>
      </div>
    </header>
  );
}
