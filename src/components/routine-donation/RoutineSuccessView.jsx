import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
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
        <h1 className="text-2xl font-bold text-slate-950">
          Jadwal Donasi Rutin Berhasil Dibuat
        </h1>
        <p className="text-base text-slate-700 max-w-lg mx-auto">
          Jazakumullah Khairan {isAnonymous ? "Hamba Allah" : `${salutation} ${fullName}`}. Pengingat dan tautan akad donasi akan dikirimkan otomatis ke WhatsApp <strong className="text-slate-900">{whatsapp}</strong> sesuai jadwal pilihan Anda.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-4">
        <h2 className="text-base font-semibold text-slate-900">
          Ringkasan komitmen donasi rutin
        </h2>
        <div className="space-y-3">
          {selectedPrograms.map((p, idx) => {
            const camp = campaignList.find((c) => c.id === p.campaignId) || campaignList[0] || CAMPAIGNS[0];
            const nominal = p.customAmount ? parseInt(p.customAmount.replace(/\D/g, ""), 10) || 0 : p.amount;
            const freqLabel = FREQUENCY_OPTIONS.find((f) => f.value === p.frequency)?.label;
            return (
              <div key={p.id} className="flex justify-between items-start pb-3 border-b border-slate-200 last:border-0 last:pb-0 text-sm">
                <div>
                  <span className="font-semibold text-slate-900 block">
                    {idx + 1}. {camp.title}
                  </span>
                  <span className="text-xs text-slate-600">{freqLabel}</span>
                </div>
                <span className="font-bold text-primary shrink-0">
                  {formatRupiah(nominal)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Button
          onClick={() => router.push("/")}
          className="h-11 px-6 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg"
        >
          Kembali ke Beranda
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="h-11 px-6 border-slate-300 text-slate-800 rounded-lg"
        >
          Atur Jadwal Lain
        </Button>
      </div>
    </main>
  );
}
