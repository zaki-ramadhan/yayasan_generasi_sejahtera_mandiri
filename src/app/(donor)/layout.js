"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DonorSidebarNav } from "@/components/donor/DonorSidebarNav";
import { DonorMobileHeader } from "@/components/donor/DonorMobileHeader";
import { DonorTopHeader } from "@/components/donor/DonorTopHeader";

const SIDEBAR_COLLAPSED_KEY = "ygsm_donor_sidebar_collapsed";

export default function DonorLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, isAuthenticated } = useCurrentUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Initialize collapsed preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (saved !== null) {
        setIsSidebarCollapsed(saved === "true");
      }
    } catch {}
  }, []);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {}
      return next;
    });
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Route guard: Redirect guest to login
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated && typeof window !== "undefined") {
        const stored = localStorage.getItem("ygsm_auth_user");
        if (!stored) {
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router, pathname]);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col lg:flex-row">
      {/* 1. Mobile Header (Visible only on < lg) */}
      <DonorMobileHeader
        currentUser={currentUser}
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {/* 2. Mobile Drawer Backdrop & Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Desktop & Mobile Responsive Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white transform transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 lg:z-30 shrink-0 ${
          isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full"
        } ${isSidebarCollapsed ? "lg:w-20" : "lg:w-72"}`}
      >
        <DonorSidebarNav
          currentUser={currentUser}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </aside>

      {/* 3. Main Content Area with Integrated Top Header */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <DonorTopHeader
          currentUser={currentUser}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleCollapse}
        />
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
