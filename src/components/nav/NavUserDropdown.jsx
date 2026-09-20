/* eslint-disable @next/next/no-img-element */
"use client";

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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ROLE_LABELS, USER_ROLES } from "@/services/authService";

export function NavUserDropdown({ currentUser, onLogout }) {
  if (!currentUser) {
    return (
      <Link href="/login">
        <Button
          size="sm"
          variant="outline"
          className="h-8.5 px-3 py-1 rounded-lg text-xs sm:text-sm font-medium border-slate-300 text-slate-800 bg-white hover:bg-slate-50 hover:border-slate-400 cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <User className="w-3.5 h-3.5 text-slate-600" />
          <span>Masuk / Login</span>
        </Button>
      </Link>
    );
  }

  const isDonor = currentUser.role === USER_ROLES.DONOR;
  const isStaff = !isDonor;
  const roleLabel = ROLE_LABELS[currentUser.role] || currentUser.role || "Donatur";

  return (
    <DropdownMenu>
      {/* Trigger: Header-matching background, subtle hover effect */}
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex items-center gap-1.5 p-1 pr-1.5 sm:pr-2 rounded-full bg-transparent hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300 transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          aria-label="Buka menu profil pengguna"
        >
          {/* Profile Picture */}
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-300 shrink-0 flex items-center justify-center">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name || "Avatar"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="font-semibold text-xs text-slate-800">
                {currentUser.initials || currentUser.name?.charAt(0) || "U"}
              </span>
            )}
          </div>

          {/* Small chevron arrow */}
          <ChevronDown
            className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800 transition-colors"
            strokeWidth={2}
          />
        </button>
      </DropdownMenuTrigger>

      {/* Simple Popover Dropdown Menu */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 sm:w-72 p-1.5 rounded-xl border border-slate-200 bg-white shadow-lg space-y-0.5 z-50"
      >
        {/* User Identity Header */}
        <div className="px-2.5 py-2 space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name || "Avatar"}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-bold text-xs text-slate-800">
                  {currentUser.initials || "U"}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-slate-950 truncate leading-tight">
                {currentUser.name}
              </p>
              <p className="text-xs text-slate-500 truncate leading-tight">
                {currentUser.email || roleLabel}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1 border-slate-100" />

        {/* Staff Dashboard Portal Link */}
        {isStaff && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              <span className="flex-1">Dashboard Yayasan</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* Navigation Items */}
        <DropdownMenuItem asChild>
          <Link
            href="/program"
            className="px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
          >
            <span className="flex-1">Program Donasi</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/donasi-rutin"
            className="px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
          >
            <span className="flex-1">Komitmen Donasi Rutin</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/laporan"
            className="px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
          >
            <span className="flex-1">Laporan Transparansi</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 border-slate-100" />

        {/* Logout Item */}
        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 cursor-pointer focus:bg-rose-50 focus:text-rose-700"
        >
          <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Keluar dari Akun</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

