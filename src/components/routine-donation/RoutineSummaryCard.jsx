import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah } from "@/lib/formatters";
import { FREQUENCY_OPTIONS } from "./RoutineProgramItem";

export function RoutineSummaryCard({
  selectedPrograms = [],
  totalPerCommitment = 0,
  isSubmitting = false,
  campaigns = CAMPAIGNS,
}) {
  const campaignList = campaigns && campaigns.length > 0 ? campaigns : CAMPAIGNS;

  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-5 shadow-xs">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-950">
          Ringkasan Jadwal Donasi
        </h3>
        <p className="text-sm text-slate-600 mt-0.5">
          {selectedPrograms.length} program kebaikan terdaftar
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
          const freqLabel =
            FREQUENCY_OPTIONS.find((f) => f.value === p.frequency)?.label || p.frequency;
          const isReminderOnly = (p.routineType || "REMINDER_ONLY") === "REMINDER_ONLY";

          return (
            <div
              key={p.id}
              className="pb-3.5 border-b border-slate-100 last:border-0 last:pb-0 text-sm space-y-1"
            >
              <div className="flex justify-between items-start gap-2">
                {/* List Outside Numbering & Font-Medium Title */}
                <div className="flex items-start gap-1.5 min-w-0">
                  <span className="text-sm font-medium text-slate-900 shrink-0 select-none">
                    {idx + 1}.
                  </span>
                  <span className="text-sm font-medium text-slate-900 line-clamp-2">
                    {camp.title}
                  </span>
                </div>
                {isReminderOnly ? (
                  <span className="text-xs sm:text-sm font-medium text-slate-500 shrink-0">
                    Fleksibel (Saat Diingatkan)
                  </span>
                ) : (
                  <span className="font-medium text-slate-950 shrink-0 text-sm sm:text-base">
                    {formatRupiah(nominal)}
                  </span>
                )}
              </div>

              {/* Frequency with Bell in Circle Shape (No Badge / Chip / Card) */}
              <div className="pl-4 flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Bell className="w-3 h-3 text-slate-600" />
                  </div>
                  <span>{freqLabel}</span>
                </div>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {isReminderOnly ? "Pengingat WA Saja" : "Donasi Otomatis"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Commitment Calculation */}
      <div className="pt-3 border-t border-slate-200 space-y-1">
        <div className="flex justify-between items-baseline text-base font-medium text-slate-950">
          <span>Total per Siklus</span>
          <span className="text-primary text-xl sm:text-2xl font-bold tracking-tight">
            {totalPerCommitment > 0 ? formatRupiah(totalPerCommitment) : "Fleksibel"}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600 italic font-normal">
          *Nominal disesuaikan otomatis dengan jadwal frekuensi pilihan
        </p>
      </div>

      {/* Primary 3D CTA Submit Button (Unified with DonationCheckoutSummary) */}
      <div className="space-y-2.5 pt-1">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={
            isSubmitting ||
            selectedPrograms.length === 0 ||
            (selectedPrograms.some((p) => (p.routineType || "REMINDER_ONLY") === "AUTO_DONATION") &&
              totalPerCommitment <= 0)
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
