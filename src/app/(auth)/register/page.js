"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { USER_ROLES, loginUser, getRedirectPathForRole } from "@/services/authService";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // 1. Username validation
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      newErrors.username = "Nama pengguna wajib diisi.";
    } else if (cleanUsername.length < 3) {
      newErrors.username = "Nama pengguna minimal 3 karakter.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      newErrors.username = "Nama pengguna hanya boleh huruf, angka, dan garis bawah (_).";
    }

    // 2. Email validation
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      newErrors.email = "Alamat email wajib diisi.";
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = "Format email tidak valid (contoh: nama@email.com).";
    }

    // 3. WhatsApp phone validation
    const cleanPhone = phone.trim().replace(/\s+/g, "");
    const phoneRegex = /^[0-9+]{9,15}$/;
    if (!cleanPhone) {
      newErrors.phone = "Nomor WhatsApp aktif wajib diisi.";
    } else if (!phoneRegex.test(cleanPhone) || cleanPhone.replace(/\D/g, "").length < 9) {
      newErrors.phone = "Nomor WhatsApp minimal 9 digit angka (contoh: 081234567890).";
    }

    // 4. Terms agreement
    if (!agreeTerms) {
      newErrors.agreeTerms = "Anda harus menyetujui Ketentuan Akad & Kebijakan Privasi.";
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
      const formattedName = username
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      const newUser = {
        id: `USR-${Date.now()}`,
        username: username.trim().toLowerCase(),
        name: formattedName,
        email: email.trim().toLowerCase(),
        role: USER_ROLES.DONOR, // Default role; database administrator can adjust role anytime
        title: "Donatur / Muzakki",
        phone: phone.trim(),
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        initials: username.substring(0, 2).toUpperCase(),
      };

      loginUser(newUser);
      setIsLoading(false);
      toast.success("Pendaftaran berhasil! Selamat datang di Yayasan Generasi Sejahtera Mandiri.");
      router.push(getRedirectPathForRole(newUser.role));
    }, 700);
  };

  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      const googleUser = {
        id: `USR-GGL-${Date.now()}`,
        name: "H. Hendra Wijaya",
        username: "hendra_wijaya",
        email: "hendra.donatur@gmail.com",
        role: USER_ROLES.DONOR,
        title: "Donatur Terdaftar (Google)",
        phone: "0818-9988-7766",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        initials: "HW",
      };

      loginUser(googleUser);
      setIsGoogleLoading(false);
      toast.success(`Berhasil mendaftar dengan Google: ${googleUser.email}`);
      router.push(getRedirectPathForRole(googleUser.role));
    }, 700);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Daftar Akun Baru
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Daftar menggunakan nama pengguna, email, dan nomor WhatsApp aktif Anda.
          </p>
        </div>

        {/* Register Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          {/* Google Sign-up Option */}
          <Button
            type="button"
            variant="outline"
            disabled={isGoogleLoading || isLoading}
            onClick={handleGoogleSignUp}
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
            <span>{isGoogleLoading ? "Menghubungkan ke Google..." : "Daftar dengan Google"}</span>
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <span className="bg-white px-3 text-xs text-slate-500 font-medium shrink-0">
              atau
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* 1. Nama Pengguna (Username) */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Nama pengguna <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="ahmad_fauzi"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
                }}
                className={cn(
                  "h-11 text-sm text-slate-900 border-slate-300 transition-colors",
                  errors.username && "border-rose-500 bg-rose-50/20 focus-visible:ring-rose-500"
                )}
              />
              {errors.username && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.username}</p>
              )}
            </div>

            {/* 2. Email */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                Alamat email <span className="text-rose-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                autoComplete="email"
                className={cn(
                  "h-11 text-sm text-slate-900 border-slate-300 transition-colors",
                  errors.email && "border-rose-500 bg-rose-50/20 focus-visible:ring-rose-500"
                )}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.email}</p>
              )}
            </div>

            {/* 3. Nomor WhatsApp Aktif */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                No. WhatsApp aktif <span className="text-rose-500">*</span>
              </label>
              <Input
                type="tel"
                placeholder="081234567890"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={cn(
                  "h-11 text-sm text-slate-900 border-slate-300 transition-colors",
                  errors.phone && "border-rose-500 bg-rose-50/20 focus-visible:ring-rose-500"
                )}
              />
              {errors.phone && (
                <p className="text-xs text-rose-600 font-medium mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Agree Terms Checkbox */}
            <div className="space-y-1 pt-1">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                />
                <div className="text-xs sm:text-sm text-slate-700 leading-normal">
                  <label htmlFor="agree" className="cursor-pointer select-none">
                    Saya menyetujui{" "}
                  </label>
                  <Link
                    href="/ketentuan-transaksi"
                    className="text-primary hover:underline font-semibold"
                  >
                    Ketentuan Akad &amp; Kebijakan Privasi Yayasan
                  </Link>
                  <span>.</span>
                </div>
              </div>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-600 font-medium mt-1 pl-6">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg text-sm cursor-pointer shadow-none mt-2"
            >
              {isLoading ? "Mendaftarkan Akun..." : "Daftar Akun Baru"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-600">
            <span>Sudah memiliki akun? </span>
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Masuk di sini
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
    </div>
  );
}
