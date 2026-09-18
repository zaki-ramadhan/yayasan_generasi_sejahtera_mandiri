import { ARTICLES } from "@/data/articles";
import { ArticleCatalog } from "@/components/modules/ArticleCatalog";

export const metadata = {
  title: "Artikel & Kabar Lapangan - YGSM",
  description: "Kumpulan artikel edukasi fiqih zakat, sedekah subuh, dan kabar penyaluran bantuan YGSM.",
};

export default function ArtikelIndexPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-950 tracking-tight leading-tight">
          Artikel & Kabar Filantropi
        </h1>
        <p className="text-base sm:text-lg text-slate-800 max-w-2xl leading-relaxed">
          Wawasan fiqih ZISWAF dan laporan aktual kegiatan pemberdayaan santri dan dhuafa di lapangan.
        </p>
      </div>

      <ArticleCatalog initialArticles={ARTICLES} />
    </main>
  );
}
