import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { sanitizeName, sanitizePhone, sanitizeEmail } from "@/lib/security";

const SALUTATIONS = ["Bapak", "Ibu"];

export function RoutineDonorIdentity({
  salutation = "Bapak",
  setSalutation,
  fullName,
  setFullName,
  whatsapp,
  setWhatsapp,
  email = "",
  setEmail,
  isAnonymous,
  setIsAnonymous,
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs">
      {/* Header Step 1 (Unified with Checkout) */}
        <h2 className="text-base sm:text-lg font-semibold text-slate-950">
          Data Donatur
        </h2>

      {/* Anonymous Checkbox (Unified with Checkout) */}
      <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-300 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
        />
        <span className="text-sm font-normal text-slate-800">
          Sembunyikan nama saya (Tampilkan sebagai Hamba Allah)
        </span>
      </label>

      {/* Full Name & Sapaan */}
      {!isAnonymous && (
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 block">
            Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2.5">
            {/* Sapaan Dropdown (modal={false} - Zero Scroll Lock) */}
            <div className="w-28 shrink-0">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:text-base font-normal text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                  >
                    <span>{salutation || "Bapak"}</span>
                    <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-1" />
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
            </div>

            {/* Input Name using @/components/ui/input */}
            <div className="flex-1 min-w-0">
              <Input
                type="text"
                required={!isAnonymous}
                value={fullName}
                maxLength={60}
                onChange={(e) => setFullName(sanitizeName(e.target.value))}
                placeholder="Contoh: Ahmad Fauzi"
                className="h-11 text-sm sm:text-base border-slate-300 focus:ring-primary font-normal"
              />
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp and Optional Email */}
      <div className={cn("grid grid-cols-1 gap-4", setEmail ? "sm:grid-cols-2" : "")}>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 block">
            Nomor WhatsApp <span className="text-rose-500">*</span>
          </label>
          <Input
            type="tel"
            inputMode="tel"
            required
            value={whatsapp}
            maxLength={15}
            onChange={(e) => setWhatsapp(sanitizePhone(e.target.value))}
            placeholder="0812xxxxxxxx"
            className="h-11 text-sm sm:text-base border-slate-300 focus:ring-primary font-normal"
          />
          <span className="text-sm text-slate-600 block font-normal">
            Pengingat berkala &amp; invoice resmi akan dikirimkan ke nomor ini
          </span>
        </div>

        {setEmail && (
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-800 block">
              Email (Opsional)
            </label>
            <Input
              type="email"
              value={email}
              maxLength={100}
              onChange={(e) => setEmail(sanitizeEmail(e.target.value))}
              placeholder="email@anda.com"
              className="h-11 text-sm sm:text-base border-slate-300 focus:ring-primary font-normal"
            />
          </div>
        )}
      </div>
    </div>
  );
}
