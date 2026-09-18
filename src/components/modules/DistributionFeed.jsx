"use client";

import { useState, useMemo } from "react";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { SafeImage } from "@/components/ui/safe-image";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 4;

export function DistributionFeed({ records = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(records.length / ITEMS_PER_PAGE);

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return records.slice(start, start + ITEMS_PER_PAGE);
  }, [records, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
          Daftar Penyaluran Terakhir
        </h2>
        <span className="text-xs sm:text-sm text-slate-600 font-medium">
          Total {records.length} rekam distribusi
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedRecords.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-2xs hover:border-slate-400 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fallbackText="Dokumentasi Distribusi"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded">
                  {item.id}
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {formatDate(item.date)}
                    </span>
                    <span className="text-emerald-700 font-semibold">{item.status}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Penerima:</strong> {item.beneficiaries}</span>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-600">
              <span>Penanggung Jawab: <strong className="text-slate-800">{item.pj}</strong></span>
              <span className="font-bold text-slate-950 text-sm sm:text-base">{formatRupiah(item.value)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
