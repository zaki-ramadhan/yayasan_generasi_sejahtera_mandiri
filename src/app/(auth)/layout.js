"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Dedicated Minimal Auth Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Clickable Brand Logo & Text linking to homepage */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 select-none focus:outline-none"
              title="Kembali ke Halaman Utama"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-md overflow-hidden shrink-0 border border-slate-200/80 shadow-xs bg-white flex items-center justify-center p-0.5">
                <Image
                  src="/logo_yayasan_GSM.png"
                  alt="Logo Yayasan Generasi Sejahtera Mandiri"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-sm select-none pointer-events-none"
                  priority
                />
              </div>
              <div className="flex flex-col leading-snug select-none">
                <span className="font-semibold text-xs sm:text-sm text-slate-950 tracking-tight">
                  Yayasan Generasi
                </span>
                <span className="font-semibold text-xs sm:text-sm text-slate-800 tracking-tight">
                  Sejahtera Mandiri
                </span>
              </div>
            </Link>

            {/* Contextual Switch Button: Register on Login page, Login on Register page */}
            <div className="flex items-center">
              <Link href={isLoginPage ? "/register" : "/login"}>
                <Button
                  size="sm"
                  className={`h-9 px-4 rounded-md text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer ${
                    isLoginPage
                      ? "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-950"
                      : "bg-primary text-white hover:bg-primary-hover"
                  }`}
                >
                  {isLoginPage ? "Daftar Akun" : "Masuk / Login"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Auth Content */}
      <main className="flex-1 flex flex-col justify-center">{children}</main>

      {/* Minimal Auth Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Yayasan Generasi Sejahtera Mandiri. Seluruh hak cipta dilindungi.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/ketentuan-transaksi" className="hover:text-slate-900 hover:underline">
              Ketentuan Transaksi & Syariah
            </Link>
            <Link href="/" className="hover:text-slate-900 hover:underline">
              Beranda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
