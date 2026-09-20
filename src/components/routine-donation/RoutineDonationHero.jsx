import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

export function RoutineDonationHero({ onStartTour }) {
  return (
    <div className="space-y-4">
      {/* Back button & Title */}
      <div className="space-y-3">
        <Link
          href="/program"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-primary hover:underline transition-colors py-0.5 group"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Program</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Atur Jadwal Donasi Rutin
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 font-normal">
              Atur pengingat WhatsApp atau jadwal sedekah berkala untuk program donasi pilihan Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartTour}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-sm font-medium transition-colors cursor-pointer shrink-0 self-start sm:self-auto shadow-2xs"
            aria-label="Butuh Panduan?"
          >
            <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Butuh Panduan?</span>
          </button>
        </div>
      </div>
    </div>
  );
}
