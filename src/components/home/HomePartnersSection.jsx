import { PARTNERS } from "@/data/partners";
import { PartnerLogo } from "@/components/home/PartnerLogo";

/**
 * Section mitra & lembaga terkait yayasan.
 * Ditempatkan sebelum section program donasi di halaman beranda.
 */
export function HomePartnersSection({
  partners = PARTNERS,
  title = "Mitra & Lembaga Resmi",
  subtitle = "Beroperasi di bawah pengawasan dan sinergi lembaga resmi negara serta mitra terpercaya.",
}) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="bg-slate-50 border-y border-slate-200 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-700">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {partners.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
