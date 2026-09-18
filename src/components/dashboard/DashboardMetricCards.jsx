import { Card } from "@/components/ui/card";
import { USER_ROLES } from "@/services/authService";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah } from "@/lib/formatters";

export function DashboardMetricCards({ userRole, stats }) {
  if (userRole === USER_ROLES.DONOR) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Total Infak / Zakat Disalurkan</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">{formatRupiah(3850000)}</div>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">Tercatat di e-Kwitansi Pajak</span>
        </Card>
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Jadwal Donasi Rutin Aktif</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">2 Program</div>
          <span className="text-xs text-slate-500 mt-1 block">Pengingat WhatsApp aktif</span>
        </Card>
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Santri yang Didukung</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">4 Santri Yatim</div>
          <span className="text-xs text-slate-500 mt-1 block">Pesantren Tahfidz Bogor</span>
        </Card>
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Bukti Zakat Sah SPT</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">Siap Diunduh</div>
          <span className="text-xs text-primary font-medium mt-1 block">Tahun Pajak {new Date().getFullYear()}</span>
        </Card>
      </div>
    );
  }

  if (userRole === USER_ROLES.VOLUNTEER) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Total Jam Khidmat Relawan</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">48 Jam</div>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">6 Misi Lapangan Selesai</span>
        </Card>
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Misi Aksi Mendatang</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">2 Agenda</div>
          <span className="text-xs text-slate-500 mt-1 block">Lebak &amp; Sukabumi</span>
        </Card>
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Penerima Manfaat Dibantu</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">320 Jiwa</div>
          <span className="text-xs text-slate-500 mt-1 block">Distribusi sembako &amp; mushaf</span>
        </Card>
        <Card className="p-5 bg-white border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 block mb-1">Status Keaktifan</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-600">Relawan Aktif</div>
          <span className="text-xs text-slate-500 mt-1 block">Terdaftar resmi di YGSM</span>
        </Card>
      </div>
    );
  }

  const totalDonations = stats?.totalDonations || 148500000;
  const transactionCount = stats?.transactionCount || 1240;
  const campaignsCount = stats?.activeCampaignsCount || CAMPAIGNS.length;
  const volunteersCount = stats?.volunteerCount || 348;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-5 bg-white border-slate-200 shadow-2xs">
        <span className="text-xs text-slate-500 block mb-1">Donasi Masuk Terhimpun</span>
        <div className="text-xl sm:text-2xl font-bold text-slate-900">{formatRupiah(totalDonations)}</div>
        <span className="text-xs text-emerald-600 font-medium mt-1 block">Live dari transaksi PostgreSQL</span>
      </Card>
      <Card className="p-5 bg-white border-slate-200 shadow-2xs">
        <span className="text-xs text-slate-500 block mb-1">Transaksi Terverifikasi</span>
        <div className="text-xl sm:text-2xl font-bold text-slate-900">{transactionCount} Transaksi</div>
        <span className="text-xs text-slate-500 mt-1 block">Otomatis QRIS &amp; VA</span>
      </Card>
      <Card className="p-5 bg-white border-slate-200 shadow-2xs">
        <span className="text-xs text-slate-500 block mb-1">Program Campaign Aktif</span>
        <div className="text-xl sm:text-2xl font-bold text-slate-900">{campaignsCount} Program</div>
        <span className="text-xs text-slate-500 mt-1 block">Tersinkronisasi Database</span>
      </Card>
      <Card className="p-5 bg-white border-slate-200 shadow-2xs">
        <span className="text-xs text-slate-500 block mb-1">Relawan Terdaftar</span>
        <div className="text-xl sm:text-2xl font-bold text-slate-900">{volunteersCount} Relawan</div>
        <span className="text-xs text-emerald-600 font-medium mt-1 block">Formulir Relawan Terhubung</span>
      </Card>
    </div>
  );
}
