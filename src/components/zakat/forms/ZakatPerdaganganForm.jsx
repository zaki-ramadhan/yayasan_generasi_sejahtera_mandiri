import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { Button } from "@/components/ui/button";
import { ZakatFieldGroup } from "../ZakatFieldGroup";
import { ZakatHaulCheckbox } from "../ZakatHaulCheckbox";

export function ZakatPerdaganganForm({
  values,
  onChange,
  onSubmit,
  onReset,
}) {
  const hasValidInput = (values.asetLancar || 0) > 0 || (values.laba || 0) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasValidInput) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-medium text-slate-950">
          Zakat Perdagangan
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Hitung zakat dari harta perdagangan, aset lancar, keuntungan, serta kewajiban usaha yang relevan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ZakatFieldGroup id="asetLancar" label="Aset lancar">
          <CurrencyInput
            id="asetLancar"
            value={values.asetLancar}
            onChange={(val) => onChange("asetLancar", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>

        <ZakatFieldGroup id="laba" label="Laba">
          <CurrencyInput
            id="laba"
            value={values.laba}
            onChange={(val) => onChange("laba", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>
      </div>

      <ZakatHaulCheckbox
        id="perdagangan-haul"
        checked={values.isHaulMet}
        onChange={(val) => onChange("isHaulMet", val)}
        label="Usaha/harta telah memenuhi haul (1 tahun)"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="default"
          disabled={!hasValidInput}
          title={!hasValidInput ? "Masukkan nominal aset lancar atau laba untuk menghitung" : undefined}
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
