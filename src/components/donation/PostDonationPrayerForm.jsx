"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { sanitizePrayer } from "@/lib/security";
import { markPrayerSubmitted } from "@/lib/donorStorage";
import { cn } from "@/lib/utils";

export function PostDonationPrayerForm({
  invoiceId,
  campaignSlug = "",
  donorName = "Donatur",
  defaultAnonymous = false,
  onSuccess,
  className,
}) {
  const [prayer, setPrayer] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(defaultAnonymous);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePrayerChange = (e) => {
    const clean = sanitizePrayer(e.target.value);
    if (clean.length <= 150) {
      setPrayer(clean);
      if (errorMessage) setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPrayer = prayer.trim().replace(/\s+/g, " ");
    if (!cleanPrayer) {
      setErrorMessage("Pesan doa tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/donations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId,
          prayer: cleanPrayer,
          isAnonymous,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Gagal menyimpan doa.");
      }

      markPrayerSubmitted(campaignSlug, invoiceId);
      toast.success("Doa kebaikan Anda berhasil dikirim.");

      if (onSuccess) {
        onSuccess(json.data);
      }
    } catch (err) {
      setErrorMessage(err.message || "Terjadi kendala saat mengirim doa. Silakan coba lagi.");
      toast.error(err.message || "Gagal menyimpan doa.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("p-5 sm:p-6 bg-slate-50 border border-slate-300 rounded-xl space-y-4", className)}>
      <div className="space-y-0.5">
        <h3 className="font-semibold text-slate-900 text-sm">
          Titipkan Doa Kebaikan
        </h3>
        <p className="text-xs text-slate-500">
          Untaian doa Anda akan dicantumkan di halaman program untuk diaminkan bersama donatur lainnya.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`prayer-input-${invoiceId}`}
              className="text-xs font-semibold text-slate-700"
            >
              Pesan Doa atau Harapan <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-500 font-normal">
              {prayer.length}/150 karakter
            </span>
          </div>

          <textarea
            id={`prayer-input-${invoiceId}`}
            rows={2}
            maxLength={150}
            value={prayer}
            onChange={handlePrayerChange}
            placeholder="Tuliskan doa atau permohonan kebaikan Anda..."
            className={cn(
              "w-full rounded-lg border bg-white p-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors resize-none font-normal",
              errorMessage
                ? "border-rose-400 focus:ring-rose-200"
                : "border-slate-300 focus:ring-primary/20 focus:border-primary"
            )}
          />

          {errorMessage && (
            <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
          )}
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-3.5 h-3.5 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
          />
          <span className="text-xs text-slate-600 font-normal">
            Kirim sebagai Hamba Allah (tanpa nama terang)
          </span>
        </label>

        <div className="flex justify-end pt-0.5">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="text-xs px-3.5 py-1.5 h-auto rounded-lg font-medium cursor-pointer"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Doa"}
          </Button>
        </div>
      </form>
    </div>
  );
}
