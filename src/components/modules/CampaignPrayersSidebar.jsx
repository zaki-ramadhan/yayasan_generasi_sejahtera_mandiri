"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PrayerCard } from "@/components/modules/PrayerCard";
import { usePrayersSync } from "@/hooks/usePrayersSync";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "terbaru", label: "Paling Baru" },
  { value: "terpopuler", label: "Paling Banyak Diaminkan" },
];

export function CampaignPrayersSidebar({ initialDonors = [], campaignSlug }) {
  const { donors, aminedSet, handleToggleAmin } = usePrayersSync(initialDonors);
  const [sortBy, setSortBy] = useState("terbaru"); // "terbaru" | "terpopuler"

  const prayersOnly = useMemo(() => {
    const list = donors.filter((d) => Boolean(d.prayer && d.prayer.trim()));
    if (sortBy === "terpopuler") {
      return [...list].sort((a, b) => b.aminCount - a.aminCount);
    }
    return [...list].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [donors, sortBy]);

  // Take top 3 prayers
  const displayPrayers = prayersOnly.slice(0, 3);

  if (prayersOnly.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-300 p-5 sm:p-6 space-y-4 shadow-xs h-auto">
      {/* Header with Custom Dropdown Sort Filter */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-950 text-base">
          Doa-Doa Orang Baik
        </h3>

        {/* Custom Dropdown Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 focus:outline-none transition-colors cursor-pointer h-9 min-w-[130px] shadow-2xs"
            >
              <span className="truncate">
                {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Urutkan"}
              </span>
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
                {sortBy === opt.value && <Check className="w-4 h-4 text-primary shrink-0 ml-1.5" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 3 Top Prayer Cards (Natural fit height, non-scrollable) */}
      <div className="space-y-6 pt-3 pb-1">
        {displayPrayers.map((donor) => (
          <PrayerCard
            key={donor.id}
            donor={donor}
            isAmined={aminedSet.has(donor.id)}
            onToggleAmin={handleToggleAmin}
            isCompact={true}
          />
        ))}
      </div>
    </div>
  );
}
