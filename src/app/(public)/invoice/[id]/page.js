import { notFound } from "next/navigation";
import { getDonationByInvoiceId } from "@/services/donationService";
import { InvoiceDisplay } from "@/components/modules/InvoiceDisplay";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Instruksi Pembayaran Donasi #${id}`,
    description: "Selesaikan pembayaran donasi Anda melalui QRIS atau Virtual Account YGSM.",
  };
}

export default async function InvoicePage({ params }) {
  const { id } = await params;
  const donation = await getDonationByInvoiceId(id);

  if (!donation) {
    // If not found in memory (e.g. direct URL visit with non-existent id), fallback to demo mock
    const fallbackDonation = {
      id: "don-fallback",
      invoiceId: id,
      campaignTitle: "Sedekah Umum Generasi Qur'ani",
      campaignSlug: "beasiswa-santri-penghafal-quran",
      amount: 100000,
      uniqueCode: 124,
      adminFee: 0,
      totalAmount: 100124,
      paymentChannelId: "qris",
      paymentChannelName: "QRIS (Semua Bank & E-Wallet)",
      paymentChannelType: "QRIS",
      virtualAccountNumber: "",
      donorName: "Hamba Allah",
      isAnonymous: true,
      status: "PENDING",
      createdAt: "2026-09-18T10:00:00.000Z",
      expiredAt: "2026-09-19T10:00:00.000Z",
    };

    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        <InvoiceDisplay donation={fallbackDonation} />
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      <InvoiceDisplay donation={donation} />
    </main>
  );
}
