import { FileCheck, ShieldCheck, Download, Award } from "lucide-react";
import { getAuditReports, getTransparencyMetrics } from "@/services/reportService";
import { formatRupiah, formatNumber } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Laporan Keuangan & Akuntabilitas Publik",
  description: "Laporan hasil audit Kantor Akuntan Publik (KAP) independen dengan opini WTP dan transparansi penyaluran donasi.",
};

export default async function LaporanPage() {
  const [reports, metrics] = await Promise.all([
    getAuditReports(),
    getTransparencyMetrics(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight leading-tight">
          Laporan Keuangan & Audit Independen
        </h1>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          Sebagai bentuk pertanggungjawaban kepada para muhsinin dan donatur, YGSM berkomitmen mempublikasikan laporan keuangan tahunan yang telah diaudit oleh Kantor Akuntan Publik (KAP) independen.
        </p>
      </div>

      {/* Ringkasan Metrik Akuntabilitas (Open Ledger Strip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-y border-slate-300 py-4 sm:py-5">
        <div className="py-3 sm:py-0 sm:px-6 first:pl-0 space-y-1">
          <span className="text-xs text-slate-600 block">Hasil Audit KAP</span>
          <div className="text-2xl sm:text-3xl font-semibold text-emerald-800 tracking-tight flex items-center gap-1.5">
            <Award className="w-6 h-6 text-emerald-700" />
            Opini WTP
          </div>
          <span className="text-xs text-slate-600 block pt-0.5">Wajar Tanpa Pengecualian</span>
        </div>

        <div className="py-3 sm:py-0 sm:px-6 space-y-1">
          <span className="text-xs text-slate-600 block">Total Dana Dikelola</span>
          <div className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
            {formatRupiah(metrics.totalDonationsAllTime)}
          </div>
          <span className="text-xs text-slate-600 block pt-0.5">Akumulasi seluruh program</span>
        </div>

        <div className="py-3 sm:py-0 sm:px-6 space-y-1">
          <span className="text-xs text-slate-600 block">Penerima Manfaat</span>
          <div className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
            {formatNumber(metrics.totalBeneficiaries)}+ Jiwa
          </div>
          <span className="text-xs text-slate-600 block pt-0.5">Santri, yatim & dhuafa</span>
        </div>

        <div className="py-3 sm:py-0 sm:px-6 last:pr-0 space-y-1">
          <span className="text-xs text-slate-600 block">Pesantren Mitra</span>
          <div className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
            {metrics.partnerPesantrenCount} Pesantren
          </div>
          <span className="text-xs text-slate-600 block pt-0.5">Penerima distribusi rutin</span>
        </div>
      </div>

      {/* Daftar Laporan Audit Tahunan (Unified Ledger Format) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">
          Dokumen Laporan Audit Tahunan (Audited KAP)
        </h2>

        <div className="space-y-4">
          {reports.map((rep) => (
            <div key={rep.id} className="p-5 sm:p-6 bg-white rounded-xl border border-slate-300 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 text-sm">
                    <span className="font-semibold text-slate-900">Tahun Buku {rep.year}</span>
                    <span className="font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded text-xs">
                      {rep.opinionStatus}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-950">{rep.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-700">Kantor Akuntan Publik: {rep.auditorName}</p>
                </div>

                <a href={rep.pdfUrl} className="group inline-block shrink-0">
                  <Button variant="outline" size="sm" className="h-9 sm:h-10 px-4 text-xs sm:text-sm font-medium border-slate-300 text-slate-900 hover:bg-slate-50">
                    <Download className="w-3.5 h-3.5 mr-1.5 text-slate-600 group-hover:text-primary group-hover:-translate-y-0.5 transition-all" />
                    Unduh Dokumen PDF
                  </Button>
                </a>
              </div>

              {/* Financial Summary Strip (No nested box cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50 rounded-lg border border-slate-200 p-4 text-sm">
                <div className="py-2 sm:py-0 sm:px-3 first:pl-0 space-y-0.5">
                  <span className="text-xs text-slate-600 block">Total Dana Masuk</span>
                  <span className="font-semibold text-slate-950 text-base block">{formatRupiah(rep.totalFundsIn)}</span>
                </div>
                <div className="py-2 sm:py-0 sm:px-3 space-y-0.5">
                  <span className="text-xs text-slate-600 block">Total Penyaluran</span>
                  <span className="font-semibold text-emerald-800 text-base block">{formatRupiah(rep.totalFundsOut)}</span>
                </div>
                <div className="py-2 sm:py-0 sm:px-3 space-y-0.5">
                  <span className="text-xs text-slate-600 block">Penerima Manfaat</span>
                  <span className="font-semibold text-slate-950 text-base block">{formatNumber(rep.beneficiaryCount)} Jiwa</span>
                </div>
                <div className="py-2 sm:py-0 sm:px-3 last:pr-0 space-y-0.5">
                  <span className="text-xs text-slate-600 block">Rasio Operasional</span>
                  <span className="font-semibold text-slate-950 text-base block">{rep.operationalRatio}</span>
                </div>
              </div>

              <p className="text-base text-slate-800 leading-relaxed">
                {rep.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
