import { PageHeader } from "@/components/shared/PageHeader";
import { ZakatCalculator } from "@/components/modules/ZakatCalculator";

export const metadata = {
  title: "Kalkulator Zakat - Hitung Kewajiban Zakat Sesuai Syariat",
  description:
    "Alat bantu perhitungan zakat secara mudah dan akurat. Gunakan kalkulator ini untuk mengetahui kewajiban zakat maal, penghasilan, perusahaan, perdagangan, dan emas sesuai syariat.",
};

export default function KalkulatorZakatPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <PageHeader
        title="Kalkulator Zakat"
        description="Alat bantu perhitungan zakat secara mudah dan akurat. Gunakan kalkulator ini untuk mengetahui kewajiban zakat sesuai syariat."
        align="center"
      />

      <ZakatCalculator />
    </main>
  );
}
