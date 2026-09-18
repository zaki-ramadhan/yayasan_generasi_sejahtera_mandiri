"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  HeartHandshake,
  FileSpreadsheet,
  Users,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Wallet,
  CalendarHeart,
  FileCheck,
  LogOut,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import {
  getStoredUser,
  logoutUser,
  loginUser,
  DEMO_USERS,
  ROLE_LABELS,
  USER_ROLES,
} from "@/services/authService";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/data/navigation";

function subscribeAuth(callback) {
  window.addEventListener("ygsm_auth_change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("ygsm_auth_change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getAuthSnapshot() {
  return localStorage.getItem("ygsm_auth_user");
}

function getAuthServerSnapshot() {
  return null;
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const userJson = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);
  const currentUser = userJson ? JSON.parse(userJson) : DEMO_USERS[0];

  const handleRoleSwitch = (targetUser) => {
    loginUser(targetUser);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const userRole = currentUser?.role || USER_ROLES.SUPER_ADMIN;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-68 bg-slate-950 text-white p-5 space-y-6 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-md overflow-hidden bg-white shrink-0 p-0.5 border border-slate-700 shadow-xs flex items-center justify-center">
                <Image
                  src="/logo_yayasan_GSM.png"
                  alt="Logo YGSM"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain rounded-sm"
                />
              </div>
              <div>
                <span className="font-bold text-sm block text-white leading-tight">
                  Portal Yayasan
                </span>
                <span className="text-[11px] text-slate-400">
                  Yayasan Generasi Sejahtera Mandiri
                </span>
              </div>
            </Link>
          </div>

          {/* User Profile Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                {currentUser?.initials || "U"}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">
                  {currentUser?.name || "Admin"}
                </span>
                <span className="text-[10px] text-primary-light font-medium block truncate">
                  {ROLE_LABELS[userRole] || userRole}
                </span>
              </div>
            </div>

            {/* Quick Switch Role Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full mt-1 flex items-center justify-between py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700/80 rounded-lg text-[11px] text-slate-300 font-medium transition-colors cursor-pointer outline-none">
                <span>Ganti Peran / Role</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-60 p-1.5">
                <DropdownMenuLabel className="text-[10px] text-slate-500 uppercase">
                  Simulasi Akun Demo
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {DEMO_USERS.map((u) => (
                  <DropdownMenuItem
                    key={u.id}
                    onClick={() => handleRoleSwitch(u)}
                    className="flex flex-col items-start py-1.5 px-2.5 text-xs cursor-pointer"
                  >
                    <span className="font-bold text-slate-900">{u.name}</span>
                    <span className="text-[10px] text-slate-500">{ROLE_LABELS[u.role]}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Nav Links Based on Role */}
          <nav className="space-y-1 text-sm">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                pathname === "/dashboard"
                  ? "bg-primary text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Utama</span>
            </Link>

            <Link
              href="/program"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                isNavItemActive("/program", pathname)
                  ? "bg-primary text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              )}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Program Donasi</span>
            </Link>

            <Link
              href="/donasi-rutin"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                isNavItemActive("/donasi-rutin", pathname)
                  ? "bg-primary text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              )}
            >
              <CalendarHeart className="w-4 h-4" />
              <span>Donasi Rutin</span>
            </Link>

            <Link
              href="/distribusi"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                isNavItemActive("/distribusi", pathname)
                  ? "bg-primary text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              )}
            >
              <FileCheck className="w-4 h-4" />
              <span>Rekam Penyaluran</span>
            </Link>

            <Link
              href="/laporan"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                isNavItemActive("/laporan", pathname)
                  ? "bg-primary text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              )}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Laporan & Audit KAP</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
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
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer w-full text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-slate-900">
              Portal Pengelola & Civitas Yayasan
            </h1>
            <p className="text-xs text-slate-500">
              Hak Akses Aktif: <strong>{ROLE_LABELS[userRole] || userRole}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Sesi Terautentikasi</span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
