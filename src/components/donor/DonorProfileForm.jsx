"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SALUTATION_OPTIONS = [
  "Bpk.",
  "Ibu",
  "Sdr.",
  "Sdri.",
  "dr.",
  "Ustaz",
  "H.",
  "Hj.",
];

const BANK_OPTIONS = [
  "BSI (Bank Syariah Indonesia)",
  "BCA (Bank Central Asia)",
  "Bank Mandiri",
  "BRI (Bank Rakyat Indonesia)",
  "BNI (Bank Negara Indonesia)",
  "Bank Muamalat Indonesia",
  "CIMB Niaga Syariah",
  "Bank Permata Syariah",
];

export function DonorProfileForm({
  profile,
  onUpdateProfile,
  onUpdatePassword,
}) {
  const { toast } = useToast();

  // Personal Info Form State
  const [personalData, setPersonalData] = useState({
    salutation: profile?.salutation || "Bpk.",
    name: profile?.name || "",
    bio: profile?.bio || "",
    city: profile?.city || "",
    address: profile?.address || "",
    phone: profile?.phone || "",
  });
  const [isSavingPersonal, setIsSavingPersonal] = useState(false);

  // Bank Info Form State
  const [bankData, setBankData] = useState({
    bankName: profile?.bankName || "BSI (Bank Syariah Indonesia)",
    bankAccount: profile?.bankAccount || "",
    bankAccountName: profile?.bankAccountName || "",
  });
  const [isSavingBank, setIsSavingBank] = useState(false);

  // Security Form State
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Submit Personal Data
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    if (!personalData.name.trim()) {
      toast({
        title: "Perhatian",
        description: "Nama lengkap tidak boleh kosong.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingPersonal(true);
    try {
      await onUpdateProfile(personalData);
      toast({
        title: "Berhasil",
        description: "Informasi data diri berhasil diperbarui.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Gagal Menyimpan",
        description: err.message || "Terjadi kesalahan saat menyimpan data diri.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPersonal(false);
    }
  };

  // Submit Bank Data
  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setIsSavingBank(true);
    try {
      await onUpdateProfile(bankData);
      toast({
        title: "Berhasil",
        description: "Data rekening bank donatur berhasil disimpan.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Gagal Menyimpan",
        description: err.message || "Terjadi kesalahan saat menyimpan rekening.",
        variant: "destructive",
      });
    } finally {
      setIsSavingBank(false);
    }
  };

  // Submit Password Change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordData.newPassword) {
      toast({
        title: "Perhatian",
        description: "Kata sandi baru tidak boleh kosong.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Perhatian",
        description: "Kata sandi baru minimal 6 karakter.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Perhatian",
        description: "Konfirmasi kata sandi tidak cocok.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingPassword(true);
    try {
      await onUpdatePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      toast({
        title: "Berhasil",
        description: "Kata sandi akun Anda berhasil diperbarui.",
        variant: "success",
      });
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast({
        title: "Gagal Memperbarui",
        description: err.message || "Terjadi kesalahan saat memperbarui kata sandi.",
        variant: "destructive",
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Formulir Data Pribadi */}
      <section className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs">
        <div className="pb-4 mb-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900 leading-snug">
            Informasi Data Diri
          </h2>
          <p className="text-sm font-normal text-slate-500 mt-0.5">
            Kelola sapaan resmi, nama lengkap, serta kontak donatur Anda
          </p>
        </div>

        <form onSubmit={handlePersonalSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Sapaan */}
            <div className="sm:col-span-1">
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Sapaan
              </label>
              <Select
                value={personalData.salutation}
                onValueChange={(val) =>
                  setPersonalData((p) => ({ ...p, salutation: val }))
                }
              >
                <SelectTrigger className="h-9.5 text-sm rounded-md border-slate-200">
                  <SelectValue placeholder="Pilih sapaan" />
                </SelectTrigger>
                <SelectContent>
                  {SALUTATION_OPTIONS.map((sal) => (
                    <SelectItem key={sal} value={sal}>
                      {sal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nama Lengkap */}
            <div className="sm:col-span-3">
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Nama Lengkap
              </label>
              <Input
                type="text"
                value={personalData.name}
                onChange={(e) =>
                  setPersonalData((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Contoh: Hendra Wijaya"
                className="h-9.5 text-sm rounded-md border-slate-200"
                required
              />
            </div>
          </div>

          {/* Bio / Catatan Pribadi */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Bio / Moto Pribadi
            </label>
            <textarea
              rows={2}
              value={personalData.bio}
              onChange={(e) =>
                setPersonalData((p) => ({ ...p, bio: e.target.value }))
              }
              placeholder="Tuliskan moto atau harapan kebaikan Anda..."
              className="w-full text-sm rounded-md border border-slate-200 p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-slate-900 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Domisili / Kota */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Domisili / Kota
              </label>
              <Input
                type="text"
                value={personalData.city}
                onChange={(e) =>
                  setPersonalData((p) => ({ ...p, city: e.target.value }))
                }
                placeholder="Contoh: Kota Bandung"
                className="h-9.5 text-sm rounded-md border-slate-200"
              />
            </div>

            {/* Nomor Telepon / WhatsApp */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Nomor Telepon / WhatsApp
              </label>
              <Input
                type="tel"
                value={personalData.phone}
                onChange={(e) =>
                  setPersonalData((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="Contoh: 0812-3456-7890"
                className="h-9.5 text-sm rounded-md border-slate-200"
              />
            </div>
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Alamat Lengkap
            </label>
            <textarea
              rows={2}
              value={personalData.address}
              onChange={(e) =>
                setPersonalData((p) => ({ ...p, address: e.target.value }))
              }
              placeholder="Alamat domisili lengkap untuk pengiriman laporan fisik jika diperlukan..."
              className="w-full text-sm rounded-md border border-slate-200 p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-slate-900 bg-white"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={isSavingPersonal}
              className="h-9 px-4 rounded-md text-sm font-medium gap-1.5"
            >
              {isSavingPersonal && (
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              )}
              <span>Simpan Perubahan Data Diri</span>
            </Button>
          </div>
        </form>
      </section>

      {/* 2. Formulir Data Rekening Bank */}
      <section className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs">
        <div className="pb-4 mb-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900 leading-snug">
            Informasi Rekening Bank Donatur
          </h2>
          <p className="text-sm font-normal text-slate-500 mt-0.5">
            Digunakan untuk verifikasi administrasi dan konfirmasi penyaluran resmi
          </p>
        </div>

        <form onSubmit={handleBankSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Nama Bank */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Nama Bank
              </label>
              <Select
                value={bankData.bankName}
                onValueChange={(val) =>
                  setBankData((b) => ({ ...b, bankName: val }))
                }
              >
                <SelectTrigger className="h-9.5 text-sm rounded-md border-slate-200">
                  <SelectValue placeholder="Pilih Bank" />
                </SelectTrigger>
                <SelectContent>
                  {BANK_OPTIONS.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nomor Rekening */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Nomor Rekening
              </label>
              <Input
                type="text"
                inputMode="numeric"
                value={bankData.bankAccount}
                onChange={(e) =>
                  setBankData((b) => ({ ...b, bankAccount: e.target.value }))
                }
                placeholder="Contoh: 7123456789"
                className="h-9.5 text-sm rounded-md border-slate-200"
              />
            </div>

            {/* Atas Nama Rekening */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Atas Nama Pemilik Rekening
              </label>
              <Input
                type="text"
                value={bankData.bankAccountName}
                onChange={(e) =>
                  setBankData((b) => ({
                    ...b,
                    bankAccountName: e.target.value,
                  }))
                }
                placeholder="Sesuai buku tabungan"
                className="h-9.5 text-sm rounded-md border-slate-200"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={isSavingBank}
              className="h-9 px-4 rounded-md text-sm font-medium gap-1.5"
            >
              {isSavingBank && (
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              )}
              <span>Simpan Rekening Bank</span>
            </Button>
          </div>
        </form>
      </section>

      {/* 3. Formulir Keamanan Akun (Ubah Password) */}
      <section className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs">
        <div className="pb-4 mb-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900 leading-snug">
            Keamanan Akun
          </h2>
          <p className="text-sm font-normal text-slate-500 mt-0.5">
            Perbarui kata sandi secara berkala untuk menjaga keamanan akun Anda
          </p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Password Saat Ini */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Kata Sandi Saat Ini
              </label>
              <Input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData((p) => ({
                    ...p,
                    oldPassword: e.target.value,
                  }))
                }
                placeholder="Masukkan sandi saat ini"
                className="h-9.5 text-sm rounded-md border-slate-200"
              />
            </div>

            {/* Password Baru */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Kata Sandi Baru
              </label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((p) => ({
                    ...p,
                    newPassword: e.target.value,
                  }))
                }
                placeholder="Minimal 6 karakter"
                className="h-9.5 text-sm rounded-md border-slate-200"
                required
              />
            </div>

            {/* Konfirmasi Password Baru */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                Konfirmasi Kata Sandi Baru
              </label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((p) => ({
                    ...p,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Ulangi kata sandi baru"
                className="h-9.5 text-sm rounded-md border-slate-200"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={isSavingPassword}
              variant="outline"
              className="h-9 px-4 rounded-md text-sm font-medium border-slate-300 text-slate-800 hover:bg-slate-100 gap-1.5"
            >
              {isSavingPassword && (
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              )}
              <span>Perbarui Kata Sandi</span>
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
