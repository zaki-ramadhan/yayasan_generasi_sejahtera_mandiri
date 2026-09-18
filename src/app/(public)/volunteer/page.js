import { VolunteerForm } from "@/components/modules/VolunteerForm";
import { Users, Heart, Award } from "lucide-react";

export const metadata = {
  title: "Gabung Jadi Relawan Aksi - YGSM",
  description: "Daftarkan diri Anda sebagai relawan aksi kemanusiaan dan pendidikan santri tahfidz YGSM.",
};

export default function VolunteerPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Editorial & Value Prop */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-950 tracking-tight leading-tight">
              Gabung Menjadi Relawan Kebaikan
            </h1>
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
              Wujudkan kepedulian nyata dengan menyumbangkan tenaga, waktu, dan keahlian Anda untuk adik-adik santri dan korban bencana di berbagai pelosok.
            </p>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-300 py-2">
            <div className="py-4 space-y-1">
              <h2 className="text-base font-semibold text-slate-950">Aksi Lapangan Terpadu</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Terjun langsung ke titik bencana, pondok binaan, dan posko kesehatan dhuafa bersama tim lapangan profesional YGSM.
              </p>
            </div>

            <div className="py-4 space-y-1">
              <h2 className="text-base font-semibold text-slate-950">Jejaring Positif & Kolaborasi</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Bertemu dan berkolaborasi dengan ribuan aktivis filantropi, akademisi, dan profesional muda yang berdedikasi.
              </p>
            </div>

            <div className="py-4 space-y-1">
              <h2 className="text-base font-semibold text-slate-950">Sertifikat & Rekognisi Resmi</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Apresiasi legalitas relawan yayasan yang dapat dicantumkan sebagai portofolio pengabdian masyarakat.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <VolunteerForm />
        </div>
      </div>
    </main>
  );
}
