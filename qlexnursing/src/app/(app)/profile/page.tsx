import type { Metadata } from "next";
import { ProfileView } from "@/components/profile/ProfileView";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Profile",
  description: "Your Nursora profile and study snapshot.",
  path: "/profile",
});

export default function ProfilePage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProfileView />
    </>
  );
}
