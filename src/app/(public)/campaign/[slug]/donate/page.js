import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getCampaignBySlug } from "@/services/campaignService";
import { isCampaignClosed } from "@/lib/formatters";
import { sanitizePrayer } from "@/lib/security";
import { DonationCheckoutForm } from "@/components/modules/DonationCheckoutForm";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);
  if (!campaign) return { title: "Program Tidak Ditemukan" };
  return {
    title: `Formulir Donasi: ${campaign.title}`,
    description: `Salurkan donasi Anda untuk ${campaign.title} melalui YGSM.`,
  };
}

export default async function DonatePage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const isClosed = isCampaignClosed(campaign);
  if (isClosed) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-xs space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 mb-1">
            <CheckCircle2 className="w-6 h-6 text-slate-700" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-950">
            Penggalangan Dana Telah Ditutup
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            Program donasi <strong className="text-slate-900 font-semibold">{campaign.title}</strong> telah resmi berakhir dan tidak menerima donasi baru. Terima kasih atas kepedulian seluruh donatur.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/campaign/${campaign.slug}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium text-sm transition-colors text-center"
            >
              Lihat Detail &amp; Penyaluran
            </Link>
            <Link
              href="/program"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-colors text-center"
            >
              Lihat Program Aktif Lainnya
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const rawQuery = sParams?.amount;
  const sanitized = typeof rawQuery === "string" ? rawQuery.replace(/\D/g, "") : rawQuery;
  const rawAmount = sanitized ? Number(sanitized) : null;
  const initialAmount = rawAmount && !isNaN(rawAmount) && rawAmount > 0 ? rawAmount : 50000;

  const rawPrayer = sParams?.prayer;
  const initialPrayer = typeof rawPrayer === "string"
    ? sanitizePrayer(rawPrayer.trim()).slice(0, 150)
    : "";

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Back button & Title */}
      <div className="space-y-3">
        <Link
          href={`/campaign/${campaign.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-primary hover:underline transition-colors py-0.5 group"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Detail Program</span>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Formulir Donasi Kebaikan
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Menyalurkan bantuan untuk: <strong className="text-slate-900 font-semibold">{campaign.title}</strong>
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <DonationCheckoutForm
        key={`${campaign.slug}-${initialAmount}-${initialPrayer || ""}`}
        campaign={campaign}
        initialAmount={initialAmount}
        initialPrayer={initialPrayer}
      />
    </main>
  );
}
