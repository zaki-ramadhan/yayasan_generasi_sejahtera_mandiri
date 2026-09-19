"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatRupiah, formatNumber } from "@/lib/formatters";
import { getStoredUser } from "@/services/authService";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [25000, 50000, 100000];

export function QuickDonateBar({ defaultCampaignSlug = "beasiswa-santri-penghafal-quran" }) {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const router = useRouter();

  const handlePresetSelect = (amt) => {
    setIsCustomMode(false);
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomModeClick = () => {
    setIsCustomMode(true);
    const num = Number(customAmount);
    setSelectedAmount(num || 0);
  };

  const handleCustomChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setCustomAmount(raw);
    const num = Number(raw);
    setSelectedAmount(num || 0);
  };

  const finalAmount = isCustomMode ? (customAmount ? Number(customAmount) : 0) : selectedAmount;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (finalAmount < 10000) return;

    const user = getStoredUser();
    const targetUrl = `/campaign/${defaultCampaignSlug}/donate?amount=${finalAmount}`;

    if (!user) {
      router.push(
        `/login?redirect=${encodeURIComponent(targetUrl)}&reason=donation_requires_login`
      );
      return;
    }

    router.push(targetUrl);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white rounded-xl border border-slate-300 p-6 sm:p-7 space-y-5 shadow-md"
    >
      {/* Header Form: Teks dan Aset 3D Sejajar dalam satu parent */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5 min-w-0">
          <h2 className="text-base font-semibold text-slate-950">
            Formulir Donasi Cepat
          </h2>
          <p className="text-sm text-slate-700">Pilih atau tentukan nominal sedekah</p>
        </div>
      </div>

      {/* Amount Presets */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
          {PRESET_AMOUNTS.map((amt) => {
            const isSelected = !isCustomMode && selectedAmount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => handlePresetSelect(amt)}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-sm border transition-all text-center cursor-pointer min-h-[56px] flex items-center justify-center",
                  isSelected
                    ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                    : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-medium"
                )}
              >
                {formatRupiah(amt)}
              </button>
            );
          })}

          {/* Option: Nominal Lainnya */}
          <button
            type="button"
            onClick={handleCustomModeClick}
            className={cn(
              "py-2.5 px-3 rounded-lg text-sm border transition-all text-center cursor-pointer min-h-[42px] flex items-center justify-center",
              isCustomMode
                ? "bg-blue-50 text-blue-950 border-blue-600 ring-1 ring-blue-600 font-semibold shadow-2xs"
                : "bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-medium"
            )}
          >
            Lainnya
          </button>
        </div>
      </div>

      {/* Custom Nominal Input: Only rendered when isCustomMode is active */}
      {isCustomMode && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
          <label className="text-sm font-semibold text-slate-800 block">
            Nominal Lainnya (Min. Rp 10.000)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-normal text-slate-500">
              Rp
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoFocus
              value={customAmount ? formatNumber(Number(customAmount)) : ""}
              onChange={handleCustomChange}
              placeholder="0"
              className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 text-base font-normal text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}

      {/* CTA Button with Primary 3D styling */}
      <div className="space-y-2.5 pt-1">
        <Button
          type="submit"
          disabled={finalAmount < 10000}
          className="w-full h-12 rounded-lg text-base font-semibold text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-t border-t-blue-400 border-x border-x-blue-600 border-b-2 border-b-blue-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_6px_rgba(29,78,216,0.25)] active:translate-y-0.5 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all flex items-center justify-center cursor-pointer"
        >
          Lanjutkan {formatRupiah(finalAmount)}
        </Button>

        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-700 pt-1 px-1">
          <span>Verifikasi Otomatis</span>
          <span>QRIS & Virtual Account</span>
        </div>
      </div>
    </form>
  );
}
