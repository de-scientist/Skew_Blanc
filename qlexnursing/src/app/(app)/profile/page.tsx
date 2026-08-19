import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { buttonVariants } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { mockUser } from "@/data/mock/user";
import { mockStreak } from "@/data/mock/user";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { FlameIcon, ArrowRightIcon, UserIcon, SettingsIcon, MailIcon, PhoneIcon, GraduationIcon } from "@/components/ui/icons";

export const metadata: Metadata = createMetadata({
  title: "Profile",
  description: "Your QLexNursing profile and study snapshot.",
  path: "/profile",
});

export default function ProfilePage() {
  const u = mockUser;
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
  ]);
  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        title="Your profile"
        description="How your account and study preferences look to you."
        breadcrumbs={[{ name: "Dashboard", href: "/dashboard" }, { name: "Profile" }]}
        action={
          <div className="flex gap-2">
            <Link href="/profile/edit" className={buttonVariants({ variant: "primary", size: "sm" })}>
              <UserIcon className="h-4 w-4" /> Edit profile
            </Link>
            <Link href="/settings" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <SettingsIcon className="h-4 w-4" /> Settings
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center text-center">
            <Avatar name={`${u.firstName} ${u.lastName}`} className="h-20 w-20 text-2xl" />
            <h2 className="mt-4 text-xl font-bold text-ink">
              {u.firstName} {u.lastName}
            </h2>
            <p className="text-sm text-muted">{u.nursingLevel} Student</p>
            <Badge tone="brand" className="mt-2">{u.primaryGoal}</Badge>
            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <div className="rounded-xl bg-subtle p-3">
                <p className="text-xs text-muted">Study streak</p>
                <p className="mt-1 text-lg font-bold text-ink">🔥 {mockStreak.current} days</p>
              </div>
              <div className="rounded-xl bg-subtle p-3">
                <p className="text-xs text-muted">Primary goal</p>
                <p className="mt-1 text-lg font-bold text-ink">{u.primaryGoal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-base font-semibold text-ink">Account details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail icon={<MailIcon className="h-4 w-4" />} label="Email" value={u.email} />
                <Detail icon={<PhoneIcon className="h-4 w-4" />} label="Phone" value={u.phone ?? "—"} />
                <Detail icon={<GraduationIcon className="h-4 w-4" />} label="Nursing level" value={u.nursingLevel} />
                <Detail icon={<GraduationIcon className="h-4 w-4" />} label="Institution" value={u.institution ?? "—"} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-base font-semibold text-ink">Study preferences</h3>
              <p className="mt-2 text-sm text-muted">{u.studyGoal}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="neutral">Language: {u.preferredLanguage}</Badge>
                <Badge tone="neutral">Timezone: {u.timezone}</Badge>
              </div>
              <Link href="/profile/edit" className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-4" })}>
                Update preferences
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-line p-3">
      <span className="mt-0.5 text-muted">{icon}</span>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
