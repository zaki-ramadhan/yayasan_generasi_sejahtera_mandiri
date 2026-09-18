import { DistributionFeed } from "@/components/modules/DistributionFeed";
import { formatRupiah } from "@/lib/formatters";

export const metadata = {
  title: "Penyaluran & Distribusi Logistik - YGSM",
  description: "Rekam jejak distribusi bantuan dan penyaluran dana amanah umat secara transparan dan akuntabel.",
};

const DISTRIBUTION_RECORDS = [
  {
    id: "DIST-2026-089",
    title: "Penyaluran 500 Mushaf Al-Qur'an & Kitab Santri Pelosok",
    location: "Ponpes Tahfidz Hidayatul Quran, Kab. Lebak, Banten",
    date: "2026-09-12",
    beneficiaries: "185 Santri Yatim & Dhuafa",
    value: 37500000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80",
    pj: "Ust. Rian Ramadhan (Divisi Program)",
    notes: "Bantuan mencakup mushaf terjemah perkata, meja lipat santri, dan paket vitamin madu.",
  },
  {
    id: "DIST-2026-088",
    title: "Distribusi 2.000 Paket Beras & Sembako Tanggap Darurat Banjir",
    location: "Kecamatan Karanganyar & Gajah, Kab. Demak, Jawa Tengah",
    date: "2026-09-04",
    beneficiaries: "620 Kepala Keluarga Terdampak Banjir",
    value: 85000000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
    pj: "Bagas Pratama (Tim Relawan Lapangan)",
    notes: "Penyaluran langsung bersama BPBD setempat menggunakan perahu karet logistik.",
  },
  {
    id: "DIST-2026-087",
    title: "Pembangunan Sumur Bor Air Bersih & MCK Komunal",
    location: "Desa Cibungur, Sukabumi, Jawa Barat",
    date: "2026-08-28",
    beneficiaries: "350 Warga & Jamaah Masjid Al-Ikhlas",
    value: 48000000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
    pj: "Tim Sarana & Infrastruktur YGSM",
    notes: "Kedalaman sumur 65 meter dengan debit air bersih 2,5 liter/detik.",
  },
  {
    id: "DIST-2026-086",
    title: "Beasiswa Biaya Hidup & SPP Santri Yatim Semester Ganjil",
    location: "3 Pesantren Mitra YGSM (Bogor, Depok, Tasikmalaya)",
    date: "2026-08-15",
    beneficiaries: "94 Santri Berprestasi",
    value: 70500000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80",
    pj: "Hj. Annisa Fitriani (Finance & Penyaluran)",
    notes: "Transfer langsung ke rekening bendahara yayasan pesantren mitra.",
  },
  {
    id: "DIST-2026-085",
    title: "Penyerahan 15 Unit Gerobak Usaha Berkah & Modal UMKM Mustahik",
    location: "Kota Tangerang & Tangerang Selatan, Banten",
    date: "2026-08-01",
    beneficiaries: "15 Pedagang Kecil Dhuafa",
    value: 45000000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&auto=format&fit=crop&q=80",
    pj: "Ir. Hendri Gunawan (Divisi Ekonomi Mandiri)",
    notes: "Hibah gerobak aluminium dilengkapi peralatan masak dan modal kas putaran awal.",
  },
  {
    id: "DIST-2026-084",
    title: "Layanan Kesehatan Keliling & Skrining Nutrisi Balita Stunting",
    location: "Kecamatan Cisolok, Pelosok Sukabumi, Jawa Barat",
    date: "2026-07-22",
    beneficiaries: "210 Balita & Ibu Hamil Dhuafa",
    value: 28500000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    pj: "dr. Nurul Izzati (Tim Medis Relawan)",
    notes: "Pemberian paket telur ayam, susu formula, biskuit gizi, dan obat-obatan gratis.",
  },
  {
    id: "DIST-2026-083",
    title: "Distribusi 2 Ton Beras Sedekah Pangan Bulanan",
    location: "6 Asrama Pondok Pesantren & Rumah Lansia Sebatang Kara",
    date: "2026-07-05",
    beneficiaries: "450 Jiwa",
    value: 30000000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&auto=format&fit=crop&q=80",
    pj: "Zulfikar Hidayat (Logistik Pangan)",
    notes: "Beras rojolele premium dalam kemasan 10 kg tersebar rapi di 4 kota.",
  },
  {
    id: "DIST-2026-082",
    title: "Pemberian Beasiswa Uang Kuliah Tunggal (UKT) Mahasiswa Yatim",
    location: "Universitas Indonesia, IPB University, UIN Syarif Hidayatullah",
    date: "2026-06-20",
    beneficiaries: "20 Mahasiswa Berprestasi",
    value: 60000000,
    status: "SELESAI",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    pj: "Tim Seleksi Beasiswa Mahasiswa YGSM",
    notes: "Pembayaran lunas UKT semester genap dan penyerahan dana living cost asrama.",
  },
];

export default function DistribusiPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 tracking-tight">
          Rekam Jejak Penyaluran & Distribusi
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Setiap rupiah amanah donasi Anda disalurkan secara langsung ke titik-titik penerima manfaat dengan bukti dokumentasi otentik dan berita acara serah terima.
        </p>
      </div>

      {/* Distribution Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl">
        <div className="space-y-1">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Nilai Penyaluran {new Date().getFullYear()}</span>
          <div className="text-2xl sm:text-3xl font-bold text-white">{formatRupiah(842500000)}</div>
          <span className="text-xs text-emerald-400">100% tepat sasaran syar&apos;i</span>
        </div>
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
          <span className="text-xs text-slate-400 uppercase font-semibold">Penerima Manfaat</span>
          <div className="text-2xl sm:text-3xl font-bold text-white">4.820 Jiwa</div>
          <span className="text-xs text-slate-400">Santri, yatim, dan dhuafa</span>
        </div>
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
          <span className="text-xs text-slate-400 uppercase font-semibold">Titik Lokasi Distribusi</span>
          <div className="text-2xl sm:text-3xl font-bold text-white">28 Wilayah</div>
          <span className="text-xs text-slate-400">Jawa Barat, Banten, Jateng, Jatim</span>
        </div>
      </div>

      {/* Paginated Distribution Feed */}
      <DistributionFeed records={DISTRIBUTION_RECORDS} />
    </main>
  );
}
