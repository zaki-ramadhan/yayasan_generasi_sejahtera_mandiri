"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Heart, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const INTEREST_OPTIONS = [
  "Pengajar & Pembimbing Al-Qur'an",
  "Distribusi Logistik Tanggap Bencana",
  "Dokumentasi & Tim Media Kreatif",
  "Layanan Kesehatan & Medis",
  "Pendampingan Wirausaha Yatim",
];

export function VolunteerForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [interest, setInterest] = useState(INTEREST_OPTIONS[0]);
  const [motivation, setMotivation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !city) {
      toast.error("Mohon lengkapi seluruh kolom yang wajib diisi.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      toast.success("Pendaftaran relawan berhasil dikirim!");
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-border-subtle text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Jazakumullahu Khairan Katsiran
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Terima kasih atas niat mulia Anda untuk bergabung sebagai Relawan YGSM. Tim koordinator kami akan menghubungi nomor WhatsApp Anda saat ada aksi kemanusiaan di wilayah Anda.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-border-subtle space-y-4 shadow-sm">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">Nama Lengkap *</label>
        <Input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nama Anda"
          className="h-11"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Nomor WhatsApp *</label>
          <Input
            type="tel"
            inputMode="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0812xxxxxxxx"
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@anda.com"
            className="h-11"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Kota / Kabupaten Domisili *</label>
          <Input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Contoh: Bogor / Jakarta"
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Peminatan Aksi *</label>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full h-11 px-3 text-sm rounded-lg border border-border-strong bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">Motivasi & Pengalaman Singkat</label>
        <textarea
          rows={3}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="Ceritakan keahlian atau alasan Anda ingin bergabung..."
          className="w-full rounded-lg border border-border-strong bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full h-11 font-semibold">
        {loading ? "Mengirim Pendaftaran..." : "Daftar Sebagai Relawan YGSM"}
      </Button>
    </form>
  );
}
