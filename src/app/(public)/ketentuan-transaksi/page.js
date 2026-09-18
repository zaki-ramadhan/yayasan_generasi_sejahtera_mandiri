import { ShieldCheck, BookOpen, AlertCircle, RefreshCw, FileCheck } from "lucide-react";

export const metadata = {
  title: "Ketentuan Transaksi & Akad Syariah - YGSM",
  description: "Syarat, ketentuan, akad syariah ZISWAF, dan kebijakan transparansi transaksi donasi.",
};

export default function KetentuanTransaksiPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 tracking-tight">
          Ketentuan Transaksi & Akad Syariah
        </h1>
        <p className="text-base text-slate-700 leading-relaxed">
          Panduan transparansi hukum, syariat Islam, dan ketentuan operasional donasi ZISWAF melalui Yayasan Generasi Sejahtera Mandiri (YGSM).
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-800 leading-relaxed">
        {/* Section 1: Akad Syariah */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              Akad Donasi, Zakat, Infaq & Sedekah
            </h2>
          </div>
          <p className="text-slate-700">
            Setiap transaksi donasi yang dilakukan melalui platform YGSM menggunakan prinsip <strong>Akad Wakalah bil Ujrah</strong> atau <strong>Akad Tabarru&apos;</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              <strong>Zakat (Maal & Fitrah):</strong> Muzakki menguasakan (mewakilkan) kepada YGSM sebagai Amil untuk menghitung, mengumpulkan, dan mendistribusikan zakat kepada 8 Asnaf sesuai QS. At-Taubah ayat 60.
            </li>
            <li>
              <strong>Infaq & Sedekah:</strong> Donatur memberikan hibah kebaikan tanpa pamrih (Tabarru&apos;) untuk tujuan pembinaan santri tahfidz, santunan yatim, fasilitas dakwah, atau kemanusiaan.
            </li>
            <li>
              <strong>Donasi Terikat (Restricted):</strong> Dana yang ditujukan pada campaign khusus (misal: Tanggap Banjir) wajib dialokasikan minimal 90% langsung ke program tersebut.
            </li>
          </ul>
        </section>

        {/* Section 2: Biaya Operasional Amil */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              Hak Amil & Biaya Operasional
            </h2>
          </div>
          <p className="text-slate-700">
            Sesuai Fatwa MUI dan Keputusan Direktur Jenderal Pajak/Kemenag:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>
              YGSM berhak mengalokasikan maksimal <strong>12.5% (1/8 Asnaf)</strong> dari dana zakat untuk biaya operasional Amil (gaji da&apos;i lapangan, logistik, dan audit independen).
            </li>
            <li>
              Untuk donasi umum / sedekah program, alokasi operasional dibatasi maksimal <strong>10%</strong>.
            </li>
            <li>
              Biaya MDR / Payment Gateway pihak ketiga (QRIS/VA) dipotong langsung oleh penyelenggara sistem pembayaran berlisensi Bank Indonesia secara transparan.
            </li>
          </ul>
        </section>

        {/* Section 3: e-Kwitansi & Pembatalan */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              Bukti Setor Resmi & Pembatalan Donasi
            </h2>
          </div>
          <p className="text-slate-700">
            Setelah pembayaran terverifikasi, sistem akan menerbitkan <strong>e-Kwitansi Donasi Resmi</strong> yang dilengkapi QR Code verifikasi. Bukti setor zakat YGSM dapat digunakan sebagai lampiran <strong>Pengurang Penghasilan Bruto (Pajak SPT Tahunan)</strong>.
          </p>
          <p className="text-slate-700">
            Donasi yang telah dibayarkan dan masuk ke rekening yayasan pada prinsipnya tidak dapat ditarik kembali (*non-refundable*), kecuali terjadi kesalahan nominal transfer ganda (*double payment*) yang diverifikasi oleh tim Finance dalam 1x24 jam.
          </p>
        </section>
      </div>
    </main>
  );
}
