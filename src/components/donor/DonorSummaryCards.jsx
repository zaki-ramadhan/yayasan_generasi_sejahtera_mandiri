"use client";

import { formatRupiah } from "@/lib/formatters";

export function DonorSummaryCards({ metrics, isLoading = false }) {
  const cards = [
    {
      title: "Total Nominal Donasi",
      value: formatRupiah(metrics?.totalNominal || 0),
      subtitle: "Akumulasi seluruh transaksi terverifikasi",
    },
    {
      title: "Frekuensi Transaksi",
      value: `${(metrics?.totalTransactions || 0).toLocaleString("id-ID")} Transaksi`,
      subtitle: "Jumlah donasi dan sedekah tersalurkan",
    },
    {
      title: "Program Terdonasi",
      value: `${(metrics?.totalPrograms || 0).toLocaleString("id-ID")} Program`,
      subtitle: "Variasi program kebaikan yang didukung",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-200 bg-white p-5 animate-pulse space-y-2.5"
          >
            <div className="h-4 bg-slate-200 rounded-sm w-32" />
            <div className="h-8 bg-slate-200 rounded-sm w-44" />
            <div className="h-4 bg-slate-100 rounded-sm w-48" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-2xs transition-colors hover:border-slate-300"
        >
          <p className="text-sm font-medium text-slate-500">
            {card.title}
          </p>
          <p className="text-2xl font-semibold text-slate-950 mt-1 tracking-tight">
            {card.value}
          </p>
          <p className="text-sm font-normal text-slate-500 mt-1">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
