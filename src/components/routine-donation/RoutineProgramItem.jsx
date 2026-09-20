"use client";

import * as React from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Trash2, ChevronDown, Check, Calendar as CalendarIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CAMPAIGNS } from "@/data/campaigns";
import { PAYMENT_CHANNELS } from "@/data/paymentChannels";
import { PaymentChannelPicker } from "@/components/donation/PaymentChannelPicker";
import { formatRupiah, formatNumber } from "@/lib/formatters";
import { DONATION_LIMITS } from "@/lib/security";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000];

export const DAYS_OF_WEEK = [
  { id: "senin", label: "Senin" },
  { id: "selasa", label: "Selasa" },
  { id: "rabu", label: "Rabu" },
  { id: "kamis", label: "Kamis" },
  { id: "jumat", label: "Jumat" },
  { id: "sabtu", label: "Sabtu" },
  { id: "minggu", label: "Minggu" },
];

export const FREQUENCY_OPTIONS = [
  { value: "DAILY", label: "Setiap Hari" },
  { value: "WEEKLY", label: "Setiap Pekan (Pilih Hari)" },
  { value: "MONTHLY", label: "Setiap Bulan (Pilih Tanggal)" },
];

export function normalizeFrequency(freq) {
  if (freq === "DAILY_SUBUH" || freq === "DAILY") return "DAILY";
  if (freq === "WEEKLY_FRIDAY" || freq === "WEEKLY") return "WEEKLY";
  if (freq === "MONTHLY_PAYDAY" || freq === "MONTHLY") return "MONTHLY";
  return "DAILY";
}

export function formatRoutineSchedule(item) {
  if (!item) return "Setiap Hari";
  const freq = normalizeFrequency(item.frequency);

  if (freq === "DAILY") {
    return "Setiap Hari";
  }

  if (freq === "WEEKLY") {
    const dayObj = DAYS_OF_WEEK.find((d) => d.id === (item.selectedDay || "jumat"));
    const dayLabel = dayObj ? dayObj.label : "Jumat";
    return `Setiap Pekan (${dayLabel})`;
  }

  if (freq === "MONTHLY") {
    let dateStr = "1";
    if (item.monthlyDate) {
      try {
        dateStr = format(new Date(item.monthlyDate), "d MMMM", { locale: idLocale });
      } catch {
        dateStr = "1";
      }
    }
    return `Setiap Bulan (Tgl ${dateStr})`;
  }

  return "Setiap Hari";
}

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

/**
 * 24-Hour Numeric Time Input
 * Strict validation: 00-23 hours, 00-59 minutes, no letters/symbols/emojis, auto-padding & arrow navigation.
 */
/**
 * 24-Hour Numeric Time Input
 * Standard controlled 2-digit inputs for Hour (00-23) and Minute (00-59).
 * - Full select on focus & click so users can immediately overwrite.
 * - Strict numeric filter and clamping to max real time (23 / 59).
 * - No premature focus jumping while typing digits (eliminates blur race condition).
 * - Keyboard navigation: ArrowUp/Down for step, ':' or Tab or ArrowRight to switch to minute.
 * - Auto-pad with leading zero on blur.
 */
