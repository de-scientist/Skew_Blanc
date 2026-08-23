import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Edit profile",
  robots: { index: false, follow: false },
};

export default function ProfileEditPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit profile"
        description="Update your personal and study information."
        breadcrumbs={[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Profile", href: "/profile" },
          { name: "Edit" },
        ]}
      />
      <Card className="max-w-3xl">
        <CardContent>
          <ProfileEditForm />
        </CardContent>
      </Card>
    </div>
  );
}
