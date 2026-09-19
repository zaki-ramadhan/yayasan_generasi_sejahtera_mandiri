import { useRouter } from "next/navigation";
import { CheckCircle2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah } from "@/lib/formatters";
import { FREQUENCY_OPTIONS } from "./RoutineProgramItem";

export function RoutineSuccessView({
  isAnonymous,
  salutation,
  fullName,
  whatsapp,
  selectedPrograms,
  campaigns = CAMPAIGNS,
  onReset,
}) {
  const router = useRouter();
  const campaignList = campaigns && campaigns.length > 0 ? campaigns : CAMPAIGNS;

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
          Jadwal Donasi Rutin Berhasil Dibuat
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
          Jazakumullah Khairan {isAnonymous ? "Hamba Allah" : `${salutation} ${fullName}`}. Pengingat dan tautan akad donasi akan dikirimkan otomatis ke WhatsApp <strong className="text-slate-900 font-semibold">{whatsapp}</strong> sesuai jadwal pilihan Anda.
        </p>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 shadow-xs text-left space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-950">
            Ringkasan Komitmen Donasi Rutin
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Jadwal pengingat otomatis telah aktif
          </p>
        </div>

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
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Button
          onClick={() => router.push("/")}
          className="h-11 px-6 text-sm font-semibold text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-t border-t-blue-400 border-x border-x-blue-600 border-b-2 border-b-blue-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_6px_rgba(29,78,216,0.25)] rounded-lg cursor-pointer"
        >
          Kembali ke Beranda
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="h-11 px-6 border-slate-300 text-slate-800 hover:bg-slate-50 font-medium rounded-lg cursor-pointer"
        >
          Atur Jadwal Lain
        </Button>
      </div>
    </main>
  );
}
