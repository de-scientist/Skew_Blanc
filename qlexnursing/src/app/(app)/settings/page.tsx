import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your appearance, notifications, security and privacy."
        breadcrumbs={[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Settings" },
        ]}
      />
      <div className="max-w-3xl">
        <SettingsPanel />
      </div>
    </div>
  );
}
