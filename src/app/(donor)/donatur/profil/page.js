import { DonorProfileView } from "@/components/donor/DonorProfileView";

export const metadata = {
  title: "Profil Pengguna",
  description:
    "Kelola data pribadi, informasi rekening bank, foto profil, dan keamanan akun donatur Anda.",
};

export default function DonaturProfilPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading (Tanpa Subheading) */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950">
          Profil Pengguna
        </h1>
      </div>

      {/* Profile Content */}
      <DonorProfileView />
    </div>
  );
}
