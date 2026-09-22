import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { Button } from "@/components/ui/button";
import { ZakatFieldGroup } from "../ZakatFieldGroup";
import { ZakatHaulCheckbox } from "../ZakatHaulCheckbox";

export function ZakatMaalForm({
  values,
  onChange,
  onSubmit,
  onReset,
}) {
  const totalAssets =
    (values.uangTunaiTabungan || 0) +
    (values.deposito || 0) +
    (values.investasi || 0) +
    (values.piutang || 0) +
    (values.hartaLain || 0);
  const hasValidInput = totalAssets > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasValidInput) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-medium text-slate-950">
          Zakat Maal
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Hitung zakat atas harta yang Anda miliki setelah dikurangi kewajiban yang jatuh tempo dan telah memenuhi nisab serta haul.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ZakatFieldGroup id="uangTunaiTabungan" label="Uang tunai & tabungan">
          <CurrencyInput
            id="uangTunaiTabungan"
            value={values.uangTunaiTabungan}
            onChange={(val) => onChange("uangTunaiTabungan", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>

        <ZakatFieldGroup id="deposito" label="Deposito / simpanan">
          <CurrencyInput
            id="deposito"
            value={values.deposito}
            onChange={(val) => onChange("deposito", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>

        <ZakatFieldGroup id="investasi" label="Investasi yang termasuk objek zakat">
          <CurrencyInput
            id="investasi"
            value={values.investasi}
            onChange={(val) => onChange("investasi", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>

        <ZakatFieldGroup id="piutang" label="Piutang yang dapat ditagih">
          <CurrencyInput
            id="piutang"
            value={values.piutang}
            onChange={(val) => onChange("piutang", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>

        <ZakatFieldGroup id="hartaLain" label="Harta zakat lainnya">
          <CurrencyInput
            id="hartaLain"
            value={values.hartaLain}
            onChange={(val) => onChange("hartaLain", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>

        <ZakatFieldGroup id="utangJatuhTempo" label="Utang jatuh tempo ≤ 1 tahun">
          <CurrencyInput
            id="utangJatuhTempo"
            value={values.utangJatuhTempo}
            onChange={(val) => onChange("utangJatuhTempo", val)}
            placeholder="0"
          />
        </ZakatFieldGroup>
      </div>

      <ZakatHaulCheckbox
        id="maal-haul"
        checked={values.isHaulMet}
        onChange={(val) => onChange("isHaulMet", val)}
        label="Harta telah memenuhi haul (1 tahun)"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="default"
          disabled={!hasValidInput}
          title={!hasValidInput ? "Masukkan setidaknya salah satu nilai aset/simpanan untuk menghitung" : undefined}
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
