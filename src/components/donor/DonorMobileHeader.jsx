/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonorMobileHeader({ currentUser, isOpen, onToggle }) {
  const salutation = currentUser?.salutation ? `${currentUser.salutation} ` : "";
  const displayName = `${salutation}${currentUser?.name || "Donatur"}`;

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xs">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          className="h-9 w-9 p-0 rounded-md border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-md overflow-hidden bg-white shrink-0 p-0.5 border border-slate-200 flex items-center justify-center">
            <Image
              src="/logo_yayasan_GSM.png"
              alt="Logo YGSM"
              width={32}
              height={32}
              className="w-full h-full object-contain rounded-xs"
            />
          </div>
          <div>
            <span className="font-semibold text-sm block text-slate-950 leading-tight">
              Portal Donatur
            </span>
            <span className="text-sm font-normal text-slate-500 block">
              YGSM
            </span>
          </div>
        </Link>
      </div>

      {currentUser && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
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
        </div>
      )}
    </header>
  );
}
