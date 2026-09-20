import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatters";

export function ZakatFidyahTab({
  fidyahRatePerDay,
  fidyahDays,
  setFidyahDays,
  fidyahTotal,
  onPay,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-950">Hitung Fidyah Pengganti Puasa</h3>
          <p className="text-sm text-slate-700">
            Tarif fidyah: <strong>{formatRupiah(fidyahRatePerDay)}</strong> per hari (termasuk paket makan bergizi untuk dhuafa).
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 block">Jumlah Hari Hutang Puasa</label>
          <Input
            type="number"
            min="1"
            max="365"
            value={fidyahDays || ""}
            onChange={(e) => {
              const val = Math.max(0, Math.min(365, Math.floor(Number(e.target.value) || 0)));
              setFidyahDays(val);
            }}
            className="h-11 border-slate-300"
          />
        </div>
      </div>

      <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-xl space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">
            Total Fidyah
          </h3>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {formatRupiah(fidyahTotal)}
          </div>
          <span className="text-xs text-slate-400 block">
            Untuk {fidyahDays} porsi makan santri &amp; dhuafa
          </span>
        </div>

        <Button
          onClick={() => onPay(fidyahTotal, "FIDYAH")}
          disabled={fidyahTotal <= 0}
          className="w-full h-12 text-base font-medium mt-4 shadow-none cursor-pointer"
        >
          Bayar Fidyah Sekarang
        </Button>
      </div>
    </div>
  );
}
