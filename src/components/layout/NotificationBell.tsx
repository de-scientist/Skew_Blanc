"use client";

import * as React from "react";
import { Dropdown } from "@/components/ui/Dropdown";
import { notifications } from "@/data/mock/content";
import { BellIcon, CheckIcon, BookIcon, ClipboardIcon, ChartIcon, MessageIcon, SettingsIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const catIcon: Record<string, React.ReactNode> = {
  study: <BookIcon className="h-4 w-4" />,
  exams: <ClipboardIcon className="h-4 w-4" />,
  results: <ChartIcon className="h-4 w-4" />,
  community: <MessageIcon className="h-4 w-4" />,
  system: <SettingsIcon className="h-4 w-4" />,
};

export function NotificationBell() {
  const [read, setRead] = React.useState(() => notifications.map((n) => n.read));
  const unread = read.filter((r) => !r).length;

  const items = [
    ...notifications.map((n, i) => ({
      label: n.title,
      description: n.body,
      icon: catIcon[n.category],
    })),
    {
      label: "Mark all as read",
      icon: <CheckIcon className="h-4 w-4" />,
      onClick: () => setRead(notifications.map(() => true)),
    },
  ];

  return (
    <Dropdown
      align="right"
      label="Notifications"
      trigger={
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:bg-brand-50">
          <BellIcon className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-danger-500">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger-500 opacity-75" />
            </span>
          )}
        </span>
      }
      items={items}
    />
  );
}
