"use client";

import { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  sanitizeName,
  sanitizePhone,
  sanitizeEmail,
  stripEmojis,
  validateName,
  validatePhone,
  validateEmail,
} from "@/lib/security";

const VACANCIES = [
  {
    id: "JOB-01",
    title: "Staff Divisi Program & Penyaluran",
    department: "Operasional & Penyaluran",
    location: "Jakarta Timur / Depok (Hybrid)",
    type: "Penuh Waktu (Full-time)",
    description: "Mengelola logistik penyaluran bantuan, monitoring pesantren mitra tahfidz, dan menyusun berita acara dokumentasi lapangan.",
    requirements: [
      "Pendidikan minimal D3/S1 semua jurusan",
      "Memiliki kepedulian sosial & integritas syar'i",
      "Bersedia turun ke lapangan / lokasi penyaluran",
      "Mampu berkomunikasi dengan santri & pengurus pesantren",
    ],
  },
  {
    id: "JOB-02",
    title: "Akuntan & Staff Keuangan ZISWAF",
    department: "Keuangan & Akuntansi",
    location: "Kantor Pusat YGSM (Jakarta)",
    type: "Penuh Waktu (Full-time)",
    description: "Melakukan rekonsiliasi harian mutasi rekening/QRIS, menyusun laporan keuangan PSAK 109, dan administrasi e-Kwitansi zakat.",
    requirements: [
      "Pendidikan S1 Akuntansi / Keuangan Syariah",
      "Memahami standar akuntansi ZIS (PSAK 109)",
      "Teliti, jujur, dan berpengalaman dengan spreadsheet",
      "Fresh graduate dipersilakan mendaftar",
    ],
  },
  {
    id: "JOB-03",
    title: "Content Creator & Media Dakwah",
    department: "Komunikasi & Publikasi",
    location: "Jakarta / Remotely",
    type: "Kontrak / Freelance",
    description: "Membuat video narasi santri, infografis transparansi donasi, dan liputan aksi kemanusiaan untuk kanal media sosial YGSM.",
    requirements: [
      "Menguasai software editing video (CapCut/Premiere) & Canva/Photoshop",
      "Mampu menyusun storytelling dakwah yang menyentuh tanpa clickbait murahan",
      "Portofolio karya visual/media sosial aktif",
    ],
  },
];

export default function KarierPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();

    const nameVal = validateName(applicantName);
    if (!nameVal.isValid) {
      toast.error(nameVal.message);
      return;
    }

    const phoneVal = validatePhone(applicantPhone);
    if (!phoneVal.isValid) {
      toast.error(phoneVal.message);
      return;
    }

    const emailVal = validateEmail(applicantEmail, true);
    if (!emailVal.isValid) {
      toast.error(emailVal.message);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedJob(null);
      setApplicantName("");
      setApplicantPhone("");
      setApplicantEmail("");
      setPortfolioLink("");
      toast.success("Lamaran khidmat Anda berhasil dikirimkan ke HRD YGSM!");
    }, 700);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 tracking-tight">
          Peluang Karier & Khidmat di YGSM
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Mari berkhidmat bersama membangun generasi Qur&apos;ani yang mandiri, berdaya, dan sejahtera melalui manajemen filantropi Islam yang profesional.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-950">Lingkungan Berkah &amp; Syar&apos;i</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Bekerja sekaligus bernilai ibadah dengan kultur kerja saling mengingatkan dalam kebaikan dan ketaatan.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-950">Pengembangan Kompetensi</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Pelatihan manajemen ZISWAF bersertifikasi amil, akuntansi syariah PSAK 109, dan kepemimpinan sosial.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-950">Dampak Nyata Lapangan</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Menyaksikan langsung santri yatim yang terbantu hingga mampu menghafal 30 juz dan mandiri berwirausaha.
          </p>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-950">
          Posisi Terbuka ({VACANCIES.length})
        </h2>

        <div className="space-y-4">
          {VACANCIES.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors space-y-4 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold text-primary block mb-1">
                    {job.department}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950">{job.title}</h3>
                </div>
                <Button
                  onClick={() => setSelectedJob(job)}
                  className="h-10 px-5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg text-sm shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  Lamar Posisi Ini <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {job.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-950">
              Form Lamaran: {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleApply} className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Nama lengkap <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Nama sesuai KTP"
                value={applicantName}
                maxLength={60}
                onChange={(e) => setApplicantName(sanitizeName(e.target.value))}
                className="h-10 text-sm text-slate-900 border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Email aktif <span className="text-rose-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="nama@email.com"
                value={applicantEmail}
                maxLength={100}
                onChange={(e) => setApplicantEmail(sanitizeEmail(e.target.value))}
                className="h-10 text-sm text-slate-900 border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Nomor WhatsApp <span className="text-rose-500">*</span>
              </label>
              <Input
                type="tel"
                placeholder="081234567890"
                value={applicantPhone}
                maxLength={15}
                onChange={(e) => setApplicantPhone(sanitizePhone(e.target.value))}
                className="h-10 text-sm text-slate-900 border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Tautan CV / Portofolio (Google Drive / LinkedIn)
              </label>
              <Input
                type="url"
                placeholder="https://..."
                value={portfolioLink}
                maxLength={200}
                onChange={(e) => setPortfolioLink(stripEmojis(e.target.value).trim())}
                className="h-10 text-sm text-slate-900 border-slate-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg text-sm mt-2"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Lamaran Khidmat"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
