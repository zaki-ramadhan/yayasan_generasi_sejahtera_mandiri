"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, User } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CampaignTransactionsList({
  donors = [],
  totalDonorsCount = 0,
}) {
  const [visibleCount, setVisibleCount] = useState(15);

  // Urutkan donatur berdasarkan tanggal terbaru
  const sortedDonors = [...donors].sort(
    (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
  );

  const visibleDonors = sortedDonors.slice(0, visibleCount);
  const hasMore = sortedDonors.length > visibleCount;

  if (!donors || donors.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500 text-sm">
        Belum ada riwayat transaksi donasi yang tercatat.
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-6 border-t border-slate-200">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-950">
            Riwayat Transaksi Donasi
          </h3>
          <p className="text-sm text-slate-600">
            Catatan mutasi donasi masuk yang telah berhasil terverifikasi oleh sistem.
          </p>
        </div>
        <span className="text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto border border-slate-200">
          {totalDonorsCount || donors.length} Donasi Masuk
        </span>
      </div>

      {/* Transaction List Container (Scrollable Max Height) */}
      <div className="max-h-[500px] sm:max-h-[620px] overflow-y-auto pr-1 sm:pr-2 focus:outline-none divide-y divide-slate-100">
        {visibleDonors.map((item, index) => {
          const isAnon = !item.name || item.name.toLowerCase().includes("hamba allah");
          const initial = isAnon ? "HA" : item.name.slice(0, 2).toUpperCase();

          return (
            <div
              key={item.id || `tx-${index}`}
              className="py-3.5 first:pt-2 last:pb-1 flex items-start sm:items-center justify-between gap-3"
            >
              {/* Left: Avatar & Donor Info */}
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 shrink-0 overflow-hidden">
                  {item.avatar && (
                    <AvatarImage src={item.avatar} alt={item.name || "Donatur"} className="object-cover" />
                  )}
                  <AvatarFallback className="text-xs font-semibold bg-slate-100 text-slate-700">
                    {isAnon ? <User className="w-4 h-4 text-slate-500" /> : initial}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-medium text-slate-900 truncate">
                      {item.name || "Hamba Allah"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Terverifikasi
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 block mt-0.5 font-normal truncate">
                    {item.email || (isAnon ? "hamba.allah***@gmail.com" : "donatur@ygsm.id")}
                  </span>
                </div>
              </div>

              {/* Right: Donation Amount & Full Date Details */}
              <div className="text-right shrink-0">
                <span className="text-sm sm:text-base font-semibold text-slate-950 block">
                  {formatRupiah(item.amount)}
                </span>
                <span className="text-sm text-slate-600 block mt-0.5 font-normal">
                  {item.date
                    ? formatDate(item.date, {
                        withDay: true,
                        withTime: true,
                        withSeconds: true,
                      })
                    : "Baru saja"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toggle View All / View Less Button */}
      {hasMore ? (
        <div className="pt-2 text-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setVisibleCount(sortedDonors.length)}
            className="text-xs sm:text-sm font-medium text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer rounded-lg px-4 py-2"
          >
            <span>Tampilkan Semua ({sortedDonors.length} Donasi)</span>
            <ChevronDown className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      ) : sortedDonors.length > 15 ? (
        <div className="pt-2 text-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setVisibleCount(15)}
            className="text-xs sm:text-sm font-medium text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer rounded-lg px-4 py-2"
          >
            <span>Tampilkan Lebih Sedikit (15 Terbaru)</span>
            <ChevronUp className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
