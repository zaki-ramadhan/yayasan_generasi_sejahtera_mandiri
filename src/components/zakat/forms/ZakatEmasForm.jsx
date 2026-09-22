import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { Button } from "@/components/ui/button";
import { ZakatFieldGroup } from "../ZakatFieldGroup";
import { ZakatHaulCheckbox } from "../ZakatHaulCheckbox";

export function ZakatEmasForm({
  values,
  onChange,
  onSubmit,
  onReset,
}) {
  const hasValidInput = (values.jumlahGram || 0) > 0 && (values.hargaPerGram || 0) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasValidInput) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-medium text-slate-950">
          Zakat Emas
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nisab zakat emas adalah 85 gram dengan kadar zakat 2.5%. Harga emas dapat disesuaikan sesuai harga yang berlaku saat perhitungan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ZakatFieldGroup id="jumlahGram" label="Jumlah emas yang dimiliki">
          <div className="relative w-full">
            <input
              id="jumlahGram"
              type="number"
              min="0"
              step="any"
              value={values.jumlahGram || ""}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const raw = parseFloat(e.target.value);
                onChange("jumlahGram", isNaN(raw) || raw < 0 ? 0 : raw);
              }}
              placeholder="0"
              className="w-full h-11 pl-3.5 pr-14 rounded-md border border-slate-300 text-sm font-normal text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-normal text-slate-600 pointer-events-none select-none">
              gram
            </span>
          </div>
        </ZakatFieldGroup>

        <ZakatFieldGroup
          id="hargaPerGram"
          label="Harga emas per gram"
          helperText="Harga acuan dapat disesuaikan dengan harga pasaran saat ini"
        >
          <CurrencyInput
            id="hargaPerGram"
            value={values.hargaPerGram}
            onChange={(val) => onChange("hargaPerGram", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>
      </div>

      <ZakatHaulCheckbox
        id="emas-haul"
        checked={values.isHaulMet}
        onChange={(val) => onChange("isHaulMet", val)}
        label="Emas telah dimiliki selama 1 tahun (haul)"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="default"
          disabled={!hasValidInput}
          title={!hasValidInput ? "Masukkan jumlah gram emas untuk menghitung zakat" : undefined}
          className="rounded-md px-5 h-10 text-sm font-medium"
        >
          Hitung Zakat
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="rounded-md px-4 h-10 text-sm font-medium text-slate-700 hover:text-slate-900 border-slate-300"
        >
          Atur Ulang
        </Button>
      </div>
    </form>
  );
}
