"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { ShieldIcon } from "@/components/ui/icons";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (status === "loading") return;
    if (status === "guest") {
      const next = encodeURIComponent(pathname);
      router.replace(`/login?next=${next}`);
      return;
    }
    setChecked(true);
  }, [status, pathname, router]);

  if (status !== "authenticated" || !checked) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <ShieldIcon className="h-6 w-6" />
        </span>
        <p className="text-sm font-medium text-muted">
          Checking your session…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
