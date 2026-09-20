"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { Clock, Copy, Check } from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { PAYMENT_CHANNELS } from "@/data/paymentChannels";
import { CAMPAIGNS } from "@/data/campaigns";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PostDonationPrayerForm } from "@/components/donation/PostDonationPrayerForm";
import { saveDonorInvoice } from "@/lib/donorStorage";

export function InvoiceDisplay({ donation }) {
  const [copiedVa, setCopiedVa] = useState(false);
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [activePrayer, setActivePrayer] = useState(donation?.prayer || "");

  useEffect(() => {
    if (donation?.invoiceId) {
      saveDonorInvoice({
        invoiceId: donation.invoiceId,
        campaignSlug: donation.campaignSlug || "",
        donorName: donation.donorName,
        isAnonymous: donation.isAnonymous,
        hasPrayer: Boolean(activePrayer && activePrayer.trim()),
      });
    }
  }, [donation, activePrayer]);

  // Timestamp-based countdown persistence (anti reset on refresh)
  useEffect(() => {
    if (!donation?.expiredAt) return;

    const targetTime = new Date(donation.expiredAt).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [donation?.expiredAt]);

  const handleCopyVa = (text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedVa(true);
    toast.success("Nomor Virtual Account berhasil disalin.");
    setTimeout(() => setCopiedVa(false), 2000);
  };

  const handleCopyInvoiceId = (e) => {
    const spanEl = e.currentTarget.querySelector("span");
    if (window.getSelection && spanEl) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(spanEl);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(donation.invoiceId);
    }
    setCopiedInvoice(true);
    toast.success("ID Invoice berhasil disalin.");
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  const channelInfo =
    PAYMENT_CHANNELS.find((c) => c.id === donation.paymentChannelId) || PAYMENT_CHANNELS[0];

  const matchedCampaign = CAMPAIGNS.find(
    (c) => c.slug === donation.campaignSlug || c.title === donation.campaignTitle
  );
  const campaignImage = donation.campaignImage || matchedCampaign?.bannerUrl;

  const shareText = encodeURIComponent(
    `Saya baru saja berdonasi untuk "${donation.campaignTitle}" melalui Yayasan Generasi Sejahtera Mandiri. Mari bersama dukung generasi Qur'ani dan kaum dhuafa!`
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* SISI KIRI: Metode & Instruksi Pembayaran */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-xl border border-slate-300 p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {donation.paymentChannelName}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {donation.paymentChannelType === "QRIS"
                  ? "Scan kode QR untuk memproses transaksi."
                  : "Selesaikan transfer ke nomor virtual account berikut."}
              </p>
            </div>
            <span className="text-xs font-medium text-slate-600 px-2 py-0.5 rounded bg-slate-100">
              {donation.paymentChannelType === "QRIS" ? "QRIS" : "Virtual Account"}
            </span>
          </div>

          {/* QRIS / VA Content */}
          {donation.paymentChannelType === "QRIS" ? (
            <div className="flex flex-col items-center justify-center py-2 space-y-3 text-center">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <QRCodeSVG
                  value={`00020101021226600016ID.CO.YGSM.WWW01189360099900000123450215INV${donation.invoiceId}520458125303360540${donation.totalAmount}5802ID5912YGSM_CHARITY6007JAKARTA6304ABCD`}
                  size={190}
                  level="M"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-base font-semibold text-slate-900 block">
                  YAYASAN GENERASI SEJAHTERA MANDIRI
                </span>
                <span className="text-xs text-slate-500 block">NMID: ID102003948201</span>
              </div>
              <p className="text-sm text-slate-600 max-w-sm">
                Scan kode QR menggunakan aplikasi mobile banking (BCA, Livin Mandiri, BRI, BSI) atau e-wallet (GoPay, OVO, Dana, ShopeePay).
              </p>
            </div>
          ) : (
            <div className="space-y-2 py-1">
              <span className="text-sm text-slate-600 block">Nomor Virtual Account</span>
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-base sm:text-lg font-semibold text-slate-900 tracking-wider">
                  {donation.virtualAccountNumber || "88908123456789"}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyVa(donation.virtualAccountNumber || "88908123456789")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-xs font-medium text-slate-800 transition-colors cursor-pointer"
                >
                  {copiedVa ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-600">
                Transfer nominal yang sesuai melalui m-Banking atau ATM dengan nomor Virtual Account di atas.
              </p>
            </div>
          )}

          {/* Panduan Pembayaran Accordion */}
          <div className="space-y-2">
            <div>
              <svg className="w-full h-0.5 block" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                />
              </svg>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="text-sm font-medium text-slate-800 hover:no-underline py-2">
                  Petunjuk Transfer {donation.paymentChannelName}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-600 leading-relaxed pt-1">
                    {channelInfo.instructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Lembar Tagihan Donasi & Aksi */}
      <div className="lg:col-span-5 space-y-5">
        {/* Lembar Invoice Fisik / Struk */}
        <div className="relative">
          {/* Section Atas: Header Tagihan & Batas Waktu */}
          <div className="bg-white rounded-t-xl border-t border-x border-slate-300 p-5 sm:p-6 sm:py-4 pb-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-slate-600 block">
                Tagihan Donasi
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                Menunggu Pembayaran
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-sm">
              <button
                type="button"
                onClick={handleCopyInvoiceId}
                title="Klik untuk menyalin ID Invoice"
                className="inline-flex items-center gap-1.5 text-slate-900 font-medium hover:text-slate-700 transition-colors cursor-pointer group text-left"
              >
                <span className="select-all">{donation.invoiceId}</span>
                {copiedInvoice ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400 group-hover:text-slate-600 shrink-0 transition-colors" />
                )}
              </button>
              <div className="text-slate-600">
                <span className="font-semibold text-slate-900">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </span>{" "}
                tersisa
              </div>
            </div>
          </div>

          {/* Divider Perforasi dengan Notch Sobekan di Sisi Kiri & Kanan */}
          <div className="relative h-5 flex items-center bg-white -my-px">
            {/* Notch Kiri */}
            <svg
              width="10"
              height="20"
              viewBox="0 0 10 20"
              className="absolute left-0 top-0 block pointer-events-none"
              aria-hidden="true"
            >
              <path d="M 0 0 A 10 10 0 0 1 0 20 Z" fill="#f8fafc" stroke="none" />
              <path d="M 0 0 A 10 10 0 0 1 0 20" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            </svg>

            {/* Garis Putus-Putus dengan Putusan Lebih Panjang & Berjarak */}
            <div className="w-full mx-3 flex items-center">
              <svg className="w-full h-0.5 block" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                />
              </svg>
            </div>

            {/* Notch Kanan */}
            <svg
              width="10"
              height="20"
              viewBox="0 0 10 20"
              className="absolute right-0 top-0 block pointer-events-none"
              aria-hidden="true"
            >
              <path d="M 10 0 A 10 10 0 0 0 10 20 Z" fill="#f8fafc" stroke="none" />
              <path d="M 10 0 A 10 10 0 0 0 10 20" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
          </div>

          {/* Section Bawah: Total & Rincian Transaksi */}
          <div className="bg-white border-x border-slate-300 p-5 sm:p-6 sm:py-4 pt-3 space-y-4">
            {/* Total Transfer Row */}
            <div className="space-y-1">
              <span className="text-sm text-slate-600 block">Total yang Harus Ditransfer</span>
              <span className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight block">
                {formatRupiah(donation.totalAmount)}
              </span>

              {donation.uniqueCode > 0 && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  Penting: Transfer nominal tepat hingga 3 digit terakhir (<span className="font-semibold text-slate-700">+{donation.uniqueCode}</span>) untuk verifikasi otomatis.
                </p>
              )}
            </div>

            {/* Rincian Transaksi */}
            <div className="space-y-3 pb-1">
              <span className="text-sm text-slate-600 block">Rincian Donasi</span>
              <div className="space-y-2.5 text-sm">
                {/* Baris Program: Gambar Thumbnail + Judul line-clamp-2 */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center gap-3">
                    {campaignImage ? (
                      <Image
                        src={campaignImage}
                        alt={donation.campaignTitle}
                        width={48}
                        height={48}
                        unoptimized
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-md object-cover shrink-0 border border-slate-200"
                      />
                    ) : (
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-md bg-slate-200 shrink-0 flex items-center justify-center text-slate-500 text-xs font-medium">
                        YGSM
                      </div>
                    )}
                    <p className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-2 leading-snug">
                      {donation.campaignTitle}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-3 text-slate-600 pt-1">
                  <span className="shrink-0">Donatur</span>
                  <span className="font-medium text-slate-900 text-right">
                    {donation.donorName}
                    {donation.isAnonymous && (
                      <span className="text-xs text-slate-500 font-normal ml-1.5">(Anonim)</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between gap-3 text-slate-600">
                  <span className="shrink-0">Waktu Tagihan</span>
                  <span className="font-medium text-slate-900 text-right">
                    {formatDate(donation.createdAt, { withTime: true })}
                  </span>
                </div>
                <div className="flex justify-between gap-3 text-slate-600">
                  <span className="shrink-0">Metode Bayar</span>
                  <span className="font-medium text-slate-900 text-right">
                    {donation.paymentChannelName}
                  </span>
                </div>
                <div className="flex justify-between gap-3 text-slate-600">
                  <span className="shrink-0">Donasi Pokok</span>
                  <span className="font-medium text-slate-900">{formatRupiah(donation.amount)}</span>
                </div>
                {donation.uniqueCode > 0 && (
                  <div className="flex justify-between gap-3 text-slate-600">
                    <span className="shrink-0">Kode Unik</span>
                    <span className="font-medium text-slate-900">+{donation.uniqueCode}</span>
                  </div>
                )}
                <div className="flex justify-between gap-3 text-slate-600">
                  <span className="shrink-0">Biaya Layanan</span>
                  <span className="font-medium text-slate-900">
                    {donation.adminFee > 0 ? formatRupiah(donation.adminFee) : "Gratis"}
                  </span>
                </div>
                {activePrayer && (
                  <div className="flex justify-between gap-3">
                    <span className="shrink-0 text-slate-600">Doa Kebaikan</span>
                    <span className="font-medium text-slate-900 text-right italic text-xs sm:text-sm break-words max-w-[200px]">
                      &ldquo;{activePrayer}&rdquo;
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sisi Bawah Bergerigi Lingkaran Halus (Inward Semicircular Scallops ala foto struk) */}
          <div className="relative w-full h-3.5 select-none -mt-px overflow-hidden border-x border-slate-300">
            <svg
              className="w-full h-3.5 block"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="receipt-scallops"
                  x="0"
                  y="0"
                  width="24"
                  height="14"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="24" height="14" fill="#f8fafc" />
                  <path
                    d="M 0 0 L 24 0 L 24 12 L 19 12 A 7 7 0 0 0 5 12 L 0 12 Z"
                    fill="#ffffff"
                    stroke="none"
                  />
                  <path
                    d="M 0 12 L 5 12 A 7 7 0 0 1 19 12 L 24 12"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="14" fill="url(#receipt-scallops)" />
            </svg>
          </div>
        </div>

        {/* Form Titip Doa (Hanya muncul jika belum menulis doa, dan hilang seketika setelah submit) */}
        {!activePrayer && (
          <PostDonationPrayerForm
            invoiceId={donation.invoiceId}
            campaignSlug={donation.campaignSlug || ""}
            donorName={donation.donorName}
            defaultAnonymous={donation.isAnonymous}
            className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-3"
            onSuccess={(data) => {
              setActivePrayer(data.prayer);
            }}
          />
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer text-center"
          >
            Bagikan ke WhatsApp
          </a>

          <Link
            href="/program"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-medium rounded-lg transition-colors text-center"
          >
            Lihat Program Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}


