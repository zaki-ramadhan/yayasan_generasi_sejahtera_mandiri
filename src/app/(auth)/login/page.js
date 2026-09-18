"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  USER_ROLES,
  loginUser,
  getRedirectPathForRole,
  findUserByIdentifier,
  getRememberedIdentifier,
  setRememberedIdentifier,
} from "@/services/authService";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(() => (typeof window !== "undefined" ? getRememberedIdentifier() : ""));
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => (typeof window !== "undefined" ? Boolean(getRememberedIdentifier()) : false));
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = "Nama pengguna atau email wajib diisi.";
    }
    if (!password.trim()) {
      newErrors.password = "Kata sandi wajib diisi.";
    } else if (password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter.";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (rememberMe) {
        setRememberedIdentifier(identifier.trim());
      } else {
        setRememberedIdentifier("");
      }

      const matched = findUserByIdentifier(identifier);
      const userToLogin = matched || {
        id: `USR-${Date.now()}`,
        name: identifier.includes("@")
          ? identifier.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
          : identifier.replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        username: identifier.includes("@") ? identifier.split("@")[0] : identifier,
        email: identifier.includes("@") ? identifier : `${identifier}@gmail.com`,
        role: USER_ROLES.DONOR,
        title: "Donatur Terdaftar",
        phone: "0812-0000-0000",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        initials: identifier.substring(0, 2).toUpperCase(),
      };

      loginUser(userToLogin);
      setIsLoading(false);
      toast.success(`Selamat datang, ${userToLogin.name}!`);
      router.push(getRedirectPathForRole(userToLogin.role));
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      const googleUser = {
        id: `USR-GGL-${Date.now()}`,
        name: "H. Hendra Wijaya",
        username: "hendra.google",
        email: "hendra.donatur@gmail.com",
        role: USER_ROLES.DONOR,
        title: "Donatur Terdaftar (Google)",
        phone: "0818-9988-7766",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        initials: "HW",
      };

      loginUser(googleUser);
      setIsGoogleLoading(false);
      toast.success(`Berhasil masuk dengan Google: ${googleUser.email}`);
      router.push(getRedirectPathForRole(googleUser.role));
    }, 700);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotInput.trim()) {
      setForgotError("Email atau nomor WhatsApp wajib diisi.");
      toast.error("Email atau nomor WhatsApp wajib diisi.");
      return;
    }
    setForgotError("");
    setIsForgotSubmitting(true);
    setTimeout(() => {
      setIsForgotSubmitting(false);
      setForgotSent(true);
      toast.success("Tautan instruksi pemulihan telah dikirimkan!");
    }, 800);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Masuk ke Akun
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Akses layanan donasi rutin, e-Kwitansi ZISWAF, dan laporan amanah Anda.
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          {/* Google Login Option */}
          <Button
            type="button"
            variant="outline"
            disabled={isGoogleLoading || isLoading}
            onClick={handleGoogleLogin}
            className="w-full h-10 border-slate-300 hover:bg-slate-50 text-slate-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-none cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isGoogleLoading ? "Menghubungkan ke Google..." : "Masuk dengan Google"}</span>
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <span className="bg-white px-3 text-xs text-slate-500 font-medium shrink-0">
              atau
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username or Email Input */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Nama pengguna atau email <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="nama atau email"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: undefined }));
                }}
                autoComplete="username"
                className={cn(
                  "h-11 text-sm text-slate-900 border-slate-300 transition-colors",
                  errors.identifier && "border-rose-500 bg-rose-50/20 focus-visible:ring-rose-500"
                )}
              />
              {errors.identifier && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.identifier}</p>
              )}
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-semibold text-slate-800">
                  Kata sandi <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotSent(false);
                    setForgotError("");
                    setForgotInput(identifier);
                    setIsForgotModalOpen(true);
                  }}
                  className="text-xs sm:text-sm text-primary hover:underline font-medium cursor-pointer"
                >
                  Lupa sandi?
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  autoComplete="current-password"
                  className={cn(
                    "h-11 text-sm text-slate-900 border-slate-300 pr-10 transition-colors",
                    errors.password && "border-rose-500 bg-rose-50/20 focus-visible:ring-rose-500"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 p-1 cursor-pointer focus:outline-none"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                  title={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                />
                <span>Ingat saya</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg text-sm cursor-pointer shadow-none mt-2"
            >
              {isLoading ? "Memverifikasi..." : "Masuk ke Akun"}
            </Button>
          </form>

          {/* Register Link */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-600">
            <span>Belum memiliki akun? </span>
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Daftar sekarang
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-1">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-slate-950 underline transition-colors"
          >
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={isForgotModalOpen} onOpenChange={setIsForgotModalOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" />
              <span>Atur Ulang Kata Sandi</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
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
                <p className="text-xs text-slate-600">
                  Tautan verifikasi reset kata sandi telah dikirimkan ke <strong>{forgotInput}</strong>. Silakan periksa inbox atau pesan WhatsApp Anda.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="w-full h-10 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-lg mt-2"
              >
                Selesai & Tutup
              </Button>
            </div>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 pt-2" noValidate>
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                  Email atau nomor WhatsApp
                </label>
                <Input
                  type="text"
                  placeholder="email atau nomor WA"
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
                  onClick={() => setIsForgotModalOpen(false)}
                  className="h-9 px-4 text-xs font-medium border-slate-300"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isForgotSubmitting}
                  className="h-9 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-medium rounded-lg"
                >
                  {isForgotSubmitting ? "Mengirim..." : "Kirim Tautan Reset"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
