import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ChevronRight } from "lucide-react";
import { getDonationByInvoiceId } from "@/services/donationService";
import { InvoiceDisplay } from "@/components/modules/InvoiceDisplay";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Instruksi Pembayaran Donasi #${id}`,
    description: "Selesaikan pembayaran donasi Anda melalui QRIS atau Virtual Account YGSM.",
  };
}

export default async function InvoicePage({ params, searchParams }) {
  const { id } = await params;
  const { token } = (await searchParams) || {};

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(`ygsm_inv_${id}`)?.value || null;

  if (!token && cookieToken) {
    redirect(`/invoice/${id}?token=${cookieToken}`);
  }

  const effectiveToken = token || cookieToken || null;
  const donation = await getDonationByInvoiceId(id, effectiveToken);

  if (!donation || !donation.isAuthorized) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 sm:gap-2 flex-wrap font-normal">
        <Link href="/" className="hover:text-primary hover:underline transition-colors">Beranda</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2} />
        <Link href="/program" className="hover:text-primary hover:underline transition-colors">Program</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2} />
        <span className="text-slate-900 font-medium truncate" aria-current="page">Instruksi Pembayaran</span>
      </nav>

      <InvoiceDisplay donation={donation} />
    </main>
  );
}

