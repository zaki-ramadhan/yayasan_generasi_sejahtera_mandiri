"use client";

import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PROGRAM_MENU, INFORMASI_MENU } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function NavDesktopMenu({ pathname }) {
  const isProgramActive = pathname === "/program" || pathname === "/donasi-rutin" || pathname?.startsWith("/campaign");
  const isArtikelActive = pathname === "/artikel" || pathname?.startsWith("/artikel");
  const isInformasiActive = [
    "/laporan",
    "/distribusi",
    "/ketentuan-transaksi",
    "/karier",
    "/kalkulator-zakat",
    "/volunteer",
  ].some((path) => pathname?.startsWith(path));

  return (
    <nav className="hidden lg:flex items-stretch h-full gap-1 xl:gap-2">
      {/* 1. Home */}
      <Link
        href="/"
        className={cn(
          "inline-flex items-center px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
          pathname === "/"
            ? "text-primary font-semibold border-primary -mb-px"
            : "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px"
        )}
      >
        Home
      </Link>

      {/* 2. Tentang Kami */}
      <Link
        href="/tentang-kami"
        className={cn(
          "inline-flex items-center px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
          pathname === "/tentang-kami"
            ? "text-primary font-semibold border-primary -mb-px"
            : "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px"
        )}
      >
        Tentang Kami
      </Link>

      {/* 3. Program Dropdown (2 items) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
              isProgramActive
                ? "text-primary font-semibold border-primary -mb-px"
                : "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px"
            )}
          >
            <span>Program</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-1.5 shadow-md">
          {PROGRAM_MENU.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link
                href={item.href}
                className="group flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-primary rounded-md cursor-pointer transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 4. Artikel (Direct Link) */}
      <Link
        href="/artikel"
        className={cn(
          "inline-flex items-center px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
          isArtikelActive
            ? "text-primary font-semibold border-primary -mb-px"
            : "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px"
        )}
      >
        Artikel
      </Link>

      {/* 5. Informasi Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
              isInformasiActive
                ? "text-primary font-semibold border-primary -mb-px"
                : "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px"
            )}
          >
            <span>Informasi</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60 p-1.5 shadow-md">
          {INFORMASI_MENU.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link
                href={item.href}
                className="group flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-primary rounded-md cursor-pointer transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
