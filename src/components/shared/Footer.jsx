import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { ORG_PROFILE } from "@/data/orgProfile";
import {
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";

const PAYMENT_LOGOS = [
  { name: "QRIS", src: "/img/payments/qris.png", alt: "QRIS Nasional" },
  { name: "Bank Mandiri", src: "/img/payments/mandiri.png", alt: "Bank Mandiri" },
  { name: "Bank BNI", src: "/img/payments/BNI.png", alt: "Bank BNI" },
  { name: "Bank BRI", src: "/img/payments/BRI.png", alt: "Bank BRI" },
  { name: "Bank Permata", src: "/img/payments/permata.png", alt: "Bank Permata" },
  { name: "GoPay", src: "/img/payments/gopay.png", alt: "GoPay" },
  { name: "ShopeePay", src: "/img/payments/shopeepay.png", alt: "ShopeePay" },
  { name: "Kredivo", src: "/img/payments/kredivo.png", alt: "Kredivo" },
  { name: "Akulaku", src: "/img/payments/akulaku.png", alt: "Akulaku" },
  { name: "Indomaret", src: "/img/payments/indomaret.png", alt: "Indomaret" },
  { name: "Alfamart", src: "/img/payments/alfamart.png", alt: "Alfamart" },
  { name: "Alfamidi", src: "/img/payments/alfamidi.png", alt: "Alfamidi" },
];

const QUICK_NAV_LINKS = [
  { href: "/program", label: "Katalog Program" },
  { href: "/kalkulator-zakat", label: "Kalkulator ZISWAF" },
  { href: "/laporan", label: "Laporan Keuangan" },
  { href: "/tentang-kami", label: "Profil Pengurus" },
  { href: "/artikel", label: "Kabar Lapangan" },
  { href: "/volunteer", label: "Pendaftaran Relawan" },
];

export function Footer() {
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent("Assalamu'alaikum Admin Yayasan GSM, saya ingin bertanya seputar donasi & ZISWAF.")}`;

  return (
    <footer className="relative z-40 overflow-hidden bg-slate-950 text-white pt-12 pb-8 border-t border-slate-800">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-100 bg-[url('/img/texture_overlay.jpeg')]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800/80">
          {/* Col 1: Profil, Tagline & Legalitas (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-md overflow-hidden bg-white shrink-0 p-0.5 border border-slate-700 shadow-xs flex items-center justify-center">
                <Image
                  src="/logo_yayasan_GSM.png"
                  alt="Logo Yayasan Generasi Sejahtera Mandiri"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain rounded-sm"
                />
              </div>
              <span className="font-semibold text-base sm:text-lg text-white tracking-tight leading-snug">
                Yayasan Generasi Sejahtera Mandiri
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {ORG_PROFILE.tagline}
            </p>

            <div className="space-y-1 text-sm text-slate-200 pt-0.5">
              <p><span className="text-white font-medium">SK Kemenkumham:</span> {ORG_PROFILE.legal.skKemenkumham}</p>
              <p><span className="text-white font-medium">Izin Dinsos:</span> {ORG_PROFILE.legal.izinIzinSosial}</p>
              <p><span className="text-white font-medium">NPWP:</span> {ORG_PROFILE.legal.npwp}</p>
            </div>

            {/* Social Media Icons */}
            <div className="pt-1.5 space-y-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-white block">
                Media Sosial
              </span>
              <div className="flex items-center gap-2.5 text-white">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-white hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-200 hover:text-white"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-white hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-200 hover:text-white"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-white hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-200 hover:text-white"
                  title="YouTube"
                >
                  <YouTubeIcon className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-white hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-200 hover:text-white"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4.5 h-4.5" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-white hover:bg-slate-800 flex items-center justify-center transition-colors text-slate-200 hover:text-white"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Rekening Resmi Yayasan (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Rekening Resmi
            </h4>
            <div className="space-y-3">
              {ORG_PROFILE.officialBankAccounts.map((acc) => (
                <div key={acc.bank} className="space-y-0.5 border-b border-slate-800/80 pb-2.5 last:border-none">
                  <div className="text-sm font-medium text-slate-200">{acc.category} ({acc.bank})</div>
                  <div className="font-semibold text-white text-base font-mono tracking-wider">{acc.accountNumber}</div>
                  <div className="text-sm text-slate-300">a.n. {acc.accountName}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Navigasi Cepat (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm">
              {QUICK_NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm text-slate-200 hover:text-white transition-colors py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Kontak, Alamat & Tombol WA (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Kantor Layanan
            </h4>
            <div className="space-y-2.5 text-sm text-slate-200">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(ORG_PROFILE.contacts.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-200 hover:text-white transition-colors group cursor-pointer"
                title="Buka di Google Maps"
              >
                <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">{ORG_PROFILE.contacts.address}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-200">
                <Phone className="w-4 h-4 text-slate-300 shrink-0" />
                <span>{ORG_PROFILE.contacts.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Mail className="w-4 h-4 text-slate-300 shrink-0" />
                <span>{ORG_PROFILE.contacts.email}</span>
              </div>
            </div>

            {/* WhatsApp Consultation Button */}
            <div className="pt-1.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-sm cursor-pointer"
              >
                <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" />
                <span>Konsultasi Donasi &amp; ZISWAF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Bawah: Kanal Donasi & Pembayaran Resmi */}
        <div className="space-y-3">
          <h5 className="inline-block text-sm font-semibold uppercase tracking-wider text-white">
            Tersedia metode pembayaran:
          </h5>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {PAYMENT_LOGOS.map((m) => (
              <div
                key={m.name}
                title={m.name}
                className="w-[72px] sm:w-[80px] h-9 sm:h-10 rounded-md bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center hover:bg-slate-50 transition-colors shrink-0 p-2"
              >
                <Image
                  src={`${m.src}?v=2`}
                  alt={m.alt}
                  width={64}
                  height={28}
                  className="max-h-5 sm:max-h-6 w-auto max-w-full object-contain select-none pointer-events-none"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright & Links with clean slash separators */}
        <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-200">
          <p>© {new Date().getFullYear()} Yayasan Generasi Sejahtera Mandiri. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-3">
            <Link href="/tentang-kami" className="text-slate-200 hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <span className="text-slate-700 select-none">/</span>
            <Link href="/laporan" className="text-slate-200 hover:text-white transition-colors">
              Transparansi Publik
            </Link>
            <span className="text-slate-700 select-none">/</span>
            <Link href="/ketentuan-transaksi" className="text-slate-200 hover:text-white transition-colors">
              Ketentuan ZISWAF
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
