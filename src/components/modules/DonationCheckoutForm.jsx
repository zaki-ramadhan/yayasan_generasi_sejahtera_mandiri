"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PAYMENT_CHANNELS } from "@/data/paymentChannels";
import { createDonation } from "@/services/donationService";
import { formatRupiah } from "@/lib/formatters";
import { DONATION_LIMITS, generateIdempotencyKey } from "@/lib/security";
import { NominalPresetsPicker } from "@/components/donation/NominalPresetsPicker";
import { PaymentChannelPicker } from "@/components/donation/PaymentChannelPicker";
import { DonorIdentitySection } from "@/components/donation/DonorIdentitySection";
import { DonationCheckoutSummary } from "@/components/donation/DonationCheckoutSummary";

const NOMINAL_PRESETS = [25000, 50000, 100000, 250000, 500000];

function subscribePrayers(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}
function getPrayersSnapshot() {
  return localStorage.getItem("ygsm_user_prayers") || "[]";
}
function getPrayersServerSnapshot() {
  return "[]";
}

export function DonationCheckoutForm({ campaign, initialAmount = 50000 }) {
  const router = useRouter();
  const isPresetInitial = NOMINAL_PRESETS.includes(initialAmount);
  const [isCustomMode, setIsCustomMode] = useState(!isPresetInitial);
  const [amount, setAmount] = useState(initialAmount);
  const [customAmountInput, setCustomAmountInput] = useState(
    isPresetInitial ? "" : initialAmount.toString()
  );
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [prayer, setPrayer] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState("qris");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prayersRaw = useSyncExternalStore(subscribePrayers, getPrayersSnapshot, getPrayersServerSnapshot);
  let hasExistingPrayer = false;
  try {
    const storedPrayers = JSON.parse(prayersRaw);
    hasExistingPrayer = Boolean(campaign?.slug && Array.isArray(storedPrayers) && storedPrayers.includes(campaign.slug));
  } catch {
    hasExistingPrayer = false;
  }

  const handlePresetClick = (val) => {
    setIsCustomMode(false);
    setAmount(val);
    setCustomAmountInput("");
  };

  const handleCustomModeClick = () => {
    setIsCustomMode(true);
    const num = Number(customAmountInput);
    setAmount(num || 0);
  };

  const handleCustomInputChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, "").slice(0, 11);
    setCustomAmountInput(rawVal);
    const num = Number(rawVal);
    setAmount(num || 0);
  };

  const handlePrayerChange = (e) => {
    let val = e.target.value;
    val = val.replace(/^\s+/, "");
    val = val.replace(/\s{2,}/g, " ");
    if (val.length <= 150) {
      setPrayer(val);
    }
  };

  const selectedChannel = PAYMENT_CHANNELS.find((c) => c.id === selectedChannelId) || PAYMENT_CHANNELS[0];
  const adminFee = selectedChannel.fee || 0;
  const totalPayment = amount + adminFee;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount < DONATION_LIMITS.MIN_AMOUNT) {
      toast.error(`Nominal donasi minimal ${formatRupiah(DONATION_LIMITS.MIN_AMOUNT)}`);
      return;
    }

    if (amount > DONATION_LIMITS.MAX_AMOUNT) {
      toast.error(`Nominal donasi maksimal ${formatRupiah(DONATION_LIMITS.MAX_AMOUNT)}`);
      return;
    }

    if (!donorPhone || donorPhone.trim().length < 9) {
      toast.error("Mohon masukkan nomor WhatsApp yang aktif untuk konfirmasi pembayaran");
      return;
    }

    if (!isAnonymous && (!donorName || donorName.trim().length < 2)) {
      toast.error("Mohon masukkan nama donatur atau pilih opsi Hamba Allah (Anonim)");
      return;
    }

    try {
      setIsSubmitting(true);
      const idempotencyKey = generateIdempotencyKey();
      const sanitizedPrayer = prayer.trim().replace(/\s+/g, " ");

      const donation = await createDonation({
        campaignId: campaign?.id || null,
        campaignTitle: campaign?.title || "Sedekah Umum YGSM",
        campaignSlug: campaign?.slug || "",
        donationType: "CAMPAIGN",
        amount,
        paymentChannelId: selectedChannelId,
        donorName: isAnonymous ? "Hamba Allah" : donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone.trim(),
        isAnonymous,
        prayer: sanitizedPrayer,
        idempotencyKey,
      });

      if (sanitizedPrayer && campaign?.slug && typeof window !== "undefined") {
        try {
          const storedPrayers = JSON.parse(localStorage.getItem("ygsm_user_prayers") || "[]");
          if (!storedPrayers.includes(campaign.slug)) {
            storedPrayers.push(campaign.slug);
            localStorage.setItem("ygsm_user_prayers", JSON.stringify(storedPrayers));
          }
        } catch {
          // Ignore
        }
      }

      toast.success("Tagihan donasi berhasil dibuat!");
      router.push(`/invoice/${donation.invoiceId}`);
    } catch (err) {
      toast.error(err.message || "Gagal memproses transaksi. Silakan coba kembali.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* LEFT COLUMN: Steps */}
      <div className="lg:col-span-7 space-y-6">
        <NominalPresetsPicker
          presets={NOMINAL_PRESETS}
          amount={amount}
          isCustomMode={isCustomMode}
          customAmountInput={customAmountInput}
          onPresetClick={handlePresetClick}
          onCustomModeClick={handleCustomModeClick}
          onCustomInputChange={handleCustomInputChange}
        />

        <PaymentChannelPicker
          channels={PAYMENT_CHANNELS}
          selectedChannelId={selectedChannelId}
          onSelectChannel={setSelectedChannelId}
        />

        <DonorIdentitySection
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          donorName={donorName}
          setDonorName={setDonorName}
          donorPhone={donorPhone}
          setDonorPhone={setDonorPhone}
          donorEmail={donorEmail}
          setDonorEmail={setDonorEmail}
          prayer={prayer}
          setPrayer={setPrayer}
          onPrayerChange={handlePrayerChange}
          hasExistingPrayer={hasExistingPrayer}
        />
      </div>

      {/* RIGHT COLUMN: Preview & Summary */}
      <DonationCheckoutSummary
        campaign={campaign}
        amount={amount}
        selectedChannel={selectedChannel}
        adminFee={adminFee}
        totalPayment={totalPayment}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
