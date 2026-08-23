"use client";

import { useTheme, type Theme } from "@/components/theme/ThemeProvider";
import { Dropdown } from "@/components/ui/Dropdown";
import { SunIcon, MoonIcon, MonitorIcon, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <SunIcon className="h-4 w-4" /> },
    { value: "dark", label: "Dark", icon: <MoonIcon className="h-4 w-4" /> },
    {
      value: "system",
      label: "System",
      icon: <MonitorIcon className="h-4 w-4" />,
    },
  ];

  return (
    <Dropdown
      align="right"
      label="Change appearance"
      trigger={
        <span
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:bg-brand-50",
            className
          )}
        >
          <SunIcon className="h-5 w-5 dark:hidden" />
          <MoonIcon className="hidden h-5 w-5 dark:block" />
        </span>
      }
      items={options.map((opt) => ({
        label: opt.label,
        icon: opt.icon,
        onClick: () => setTheme(opt.value),
        description:
          opt.value === "system" ? "Match your device" : undefined,
      }))}
    />
  );
}

export function ThemeRadioGroup({
  value,
  onChange,
}: {
  value: Theme;
  onChange: (t: Theme) => void;
}) {
  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <SunIcon className="h-5 w-5" /> },
    { value: "dark", label: "Dark", icon: <MoonIcon className="h-5 w-5" /> },
    {
      value: "system",
      label: "System",
      icon: <MonitorIcon className="h-5 w-5" />,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Appearance">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors",
              active
                ? "border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-900/40 dark:text-brand-200"
                : "border-line bg-surface text-muted hover:bg-brand-50 dark:hover:bg-brand-900/30"
            )}
          >
            {opt.icon}
            {opt.label}
            {active && <CheckIcon className="h-4 w-4 text-brand-600" />}
          </button>
        );
      })}
    </div>
  );
}
