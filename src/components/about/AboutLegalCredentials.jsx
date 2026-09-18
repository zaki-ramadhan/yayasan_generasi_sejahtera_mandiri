import { CheckCircle2 } from "lucide-react";
import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutLegalCredentials() {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-300 space-y-3.5">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
        <h3 className="font-semibold text-slate-950 text-base">
          Legalitas &amp; Sertifikasi
        </h3>
      </div>

      <div className="space-y-3 text-sm text-slate-700">
        <div>
          <span className="text-xs font-medium text-slate-500 block">
            SK Kemenkumham RI
          </span>
          <p className="font-medium text-slate-900 mt-0.5">
            {ORG_PROFILE.legal.skKemenkumham}
          </p>
        </div>

        <div>
          <span className="text-xs font-medium text-slate-500 block">
            Izin Operasional LKS
          </span>
          <p className="font-medium text-slate-900 mt-0.5">
            {ORG_PROFILE.legal.izinIzinSosial}
          </p>
        </div>

        <div>
          <span className="text-xs font-medium text-slate-500 block">
            Nomor Pokok Wajib Pajak (NPWP)
          </span>
          <p className="font-medium text-slate-900 mt-0.5 font-mono">
            {ORG_PROFILE.legal.npwp}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-200 space-y-1.5">
          <span className="text-xs font-medium text-slate-500 block">
            Kepatuhan &amp; Akuntabilitas
          </span>
          <div className="flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Audit KAP: Opini Wajar Tanpa Pengecualian (WTP)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Kepatuhan Syariah Dewan Pengawas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
