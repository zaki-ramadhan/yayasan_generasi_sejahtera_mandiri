"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutDashboard, ArrowUpRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROGRAM_MENU, INFORMASI_MENU } from "@/data/navigation";
import { getRedirectPathForRole } from "@/services/authService";
import { cn } from "@/lib/utils";

export function NavMobileDrawer({ pathname, currentUser, onClose, onLogout }) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (name) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  const isArtikelActive = pathname === "/artikel" || pathname?.startsWith("/artikel");

  return (
    <div className="lg:hidden border-b border-slate-300 bg-white px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
      <div className="space-y-1">
        {/* Home */}
        <Link
          href="/"
          onClick={onClose}
          className={cn(
            "block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
            pathname === "/" ? "bg-slate-100 text-primary" : "text-slate-800 hover:bg-slate-50"
          )}
        >
          Home
        </Link>

        {/* Tentang Kami */}
        <Link
          href="/tentang-kami"
          onClick={onClose}
          className={cn(
            "block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
            pathname === "/tentang-kami" ? "bg-slate-100 text-primary" : "text-slate-800 hover:bg-slate-50"
          )}
        >
          Tentang Kami
        </Link>

        {/* Program Accordion */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion("program")}
            className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <span>Program</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-slate-500 transition-transform",
                activeAccordion === "program" && "rotate-180"
              )}
            />
          </button>
          {activeAccordion === "program" && (
            <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1 border-l-2 border-primary">
              {PROGRAM_MENU.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 px-2.5 text-sm font-medium text-slate-700 hover:text-primary rounded-md"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Artikel (Direct Link) */}
        <Link
          href="/artikel"
          onClick={onClose}
          className={cn(
            "block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
            isArtikelActive ? "bg-slate-100 text-primary" : "text-slate-800 hover:bg-slate-50"
          )}
        >
          Artikel
        </Link>

        {/* Informasi Accordion */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion("informasi")}
            className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <span>Informasi</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-slate-500 transition-transform",
                activeAccordion === "informasi" && "rotate-180"
              )}
            />
          </button>
          {activeAccordion === "informasi" && (
            <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1 border-l-2 border-primary">
              {INFORMASI_MENU.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 px-2.5 text-sm font-medium text-slate-700 hover:text-primary rounded-md"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Auth Button */}
      <div className="pt-3 border-t border-slate-200">
        {currentUser ? (
          <div className="space-y-2">
            <Link
              href={getRedirectPathForRole(currentUser.role)}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full h-10 rounded-md font-medium bg-slate-900 text-white text-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard {currentUser.role}
            </Link>
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full h-10 rounded-md font-medium border border-rose-200 text-rose-700 hover:bg-rose-50 text-sm cursor-pointer"
            >
              Keluar (Logout)
            </button>
          </div>
        ) : (
          <Link href="/login" onClick={onClose} className="w-full block">
            <Button
              className="w-full h-10 rounded-lg font-semibold bg-primary hover:bg-primary-hover text-white justify-center text-sm shadow-2xs cursor-pointer flex items-center gap-2"
            >
              <User className="w-4 h-4 text-white" />
              <span>Masuk / Login Akun</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
