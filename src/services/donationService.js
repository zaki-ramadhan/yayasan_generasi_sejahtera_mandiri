import prisma from "@/lib/prisma";
import {
  validateDonationAmount,
  validateName,
  validatePhone,
  validateEmail,
  sanitizePrayer,
  sanitizeInput,
} from "@/lib/security";
import { PAYMENT_CHANNELS } from "@/data/paymentChannels";

// Fallback in-memory donation store for offline/demo sessions
const donationStore = new Map();

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

  const nameVal = validateName(donorName, isAnonymous);
  if (!nameVal.isValid) {
    throw new Error(nameVal.message);
  }

  const phoneVal = validatePhone(donorPhone);
  if (!phoneVal.isValid) {
    throw new Error(phoneVal.message);
  }

  let cleanDonorEmail = "";
  if (donorEmail) {
    const emailVal = validateEmail(donorEmail);
    if (!emailVal.isValid) {
      throw new Error(emailVal.message);
    }
    cleanDonorEmail = emailVal.sanitized;
  }

  const channel = PAYMENT_CHANNELS.find((p) => p.id === paymentChannelId) || PAYMENT_CHANNELS[0];
  const uniqueCode = channel.type === "QRIS" ? 0 : Math.floor(100 + Math.random() * 900);
  const adminFee = channel.fee || 0;
  const totalAmount = Number(amount) + uniqueCode + adminFee;
  const invoiceId = `INV-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  let virtualAccountNumber = "";
  if (channel.type === "VA") {
    virtualAccountNumber = `${channel.accountNumberPrefix || "88"}${
      phoneVal.sanitized.slice(-8)
    }`;
  }

  const cleanDonorName = nameVal.sanitized;
  const cleanDonorPhone = phoneVal.sanitized;
  const cleanPrayer = sanitizePrayer(prayer);
  const expiredAtDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const donationData = {
    id: `don-${Date.now()}`,
    invoiceId,
    campaignId: campaignId || null,
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
    donorName: cleanDonorName,
    donorEmail: cleanDonorEmail,
    donorPhone: cleanDonorPhone,
    isAnonymous: Boolean(isAnonymous),
    prayer: cleanPrayer,
    status: "PENDING",
    idempotencyKey: idempotencyKey || null,
    createdAt: new Date().toISOString(),
    expiredAt: expiredAtDate.toISOString(),
  };

  // Always keep in fallback cache
  donationStore.set(invoiceId, donationData);

  // Save to PostgreSQL via Prisma
  try {
    const createdDb = await prisma.donation.create({
      data: {
        invoiceId,
        campaignId: campaignId || undefined,
        donationType,
        amount: Number(amount),
        uniqueCode,
        totalAmount,
        paymentChannel: channel.id,
        paymentRef: virtualAccountNumber || null,
        donorName: cleanDonorName,
        donorEmail: cleanDonorEmail || null,
        donorPhone: cleanDonorPhone,
        isAnonymous: Boolean(isAnonymous),
        prayer: cleanPrayer || null,
        status: "PENDING",
        expiredAt: expiredAtDate,
        idempotencyKey: idempotencyKey || null,
      },
      include: {
        campaign: true,
      },
    });

    if (createdDb) {
      donationData.id = createdDb.id;
    }
  } catch (error) {
    console.warn("Prisma createDonation fallback:", error.message);
  }

  return donationData;
}

export async function getDonationByInvoiceId(invoiceId) {
  if (!invoiceId) return null;

  try {
    const dbDonation = await prisma.donation.findUnique({
      where: { invoiceId },
      include: {
        campaign: true,
      },
    });

    if (dbDonation) {
      const channel =
        PAYMENT_CHANNELS.find((p) => p.id === dbDonation.paymentChannel) || PAYMENT_CHANNELS[0];

      return {
        id: dbDonation.id,
        invoiceId: dbDonation.invoiceId,
        campaignId: dbDonation.campaignId,
        campaignTitle: dbDonation.campaign?.title || "Sedekah Umum YGSM",
        campaignSlug: dbDonation.campaign?.slug || "",
        donationType: dbDonation.donationType,
        amount: dbDonation.amount,
        uniqueCode: dbDonation.uniqueCode,
        adminFee: channel.fee || 0,
        totalAmount: dbDonation.totalAmount,
        paymentChannelId: channel.id,
        paymentChannelName: channel.name,
        paymentChannelType: channel.type,
        virtualAccountNumber: dbDonation.paymentRef || "",
        donorName: dbDonation.donorName,
        donorEmail: dbDonation.donorEmail || "",
        donorPhone: dbDonation.donorPhone,
        isAnonymous: dbDonation.isAnonymous,
        prayer: dbDonation.prayer || "",
        status: dbDonation.status,
        createdAt: dbDonation.createdAt.toISOString(),
        expiredAt: dbDonation.expiredAt.toISOString(),
      };
    }
  } catch (error) {
    console.warn("Prisma getDonationByInvoiceId fallback:", error.message);
  }

  return donationStore.get(invoiceId) || null;
}

export async function getRecentDonations(limit = 10) {
  try {
    const dbDonations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        campaign: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    if (dbDonations && dbDonations.length > 0) {
      return dbDonations.map((d) => ({
        id: d.invoiceId,
        donor: d.isAnonymous ? "Hamba Allah" : d.donorName,
        amount: d.amount,
        channel: (d.paymentChannel || "qris").toUpperCase(),
        date: d.createdAt.toISOString(),
        status: d.status,
        campaignTitle: d.campaign?.title || "Sedekah Umum YGSM",
      }));
    }
  } catch (error) {
    console.warn("Prisma getRecentDonations fallback:", error.message);
  }
  return [];
}
