import Link from "next/link";
import { getCampaigns, getQuickDonateTargetSlug } from "@/services/campaignService";
import { getTransparencyMetrics } from "@/services/reportService";
import { getArticles } from "@/services/articleService";
import { getInstagramPosts, getInstagramAccount } from "@/services/instagramService";
import { FAQS } from "@/data/articles";
import { CampaignCard } from "@/components/shared/CampaignCard";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeInstagramFeed } from "@/components/home/HomeInstagramFeed";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatNumber, formatRupiah, formatDate, getCompactRupiahParts } from "@/lib/formatters";

export const metadata = {
  title: "Beranda",
  description: "Penyaluran zakat, infak, dan sedekah untuk pendidikan santri dan pemberdayaan dhuafa.",
};

export default async function HomePage() {
  const [campaigns, metrics, articles, instagramPosts, instagramAccount] = await Promise.all([
    getCampaigns(),
    getTransparencyMetrics(),
    getArticles({ limit: 8 }),
    getInstagramPosts(18),
    getInstagramAccount(),
  ]);

  const featuredCampaigns = campaigns.slice(0, 5);
  const compactDonations = getCompactRupiahParts(metrics.totalDonationsAllTime, 1);
  const quickDonateTargetSlug = getQuickDonateTargetSlug(campaigns);

  return (
    <div className="space-y-10 sm:space-y-12 pb-14">
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE SLIDER & SOFT OVERLAY */}
      <HomeHero defaultCampaignSlug={quickDonateTargetSlug} />

      {/* 2. PROGRAM DONASI AKTIF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
            Program Donasi Pilihan
          </h2>
          <p className="text-sm sm:text-base text-slate-700">
            Salurkan kepedulian Anda untuk program pendidikan, kemanusiaan, dan pemberdayaan umat.
          </p>
        </div>

        {/* Campaign Cards Grid (Top 5 Pilihan - Sisa Card Terpusat di Tengah) */}
        <div className="flex flex-wrap justify-center gap-6">
          {featuredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] flex"
            >
              <CampaignCard campaign={camp} showDescription={false} />
            </div>
          ))}
        </div>

        <div className="text-center pt-1">
          <Link href="/program">
            <Button variant="outline" className="h-10 px-6 text-sm font-medium border-slate-300 text-slate-900 hover:bg-slate-50">
              Lihat Seluruh Program ({metrics.activeCampaignsCount})
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. TRANSPARANSI & AKUNTABILITAS (Clean Light Background) */}
      <section className="bg-slate-50 border-y border-slate-200 py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-950 tracking-tight">
                Laporan Penyaluran &amp; Audit Keuangan
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Seluruh dana donasi dan ZISWAF dikelola sesuai standar syariah dan diaudit berkala oleh Kantor Akuntan Publik independen.
              </p>
            </div>

            <Link href="/laporan" className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="h-11 px-5 text-sm font-semibold border-slate-300 bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-950 transition-colors shadow-2xs"
              >
                Unduh Laporan Audit KAP
              </Button>
            </Link>
          </div>

          {/* Open Ledger Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-y border-slate-200 py-6 sm:py-7">
            <div className="py-4 sm:py-0 sm:px-6 first:pl-0 space-y-1.5" title={compactDonations.fullFormatted}>
              <span className="text-sm sm:text-base font-medium text-slate-700 block">Total Dana Tersalurkan</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight whitespace-nowrap">
                {compactDonations.prefix}
                {compactDonations.value.toLocaleString("id-ID", {
                  minimumFractionDigits: compactDonations.decimals,
                  maximumFractionDigits: compactDonations.decimals,
                })}{" "}
                {compactDonations.unit}
              </div>
              <span className="text-sm sm:text-base text-slate-700 block">Akumulasi seluruh program</span>
            </div>

            <div className="py-4 sm:py-0 sm:px-6 space-y-1.5">
              <span className="text-sm sm:text-base font-medium text-slate-700 block">Penerima Manfaat</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight">
                {metrics.totalBeneficiaries.toLocaleString("id-ID")}+ Jiwa
              </div>
              <span className="text-sm sm:text-base text-slate-700 block">Santri, yatim &amp; dhuafa</span>
            </div>

            <div className="py-4 sm:py-0 sm:px-6 space-y-1.5">
              <span className="text-sm sm:text-base font-medium text-slate-700 block">Pesantren Mitra</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight">
                {metrics.partnerPesantrenCount.toLocaleString("id-ID")} Pondok
              </div>
              <span className="text-sm sm:text-base text-slate-700 block">Tersebar di pelosok daerah</span>
            </div>

            <div className="py-4 sm:py-0 sm:px-6 last:pr-0 space-y-1.5">
              <span className="text-sm sm:text-base font-medium text-slate-700 block">Hasil Audit Independen</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-700 tracking-tight">
                Opini WTP
              </div>
              <span className="text-sm sm:text-base text-slate-700 block">KAP Rama &amp; Rekan (ISAK 35)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOKUMENTASI MEDIA SOSIAL (INSTAGRAM FEED) */}
      <HomeInstagramFeed posts={instagramPosts} account={instagramAccount} />

      {/* 5. ARTIKEL & FAQ (Editorial Layout, No Stacked Card Boxes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Articles as Editorial Digest */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-300 pb-2.5">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">
                Artikel &amp; Kabar Lapangan
              </h2>
              <Link href="/artikel" className="text-sm font-medium text-primary hover:underline">
                Lihat Semua
              </Link>
            </div>

            {/* Articles Compact Mini Cards 2-Column Grid (x2 ke samping, max 6 terpopuler) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {articles.map((art) => (
                <ArticleCard key={art.id} article={art} isCompact={true} />
              ))}
            </div>
          </div>

          {/* Right: FAQ with 2px Interactive Bottom Border on Hover */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border-b border-slate-300 pb-2.5">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">
                FAQ
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border-b-2 border-slate-200 hover:border-primary transition-colors py-1 group"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-slate-950 group-hover:text-primary py-3.5 hover:no-underline transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-800 leading-relaxed pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION AJAKAN DONASI (STANDAR SECTION DENGAN BG SAMAR) */}
      <HomeCtaSection defaultCampaignSlug={campaigns[0]?.slug} />
    </div>
  );
}
