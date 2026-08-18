"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileBottomNav } from "./MobileBottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main
          id="main-content"
          className="mx-auto w-full max-w-7xl px-4 pb-24 pt-6 lg:px-8 lg:pb-10"
        >
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
