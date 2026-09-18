# Yayasan Generasi Sejahtera Mandiri (YGSM)

Platform web resmi filantropi dan donasi online untuk Yayasan Generasi Sejahtera Mandiri. Memudahkan masyarakat dalam menyalurkan zakat, infak, sedekah, dan wakaf (ZISWAF) secara transparan, aman, dan langsung terdata.

---

## Teknologi yang Digunakan

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4
- **Komponen UI:** Radix UI Primitives, Lucide Icons, Sonner (Notifikasi Toast)
- **Database / ORM:** Prisma ORM (PostgreSQL)
- **Tools:** Turbopack, React Compiler

---

## Fitur dan Halaman Utama

- **Beranda (`/`):** Hero informasi, quick donate bar, sorotan program darurat, metrik dampak, dan transparansi penyaluran.
- **Profil Yayasan (`/tentang-kami`):** Sejarah lembaga, visi misi, legalitas SK Kemenkumham/Dinsos, susunan pengurus, dan rekening resmi yayasan.
- **Katalog Program (`/program`):** Filter program berdasarkan kategori (Pendidikan Tahfidz, Yatim Dhuafa, Pemberdayaan Ekonomi, Tanggap Bencana).
- **Detail Program & Donasi (`/campaign/[slug]` & `/campaign/[slug]/donate`):**
  - Deskripsi program, target dana, dan progress bar.
  - Form donasi cepat dengan pilihan nominal preset/kustom.
  - Pilihan metode bayar (QRIS, Virtual Account, Transfer Bank).
  - Kolom doa donatur dan opsi donasi anonim (*hamba Allah*).
- **Invoice & Pembayaran (`/invoice/[id]`):** Tampilan kode bayar, generate QRIS dinamis, batas waktu transaksi, dan salin nomor rekening.
- **Donasi Rutin (`/donasi-rutin`):** Komitmen sedekah berkala dengan frekuensi harian/mingguan/bulanan.
- **Kalkulator Zakat (`/kalkulator-zakat`):** Hitung otomatis Zakat Profesi, Zakat Maal (Emas/Tabungan), Zakat Perdagangan, Infak, dan Fidyah sesuai nishab.
- **Kabar & Distribusi:**
  - Artikel & Berita (`/artikel`)
  - Dokumentasi Penyaluran (`/distribusi`)
  - Laporan Keuangan Publik WTP (`/laporan`)
- **Partisipasi Publik:** Pendaftaran Relawan (`/volunteer`) dan Informasi Karier (`/karier`).
- **Dashboard & Auth:** Mock tampilan dashboard (`/dashboard`) serta halaman masuk/daftar (`/login`, `/register`).

---

## Struktur Direktori

```text
src/
├── app/
│   ├── (public)/          # Halaman publik (landing, program, donasi, zakat, dll)
│   ├── (admin)/           # Halaman dashboard pengelola
│   ├── (auth)/            # Halaman otentikasi (login, register)
│   └── globals.css        # Variabel tema dan token warna
├── components/
│   ├── about/             # Komponen modular halaman tentang kami
│   ├── campaign/          # Komponen detail program & feed penyaluran
│   ├── donation/          # Komponen form checkout & ringkasan donasi
│   ├── modules/           # Modul fitur (kalkulator zakat, invoice, quick donate)
│   ├── shared/            # Komponen umum (Navbar, Footer, CampaignCard)
│   └── ui/                # UI primitives (button, badge, dialog, tabs)
├── data/                  # Mock data awal (profil, campaign, artikel, rekening)
├── hooks/                 # Custom React hooks (useDebounce, dll)
├── lib/                   # Utilitas umum, format rupiah, dan sanitasi data
├── services/              # Abstraksi service layer data
└── prisma/                # Skema database PostgreSQL
```

---

## Menjalankan Proyek di Komputer Lokal

### 1. Kloning dan Pasang Dependensi
```bash
git clone <URL_REPOSITORY>
cd yayasan_generasi_sejahtera_mandiri
npm install
```

### 2. Konfigurasi Environment
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Sesuaikan `DATABASE_URL` jika sudah menghubungkan database PostgreSQL.

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## Status Integrasi Pembayaran

Saat ini flow donasi menggunakan data simulasi lokal. Arsitektur siap dihubungkan ke **Midtrans Payment Gateway (Snap / Core API)**:
- Sandbox mode dapat langsung diaktifkan dengan mengisi `PAYMENT_SERVER_KEY` & `PAYMENT_CLIENT_KEY` di `.env.local`.
- Akun produksi (Live) memerlukan verifikasi legalitas dan rekening resmi yayasan.
