import { cn } from "@/lib/utils";

/**
 * Molecule: Wrapper standar input field kalkulator zakat
 */
export function ZakatFieldGroup({
  id,
  label,
  helperText,
  children,
  className,
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 select-none"
        >
          {label}
        </label>
      )}
      <div>{children}</div>
      {helperText && (
        <p className="text-sm text-slate-600 leading-normal font-normal">
          {helperText}
        </p>
      )}
    </div>
  );
}
