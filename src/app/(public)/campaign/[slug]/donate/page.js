import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getCampaignBySlug } from "@/services/campaignService";
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

  const rawQuery = sParams?.amount;
  const sanitized = typeof rawQuery === "string" ? rawQuery.replace(/\D/g, "") : rawQuery;
  const rawAmount = sanitized ? Number(sanitized) : null;
  const initialAmount = rawAmount && !isNaN(rawAmount) && rawAmount > 0 ? rawAmount : 50000;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Back button & Title */}
      <div className="space-y-3">
        <Link
          href={`/campaign/${campaign.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-primary transition-colors py-0.5 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
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
        key={`${campaign.slug}-${initialAmount}`}
        campaign={campaign}
        initialAmount={initialAmount}
      />
    </main>
  );
}
