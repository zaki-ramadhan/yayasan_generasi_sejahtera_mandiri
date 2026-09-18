import { ZakatCalculator } from "@/components/modules/ZakatCalculator";

export const metadata = {
  title: "Kalkulator Zakat 5-in-1 - Hitung Zakat & Fidyah Online",
  description: "Hitung zakat penghasilan, zakat maal, zakat perdagangan, dan fidyah puasa secara otomatis sesuai syariah.",
};

export default function KalkulatorZakatPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-950 tracking-tight leading-tight">
          Kalkulator Zakat & Fidyah 5-in-1
        </h1>
        <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
          Hitung kewajiban zakat harta, profesi, dan fidyah Anda secara akurat sesuai standar nisab emas syariah.
        </p>
      </div>

      {/* Calculator Component */}
      <ZakatCalculator />
    </main>
  );
}
