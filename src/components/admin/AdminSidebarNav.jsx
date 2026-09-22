"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  HeartHandshake,
  CalendarHeart,
  FileCheck,
  FileSpreadsheet,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { isNavItemActive } from "@/data/navigation";
import { cn } from "@/lib/utils";

const ADMIN_NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard Utama", icon: LayoutDashboard, exact: true },
  { href: "/program", label: "Program Donasi", icon: HeartHandshake },
  { href: "/donasi-rutin", label: "Donasi Rutin", icon: CalendarHeart },
  { href: "/distribusi", label: "Rekam Penyaluran", icon: FileCheck },
  { href: "/laporan", label: "Laporan & Audit KAP", icon: FileSpreadsheet },
];

/**
 * Admin navigation menu links and bottom action triggers
 * @param {object} props
 * @param {string} props.pathname
 * @param {Function} props.onLogout
 */
export function AdminSidebarNav({ pathname, onLogout }) {
  return (
    <>
      <nav className="space-y-1 text-sm">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : isNavItemActive(item.href, pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Publik</span>
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer w-full text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </>
  );
}
