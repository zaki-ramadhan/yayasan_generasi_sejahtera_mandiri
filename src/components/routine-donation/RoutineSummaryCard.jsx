import { ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah } from "@/lib/formatters";
import { FREQUENCY_OPTIONS } from "./RoutineProgramItem";

export function RoutineSummaryCard({
  selectedPrograms = [],
  totalPerCommitment = 0,
  isSubmitting = false,
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-5 shadow-xs">
      <div className="border-b border-slate-200 pb-3.5">
        <h3 className="text-base sm:text-lg font-semibold text-slate-950">
          Ringkasan Jadwal Donasi
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          {selectedPrograms.length} program kebaikan terdaftar
        </p>
      </div>

      {/* Program Breakdown List */}
      <div className="space-y-3">
        {selectedPrograms.map((p, idx) => {
          const camp = CAMPAIGNS.find((c) => c.id === p.campaignId) || CAMPAIGNS[0];
          const nominal = p.customAmount
            ? parseInt(p.customAmount.replace(/\D/g, ""), 10) || 0
            : p.amount;
          const freqLabel =
            FREQUENCY_OPTIONS.find((f) => f.value === p.frequency)?.label || p.frequency;

          return (
            <div
              key={p.id}
              className="flex justify-between items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0 text-sm gap-2"
            >
              <div className="min-w-0 space-y-0.5">
                <span className="font-semibold text-slate-950 line-clamp-1 block text-sm">
                  {idx + 1}. {camp.title}
                </span>
                <span className="inline-block text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {freqLabel}
                </span>
              </div>
              <span className="font-semibold text-slate-950 shrink-0 text-sm sm:text-base">
                {formatRupiah(nominal)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Total Commitment Calculation */}
      <div className="pt-3 border-t border-slate-200 space-y-1">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium text-slate-700">
            Total per Siklus
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-950">
            {formatRupiah(totalPerCommitment)}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          * Nominal disesuaikan otomatis dengan jadwal pilihan
        </p>
      </div>

      {/* Primary 3D CTA Submit Button */}
      <div className="space-y-3 pt-1">
        <Button
          type="submit"
          disabled={isSubmitting || totalPerCommitment <= 0}
          className="w-full h-12 rounded-lg text-base font-semibold text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-t border-t-blue-400 border-x border-x-blue-600 border-b-2 border-b-blue-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_6px_rgba(29,78,216,0.25)] active:translate-y-0.5 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all flex items-center justify-center cursor-pointer"
        >
          {isSubmitting ? "Menyimpan Jadwal..." : "Aktifkan Jadwal Donasi"}
        </Button>

        <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            Pengingat resmi dikirim via WhatsApp YGSM tanpa auto-debit paksaan.
          </span>
        </div>
      </div>
    </div>
  );
}
