"use client";

import { useState, useMemo } from "react";
import { MessageSquareHeart, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PrayerCard } from "@/components/modules/PrayerCard";
import { usePrayersSync } from "@/hooks/usePrayersSync";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "terbaru", label: "Paling Baru" },
  { value: "terpopuler", label: "Paling Banyak Diaminkan" },
];

export function CampaignPrayersFeed({ initialDonors = [], campaignSlug, campaignTitle }) {
  const { donors, aminedSet, handleToggleAmin } = usePrayersSync(initialDonors);
  const [sortBy, setSortBy] = useState("terbaru"); // "terbaru" | "terpopuler"
  const [visibleCount, setVisibleCount] = useState(6);

  const sortedDonors = useMemo(() => {
    const list = [...donors];
    if (sortBy === "terpopuler") {
      return list.sort((a, b) => b.aminCount - a.aminCount);
    }
    // Default: Sort by newest date
    return list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [donors, sortBy]);

  const prayersOnly = useMemo(() => {
    return sortedDonors.filter((d) => Boolean(d.prayer && d.prayer.trim()));
  }, [sortedDonors]);

  const visiblePrayers = prayersOnly.slice(0, visibleCount);

  return (
    <div className="space-y-4">
      {/* Control Header: Title & Custom Dropdown Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h3 className="font-semibold text-slate-950 text-base sm:text-lg">
            Doa &amp; Dukungan Kebaikan
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-0.5">
            Untaian doa tulus dari para donatur untuk mustahik dan sesama.
          </p>
        </div>

        {/* Custom Dropdown Sort Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 focus:outline-none transition-colors cursor-pointer"
              >
                <span>{SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Urutkan"}</span>
                <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 bg-white border border-slate-200 shadow-md rounded-lg p-1">
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-md cursor-pointer transition-colors",
                    sortBy === opt.value
                      ? "bg-slate-100 font-semibold text-primary"
                      : "text-slate-800 hover:bg-slate-100"
                  )}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ONLY THIS PARENT IS SCROLLABLE: 2-Card Grid */}
      <div className="max-h-[500px] sm:max-h-[540px] overflow-y-auto pr-2 pt-3 pb-3">
        {visiblePrayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {visiblePrayers.map((donor) => (
              <PrayerCard
                key={donor.id}
                donor={donor}
                isAmined={aminedSet.has(donor.id)}
                onToggleAmin={handleToggleAmin}
                isCompact={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <MessageSquareHeart className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                Belum Ada Titipan Doa
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Jadilah donatur pertama yang menitipkan doa dan harapan berkah untuk program ini.
              </p>
            </div>
          </div>
        )}

        {/* Load More Button inside scroll area */}
        {visibleCount < prayersOnly.length && (
          <div className="text-center pt-3 pb-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="text-xs sm:text-sm text-slate-800 border-slate-300 hover:bg-slate-50 rounded-lg px-5 py-1.5 h-auto cursor-pointer"
            >
              Lihat Doa Lainnya ({prayersOnly.length - visibleCount} tersisa)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
