import { Lock } from "lucide-react";
import { formatRupiah } from "@/lib/formatters";
import { DONATION_LIMITS } from "@/lib/security";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { RibbonBadge } from "@/components/ui/ribbon-badge";

export function DonationCheckoutSummary({
  campaign,
  amount,
  selectedChannel,
  adminFee,
  totalPayment,
  isSubmitting,
}) {
  return (
    <div className="lg:col-span-5 lg:sticky lg:top-24">
      {/* Unified Summary & Program Card */}
      <div className="bg-white p-5 sm:p-6 rounded-xl space-y-5 shadow-xs border border-slate-300">
        {/* Campaign Info Section */}
        {campaign && (
          <div className="space-y-3 pb-4 border-b border-slate-200">
            <span className="text-xs font-medium text-slate-500 block">
              Program yang didukung
            </span>
            <div className="flex gap-3.5 items-center">
              {campaign.bannerUrl && (
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <SafeImage
                    src={campaign.bannerUrl}
                    alt={campaign.title}
                    fallbackText="Program YGSM"
                  />
                </div>
              )}
              <div className="space-y-1 min-w-0 flex-1">
                {campaign.categoryName && (
                  <RibbonBadge variant="default" size="default">
                    {campaign.categoryName}
                  </RibbonBadge>
                )}
                <h3 className="text-sm sm:text-base font-semibold text-slate-950 line-clamp-2 leading-snug">
                  {campaign.title}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Payment Breakdown Section */}
        <div className="space-y-3">
          <div className="border-b border-slate-200 pb-2.5">
            <h3 className="text-base sm:text-lg font-semibold text-slate-950">Ringkasan Pembayaran</h3>
            <p className="text-sm text-slate-600 mt-0.5">Pastikan rincian donasi Anda telah sesuai</p>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Nominal Donasi</span>
              <span className="font-medium text-slate-950">{formatRupiah(amount)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Metode Pembayaran</span>
              <span className="font-medium text-slate-900">{selectedChannel.name}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Biaya Layanan</span>
              <span className="font-medium text-slate-950">
                {adminFee === 0 ? "Gratis" : formatRupiah(adminFee)}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-base font-medium text-slate-950 pt-3 border-t border-slate-200">
              <span>Total Pembayaran</span>
              <span className="text-primary text-xl sm:text-2xl font-bold tracking-tight">
                {formatRupiah(totalPayment)}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="space-y-2.5 pt-1">
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting || !amount || amount <= 0 || amount < DONATION_LIMITS.MIN_AMOUNT}
            className="w-full h-12 rounded-lg text-base font-semibold text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-t border-t-blue-400 border-x border-x-blue-600 border-b-2 border-b-blue-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_6px_rgba(29,78,216,0.25)] active:translate-y-0.5 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting
              ? "Memproses Transaksi..."
              : amount >= DONATION_LIMITS.MIN_AMOUNT
              ? `Lanjut Pembayaran (${formatRupiah(totalPayment)})`
              : "Lanjut Pembayaran"}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-sm text-slate-600 text-center pt-0.5">
            <Lock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Enkripsi data aman &amp; verifikasi otomatis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
