import Image from "next/image";
import { ORG_PROFILE } from "@/data/orgProfile";

export function AboutBankAccounts() {
  return (
    <section className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 sm:space-y-5 overflow-hidden">
      <div className="space-y-1 border-b border-slate-200 pb-2.5">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-950">
          Rekening Resmi Yayasan
        </h2>
        <p className="text-sm text-slate-700">
          Seluruh donasi dan ZISWAF ditujukan ke rekening sah atas nama <strong>Yayasan Generasi Sejahtera Mandiri</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left: Card Asset (Enlarged & Rotated 20deg Left) */}
        <div className="hidden md:flex md:col-span-5 relative w-full h-72 sm:h-80 md:h-96 items-center justify-center p-2">
          <Image
            src="/img/bank_account_cards.png"
            alt="Kartu Rekening Resmi YGSM BSI, BCA, Mandiri"
            fill
            className="object-contain drop-shadow-xl md:rotate-[-20deg] md:scale-130 md:translate-x-15 md:translate-y-5 transition-transform"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
        </div>

        {/* Right: Clean Plain Text Bank Account List (Right-Aligned & Matched Text Size) */}
        <div className="md:col-span-7 space-y-4 md:text-right md:mr-5">
          {ORG_PROFILE.officialBankAccounts.map((acc, idx) => (
            <div
              key={acc.bank}
              className={`space-y-1 ${idx > 0 ? "pt-3.5 border-t border-slate-200" : ""}`}
            >
              <div className="font-semibold text-slate-900 text-sm sm:text-base">
                {acc.bank}
              </div>
              <div className="font-mono text-base sm:text-lg font-bold text-slate-950 tracking-wider">
                {acc.accountNumber}
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                a.n. {acc.accountName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
