"use client";

import Link from "next/link";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getRedirectPathForRole, ROLE_LABELS } from "@/services/authService";

export function NavUserDropdown({ currentUser, onLogout }) {
  if (!currentUser) {
    return (
      <Link href="/login">
        <Button
          size="sm"
          className="h-8 sm:h-8.5 px-3.5 rounded-lg text-xs sm:text-sm font-semibold bg-primary hover:bg-primary-hover text-white cursor-pointer flex items-center gap-1.5 shadow-2xs"
        >
          <User className="w-3.5 h-3.5 text-white" />
          <span>Login</span>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white transition-colors cursor-pointer text-sm font-medium text-slate-800 shadow-2xs"
        >
          <div className="w-6.5 h-6.5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            {currentUser.initials || currentUser.name?.charAt(0) || "U"}
          </div>
          <span className="max-w-[120px] truncate">{currentUser.name?.split(" ")[0]}</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-1.5 shadow-md">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="font-semibold text-sm text-slate-900 truncate">{currentUser.name}</div>
          <div className="text-xs text-slate-500 font-normal truncate">
            {ROLE_LABELS[currentUser.role] || currentUser.role}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={getRedirectPathForRole(currentUser.role)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-500" />
            Dashboard Portal
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          Keluar (Logout)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
