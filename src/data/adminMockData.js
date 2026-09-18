export const RECENT_TRANSACTIONS = [
  { id: "INV-891023", donor: "Ahmad Fauzi", amount: 250000, channel: "BCA VA", program: "Beasiswa Santri Penghafal Quran", date: "2026-09-17T14:30:00Z", status: "PAID" },
  { id: "INV-891024", donor: "Hamba Allah", amount: 500000, channel: "QRIS", program: "Tanggap Darurat Banjir", date: "2026-09-17T13:15:00Z", status: "PAID" },
  { id: "INV-891025", donor: "Siti Rahma", amount: 100000, channel: "Mandiri VA", program: "Sedekah Subuh Beras", date: "2026-09-17T11:45:00Z", status: "PENDING" },
  { id: "INV-891026", donor: "H. Hendra Wijaya", amount: 1500000, channel: "BSI VA", program: "Zakat Penghasilan Mustahik", date: "2026-09-17T10:00:00Z", status: "PAID" },
  { id: "INV-891027", donor: "Hamba Allah", amount: 50000, channel: "QRIS", program: "Kemandirian Yatim Digital", date: "2026-09-17T09:20:00Z", status: "PAID" },
  { id: "INV-891028", donor: "Keluarga Bpk. Sukardi", amount: 600000, channel: "BCA VA", program: "Sedekah Beras Pesantren", date: "2026-09-17T08:10:00Z", status: "PAID" },
];

export const VOLUNTEER_APPLICANTS = [
  { id: "VOL-001", name: "Muhammad Rizky", city: "Bandung", profession: "Mahasiswa", event: "Penyaluran Mushaf Lebak", status: "PENDING" },
  { id: "VOL-002", name: "Nurul Aini", city: "Jakarta Selatan", profession: "Guru", event: "Mengajar Tahsin Santri", status: "APPROVED" },
  { id: "VOL-003", name: "Deni Saputra", city: "Semarang", profession: "Tim Medis", event: "Tanggap Darurat Banjir Demak", status: "APPROVED" },
  { id: "VOL-004", name: "Farhan Hakim", city: "Bogor", profession: "Dokumentasi & Desain", event: "Liputan Penyaluran Beras", status: "PENDING" },
];

export const DONOR_ROUTINE_SCHEDULES = [
  { id: "SCH-01", program: "Sedekah Subuh Beras Santri", nominal: 25000, freq: "Setiap Hari (Subuh)", nextDate: "Besok, 04:30 WIB", status: "AKTIF" },
  { id: "SCH-02", program: "Beasiswa Yatim Tahfidz", nominal: 150000, freq: "Setiap Bulan (Tgl 25)", nextDate: "25 September 2026", status: "AKTIF" },
  { id: "SCH-03", program: "Infaq Sumur Bor Pelosok", nominal: 50000, freq: "Setiap Hari Jumat", nextDate: "Jumat, 08:00 WIB", status: "AKTIF" },
];

export const VOLUNTEER_FIELD_TASKS = [
  { id: "TSK-01", title: "Distribusi Paket Sembako Banjir", location: "Posko Utama Demak", date: "Besok, 08.00 WIB", status: "SIAP AKSI", participants: 12 },
  { id: "TSK-02", title: "Cek Kesehatan Lansia & Balita", location: "Dusun Karangtengah", date: "Sabtu, 09.00 WIB", status: "PERSIAPAN", participants: 8 },
  { id: "TSK-03", title: "Penyuluhan Gizi Balita Stunting", location: "Balai Desa Cibungur", date: "Minggu, 10.00 WIB", status: "TERJADWAL", participants: 6 },
];
