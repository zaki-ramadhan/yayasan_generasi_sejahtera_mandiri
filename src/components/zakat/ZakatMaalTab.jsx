import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/formatters";
import { ZakatResultCard } from "./ZakatResultCard";

export function ZakatMaalTab({
  nisabAnnual,
  savingsTotal,
  setSavingsTotal,
  goldGrams,
  setGoldGrams,
  shortDebt,
  setShortDebt,
  netMaal,
  zakatMaalAmount,
  isMaalNisabMet,
  onPay,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-950">Hitung Zakat Maal (Harta Tersimpan 1 Tahun)</h3>
          <p className="text-sm text-slate-700">
            Nisab tahunan: <strong>{formatRupiah(nisabAnnual)}</strong> (setara 85 gram emas).
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-800 block">Saldo Tabungan &amp; Deposito</label>
            <Input
              type="number"
              value={savingsTotal || ""}
              onChange={(e) => setSavingsTotal(Number(e.target.value) || 0)}
              className="h-11 border-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-800 block">Simpanan Emas / Logam Mulia (Gram)</label>
            <Input
              type="number"
              value={goldGrams || ""}
              onChange={(e) => setGoldGrams(Number(e.target.value) || 0)}
              placeholder="0"
              className="h-11 border-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-800 block">Hutang Jatuh Tempo yang Harus Dibayar</label>
            <Input
              type="number"
              value={shortDebt || ""}
              onChange={(e) => setShortDebt(Number(e.target.value) || 0)}
              placeholder="0"
              className="h-11 border-slate-300"
            />
          </div>
        </div>
      </div>

      <ZakatResultCard
        netAmountLabel="Total Harta Bersih"
        netAmount={netMaal}
        isNisabMet={isMaalNisabMet}
        nisabStatusText={isMaalNisabMet ? "Memenuhi Nisab (Wajib)" : "Belum Memenuhi Nisab"}
        amount={zakatMaalAmount}
        periodLabel="per tahun"
        buttonText="Tunaikan Zakat Maal"
        onPay={() => onPay(zakatMaalAmount, "ZAKAT_MAAL")}
      />
    </div>
  );
}
