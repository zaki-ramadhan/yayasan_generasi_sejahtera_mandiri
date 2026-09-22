import { PaymentChannelItem } from "@/components/donation/PaymentChannelItem";
import { CheckoutStepHeader } from "@/components/donation/CheckoutStepHeader";
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
        <CheckoutStepHeader step={stepNumber} title={title} titleSize="text-sm sm:text-base" />
      )}

      <div className="space-y-2.5">
        {channels.map((channel) => (
          <PaymentChannelItem
            key={channel.id}
            channel={channel}
            isSelected={selectedChannelId === channel.id}
            onSelect={() => onSelectChannel(channel.id)}
          />
        ))}
      </div>
    </div>
  );
}
