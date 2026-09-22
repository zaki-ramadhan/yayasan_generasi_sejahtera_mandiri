import { RadioIndicator } from "@/components/ui/RadioIndicator";
import { formatRupiah } from "@/lib/formatters";
import { cn } from "@/lib/utils";

/**
 * Individual payment channel selectable item (e.g. QRIS, BCA VA, Mandiri VA)
 * @param {object} channel - Channel object containing id, name, type, fee
 * @param {boolean} isSelected - Whether this channel is currently selected
 * @param {() => void} onSelect - Selection callback
 * @param {string} [className] - Optional custom class
 */
export function PaymentChannelItem({
  channel,
  isSelected,
  onSelect,
  className = "",
}) {
  return (
    <label
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between p-3.5 sm:p-4 rounded-lg border transition-all cursor-pointer",
        isSelected
          ? "bg-primary/5 border-primary shadow-xs"
          : "bg-white border-slate-300 hover:bg-slate-50",
        className
      )}
    >
      <div className="flex items-center gap-3.5">
        <RadioIndicator isSelected={isSelected} />
        <div className="space-y-0.5">
          <span className="text-sm sm:text-base font-medium text-slate-900 block">
            {channel.name}
          </span>
          <span className="text-xs sm:text-sm text-slate-600 block font-normal">
            {channel.type === "QRIS" ? "Verifikasi Instan via QR Code" : "Virtual Account"}
          </span>
        </div>
      </div>

      <div className="text-right text-xs sm:text-sm shrink-0 pl-3">
        <span className="text-slate-500 block font-normal">Biaya Layanan</span>
        <span className="font-medium text-slate-900 text-sm sm:text-base">
          {channel.fee === 0 ? "Gratis" : formatRupiah(channel.fee)}
        </span>
      </div>
    </label>
  );
}
