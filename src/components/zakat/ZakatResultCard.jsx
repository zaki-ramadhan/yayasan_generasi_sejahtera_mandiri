import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatters";

export function ZakatResultCard({
  netAmountLabel,
  netAmount,
  isNisabMet,
  nisabStatusText,
  amount,
  periodLabel = "per bulan",
  buttonText = "Tunaikan Zakat Sekarang",
  onPay,
}) {
  return (
    <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-xl space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">
          Hasil Perhitungan
        </h3>

        {netAmount !== undefined && (
          <div className="space-y-1 border-b border-slate-800 pb-3 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>{netAmountLabel}:</span>
              <span className="font-semibold text-white">{formatRupiah(netAmount)}</span>
            </div>
            {isNisabMet !== undefined && (
              <div className="flex justify-between text-slate-300">
                <span>Status Nisab:</span>
                <span className={isNisabMet ? "text-emerald-400 font-semibold" : "text-amber-400"}>
                  {nisabStatusText || (isNisabMet ? "Wajib Zakat (Memenuhi Nisab)" : "Belum Wajib Zakat")}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-1 pt-1">
          <span className="text-xs text-slate-400 block">Zakat Wajib Ditunaikan (2.5%)</span>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {formatRupiah(amount)}
          </div>
          {periodLabel && (
            <span className="text-xs text-slate-400 block">{periodLabel}</span>
          )}
        </div>
      </div>

      <Button
        onClick={onPay}
        disabled={amount <= 0}
        className="w-full h-12 text-base font-medium mt-4 shadow-none cursor-pointer"
      >
        {buttonText}
      </Button>
    </div>
  );
}
