import { Trash2, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah, formatNumber } from "@/lib/formatters";
import { DONATION_LIMITS } from "@/lib/security";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000];

export const FREQUENCY_OPTIONS = [
  { value: "DAILY_SUBUH", label: "Setiap Hari (Sedekah Subuh)" },
  { value: "WEEKLY_FRIDAY", label: "Setiap Pekan (Jumat Berkah)" },
  { value: "MONTHLY_PAYDAY", label: "Setiap Bulan (Awal Bulan / Gajian)" },
];

export const ROUTINE_TYPE_OPTIONS = [
  {
    value: "REMINDER_ONLY",
    title: "Pengingat WhatsApp Saja",
    desc: "Sistem hanya mengirim pengingat ke WA saat jadwal tiba (tidak membuat invoice tagihan).",
  },
  {
    value: "AUTO_DONATION",
    title: "Donasi Otomatis (Auto-Invoice)",
    desc: "Sistem otomatis membuatkan invoice & link QRIS siap bayar yang langsung dikirimkan ke WA.",
  },
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
  const selectedCampaign = campaignList.find((c) => c.id === item.campaignId) || campaignList[0];
  const selectedFreq = FREQUENCY_OPTIONS.find((f) => f.value === item.frequency) || FREQUENCY_OPTIONS[0];
  const currentRoutineType = item.routineType || "REMINDER_ONLY";

  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs relative">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">
          Program {index + 1}
        </span>
        {totalItems > 1 && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-sm text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4 shrink-0" /> Hapus Program
          </button>
        )}
      </div>

      {/* Program Picker (DropdownMenu modal={false} - Zero Scroll Lock) */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-800 block">
          Pilih program kebaikan
        </label>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm sm:text-base font-normal text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer text-left"
            >
              <span className="truncate">
                {selectedCampaign ? `${selectedCampaign.title} (${selectedCampaign.categoryName || "Program Umum"})` : "-- Silakan Pilih Program --"}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-2" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-72 overflow-y-auto bg-white border border-slate-200 shadow-md rounded-lg p-1.5 z-50"
          >
            {campaignList.map((camp) => {
              const isSelected = item.campaignId === camp.id;
              return (
                <DropdownMenuItem
                  key={camp.id}
                  onClick={() => onChange(item.id, "campaignId", camp.id)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors",
                    isSelected
                      ? "bg-blue-50 font-semibold text-primary"
                      : "text-slate-800 hover:bg-slate-100"
                  )}
                >
                  <span className="truncate">{camp.title} ({camp.categoryName || "Program Umum"})</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Frequency Picker (DropdownMenu modal={false} - Zero Scroll Lock) */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-800 block">
          Frekuensi donasi rutin
        </label>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm sm:text-base font-normal text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer text-left"
            >
              <span className="truncate">{selectedFreq.label}</span>
              <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-2" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-slate-200 shadow-md rounded-lg p-1.5 z-50"
          >
            {FREQUENCY_OPTIONS.map((freq) => {
              const isSelected = item.frequency === freq.value;
              return (
                <DropdownMenuItem
                  key={freq.value}
                  onClick={() => onChange(item.id, "frequency", freq.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors",
                    isSelected
                      ? "bg-blue-50 font-semibold text-primary"
                      : "text-slate-800 hover:bg-slate-100"
                  )}
                >
                  <span className="truncate">{freq.label}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Routine Type Option (Pengingat WA vs Donasi Otomatis) */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-800 block">
          Model pelaksanaan donasi
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ROUTINE_TYPE_OPTIONS.map((opt) => {
            const isSelected = currentRoutineType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(item.id, "routineType", opt.value)}
                className={cn(
                  "p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between",
                  isSelected
                    ? "bg-blue-50/70 border-primary ring-1 ring-primary text-slate-900"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">
                    {opt.title}
                  </span>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2",
                      isSelected ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"
                    )}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amount Picker (Grid 3x2: 5 Presets + 1 Lainnya) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800 block">
          Nominal donasi
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
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
                  "py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg text-sm sm:text-base border transition-all text-center cursor-pointer min-h-[44px] sm:min-h-[46px] flex items-center justify-center",
                  isSelected
                    ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                    : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-medium"
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
              "py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg text-sm sm:text-base border transition-all text-center cursor-pointer min-h-[44px] sm:min-h-[46px] flex items-center justify-center",
              item.isCustom
                ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-medium"
            )}
          >
            Lainnya
          </button>
        </div>

        {item.isCustom && (
          <div className="space-y-1.5 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
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
                placeholder="0"
                value={item.customAmount ? formatNumber(Number(item.customAmount)) : ""}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
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
