"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Dropdown } from "@/components/ui/Dropdown";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";
import {
  SparkIcon,
  MenuIcon,
  CloseIcon,
  ChevronRightIcon,
  DashboardIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  BookIcon,
  ClipboardIcon,
  LayersIcon,
  MessageIcon,
  FileTextIcon,
  InfoIcon,
  HelpIcon,
  MailIcon,
} from "@/components/ui/icons";

const primaryNav = [
  { label: "Exams", href: "/exams" },
  { label: "Resources", href: "/resources" },
  { label: "Study Notes", href: "/study-notes" },
  { label: "Forums", href: "/forums" },
  { label: "Blog", href: "/blog" },
];

const moreNav = [
  { label: "About", href: "/about", icon: <InfoIcon className="h-4 w-4" /> },
  { label: "FAQs", href: "/faq", icon: <HelpIcon className="h-4 w-4" /> },
  { label: "Contact", href: "/contact", icon: <MailIcon className="h-4 w-4" /> },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, status, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const drawerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const panel = drawerRef.current?.querySelector<HTMLElement>(
      "[data-autofocus], a[href], button"
    );
    panel?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const root = drawerRef.current;
        if (!root) return;
        const f = root.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input, [tabindex]:not([tabindex='-1'])"
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-header border-b border-line bg-surface/80 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-card">
            <SparkIcon className="h-5 w-5" />
          </span>
          QLex<span className="text-brand-600">Nursing</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "text-brand-700"
                  : "text-muted hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Dropdown
            align="right"
            label="More pages"
            trigger={
              <span
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  moreNav.some((m) => isActive(m.href))
                    ? "text-brand-700"
                    : "text-muted hover:text-ink"
                )}
              >
                More
                <ChevronRightIcon className="h-4 w-4 rotate-90" />
              </span>
            }
            items={moreNav.map((m) => ({ label: m.label, href: m.href, icon: m.icon }))}
          />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          {status === "authenticated" && user ? (
            <Dropdown
              align="right"
              label="Account menu"
              trigger={
                <span className="flex items-center gap-2 rounded-xl border border-line bg-surface py-1 pl-1 pr-3 hover:bg-brand-50">
                  <Avatar name={`${user.firstName} ${user.lastName}`} />
                  <span className="hidden text-sm font-semibold text-ink sm:block">
                    {user.firstName}
                  </span>
                </span>
              }
              items={[
                {
                  label: "Dashboard",
                  href: "/dashboard",
                  icon: <DashboardIcon className="h-4 w-4" />,
                },
                {
                  label: "Profile",
                  href: "/profile",
                  icon: <UserIcon className="h-4 w-4" />,
                },
                {
                  label: "Settings",
                  href: "/settings",
                  icon: <SettingsIcon className="h-4 w-4" />,
                },
                {
                  label: "Sign out",
                  onClick: logout,
                  icon: <LogOutIcon className="h-4 w-4" />,
                  tone: "danger",
                },
              ]}
            />
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "hidden sm:inline-flex",
                })}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                Get started
              </Link>
            </>
          )}
          <button
            className="rounded-lg p-2 text-muted hover:bg-brand-50 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        </header>
      )}
      {open && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-drawer lg:hidden"
        >
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-surface shadow-card-hover">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span className="flex items-center gap-2 font-extrabold text-ink">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <SparkIcon className="h-4 w-4" />
                </span>
                QLexNursing
              </span>
              <button
                className="rounded-lg p-1.5 text-muted hover:bg-brand-50"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {[
                { label: "Home", href: "/", icon: <SparkIcon className="h-5 w-5" /> },
                ...primaryNav.map((p) => ({
                  label: p.label,
                  href: p.href,
                  icon:
                    p.href === "/exams" ? (
                      <ClipboardIcon className="h-5 w-5" />
                    ) : p.href === "/resources" ? (
                      <LayersIcon className="h-5 w-5" />
                    ) : p.href === "/study-notes" ? (
                      <BookIcon className="h-5 w-5" />
                    ) : p.href === "/forums" ? (
                      <MessageIcon className="h-5 w-5" />
                    ) : (
                      <FileTextIcon className="h-5 w-5" />
                    ),
                })),
                ...moreNav.map((m) => ({ ...m })),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-brand-50"
                >
                  <span className="text-muted">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between rounded-xl px-3 py-3">
                <span className="text-sm font-semibold text-ink">Appearance</span>
                <ThemeToggle />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {status === "authenticated" ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ variant: "primary", size: "md" })}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className={buttonVariants({ variant: "outline", size: "md" })}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className={buttonVariants({ variant: "primary", size: "md" })}
                    >
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
