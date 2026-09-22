import { cn } from "@/lib/utils";

export function RadioIndicator({ isSelected = false, size = "md", className }) {
  const isSm = size === "sm";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-full border flex items-center justify-center transition-colors shrink-0",
        isSm ? "w-4 h-4" : "w-5 h-5",
        isSelected ? "border-primary bg-primary" : "border-slate-300 bg-white",
        className
      )}
    >
      {isSelected && (
        <div
          className={cn(
            "rounded-full bg-white",
            isSm ? "w-1.5 h-1.5" : "w-2 h-2"
          )}
        />
      )}
    </div>
  );
}
