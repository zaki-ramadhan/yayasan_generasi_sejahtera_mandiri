/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  User,
  CalendarHeart,
  HeartHandshake,
  FileText,
  Calculator,
  ArrowLeft,
  LogOut,
  ChevronRight,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { logoutUser } from "@/services/authService";
import { cn } from "@/lib/utils";

export function DonorSidebarNav({
  currentUser,
  isCollapsed = false,
  onToggleCollapse,
  onCloseMobile,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    if (onCloseMobile) onCloseMobile();
    router.push("/");
  };

  const mainNavItems = [
    {
      label: "Dashboard Ikhtisar",
      href: "/dashboard-donatur",
      icon: LayoutDashboard,
      description: "Ringkasan kontribusi kebaikan",
    },
    {
      label: "Riwayat Donasi",
      href: "/riwayat-donasi",
      icon: FileSpreadsheet,
      description: "Daftar transaksi & kuitansi",
    },
    {
      label: "Profil Saya",
      href: "/profil",
      icon: User,
      description: "Data diri, bank & sandi",
    },
    {
      label: "Donasi Rutin",
      href: "/donasi-rutin",
      icon: CalendarHeart,
      description: "Komitmen sedekah otomatis",
    },
  ];

  const exploreNavItems = [
    {
      label: "Program Kebaikan",
      href: "/program",
      icon: HeartHandshake,
    },
    {
      label: "Laporan Akuntabilitas",
      href: "/laporan",
      icon: FileText,
    },
    {
      label: "Kalkulator Zakat",
      href: "/kalkulator-zakat",
      icon: Calculator,
    },
  ];

  const isStaff = currentUser?.role && currentUser.role !== "DONOR";

  const salutation = currentUser?.salutation ? `${currentUser.salutation} ` : "";
  const displayName = `${salutation}${currentUser?.name || "Donatur"}`;

  return (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-200 transition-all duration-200">
      {/* Top Section */}
      <div className={cn("space-y-5", isCollapsed ? "p-3" : "p-5")}>
        {/* Brand Header & Toggle */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <Link
            href="/"
            onClick={onCloseMobile}
            className={cn(
              "flex items-center group",
              isCollapsed ? "justify-center w-full" : "gap-3"
            )}
            title="Kembali ke Beranda"
          >
            <div className="relative w-9 h-9 rounded-md overflow-hidden bg-white shrink-0 p-0.5 border border-slate-200 shadow-2xs flex items-center justify-center">
              <Image
                src="/logo_yayasan_GSM.png"
                alt="Logo YGSM"
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-xs"
              />
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-semibold text-sm block text-slate-950 leading-tight group-hover:text-primary transition-colors">
                  Portal Donatur
                </span>
                <span className="text-sm font-normal text-slate-500 block">
                  Yayasan GSM
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Toggle Button */}
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? "Buka sidebar" : "Tutup sidebar"}
              className={cn(
                "hidden lg:flex items-center justify-center p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer",
                isCollapsed && "mx-auto mt-2"
              )}
              title={isCollapsed ? "Perlebar Sidebar" : "Ciutkan Sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* User Identity Mini Card (Expanded Mode) */}
        {!isCollapsed && currentUser && (
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 flex items-center justify-center">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-medium text-sm text-slate-700">
                    {currentUser.initials || "U"}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-slate-950 truncate leading-snug">
                  {displayName}
                </p>
                <p className="text-sm font-normal text-slate-500 truncate leading-snug">
                  {currentUser.email || "Donatur Terdaftar"}
                </p>
              </div>
            </div>

            {isStaff && (
              <Link
                href="/dashboard"
                onClick={onCloseMobile}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-purple-900 text-sm font-medium transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-purple-700" />
                  <span>Akses Dashboard Pengurus</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
              </Link>
            )}
          </div>
        )}

        {/* User Avatar Mini (Collapsed Mode) */}
        {isCollapsed && currentUser && (
          <div className="flex justify-center" title={displayName}>
            <Link
              href="/profil"
              onClick={onCloseMobile}
              className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0 flex items-center justify-center hover:ring-2 hover:ring-primary/20 transition-all"
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-medium text-sm text-slate-700">
                  {currentUser.initials || "U"}
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Main Donor Navigation */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-2 text-sm font-medium text-slate-400">
              Menu Utama
            </p>
          )}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-colors",
                    isCollapsed
                      ? "justify-center p-2.5"
                      : "gap-3 px-3 py-2.5",
                    isActive
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-emerald-700" : "text-slate-500"
                    )}
                  />
                  {!isCollapsed && <span className="flex-1">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Foundation Exploration Links */}
        <div className="space-y-1 pt-1">
          {!isCollapsed && (
            <p className="px-2 text-sm font-medium text-slate-400">
              Jelajahi Program
            </p>
          )}
          <nav className="space-y-1">
            {exploreNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-50 transition-colors",
                    isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2"
                  )}
                >
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Motivation Card (Reference: Get more with BankLY) */}
        {!isCollapsed && (
          <div className="p-3.5 rounded-lg border border-emerald-100 bg-emerald-50/50 space-y-2">
            <h3 className="text-emerald-950 font-semibold text-sm">
              Sedekah Rutin Subuh
            </h3>
            <p className="text-sm font-normal text-slate-600 leading-relaxed">
              Jaga istiqomah kebaikan setiap hari dengan sedekah otomatis untuk yatim dhuafa.
            </p>
            <Link
              href="/donasi-rutin"
              onClick={onCloseMobile}
              className="inline-flex items-center justify-center w-full py-1.5 px-3 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium transition-colors"
            >
              Aktifkan Sekarang
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div
        className={cn(
          "border-t border-slate-200 bg-slate-50/50",
          isCollapsed ? "p-3 space-y-2 flex flex-col items-center" : "p-4 space-y-1"
        )}
      >
        <Link
          href="/"
          onClick={onCloseMobile}
          title="Kembali ke Beranda Utama"
          className={cn(
            "flex items-center rounded-lg text-sm font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors",
            isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2"
          )}
        >
          <ArrowLeft className="w-4 h-4 text-slate-500 shrink-0" />
          {!isCollapsed && <span>Kembali ke Beranda</span>}
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          title="Keluar dari Akun"
          className={cn(
            "w-full flex items-center rounded-lg text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer text-left",
            isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2"
          )}
        >
          <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
          {!isCollapsed && <span>Keluar dari Akun</span>}
        </button>
      </div>
    </div>
  );
}
