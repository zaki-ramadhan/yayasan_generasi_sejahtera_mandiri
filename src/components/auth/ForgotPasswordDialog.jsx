"use client";

import { useState } from "react";
import { KeyRound, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function ForgotPasswordDialog({ isOpen, onOpenChange, initialIdentifier = "" }) {
  const [forgotInput, setForgotInput] = useState(initialIdentifier);
  const [forgotError, setForgotError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!forgotInput.trim()) {
      setForgotError("Email atau nomor WhatsApp wajib diisi.");
      toast.error("Email atau nomor WhatsApp wajib diisi.");
      return;
    }
    setForgotError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotSent(true);
      toast.success("Tautan instruksi pemulihan telah dikirimkan!");
    }, 800);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setForgotSent(false);
      setForgotError("");
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-primary" />
            <span>Atur Ulang Kata Sandi</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-600">
            Masukkan alamat email atau nomor WhatsApp yang terdaftar untuk menerima tautan pemulihan kata sandi.
          </DialogDescription>
        </DialogHeader>

        {forgotSent ? (
          <div className="py-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-950">Instruksi Berhasil Dikirim</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Tautan verifikasi reset kata sandi telah dikirimkan ke <strong>{forgotInput}</strong>. Silakan periksa inbox email atau pesan WhatsApp Anda.
              </p>
            </div>
            <Button
              type="button"
              onClick={handleClose}
              className="w-full h-10 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg mt-2 cursor-pointer"
            >
              Selesai &amp; Tutup
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-800">
                Email atau nomor WhatsApp <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="nama@email.com atau 081234567890"
                value={forgotInput}
                onChange={(e) => {
                  setForgotInput(e.target.value);
                  if (forgotError) setForgotError("");
                }}
                className={cn(
                  "h-10 text-sm text-slate-900 border-slate-300",
                  forgotError && "border-rose-500 bg-rose-50/20 focus-visible:ring-rose-500"
                )}
              />
              {forgotError && (
                <p className="text-xs text-rose-600 font-medium mt-1">{forgotError}</p>
              )}
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="h-9 px-4 text-sm font-medium border-slate-300 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-9 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg cursor-pointer"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Tautan Reset"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
