import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SALUTATIONS = ["Bapak", "Ibu", "Kakak", "Sdr", "Sdri"];

export function RoutineDonorIdentity({
  salutation,
  setSalutation,
  fullName,
  setFullName,
  whatsapp,
  setWhatsapp,
  isAnonymous,
  setIsAnonymous,
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5 shadow-2xs">
      <h2 className="text-base font-bold text-slate-950">
        Identitas Donatur
      </h2>

      {/* Salutation Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 uppercase">
          Panggilan / Sapaan
        </label>
        <div className="grid grid-cols-5 gap-2">
          {SALUTATIONS.map((sal) => (
            <button
              key={sal}
              type="button"
              onClick={() => setSalutation(sal)}
              className={cn(
                "py-2 px-1 text-center text-xs sm:text-sm font-semibold rounded-lg border transition-colors cursor-pointer",
                salutation === sal
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
              )}
            >
              {sal}
            </button>
          ))}
        </div>
      </div>

      {/* Name and Phone Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Nama Lengkap {!isAnonymous && <span className="text-rose-500">*</span>}
          </label>
          <Input
            type="text"
            placeholder={isAnonymous ? "Hamba Allah (Anonim)" : "Masukkan nama lengkap Anda"}
            disabled={isAnonymous}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-11 text-base text-slate-900 border-slate-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            No WhatsApp Aktif <span className="text-rose-500">*</span>
          </label>
          <Input
            type="tel"
            placeholder="Contoh: 081234567890"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="h-11 text-base text-slate-900 border-slate-300"
          />
          <span className="text-xs text-slate-500 mt-1 block">
            Pengingat berkala &amp; invoice resmi akan dikirim ke nomor ini.
          </span>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <span className="text-sm font-bold text-slate-900 block">
              Sembunyikan nama (Hamba Allah)
            </span>
            <span className="text-xs text-slate-600">
              Nama Anda tidak akan ditampilkan di papan publikasi donatur.
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isAnonymous}
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              isAnonymous ? "bg-primary" : "bg-slate-300"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                isAnonymous ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
