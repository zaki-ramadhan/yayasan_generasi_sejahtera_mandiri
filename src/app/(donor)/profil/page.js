import { DonorProfileView } from "@/components/donor/DonorProfileView";

export const metadata = {
  title: "Profil Pengguna | Portal Donatur YGSM",
  description:
    "Kelola data pribadi, informasi rekening bank, foto profil, dan keamanan akun donatur Anda.",
};

export default function ProfilPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
          Profil Pengguna
        </h1>
        <p className="text-sm font-normal text-slate-600 max-w-2xl">
          Kelola data diri, rekening bank donatur, foto profil, dan keamanan akun
          Anda dalam satu tempat yang aman.
        </p>
      </div>

      {/* Profile Content */}
      <DonorProfileView />
    </div>
  );
}
