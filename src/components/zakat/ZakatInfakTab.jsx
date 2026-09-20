import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/formatters";

export function ZakatInfakTab({
  infakAmount,
  setInfakAmount,
  onPay,
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 max-w-xl mx-auto text-center shadow-xs">
      <h3 className="text-base font-semibold text-slate-950">Sedekah &amp; Infak Sukarela</h3>
      <p className="text-sm text-slate-700">
        Salurkan sedekah terbaik Anda tanpa batasan nominal untuk operasional pondok dan dakwah santri.
      </p>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800 block text-left">Nominal Sedekah (Min. Rp 10.000)</label>
        <Input
          type="number"
          min="10000"
          max="100000000"
          value={infakAmount || ""}
          onChange={(e) => setInfakAmount(Math.max(0, Math.min(100000000, Math.floor(Number(e.target.value) || 0))))}
          className="h-12 text-center text-lg font-bold border-slate-300"
        />
      </div>

      <Button
        onClick={() => onPay(infakAmount, "INFAK")}
        disabled={infakAmount < 10000}
        className="w-full h-12 font-semibold shadow-xs cursor-pointer"
      >
        Salurkan Sedekah {formatRupiah(infakAmount)}
      </Button>
    </div>
  );
}
