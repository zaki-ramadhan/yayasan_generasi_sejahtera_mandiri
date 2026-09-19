"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  ShieldCheck,
  HeartHandshake,
  CalendarHeart,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ROLE_LABELS,
  USER_ROLES,
  getRedirectPathForRole,
} from "@/services/authService";

export function NavUserDropdown({ currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) {
    return (
      <Link href="/login">
        <Button
          size="sm"
          className="h-8 sm:h-9 px-3.5 py-1 rounded-md text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <User className="fill-current w-3.5 h-3.5 text-white" />
          <span>Masuk / Login</span>
        </Button>
      </Link>
    );
  }

  const isDonor = currentUser.role === USER_ROLES.DONOR;
  const isStaff = !isDonor;
  const roleLabel = ROLE_LABELS[currentUser.role] || currentUser.role || "Donatur";
  const provider = currentUser.provider || "Akun Terdaftar";

  const handleLogoutClick = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <>
      {/* Trigger: Dark Gradient Chip containing only PFP and simple Chevron arrow */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white cursor-pointer shadow-xs hover:ring-2 hover:ring-slate-700/80 active:scale-95 transition-all duration-150 outline-none"
        aria-label="Buka menu profil pengguna"
      >
        {/* Profile Picture */}
        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name || "User Avatar"}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="font-bold text-xs text-white">
              {currentUser.initials || currentUser.name?.charAt(0) || "U"}
            </span>
          )}
        </div>

        {/* Small chevron arrow without tail */}
        <ChevronDown
          className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-transform group-hover:translate-y-0.5"
          strokeWidth={2.5}
        />
      </button>

      {/* Profile Detail Modal (Radix Dialog - Clean & Non-AI-Slop) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border border-slate-200 shadow-xl rounded-2xl bg-white">
          <DialogHeader className="sr-only">
            <DialogTitle>Profil Pengguna</DialogTitle>
          </DialogHeader>

          {/* User Card Top Section */}
          <div className="p-6 bg-slate-50/80 border-b border-slate-200">
            <div className="flex items-start gap-4">
              {/* Large Avatar */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-900 border-2 border-white shadow-sm shrink-0 flex items-center justify-center">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name || "User"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-bold text-lg text-white">
                    {currentUser.initials || "U"}
                  </span>
                )}
                {/* Active status indicator dot */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              {/* Name, Email, & Role Badge */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-950 truncate max-w-[240px]" title={currentUser.name}>
                    {currentUser.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 font-mono truncate max-w-[240px]" title={currentUser.email}>
                  {currentUser.email || "Email tidak dicantumkan"}
                </p>

                <div className="pt-1 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100/80 text-emerald-900 border border-emerald-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    <span>{roleLabel}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Aktif</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details & Context */}
          <div className="p-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600">
                <span>Metode Masuk:</span>
                <span className="font-semibold text-slate-900 capitalize flex items-center gap-1">
                  {provider === "facebook" ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                      Facebook OAuth
                    </>
                  ) : provider === "google" ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                      Google OAuth
                    </>
                  ) : (
                    "Autentikasi Internal"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>ID Donatur / Sesi:</span>
                <span className="font-mono text-slate-800 text-[11px] truncate max-w-[180px]">
                  {currentUser.id}
                </span>
              </div>
            </div>

            {/* Quick Actions Navigation */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
                Akses Cepat
              </span>

              {isStaff && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-slate-300" />
                    <span>Buka Portal Dashboard Yayasan</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              )}

              <Link
                href="/program"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Program Donasi & ZISWAF</span>
                </div>
                <span className="text-[11px] text-slate-400">&rarr;</span>
              </Link>

              <Link
                href="/donasi-rutin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarHeart className="w-4 h-4 text-primary" />
                  <span>Komitmen Donasi Rutin</span>
                </div>
                <span className="text-[11px] text-slate-400">&rarr;</span>
              </Link>

              <Link
                href="/laporan"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  <span>Laporan Transparansi & Audit</span>
                </div>
                <span className="text-[11px] text-slate-400">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Footer Action: Clean Logout */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-xs border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Tutup
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleLogoutClick}
              className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar dari Akun</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
