import { Suspense } from "react";
import { getCampaigns, getCategories } from "@/services/campaignService";
import { ProgramCatalog } from "@/components/modules/ProgramCatalog";
import { CampaignCardSkeleton } from "@/components/shared/CampaignCardSkeleton";

export const metadata = {
  title: "Katalog Program Donasi & ZISWAF",
  description: "Temukan berbagai program kebaikan, beasiswa santri, tanggap bencana, dan zakat produktif YGSM.",
};

export default async function ProgramPage() {
  const [campaigns, categories] = await Promise.all([
    getCampaigns(),
    getCategories(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight leading-tight">
          Katalog Program Donasi &amp; Penyaluran
        </h1>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed max-w-3xl">
          Pilih program yang ingin Anda bantu. Seluruh dana disalurkan secara transparan dan dilaporkan secara berkala kepada donatur.
        </p>
      </div>

      {/* Catalog Component with Suspense */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <CampaignCardSkeleton key={n} />
            ))}
          </div>
        }
      >
        <ProgramCatalog initialCampaigns={campaigns} categories={categories} />
      </Suspense>
    </main>
  );
}
