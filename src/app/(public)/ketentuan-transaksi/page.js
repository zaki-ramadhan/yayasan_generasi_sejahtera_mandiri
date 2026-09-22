import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionLimitTable } from "@/components/transaction-terms/TransactionLimitTable";
import {
  VA_TRANSACTION_LIMITS,
  EWALLET_QRIS_TRANSACTION_LIMITS,
} from "@/data/transactionLimits";

export const metadata = {
  title: "Ketentuan Transaksi - Batas Minimum & Maksimum Donasi",
  description:
    "Informasi batas minimum dan maksimum transaksi donasi via Virtual Account dan QRIS guna mengedukasi donatur dan mencegah kejanggalan atau kesalahan dalam jumlah transaksi.",
};

export default function KetentuanTransaksiPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-5">
      {/* Centered Page Header */}
      <PageHeader
        align="center"
        title="Ketentuan Transaksi"
        description="Transaksi dilakukan sesuai dengan batas minimum dan maksimum yang telah ditetapkan."
      />

      {/* Table 1: Virtual Account (VA) */}
      <TransactionLimitTable
        title="Virtual Account (VA)"
        items={VA_TRANSACTION_LIMITS}
      />

      {/* Table 2: E-Wallet & QRIS */}
      <TransactionLimitTable
        title="E-Wallet & QRIS"
        items={EWALLET_QRIS_TRANSACTION_LIMITS}
      />
    </main>
  );
}
