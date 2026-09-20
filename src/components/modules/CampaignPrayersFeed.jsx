"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PrayerCard } from "@/components/modules/PrayerCard";
import { PostDonationPrayerForm } from "@/components/donation/PostDonationPrayerForm";
import { getPendingDonationForCampaign, PRAYER_SUBMITTED_EVENT } from "@/lib/donorStorage";
import { usePrayersSync } from "@/hooks/usePrayersSync";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "terbaru", label: "Paling Baru" },
  { value: "terpopuler", label: "Paling Banyak Diaminkan" },
];

function subscribePendingDonation(callback) {
  window.addEventListener(PRAYER_SUBMITTED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PRAYER_SUBMITTED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getInvoicesSnapshot() {
  return localStorage.getItem("ygsm_donor_invoices") || "[]";
}

function getServerInvoicesSnapshot() {
  return "[]";
}

export function CampaignPrayersFeed({ initialDonors = [], campaignSlug, campaignTitle }) {
  const { donors, aminedSet, handleToggleAmin, addNewPrayer } = usePrayersSync(initialDonors);
  const [sortBy, setSortBy] = useState("terbaru"); // "terbaru" | "terpopuler"
  const [visibleCount, setVisibleCount] = useState(6);

  const invoicesRaw = useSyncExternalStore(
    subscribePendingDonation,
    getInvoicesSnapshot,
    getServerInvoicesSnapshot
  );

  const pendingDonation = useMemo(() => {
    if (!campaignSlug) return null;
    return getPendingDonationForCampaign(campaignSlug, invoicesRaw);
  }, [campaignSlug, invoicesRaw]);


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

  if (prayersOnly.length === 0 && !pendingDonation) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm sm:text-base">
        Belum ada data
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Control Header: Title & Custom Dropdown Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

      {/* Post-Donation Prayer Form - Hanya muncul jika donatur belum menitipkan doa dan hilang begitu terkirim */}
      {pendingDonation && (
        <PostDonationPrayerForm
          invoiceId={pendingDonation.invoiceId}
          campaignSlug={campaignSlug}
          donorName={pendingDonation.donorName}
          defaultAnonymous={pendingDonation.isAnonymous}
          onSuccess={(data) => {
            if (addNewPrayer) {
              addNewPrayer({
                id: data.id || `prayer-${Date.now()}`,
                name: data.isAnonymous ? "Hamba Allah" : (data.donorName || pendingDonation.donorName || "Donatur"),
                amount: data.amount || 0,
                date: new Date().toISOString(),
                prayer: data.prayer,
                aminCount: 0,
                isAnonymous: Boolean(data.isAnonymous),
              });
            }
            setPendingDonation(null);
          }}
        />
      )}

      {/* ONLY THIS PARENT IS SCROLLABLE: 2-Card Grid */}
      <div className="max-h-[500px] sm:max-h-[540px] overflow-y-auto pr-2 pt-3 pb-3">
        {visiblePrayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 sm:gap-y-7 gap-x-3.5 sm:gap-x-4">
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
          <div className="text-center py-12 text-slate-500 text-sm sm:text-base">
            Belum ada data
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
