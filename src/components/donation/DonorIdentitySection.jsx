import { Input } from "@/components/ui/input";
import { sanitizeName, sanitizePhone, sanitizeEmail } from "@/lib/security";

export function DonorIdentitySection({
  isAnonymous,
  setIsAnonymous,
  donorName,
  setDonorName,
  donorPhone,
  setDonorPhone,
  donorEmail,
  setDonorEmail,
  prayer,
  setPrayer,
  onPrayerChange,
  hasExistingPrayer = false,
}) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-300 space-y-4 shadow-xs">
      <div className="flex items-center gap-2.5">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-semibold shrink-0">
          3
        </span>
        <h2 className="text-base sm:text-lg font-semibold text-slate-950">
          Data Donatur &amp; Doa Kebaikan
        </h2>
      </div>

      {/* Anonim checkbox */}
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

      {!isAnonymous && (
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 block">Nama Lengkap <span className="text-rose-500">*</span></label>
          <Input
            type="text"
            required={!isAnonymous}
            value={donorName}
            maxLength={60}
            onChange={(e) => setDonorName(sanitizeName(e.target.value))}
            placeholder="Contoh: Ahmad Fauzi"
            className="h-11 text-sm sm:text-base border-slate-300 focus:ring-primary font-normal"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 block">Nomor WhatsApp <span className="text-rose-500">*</span></label>
          <Input
            type="tel"
            inputMode="tel"
            required
            value={donorPhone}
            maxLength={15}
            onChange={(e) => setDonorPhone(sanitizePhone(e.target.value))}
            placeholder="0812xxxxxxxx"
            className="h-11 text-sm sm:text-base border-slate-300 focus:ring-primary font-normal"
          />
          <span className="text-sm text-slate-600 block font-normal">Untuk pengiriman invoice &amp; bukti donasi</span>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-800 block">Email (Opsional)</label>
          <Input
            type="email"
            value={donorEmail}
            maxLength={100}
            onChange={(e) => setDonorEmail(sanitizeEmail(e.target.value))}
            placeholder="email@anda.com"
            className="h-11 text-sm sm:text-base border-slate-300 focus:ring-primary font-normal"
          />
        </div>
      </div>

      {/* Doa / Pesan Kebaikan (Maksimal 1 doa per orang) */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-800 block">
            Doa atau Titipan Harapan (Opsional)
          </label>
          {!hasExistingPrayer && (
            <span className="text-sm text-slate-500 font-normal">
              {prayer.length}/150 karakter
            </span>
          )}
        </div>

        {hasExistingPrayer ? (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-normal">
            Anda telah menitipkan doa untuk program ini sebelumnya (Maks. 1 doa per orang).
          </div>
        ) : (
          <textarea
            rows={3}
            maxLength={150}
            value={prayer}
            onChange={onPrayerChange}
            onBlur={() => setPrayer((prev) => prev.trim().replace(/\s+/g, " "))}
            placeholder="Contoh: Bismillah, semoga menjadi amal jariyah dan membawa keberkahan untuk kita semua..."
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors font-normal resize-none"
          />
        )}

        <p className="text-sm text-slate-700 font-normal">
          Untaian doa Anda akan ditampilkan di tab doa program untuk diaminkan bersama donatur lainnya.
        </p>
      </div>
    </div>
  );
}
