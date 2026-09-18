"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CAMPAIGNS } from "@/data/campaigns";
import { RoutineDonationHero } from "@/components/routine-donation/RoutineDonationHero";
import { RoutineDonorIdentity } from "@/components/routine-donation/RoutineDonorIdentity";
import { RoutineProgramItem } from "@/components/routine-donation/RoutineProgramItem";
import { RoutineSummaryCard } from "@/components/routine-donation/RoutineSummaryCard";
import { RoutineSuccessView } from "@/components/routine-donation/RoutineSuccessView";

export default function DonasiRutinPage() {
  const [salutation, setSalutation] = useState("Bapak");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Multi-program state (max 3)
  const [selectedPrograms, setSelectedPrograms] = useState([
    {
      id: 1,
      campaignId: CAMPAIGNS[0]?.id || "camp-001",
      frequency: "DAILY_SUBUH",
      amount: 25000,
      customAmount: "",
    },
  ]);

  const handleAddProgram = () => {
    if (selectedPrograms.length >= 3) {
      toast.error("Maksimal 3 program dalam satu jadwal donasi rutin.");
      return;
    }
    const nextCampaign = CAMPAIGNS[selectedPrograms.length % CAMPAIGNS.length];
    setSelectedPrograms((prev) => [
      ...prev,
      {
        id: (prev[prev.length - 1]?.id || 0) + 1,
        campaignId: nextCampaign.id,
        frequency: "DAILY_SUBUH",
        amount: 25000,
        customAmount: "",
      },
    ]);
  };

  const handleRemoveProgram = (id) => {
    if (selectedPrograms.length === 1) {
      toast.error("Minimal harus memilih 1 program donasi rutin.");
      return;
    }
    setSelectedPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  const handleProgramChange = (id, field, value) => {
    setSelectedPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const totalPerCommitment = selectedPrograms.reduce((sum, item) => {
    const val = item.customAmount
      ? parseInt(item.customAmount.replace(/\D/g, ""), 10) || 0
      : item.amount;
    return sum + val;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAnonymous && !fullName.trim()) {
      toast.error("Mohon isi nama lengkap Anda.");
      return;
    }
    if (!whatsapp.trim() || whatsapp.length < 9) {
      toast.error("Mohon masukkan nomor WhatsApp yang aktif untuk menerima pengingat.");
      return;
    }
    if (totalPerCommitment <= 0) {
      toast.error("Mohon tentukan nominal donasi rutin yang valid.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Jadwal donasi rutin Anda berhasil diaktifkan!");
    }, 800);
  };

  if (isSubmitted) {
    return (
      <RoutineSuccessView
        isAnonymous={isAnonymous}
        salutation={salutation}
        fullName={fullName}
        whatsapp={whatsapp}
        selectedPrograms={selectedPrograms}
        onReset={() => {
          setIsSubmitted(false);
          setFullName("");
          setWhatsapp("");
        }}
      />
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <RoutineDonationHero />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column (7 Cols): Donor Identity & Program Selection */}
          <div className="lg:col-span-7 space-y-6">
            <RoutineDonorIdentity
              salutation={salutation}
              setSalutation={setSalutation}
              fullName={fullName}
              setFullName={setFullName}
              whatsapp={whatsapp}
              setWhatsapp={setWhatsapp}
              isAnonymous={isAnonymous}
              setIsAnonymous={setIsAnonymous}
            />

            {/* Selected Programs Selection List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h2 className="text-base sm:text-lg font-semibold text-slate-950">
                  Daftar Program Pilihan
                </h2>
                <span className="text-xs text-slate-500 font-normal">
                  {selectedPrograms.length} dari 3 program
                </span>
              </div>

              {selectedPrograms.map((item, index) => (
                <RoutineProgramItem
                  key={item.id}
                  item={item}
                  index={index}
                  totalItems={selectedPrograms.length}
                  onRemove={handleRemoveProgram}
                  onChange={handleProgramChange}
                />
              ))}

              {/* Add program button (max 3) */}
              {selectedPrograms.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddProgram}
                  className="w-full py-3 px-4 rounded-xl border border-dashed border-slate-300 hover:border-primary text-slate-700 hover:text-primary bg-white hover:bg-slate-50 font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Program Kebaikan Lain (Maks. 3)</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column (5 Cols): Sticky Order Summary & Submit Button */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <RoutineSummaryCard
              selectedPrograms={selectedPrograms}
              totalPerCommitment={totalPerCommitment}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
