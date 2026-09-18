import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const SALUTATIONS = ["Bapak", "Ibu"];

export function RoutineDonorIdentity({
  salutation = "Bapak",
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
      <h2 className="text-base font-semibold text-slate-950">
        Identitas Donatur
      </h2>

      {/* Name and Phone Inputs */}
      <div className="space-y-4">
        {/* Sapaan (Bapak / Ibu) Embedded Custom Dropdown Inside Name Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Nama lengkap {!isAnonymous && <span className="text-rose-500">*</span>}
          </label>
          <div className="relative flex items-center h-11 w-full rounded-lg border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all shadow-2xs">
            {/* Embedded Custom Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  disabled={isAnonymous}
                  className="h-full px-3.5 flex items-center gap-1.5 border-r border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer rounded-l-lg shrink-0 select-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{salutation || "Bapak"}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-32 bg-white border border-slate-200 shadow-md rounded-lg p-1 z-50"
              >
                {SALUTATIONS.map((sal) => (
                  <DropdownMenuItem
                    key={sal}
                    onClick={() => setSalutation(sal)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
                      (salutation || "Bapak") === sal
                        ? "bg-slate-100 font-semibold text-primary"
                        : "text-slate-800 hover:bg-slate-100"
                    )}
                  >
                    <span>{sal}</span>
                    {(salutation || "Bapak") === sal && (
                      <Check className="w-4 h-4 text-primary shrink-0 ml-1.5" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Input Name */}
            <input
              type="text"
              placeholder={isAnonymous ? "Hamba Allah (Anonim)" : "Masukkan nama lengkap"}
              disabled={isAnonymous}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-full w-full px-3.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Nomor WhatsApp aktif <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="Contoh: 081234567890"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-2xs"
          />
          <span className="text-sm text-slate-600 mt-1.5 block">
            Pengingat berkala &amp; invoice resmi akan dikirimkan ke nomor ini.
          </span>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <span className="text-sm font-semibold text-slate-900 block">
              Sembunyikan nama (Hamba Allah)
            </span>
            <span className="text-sm text-slate-600">
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
