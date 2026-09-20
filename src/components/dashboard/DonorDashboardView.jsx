import Link from "next/link";
import { Plus, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { RECENT_TRANSACTIONS, DONOR_ROUTINE_SCHEDULES } from "@/data/adminMockData";

export function DonorDashboardView() {
  return (
    <div className="space-y-6">
      {/* Active Recurring Schedules */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-950">Jadwal Donasi Rutin Anda</h2>
            <p className="text-xs text-slate-500">Pengingat berkala untuk menjaga keistiqamahan sedekah.</p>
          </div>
          <Link href="/donasi-rutin">
            <Button size="sm" className="h-8 text-xs bg-primary hover:bg-primary-hover text-white cursor-pointer">
              <Plus className="w-3.5 h-3.5 mr-1" /> Tambah Jadwal Baru
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {DONOR_ROUTINE_SCHEDULES.map((sch) => (
            <div key={sch.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-900 block">{sch.program}</span>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span>Jadwal: <strong>{sch.freq}</strong></span>
                  <span>Jadwal Berikutnya: <strong className="text-primary">{sch.nextDate}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-base font-bold text-slate-950">{formatRupiah(sch.nominal)}</span>
                <button
                  type="button"
                  onClick={() => toast.success("Jadwal pengingat telah diperbarui.")}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium underline cursor-pointer"
                >
                  Kelola
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation History and e-Receipts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-950">Riwayat Transaksi &amp; Bukti Setor Zakat Resmi</h2>
            <p className="text-xs text-slate-500">Unduh e-Kwitansi dengan QR Code sah untuk lampiran pajak.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase font-semibold border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">No. Kwitansi</th>
                <th className="py-2.5 px-3">Tanggal</th>
                <th className="py-2.5 px-3">Program / Jenis Akad</th>
                <th className="py-2.5 px-3">Nominal</th>
                <th className="py-2.5 px-3">Metode</th>
                <th className="py-2.5 px-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {RECENT_TRANSACTIONS.filter((t) => t.status === "PAID").map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono text-slate-900">{tx.id}</td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{formatDate(tx.date)}</td>
                  <td className="py-3 px-3">{tx.program}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{formatRupiah(tx.amount)}</td>
                  <td className="py-3 px-3 text-slate-500">{tx.channel}</td>
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      onClick={() => toast.success(`Mengunduh e-Kwitansi ${tx.id}...`)}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> e-Kwitansi PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
