"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/config/nav";
import { cn } from "@/lib/utils";
import { CloseIcon, SparkIcon } from "@/components/ui/icons";

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-overlay bg-ink/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-drawer flex w-64 flex-col border-r border-line bg-surface transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Primary navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-ink"
            onClick={onClose}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <SparkIcon className="h-5 w-5" />
            </span>
            Nursora
          </Link>
          <button
            className="rounded-lg p-1.5 text-muted hover:bg-brand-50 lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      item.href !== "/profile" &&
                      item.href !== "/study-notes" &&
                      pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
                            : "text-muted hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-200"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line p-4">
          <div className="rounded-xl bg-brand-50 p-4 dark:bg-brand-900/30">
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
              Need a study plan?
            </p>
            <p className="mt-1 text-xs text-brand-700/80 dark:text-brand-200/70">
              Follow your recommended focus area on the dashboard.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
