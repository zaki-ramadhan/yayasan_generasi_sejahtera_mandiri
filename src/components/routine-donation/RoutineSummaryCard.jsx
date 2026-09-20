import { Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah } from "@/lib/formatters";
import { formatRoutineSchedule } from "./RoutineProgramItem";

export function RoutineSummaryCard({
  selectedPrograms = [],
  totalPerCommitment = 0,
  isSubmitting = false,
  campaigns = CAMPAIGNS,
}) {
  const campaignList = campaigns && campaigns.length > 0 ? campaigns : CAMPAIGNS;

  const hasAnyAutoDonation = selectedPrograms.some(
    (p) => (p.routineType || "REMINDER_ONLY") === "AUTO_DONATION"
  );

  return (
    <div id="tour-summary-card" className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-5 shadow-xs">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-950">
          Ringkasan Jadwal Donasi
        </h3>
        <p className="text-sm text-slate-600 mt-0.5">
          {selectedPrograms.length} program terdaftar
        </p>
      </div>

      {/* Program Breakdown List */}
      <div className="space-y-3.5">
        {selectedPrograms.map((p, idx) => {
          const camp =
            campaignList.find((c) => c.id === p.campaignId) || campaignList[0] || CAMPAIGNS[0];
          const nominal = p.customAmount
            ? parseInt(p.customAmount.replace(/\D/g, ""), 10) || 0
            : p.amount;
          const isReminderOnly = (p.routineType || "REMINDER_ONLY") === "REMINDER_ONLY";

          return (
            <div
              key={p.id}
              className="pb-3.5 border-b border-slate-100 last:border-0 last:pb-0 text-sm space-y-1"
            >
              {/* Program Title - Selaras dengan 'Total per Jadwal' (text-base font-medium text-slate-950) */}
              <div className="flex items-start gap-2 min-w-0">
                <span className="text-base font-medium text-slate-950 shrink-0 select-none">
                  {idx + 1}.
                </span>
                <span className="text-base font-medium text-slate-950 line-clamp-2 leading-snug">
                  {camp.title}
                </span>
              </div>

              {/* Parameter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 pl-6">
                {/* Chip 1: Jadwal */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                  <Bell className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{formatRoutineSchedule(p)} • {p.reminderTime || "05:00"} WIB</span>
                </span>

                {/* Chip 2: Model Pelaksanaan + Nominal */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                  {isReminderOnly ? (
                    <span>Pengingat WA Saja</span>
                  ) : (
                    <span>Donasi Otomatis ({formatRupiah(nominal)})</span>
                  )}
                </span>

                {/* Chip 3 (Opsional): Periode Kustom */}
                {p.hasCustomPeriod && p.startDate && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>
                      {p.startDate} s/d {p.endDate || "Seterusnya"}
                    </span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Commitment Calculation (Hanya tampil jika ada program donasi otomatis) */}
      {hasAnyAutoDonation && (
        <div className="pt-3 border-t border-slate-200 space-y-1">
          <div className="flex justify-between items-baseline text-base font-medium text-slate-950">
            <span>Total per Jadwal</span>
            <span className="text-primary text-xl sm:text-2xl font-bold tracking-tight">
              {formatRupiah(totalPerCommitment)}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600 italic font-normal">
            *Nominal disesuaikan otomatis dengan jadwal donasi pilihan
          </p>
        </div>
      )}

      {/* Primary 3D CTA Submit Button (Unified with DonationCheckoutSummary) */}
      <div className="space-y-2.5 pt-1">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={
            isSubmitting ||
            selectedPrograms.length === 0 ||
            (hasAnyAutoDonation && totalPerCommitment <= 0)
          }
          className="w-full h-12 rounded-lg text-base font-semibold text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-t border-t-blue-400 border-x border-x-blue-600 border-b-2 border-b-blue-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_6px_rgba(29,78,216,0.25)] active:translate-y-0.5 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting
            ? "Menyimpan Jadwal..."
            : totalPerCommitment > 0
            ? `Aktifkan Jadwal (${formatRupiah(totalPerCommitment)})`
            : "Aktifkan Pengingat Donasi Rutin"}
        </Button>
      </div>
    </div>
  );
}
