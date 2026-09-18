import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/formatters";
import { ZakatResultCard } from "./ZakatResultCard";

export function ZakatProfesiTab({
  nisabMonthly,
  incomeMonthly,
  setIncomeMonthly,
  otherIncomeMonthly,
  setOtherIncomeMonthly,
  debtMonthly,
  setDebtMonthly,
  netIncome,
  zakatIncomeAmount,
  isIncomeNisabMet,
  onPay,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-950">Hitung Zakat Penghasilan / Profesi</h3>
          <p className="text-sm text-slate-700">
            Nisab bulanan: <strong>{formatRupiah(nisabMonthly)}</strong> (setara 7,08 gram emas).
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-800 block">Penghasilan / Gaji Pokok per Bulan</label>
            <Input
              type="number"
              value={incomeMonthly || ""}
              onChange={(e) => setIncomeMonthly(Number(e.target.value) || 0)}
              className="h-11 border-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-800 block">Pendapatan Lain / Bonus (Opsional)</label>
            <Input
              type="number"
              value={otherIncomeMonthly || ""}
              onChange={(e) => setOtherIncomeMonthly(Number(e.target.value) || 0)}
              className="h-11 border-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-800 block">Cicilan / Hutang Kebutuhan Pokok per Bulan</label>
            <Input
              type="number"
              value={debtMonthly || ""}
              onChange={(e) => setDebtMonthly(Number(e.target.value) || 0)}
              className="h-11 border-slate-300"
            />
          </div>
        </div>
      </div>

      <ZakatResultCard
        netAmountLabel="Penghasilan Bersih"
        netAmount={netIncome}
        isNisabMet={isIncomeNisabMet}
        nisabStatusText={isIncomeNisabMet ? "Wajib Zakat (Memenuhi Nisab)" : "Belum Wajib Zakat"}
        amount={zakatIncomeAmount}
        periodLabel="per bulan"
        buttonText="Tunaikan Zakat Sekarang"
        onPay={() => onPay(zakatIncomeAmount, "ZAKAT_PENGHASILAN")}
      />
    </div>
  );
}
