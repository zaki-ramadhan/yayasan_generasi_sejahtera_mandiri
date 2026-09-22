import { DonorHistoryDashboard } from "@/components/donor/DonorHistoryDashboard";

export const metadata = {
  title: "Riwayat Donasi & Zakat | Portal Donatur YGSM",
  description:
    "Pantau seluruh rekam jejak penyaluran donasi, zakat, infak subuh, dan kuitansi resmi atas nama Anda secara transparan dan akuntabel.",
};

export default function RiwayatDonasiPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
          Riwayat Donasi & Zakat
        </h1>
        <p className="text-sm font-normal text-slate-600 max-w-2xl">
          Pantau rekam jejak penyaluran sedekah dan kuitansi resmi atas nama Anda
          secara transparan dan amanah.
        </p>
      </div>

      {/* Dashboard Content */}
      <DonorHistoryDashboard />
    </div>
  );
}
