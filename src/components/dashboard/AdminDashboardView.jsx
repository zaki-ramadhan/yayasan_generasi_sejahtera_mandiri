import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { USER_ROLES } from "@/services/authService";
import { CAMPAIGNS } from "@/data/campaigns";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { RECENT_TRANSACTIONS, VOLUNTEER_APPLICANTS } from "@/data/adminMockData";
import { cn } from "@/lib/utils";

export function AdminDashboardView({ userRole }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Recent Transactions / Mutations */}
      <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-950">
              {userRole === USER_ROLES.FINANCE ? "Rekonsiliasi Mutasi Rekening & QRIS" : "Mutasi Donasi Masuk Real-Time"}
            </h2>
            <p className="text-xs text-slate-500">Pencatatan kas masuk dan verifikasi sistem</p>
          </div>
          <span className="text-xs font-semibold text-primary bg-primary-light px-2.5 py-1 rounded">
            Live Sinkronisasi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 uppercase font-semibold border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Invoice</th>
                <th className="py-2.5 px-3">Donatur</th>
                <th className="py-2.5 px-3">Nominal</th>
                <th className="py-2.5 px-3">Metode</th>
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono text-slate-900">{tx.id}</td>
                  <td className="py-3 px-3">{tx.donor}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{formatRupiah(tx.amount)}</td>
                  <td className="py-3 px-3 text-slate-500">{tx.channel}</td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{formatDate(tx.date, { withTime: true })}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                        tx.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {tx.status === "PAID" ? "Lunas" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Role Context Widgets */}
      <div className="lg:col-span-4 space-y-6">
        {/* Volunteer Review Widget (for Admin / Super Admin) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-950">Review Relawan Pendaftar</h3>
            <span className="text-xs text-slate-500">{VOLUNTEER_APPLICANTS.length} Orang</span>
          </div>
          <div className="space-y-2.5">
            {VOLUNTEER_APPLICANTS.map((v) => (
              <div key={v.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900">{v.name}</strong>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-bold",
                    v.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  )}>
                    {v.status}
                  </span>
                </div>
                <p className="text-slate-600">{v.city}, {v.profession}</p>
                <p className="text-[11px] text-slate-500 italic">Minat: {v.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Summary Widget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-950">Progres Kampanye Aktif</h3>
            <Link href="/program" className="text-xs text-primary hover:underline font-semibold">
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-3">
            {CAMPAIGNS.slice(0, 3).map((camp) => {
              const pct = Math.min(Math.round((camp.collectedAmount / camp.targetAmount) * 100), 100);
              return (
                <div key={camp.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 truncate max-w-[180px]">{camp.title}</span>
                    <span className="font-bold text-primary">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
