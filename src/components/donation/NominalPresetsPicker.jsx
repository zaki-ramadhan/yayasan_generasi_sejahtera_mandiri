import { formatRupiah, formatNumber } from "@/lib/formatters";
import { DONATION_LIMITS } from "@/lib/security";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NominalPresetsPicker({
  presets,
  amount,
  isCustomMode,
  customAmountInput,
  onPresetClick,
  onCustomModeClick,
  onCustomInputChange,
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs">
      <div className="flex items-center gap-2.5">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-semibold shrink-0">
          1
        </span>
        <h2 className="text-base sm:text-lg font-semibold text-slate-950">
          Pilih Nominal Donasi
        </h2>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {presets.map((preset) => {
          const isSelected = !isCustomMode && amount === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onPresetClick(preset)}
              className={cn(
                "py-3 px-3.5 rounded-lg text-sm sm:text-base border transition-all text-center cursor-pointer min-h-[46px] flex items-center justify-center",
                isSelected
                  ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                  : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-medium"
              )}
            >
              {formatRupiah(preset)}
            </button>
          );
        })}

        {/* Option: Nominal Lainnya */}
        <button
          type="button"
          onClick={onCustomModeClick}
          className={cn(
            "py-3 px-3.5 rounded-lg text-sm sm:text-base border transition-all text-center cursor-pointer min-h-[46px] flex items-center justify-center",
            isCustomMode
              ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
              : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-medium"
          )}
        >
          Nominal Lainnya
        </button>
      </div>

      {/* Custom Input: Only rendered when isCustomMode is active */}
      {isCustomMode && (
        <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
          <label className="text-sm font-semibold text-slate-800 block">
            Nominal Lainnya (Min. {formatRupiah(DONATION_LIMITS.MIN_AMOUNT)})
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-normal text-slate-500 pointer-events-none select-none z-10">
              Rp
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoFocus
              value={customAmountInput ? formatNumber(Number(customAmountInput)) : ""}
              onChange={onCustomInputChange}
              placeholder="0"
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 text-base font-normal text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
}
