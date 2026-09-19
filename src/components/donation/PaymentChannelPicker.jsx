import { formatRupiah } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function PaymentChannelPicker({
  channels = [],
  selectedChannelId,
  onSelectChannel,
  showHeader = true,
  stepNumber = 2,
  title = "Pilih Metode Pembayaran",
  containerCard = true,
  className = "",
}) {
  return (
    <div
      className={cn(
        containerCard && "bg-white p-5 sm:p-6 rounded-xl border border-slate-300 shadow-xs",
        "space-y-3 sm:space-y-4",
        className
      )}
    >
      {showHeader && (
        <div className="flex items-center gap-2.5">
          {stepNumber !== null && (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-semibold shrink-0">
              {stepNumber}
            </span>
          )}
          <h2 className="text-sm sm:text-base font-semibold text-slate-900">
            {title}
          </h2>
        </div>
      )}

      <div className="space-y-2.5">
        {channels.map((channel) => {
          const isSelected = selectedChannelId === channel.id;
          return (
            <label
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                "flex items-center justify-between p-3.5 sm:p-4 rounded-lg border transition-all cursor-pointer",
                isSelected
                  ? "bg-primary/5 border-primary shadow-xs"
                  : "bg-white border-slate-300 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0",
                    isSelected ? "border-primary bg-primary" : "border-slate-400"
                  )}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
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
        })}
      </div>
    </div>
  );
}
