"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import {
  Clock,
  Copy,
  Check,
  ShieldCheck,
  Share2,
  ChevronDown,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { PAYMENT_CHANNELS } from "@/data/paymentChannels";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function InvoiceDisplay({ donation }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

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

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [donation?.expiredAt]);

  const handleCopy = (text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Nomor berhasil disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const channelInfo =
    PAYMENT_CHANNELS.find((c) => c.id === donation.paymentChannelId) || PAYMENT_CHANNELS[0];

  const shareText = encodeURIComponent(
    `Saya baru saja berdonasi untuk "${donation.campaignTitle}" melalui Yayasan Generasi Sejahtera Mandiri. Mari bersama dukung generasi Qur'ani dan kaum dhuafa!`
  );

  return (
    <div className="space-y-6">
      {/* Header Status & Countdown */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-border-subtle shadow-sm text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          Menunggu Pembayaran
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-500 block">Nomor Invoice</span>
          <span className="text-sm font-bold font-mono text-slate-900 bg-slate-100 px-3 py-1 rounded-md inline-block">
            {donation.invoiceId}
          </span>
        </div>

        {/* Timer Box */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 max-w-sm mx-auto space-y-1">
          <span className="text-xs text-slate-600 block">Selesaikan pembayaran dalam waktu:</span>
          <div className="text-xl font-bold font-mono text-slate-900 tracking-wider">
            {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Payment Instructions & Code Section */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950">
            {donation.paymentChannelName}
          </h2>
        </div>

        {/* If QRIS: Show QR Code */}
        {donation.paymentChannelType === "QRIS" ? (
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-border-subtle space-y-4">
            <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200">
              <QRCodeSVG
                value={`00020101021226600016ID.CO.YGSM.WWW01189360099900000123450215INV${donation.invoiceId}520458125303360540${donation.totalAmount}5802ID5912YGSM_CHARITY6007JAKARTA6304ABCD`}
                size={200}
                level="M"
              />
            </div>
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-slate-900 block">
                YAYASAN GENERASI SEJAHTERA MANDIRI
              </span>
              <span className="text-xs text-slate-500 block">NMID: ID102003948201</span>
              <p className="text-xs text-slate-600 max-w-xs pt-1">
                Scan kode QR di atas menggunakan BCA Mobile, Livin Mandiri, GoPay, OVO, Dana, atau ShopeePay.
              </p>
            </div>
          </div>
        ) : (
          /* If VA: Show VA Number with copy button */
          <div className="p-5 bg-slate-50 rounded-xl border border-border-subtle space-y-3">
            <span className="text-xs text-slate-600 block">Nomor Virtual Account:</span>
            <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-lg border border-border-strong">
              <span className="text-base sm:text-lg font-bold font-mono text-slate-900 tracking-wide">
                {donation.virtualAccountNumber || "88908123456789"}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(donation.virtualAccountNumber || "88908123456789")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Tersalin" : "Salin"}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Transfer nominal persis hingga digit terakhir agar sistem dapat memverifikasi donasi secara otomatis.
            </p>
          </div>
        )}

        {/* Total Amount & Rincian */}
        <div className="space-y-3 pt-2">
          <div className="p-4 bg-primary-light/40 rounded-xl border border-primary/20 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-600 block">Total Pembayaran</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">
                {formatRupiah(donation.totalAmount)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(donation.totalAmount.toString())}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white border border-primary/30 text-xs font-semibold text-primary hover:bg-primary-light cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Salin Jumlah
            </button>
          </div>

          <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-border-subtle">
            <div className="flex justify-between">
              <span>Waktu Pemesanan:</span>
              <span className="font-semibold text-slate-900">{formatDate(donation.createdAt, { withTime: true })}</span>
            </div>
            <div className="flex justify-between">
              <span>Batas Akhir Bayar:</span>
              <span className="font-semibold text-slate-900">{formatDate(donation.expiredAt, { withTime: true })}</span>
            </div>
            <div className="flex justify-between">
              <span>Program Donasi:</span>
              <span className="font-semibold text-slate-900 text-right max-w-xs truncate">
                {donation.campaignTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Nama Donatur:</span>
              <span className="font-semibold text-slate-900">{donation.donorName}</span>
            </div>
            <div className="flex justify-between">
              <span>Nominal Donasi Pokok:</span>
              <span>{formatRupiah(donation.amount)}</span>
            </div>
            {donation.uniqueCode > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Kode Unik Transfer:</span>
                <span className="font-semibold text-slate-900">+{donation.uniqueCode}</span>
              </div>
            )}
            {donation.adminFee > 0 && (
              <div className="flex justify-between">
                <span>Biaya Layanan Bank:</span>
                <span>{formatRupiah(donation.adminFee)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accordion Instructions */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-border-subtle shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Panduan Pembayaran</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xs sm:text-sm">
              Petunjuk Cara Transfer {donation.paymentChannelName}
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 leading-relaxed">
                {channelInfo.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Bagikan ke WhatsApp
        </a>

        <Link
          href="/program"
          className="flex-1 inline-flex items-center justify-center px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 text-sm font-medium rounded-lg transition-colors"
        >
          Lihat Program Lainnya
        </Link>
      </div>
    </div>
  );
}
