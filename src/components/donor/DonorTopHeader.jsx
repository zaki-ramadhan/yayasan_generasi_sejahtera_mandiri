/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Search, Bell, PanelLeft, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DonorTopHeader({
  currentUser,
  isSidebarCollapsed,
  onToggleSidebar,
}) {
  const salutation = currentUser?.salutation ? `${currentUser.salutation} ` : "";
  const firstName = currentUser?.name ? currentUser.name.split(" ")[0] : "Donatur";
  const fullName = `${salutation}${currentUser?.name || "Donatur"}`;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Sidebar Toggle + Greeting */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={isSidebarCollapsed ? "Buka sidebar" : "Tutup sidebar"}
            className="hidden lg:flex items-center justify-center p-2 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isSidebarCollapsed ? "Perlebar Sidebar" : "Ciutkan Sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        )}

        <div>
          <h1 className="text-base sm:text-lg font-semibold text-slate-950 leading-tight">
            Assalamu&apos;alaikum, {firstName}
          </h1>
          <p className="text-sm font-normal text-slate-500 hidden sm:block">
            Berikut ringkasan rekam jejak kontribusi dan amanah kebaikan Anda
          </p>
        </div>
      </div>

      {/* Right: Search + Notifications + Profile Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Search Input Bar (Reference: Search + ⌘ K) */}
        <div className="relative hidden md:block w-56 lg:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Cari transaksi / program..."
            className="pl-9 pr-12 h-9 text-sm rounded-md border-slate-200 bg-slate-50/60 focus:bg-white transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 leading-none shadow-2xs pointer-events-none">
            ⌘ K
          </kbd>
        </div>

        {/* Notification Bell with Badge */}
        <Link
          href="/riwayat-donasi"
          className="relative p-2 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          title="Notifikasi Penyaluran"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
        </Link>

        {/* User Avatar */}
        <Link
          href="/profil"
          className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
          title={fullName}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-300 flex items-center justify-center">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="font-medium text-sm text-slate-700">
                {currentUser?.initials || "U"}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
