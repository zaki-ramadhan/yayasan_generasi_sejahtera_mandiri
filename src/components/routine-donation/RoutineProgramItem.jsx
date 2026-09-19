import { Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000];

export const FREQUENCY_OPTIONS = [
  { value: "DAILY_SUBUH", label: "Setiap Hari (Sedekah Subuh)" },
  { value: "WEEKLY_FRIDAY", label: "Setiap Pekan (Jumat Berkah)" },
  { value: "MONTHLY_PAYDAY", label: "Setiap Bulan (Awal Bulan / Gajian)" },
];

export function RoutineProgramItem({
  item,
  index,
  totalItems,
  campaigns = CAMPAIGNS,
  onRemove,
  onChange,
}) {
  const campaignList = campaigns && campaigns.length > 0 ? campaigns : CAMPAIGNS;

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs relative">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-sm font-bold text-primary">
          Program {index + 1}
        </span>
        {totalItems > 1 && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Hapus
          </button>
        )}
      </div>

      {/* Program Picker */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-800 block">
          Pilih program kebaikan
        </label>
        <Select
          value={item.campaignId}
          onValueChange={(val) => onChange(item.id, "campaignId", val)}
        >
          <SelectTrigger className="h-9 text-xs sm:text-sm text-slate-800 border-slate-300 rounded-lg shadow-2xs font-medium">
            <SelectValue placeholder="-- Silakan Pilih Program --" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-slate-200">
            {campaignList.map((camp) => (
              <SelectItem key={camp.id} value={camp.id} className="text-xs sm:text-sm">
                {camp.title} ({camp.categoryName || "Program Umum"})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Frequency Picker */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-800 block">
          Frekuensi donasi rutin
        </label>
        <Select
          value={item.frequency}
          onValueChange={(val) => onChange(item.id, "frequency", val)}
        >
          <SelectTrigger className="h-9 text-xs sm:text-sm text-slate-800 border-slate-300 rounded-lg shadow-2xs font-medium">
            <SelectValue placeholder="Pilih frekuensi..." />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-slate-200">
            {FREQUENCY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs sm:text-sm">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amount Picker */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800 block">
          Nominal donasi
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {PRESET_AMOUNTS.map((amt) => {
            const isSelected = !item.isCustom && item.amount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  onChange(item.id, "amount", amt);
                  onChange(item.id, "isCustom", false);
                  onChange(item.id, "customAmount", "");
                }}
                className={cn(
                  "py-2 px-1 text-center text-xs sm:text-sm rounded-lg border transition-all cursor-pointer",
                  isSelected
                    ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                    : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50 font-medium"
                )}
              >
                {formatRupiah(amt)}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              onChange(item.id, "isCustom", true);
            }}
            className={cn(
              "py-2 px-1 text-center text-xs sm:text-sm rounded-lg border transition-all cursor-pointer",
              item.isCustom
                ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50 font-medium"
            )}
          >
            Lainnya
          </button>
        </div>

        {item.isCustom && (
          <div className="space-y-1.5 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <label className="text-sm font-semibold text-slate-800 block">
              Nominal Lainnya (Min. {formatRupiah(10000)})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-normal text-slate-500 pointer-events-none select-none z-10">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                autoFocus
                placeholder="0"
                value={item.customAmount ? formatNumber(Number(item.customAmount)) : ""}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  onChange(item.id, "customAmount", raw);
                  onChange(item.id, "amount", raw ? parseInt(raw, 10) : 0);
                }}
                className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 text-base font-normal text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
