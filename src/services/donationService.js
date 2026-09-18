import { validateDonationAmount, sanitizeInput } from "@/lib/security";
import { PAYMENT_CHANNELS } from "@/data/paymentChannels";

// In-memory donation store for client/server mock sessions
const donationStore = new Map();

// Seed a sample invoice for testing
donationStore.set("INV-2026-DEMO", {
  id: "don-demo",
  invoiceId: "INV-2026-DEMO",
  campaignId: "camp-001",
  campaignTitle: "Beasiswa Pendidikan Santri Penghafal Al-Qur'an 30 Juz",
  campaignSlug: "beasiswa-santri-penghafal-quran",
  donationType: "CAMPAIGN",
  amount: 100000,
  uniqueCode: 124,
  adminFee: 0,
  totalAmount: 100124,
  paymentChannelId: "qris",
  paymentChannelName: "QRIS (Semua Bank & E-Wallet)",
  paymentChannelType: "QRIS",
  virtualAccountNumber: "",
  donorName: "Hamba Allah",
  donorEmail: "donatur@example.com",
  donorPhone: "081234567890",
  isAnonymous: true,
  prayer: "Semoga santri menjadi penghafal Al-Qur'an yang amanah dan berkah untuk umat.",
  status: "PENDING",
  createdAt: new Date().toISOString(),
  expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
});

export async function createDonation({
  campaignId = null,
  campaignTitle = "Sedekah Umum YGSM",
  campaignSlug = "",
  donationType = "CAMPAIGN",
  amount,
  paymentChannelId = "qris",
  donorName = "Hamba Allah",
  donorEmail = "",
  donorPhone = "",
  isAnonymous = false,
  prayer = "",
  idempotencyKey = "",
}) {
  const validation = validateDonationAmount(amount);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const channel = PAYMENT_CHANNELS.find((p) => p.id === paymentChannelId) || PAYMENT_CHANNELS[0];
  const uniqueCode = channel.type === "QRIS" ? 0 : Math.floor(100 + Math.random() * 900);
  const adminFee = channel.fee || 0;
  const totalAmount = Number(amount) + uniqueCode + adminFee;
  const invoiceId = `INV-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  let virtualAccountNumber = "";
  if (channel.type === "VA") {
    virtualAccountNumber = `${channel.accountNumberPrefix || "88"}${donorPhone ? donorPhone.replace(/\D/g, "").slice(-8) : "12345678"}`;
  }

  const donation = {
    id: `don-${Date.now()}`,
    invoiceId,
    campaignId,
    campaignTitle,
    campaignSlug,
    donationType,
    amount: Number(amount),
    uniqueCode,
    adminFee,
    totalAmount,
    paymentChannelId: channel.id,
    paymentChannelName: channel.name,
    paymentChannelType: channel.type,
    virtualAccountNumber,
    donorName: isAnonymous ? "Hamba Allah" : sanitizeInput(donorName) || "Hamba Allah",
    donorEmail: sanitizeInput(donorEmail),
    donorPhone: sanitizeInput(donorPhone),
    isAnonymous: Boolean(isAnonymous),
    prayer: sanitizeInput(prayer),
    status: "PENDING",
    idempotencyKey,
    createdAt: new Date().toISOString(),
    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  donationStore.set(invoiceId, donation);
  return donation;
}

export async function getDonationByInvoiceId(invoiceId) {
  if (!invoiceId) return null;
  return donationStore.get(invoiceId) || null;
}
