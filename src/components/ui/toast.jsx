"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-3 overflow-hidden rounded-xl border p-4 shadow-lg transition-all duration-300 ease-in-out data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-slate-200 bg-white text-slate-950 shadow-slate-200/50",
        success: "border-emerald-200 bg-emerald-50/95 text-emerald-950 shadow-emerald-200/40",
        destructive: "border-rose-200 bg-rose-50/95 text-rose-950 shadow-rose-200/40",
        warning: "border-amber-200 bg-amber-50/95 text-amber-950 shadow-amber-200/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef(({ className, variant, onOpenChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-transparent px-3 text-xs font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-950 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-slate-500 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold leading-snug [&+div]:text-xs", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs opacity-90 leading-relaxed mt-0.5", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

function ToastIcon({ variant }) {
  if (variant === "success") {
    return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />;
  }
  if (variant === "destructive") {
    return <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />;
  }
  if (variant === "warning") {
    return <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />;
  }
  return <Info className="h-5 w-5 shrink-0 text-slate-600" />;
}

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      tabIndex={-1}
      aria-live="polite"
      className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] pointer-events-none gap-2"
    >
      {toasts.map(function ({ id, title, description, action, variant, open, onOpenChange, ...props }) {
        if (open === false) return null;

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 w-full pr-4">
              <ToastIcon variant={variant} />
              <div className="grid gap-0.5 text-left flex-1 min-w-0">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose onClick={() => dismiss(id)} />
          </Toast>
        );
      })}
    </div>
  );
}

export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
