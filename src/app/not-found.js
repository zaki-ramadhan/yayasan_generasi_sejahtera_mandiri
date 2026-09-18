import Link from "next/link";
import { Home, Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md text-center bg-white p-6 sm:p-8 rounded-lg border border-slate-300">
        <h1 className="text-2xl font-semibold text-slate-950 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-base text-slate-700 mb-6 leading-relaxed">
          Maaf, halaman atau program yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/program"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-sm font-medium rounded-lg transition-colors"
          >
            Lihat Program
          </Link>
        </div>
      </div>
    </main>
  );
}