function TimeInput24Hour({ value = "05:00", onChange }) {
  const [initH = "05", initM = "00"] = (value || "05:00").split(":");
  const [prevValue, setPrevValue] = React.useState(value);
  const [hour, setHour] = React.useState(initH);
  const [minute, setMinute] = React.useState(initM);

  const hourRef = React.useRef(null);
  const minuteRef = React.useRef(null);

  // Selaraskan state saat prop value berubah dari luar tanpa useEffect cascade
  if (prevValue !== value) {
    setPrevValue(value);
    setHour(initH);
    setMinute(initM);
  }

  const handleHourChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setHour("");
      return;
    }
    let num = parseInt(raw, 10);
    if (num > 23) {
      num = 23;
    }
    const val = raw.length > 2 ? String(num).slice(-2) : String(num);
    setHour(val);

    if (val.length === 2) {
      const padH = val.padStart(2, "0");
      const padM = (minute || "00").padStart(2, "0");
      onChange(`${padH}:${padM}`);
    }
  };

  const handleHourBlur = () => {
    let finalH = "05";
    if (hour !== "") {
      let num = parseInt(hour, 10) || 0;
      num = Math.max(0, Math.min(23, num));
      finalH = String(num).padStart(2, "0");
    }
    setHour(finalH);
    const padM = (minute || "00").padStart(2, "0");
    onChange(`${finalH}:${padM}`);
  };

  const handleHourKeyDown = (e) => {
    if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const cur = parseInt(hour, 10) || 0;
      const next = (cur + 1) % 24;
      const nextStr = String(next).padStart(2, "0");
      setHour(nextStr);
      onChange(`${nextStr}:${(minute || "00").padStart(2, "0")}`);
      requestAnimationFrame(() => hourRef.current?.select());
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const cur = parseInt(hour, 10) || 0;
      const next = cur === 0 ? 23 : cur - 1;
      const nextStr = String(next).padStart(2, "0");
      setHour(nextStr);
      onChange(`${nextStr}:${(minute || "00").padStart(2, "0")}`);
      requestAnimationFrame(() => hourRef.current?.select());
      return;
    }

    if (e.key === ":" || e.key === "ArrowRight") {
      e.preventDefault();
      minuteRef.current?.focus();
      minuteRef.current?.select();
    }
  };

  const handleMinuteChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setMinute("");
      return;
    }
    let num = parseInt(raw, 10);
    if (num > 59) {
      num = 59;
    }
    const val = raw.length > 2 ? String(num).slice(-2) : String(num);
    setMinute(val);

    if (val.length === 2) {
      const padH = (hour || "05").padStart(2, "0");
      const padM = val.padStart(2, "0");
      onChange(`${padH}:${padM}`);
    }
  };

  const handleMinuteBlur = () => {
    let finalM = "00";
    if (minute !== "") {
      let num = parseInt(minute, 10) || 0;
      num = Math.max(0, Math.min(59, num));
      finalM = String(num).padStart(2, "0");
    }
    setMinute(finalM);
    const padH = (hour || "05").padStart(2, "0");
    onChange(`${padH}:${finalM}`);
  };

  const handleMinuteKeyDown = (e) => {
    if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const cur = parseInt(minute, 10) || 0;
      const step = e.shiftKey ? 5 : 1;
      const next = (cur + step) % 60;
      const nextStr = String(next).padStart(2, "0");
      setMinute(nextStr);
      onChange(`${(hour || "05").padStart(2, "0")}:${nextStr}`);
      requestAnimationFrame(() => minuteRef.current?.select());
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const cur = parseInt(minute, 10) || 0;
      const step = e.shiftKey ? 5 : 1;
      const next = cur - step < 0 ? 60 + (cur - step) : cur - step;
      const nextStr = String(next).padStart(2, "0");
      setMinute(nextStr);
      onChange(`${(hour || "05").padStart(2, "0")}:${nextStr}`);
      requestAnimationFrame(() => minuteRef.current?.select());
      return;
    }

    if (e.key === "ArrowLeft" || (e.key === "Backspace" && minute === "")) {
      e.preventDefault();
      hourRef.current?.focus();
      hourRef.current?.select();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text") || "";
    const clean = pasted.replace(/[^\d:]/g, "");
    if (clean.includes(":")) {
      const [h, m] = clean.split(":");
      const cleanH = String(Math.max(0, Math.min(23, parseInt(h, 10) || 0))).padStart(2, "0");
      const cleanM = String(Math.max(0, Math.min(59, parseInt(m, 10) || 0))).padStart(2, "0");
      setHour(cleanH);
      setMinute(cleanM);
      onChange(`${cleanH}:${cleanM}`);
    } else if (clean.length >= 4) {
      const h = clean.slice(0, 2);
      const m = clean.slice(2, 4);
      const cleanH = String(Math.max(0, Math.min(23, parseInt(h, 10) || 0))).padStart(2, "0");
      const cleanM = String(Math.max(0, Math.min(59, parseInt(m, 10) || 0))).padStart(2, "0");
      setHour(cleanH);
      setMinute(cleanM);
      onChange(`${cleanH}:${cleanM}`);
    } else if (clean.length > 0) {
      const num = Math.max(0, Math.min(23, parseInt(clean, 10) || 0));
      const cleanH = String(num).padStart(2, "0");
      setHour(cleanH);
      onChange(`${cleanH}:${(minute || "00").padStart(2, "0")}`);
      minuteRef.current?.focus();
      minuteRef.current?.select();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          ref={hourRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          placeholder="05"
          aria-label="Jam pengingat (00-23)"
          value={hour}
          onChange={handleHourChange}
          onBlur={handleHourBlur}
          onFocus={(e) => e.target.select()}
          onClick={(e) => e.target.select()}
          onKeyDown={handleHourKeyDown}
          onPaste={handlePaste}
          className="w-16 h-11 text-center font-semibold text-base sm:text-lg text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all tracking-wider shadow-2xs"
        />
        <span className="sr-only">Jam</span>
      </div>

      <span className="text-xl font-bold text-slate-400 select-none pb-0.5">:</span>

      <div className="relative">
        <input
          ref={minuteRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          placeholder="00"
          aria-label="Menit pengingat (00-59)"
          value={minute}
          onChange={handleMinuteChange}
          onBlur={handleMinuteBlur}
          onFocus={(e) => e.target.select()}
          onClick={(e) => e.target.select()}
          onKeyDown={handleMinuteKeyDown}
          onPaste={handlePaste}
          className="w-16 h-11 text-center font-semibold text-base sm:text-lg text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all tracking-wider shadow-2xs"
        />
        <span className="sr-only">Menit</span>
      </div>

      <span className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-2.5 rounded-lg border border-slate-200 select-none">
        WIB
      </span>
    </div>
  );
}

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
  const currentFrequency = normalizeFrequency(item.frequency);
  const selectedFreq =
    FREQUENCY_OPTIONS.find((f) => f.value === currentFrequency) || FREQUENCY_OPTIONS[0];
  const currentRoutineType = item.routineType || "REMINDER_ONLY";
  const isAutoDonation = currentRoutineType === "AUTO_DONATION";

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
            className="text-sm text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4 shrink-0" /> Hapus Program
          </button>
        )}
      </div>

      {/* Program Picker (DropdownMenu modal={false} - Zero Scroll Lock) */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-800 block">
          Pilih program donasi
        </label>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm sm:text-base font-normal text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer text-left"
            >
              <span className="truncate">
                {selectedCampaign
                  ? `${selectedCampaign.title} (${selectedCampaign.categoryName || "Program Umum"})`
                  : "-- Silakan Pilih Program --"}
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
                  <span className="truncate">
                    {camp.title} ({camp.categoryName || "Program Umum"})
                  </span>
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
      <div className="space-y-2">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 block">
            Jadwal donasi rutin
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
                const isSelected = currentFrequency === freq.value;
                return (
                  <DropdownMenuItem
                    key={freq.value}
                    onClick={() => {
                      onChange(item.id, "frequency", freq.value);
                      if (freq.value === "WEEKLY" && !item.selectedDay) {
                        onChange(item.id, "selectedDay", "jumat");
                      }
                      if (freq.value === "MONTHLY" && !item.monthlyDate) {
                        onChange(item.id, "monthlyDate", new Date().toISOString());
                      }
                    }}
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

        {/* Sub-Pilihan Frekuensi: Pekanan (Grid 3x3 Hari, Minggu col-span-3) */}
        {currentFrequency === "WEEKLY" && (
          <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <label className="text-sm font-semibold text-slate-800 block">
              Pilih hari donasi rutin
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = (item.selectedDay || "jumat") === day.id;
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => onChange(item.id, "selectedDay", day.id)}
                    className={cn(
                      "py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg text-sm sm:text-base border transition-all text-center cursor-pointer min-h-[44px] sm:min-h-[46px] flex items-center justify-center font-medium",
                      day.id === "minggu" && "col-span-3",
                      isSelected
                        ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                        : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50"
                    )}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 italic font-normal">
              *Jadwal donasi akan diingatkan atau ditagihkan setiap hari{" "}
              {DAYS_OF_WEEK.find((d) => d.id === (item.selectedDay || "jumat"))?.label || "Jumat"}.
            </p>
          </div>
        )}

        {/* Sub-Pilihan Frekuensi: Bulanan (Shadcn Date Picker Popover + Calendar) */}
        {currentFrequency === "MONTHLY" && (
          <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <label className="text-sm font-semibold text-slate-800 block">
              Pilih tanggal donasi rutin
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!item.monthlyDate}
                  className={cn(
                    "w-full sm:w-[280px] justify-between text-left font-normal h-11 border-slate-300 bg-white hover:bg-slate-50 text-slate-900 px-3.5 cursor-pointer",
                    !item.monthlyDate && "text-slate-500"
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <CalendarIcon className="h-4 w-4 text-slate-500 shrink-0" />
                    {item.monthlyDate ? (
                      <span className="font-medium text-slate-900 truncate">
                        Setiap tgl {format(new Date(item.monthlyDate), "d MMMM", { locale: idLocale })}
                      </span>
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 opacity-70 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white border border-slate-200 shadow-md rounded-xl z-50"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={item.monthlyDate ? new Date(item.monthlyDate) : undefined}
                  onSelect={(d) => {
                    if (d) {
                      onChange(item.id, "monthlyDate", d.toISOString());
                    }
                  }}
                  defaultMonth={item.monthlyDate ? new Date(item.monthlyDate) : new Date()}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs sm:text-sm text-slate-600 italic font-normal">
              *Donasi rutin akan berulang setiap tanggal{" "}
              {item.monthlyDate ? format(new Date(item.monthlyDate), "d MMMM", { locale: idLocale }) : "1"} setiap bulannya.
            </p>
          </div>
        )}
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
                  <span className="text-sm font-semibold text-slate-900">
                    {opt.title}
                  </span>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2",
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 bg-white"
                    )}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="mt-1 text-sm text-slate-600 font-normal leading-relaxed">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dropdown Toggle Atur Masa Berlaku (Opsional) */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onChange(item.id, "hasCustomPeriod", !item.hasCustomPeriod)}
          className="flex items-center justify-between w-full py-1 text-sm font-semibold text-slate-800 hover:text-primary transition-colors cursor-pointer select-none"
        >
          <span>Atur masa berlaku (opsional)</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-500 transition-transform duration-200",
              item.hasCustomPeriod && "rotate-180"
            )}
          />
        </button>

        {item.hasCustomPeriod && (
          <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={item.startDate || ""}
                  onChange={(e) => onChange(item.id, "startDate", e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm font-normal text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors bg-white cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                  Tanggal Berakhir
                </label>
                <input
                  type="date"
                  value={item.endDate || ""}
                  min={item.startDate || ""}
                  onChange={(e) => onChange(item.id, "endDate", e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm font-normal text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors bg-white cursor-pointer"
                />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-600 italic font-normal">
              *Jadwal donasi rutin akan otomatis berakhir setelah tanggal batas selesai terlewati.
            </p>
          </div>
        )}
      </div>

      {/* Jam Pengingat (Format 24 Jam dengan Input Number & Sanitasi) */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <label className="text-sm font-semibold text-slate-800 block">
          Jam pengingat (WIB)
        </label>
        <TimeInput24Hour
          value={item.reminderTime || "05:00"}
          onChange={(newTime) => onChange(item.id, "reminderTime", newTime)}
        />
        <p className="mt-1 text-sm text-slate-600 italic font-normal">
          *Notifikasi otomatis akan dikirimkan pada jam yang ditentukan (Format 24 Jam).
        </p>
      </div>

      {/* KONDISIONAL: Opsi 2 (Donasi Otomatis) -> Tampilkan Nominal & Metode Pembayaran */}
      {isAutoDonation ? (
        <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
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
                      "py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg text-sm sm:text-base border transition-all text-center cursor-pointer min-h-[44px] sm:min-h-[46px] flex items-center justify-center font-medium",
                      isSelected
                        ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                        : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50"
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
                  "py-2.5 sm:py-3 px-2 sm:px-3 rounded-lg text-sm sm:text-base border transition-all text-center cursor-pointer min-h-[44px] sm:min-h-[46px] flex items-center justify-center font-medium",
                  item.isCustom
                    ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                    : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50"
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
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 9);
                      const parsed = raw ? parseInt(raw, 10) : 0;
                      const clamped = Math.min(parsed, DONATION_LIMITS.MAX_AMOUNT);
                      const finalRaw = clamped > 0 ? String(clamped) : (raw === "" ? "" : "0");
                      onChange(item.id, "customAmount", finalRaw);
                      onChange(item.id, "amount", clamped);
                    }}
                    className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 text-base font-normal text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Metode Pembayaran Tagihan Otomatis */}
          <div className="pt-2 border-t border-slate-100">
            <PaymentChannelPicker
              channels={PAYMENT_CHANNELS}
              selectedChannelId={item.paymentChannelId || "qris"}
              onSelectChannel={(channelId) => onChange(item.id, "paymentChannelId", channelId)}
              containerCard={false}
              stepNumber={null}
              title="Metode pembayaran tagihan otomatis"
            />
          </div>
        </div>
      ) : (
        /* KONDISIONAL: Opsi 1 (Pengingat WA Saja) -> Info Fleksibel */
        <div className="rounded-lg bg-blue-50/70 border border-blue-200/80 p-4 text-sm text-slate-700 space-y-1 pt-2 mt-2">
          <p className="font-semibold text-blue-950">Mode Pengingat WhatsApp Aktif</p>
          <p className="text-sm text-slate-600 font-normal leading-relaxed">
            Sistem hanya akan mengirimkan pesan pengingat ke nomor WhatsApp Anda setiap jadwal tiba. Anda dapat menentukan nominal dan menunaikan donasi melalui tautan aman yang dikirimkan.
          </p>
        </div>
      )}
    </div>
  );
}
