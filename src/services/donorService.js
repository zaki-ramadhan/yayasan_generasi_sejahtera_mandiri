import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sanitizeInput } from "@/lib/security";
import { DEMO_USERS } from "@/services/authService";

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash) return true;
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

function buildUserWhereClause(userEmail, userName) {
  const orConditions = [];

  if (userEmail && typeof userEmail === "string") {
    orConditions.push({ donorEmail: { equals: userEmail.trim(), mode: "insensitive" } });
  }

  if (userName && typeof userName === "string") {
    const cleanName = userName.trim();
    orConditions.push({ donorName: { equals: cleanName, mode: "insensitive" } });

    const withoutHonorific = cleanName.replace(/^(H\.|Hj\.|Drs\.|Ust\.|dr\.|Prof\.)\s*/i, "").trim();
    if (withoutHonorific && withoutHonorific !== cleanName) {
      orConditions.push({ donorName: { contains: withoutHonorific, mode: "insensitive" } });
    }
  }

  return orConditions.length > 0 ? { OR: orConditions } : null;
}

export async function getDonorHistory({
  userEmail,
  userName,
  search = "",
  sortBy = "date",
  sortOrder = "desc",
  page = 1,
  limit = 25,
}) {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const pageLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 25));
  const skip = (currentPage - 1) * pageLimit;
  const normalizedSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const userCondition = buildUserWhereClause(userEmail, userName);
  if (!userCondition) {
    return {
      metrics: {
        totalNominal: 0,
        totalTransactions: 0,
        totalPrograms: 0,
      },
      items: [],
      pagination: {
        total: 0,
        totalPages: 0,
        currentPage,
        limit: pageLimit,
      },
    };
  }

  const basePaidWhere = {
    status: "PAID",
    ...userCondition,
  };

  try {
    const [aggregates, distinctCampaigns] = await Promise.all([
      prisma.donation.aggregate({
        where: basePaidWhere,
        _sum: { amount: true },
        _count: { id: true },
      }),
      prisma.donation.findMany({
        where: basePaidWhere,
        select: { campaignId: true, donationType: true },
        distinct: ["campaignId", "donationType"],
      }),
    ]);

    const totalNominal = aggregates._sum.amount || 0;
    const totalTransactions = aggregates._count.id || 0;
    const totalPrograms = distinctCampaigns.length;

    const filterConditions = [{ status: "PAID" }, userCondition];

    if (search && typeof search === "string" && search.trim().length > 0) {
      const q = search.trim();
      filterConditions.push({
        OR: [
          { invoiceId: { contains: q, mode: "insensitive" } },
          { donorName: { contains: q, mode: "insensitive" } },
          { paymentChannel: { contains: q, mode: "insensitive" } },
          { campaign: { title: { contains: q, mode: "insensitive" } } },
        ],
      });
    }

    const finalWhere = { AND: filterConditions };

    let orderByClause = { paidAt: normalizedSortOrder };
    if (sortBy === "nominal" || sortBy === "amount") {
      orderByClause = { amount: normalizedSortOrder };
    } else if (sortBy === "program") {
      orderByClause = { campaign: { title: normalizedSortOrder } };
    } else if (sortBy === "payment" || sortBy === "channel") {
      orderByClause = { paymentChannel: normalizedSortOrder };
    } else if (sortBy === "name") {
      orderByClause = { donorName: normalizedSortOrder };
    }

    const [filteredCount, donations] = await Promise.all([
      prisma.donation.count({ where: finalWhere }),
      prisma.donation.findMany({
        where: finalWhere,
        include: {
          campaign: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
        orderBy: orderByClause,
        skip,
        take: pageLimit,
      }),
    ]);

    const items = donations.map((d, index) => {
      const effectiveProgramTitle =
        d.campaign?.title ||
        (d.donationType === "ZAKAT"
          ? "Zakat Penghasilan & Mal"
          : d.donationType === "INFAK_SUBUH"
          ? "Sedekah Subuh Berkah"
          : d.donationType === "WAKAF"
          ? "Wakaf Produktif YGSM"
          : "Sedekah Umum YGSM");

      return {
        id: d.id,
        no: skip + index + 1,
        invoiceId: d.invoiceId,
        donorName: d.isAnonymous ? "Hamba Allah" : d.donorName,
        amount: d.amount,
        programTitle: effectiveProgramTitle,
        campaignSlug: d.campaign?.slug || "",
        paymentChannel: d.paymentChannel || "QRIS",
        date: (d.paidAt || d.createdAt).toISOString(),
        status: d.status,
      };
    });

    const totalPages = Math.ceil(filteredCount / pageLimit);

    return {
      metrics: {
        totalNominal,
        totalTransactions,
        totalPrograms,
      },
      items,
      pagination: {
        total: filteredCount,
        totalPages,
        currentPage,
        limit: pageLimit,
      },
    };
  } catch (error) {
    console.error("Error getDonorHistory in donorService:", error);
    throw error;
  }
}

export async function getDonorProfile({ userEmail, userId }) {
  if (!userEmail && !userId) {
    throw new Error("Identitas pengguna tidak ditemukan.");
  }

  try {
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(userEmail ? [{ email: userEmail.trim().toLowerCase() }] : []),
          ...(userId ? [{ id: userId }] : []),
        ],
      },
    });

    if (!user && userEmail) {
      const demoMatch = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === userEmail.trim().toLowerCase()
      );

      if (demoMatch) {
        user = await prisma.user.create({
          data: {
            id: demoMatch.id,
            name: demoMatch.name,
            email: demoMatch.email,
            username: demoMatch.username,
            role: demoMatch.role,
            title: demoMatch.title,
            phone: demoMatch.phone,
            avatar: demoMatch.avatar,
            salutation: demoMatch.salutation || "Bpk.",
            bio: "Mewujudkan generasi qur'ani mandiri dan berdaya saing.",
            city: "Bandung",
            address: "Jl. Riau No. 45, Bandung, Jawa Barat",
            coverImage:
              "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
            bankName: "BSI (Bank Syariah Indonesia)",
            bankAccount: "7123456789",
            bankAccountName: "Hendra Wijaya",
          },
        });
      }
    }

    if (!user) {
      throw new Error("Pengguna tidak ditemukan di database.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      title: user.title || "Donatur Terdaftar",
      salutation: user.salutation || "Bpk.",
      phone: user.phone || "",
      avatar: user.avatar || "",
      bio: user.bio || "",
      city: user.city || "",
      address: user.address || "",
      coverImage: user.coverImage || "",
      bankName: user.bankName || "",
      bankAccount: user.bankAccount || "",
      bankAccountName: user.bankAccountName || "",
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error getDonorProfile in donorService:", error);
    throw error;
  }
}

export async function updateDonorProfile({ userEmail, profileData }) {
  if (!userEmail) {
    throw new Error("Email pengguna diperlukan.");
  }

  const cleanEmail = userEmail.trim().toLowerCase();

  const updatePayload = {};

  if (profileData.salutation !== undefined) {
    updatePayload.salutation = sanitizeInput(profileData.salutation);
  }
  if (profileData.name !== undefined) {
    const cleanName = sanitizeInput(profileData.name);
    if (!cleanName) throw new Error("Nama lengkap tidak boleh kosong.");
    updatePayload.name = cleanName;
  }
  if (profileData.bio !== undefined) {
    updatePayload.bio = sanitizeInput(profileData.bio);
  }
  if (profileData.city !== undefined) {
    updatePayload.city = sanitizeInput(profileData.city);
  }
  if (profileData.address !== undefined) {
    updatePayload.address = sanitizeInput(profileData.address);
  }
  if (profileData.phone !== undefined) {
    updatePayload.phone = sanitizeInput(profileData.phone);
  }
  if (profileData.bankName !== undefined) {
    updatePayload.bankName = sanitizeInput(profileData.bankName);
  }
  if (profileData.bankAccount !== undefined) {
    updatePayload.bankAccount = sanitizeInput(profileData.bankAccount);
  }
  if (profileData.bankAccountName !== undefined) {
    updatePayload.bankAccountName = sanitizeInput(profileData.bankAccountName);
  }
  if (profileData.coverImage !== undefined) {
    updatePayload.coverImage = sanitizeInput(profileData.coverImage);
  }
  if (profileData.avatar !== undefined) {
    updatePayload.avatar = sanitizeInput(profileData.avatar);
  }

  try {
    const updated = await prisma.user.update({
      where: { email: cleanEmail },
      data: updatePayload,
    });

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      username: updated.username,
      role: updated.role,
      title: updated.title,
      salutation: updated.salutation,
      phone: updated.phone,
      avatar: updated.avatar,
      bio: updated.bio,
      city: updated.city,
      address: updated.address,
      coverImage: updated.coverImage,
      bankName: updated.bankName,
      bankAccount: updated.bankAccount,
      bankAccountName: updated.bankAccountName,
      updatedAt: updated.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error updateDonorProfile in donorService:", error);
    throw error;
  }
}

export async function updateDonorPassword({ userEmail, oldPassword, newPassword }) {
  if (!userEmail) {
    throw new Error("Email pengguna diperlukan.");
  }
  if (!newPassword || newPassword.length < 6) {
    throw new Error("Kata sandi baru minimal 6 karakter.");
  }

  const cleanEmail = userEmail.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });

  if (!user) {
    throw new Error("Pengguna tidak ditemukan.");
  }

  if (user.passwordHash && oldPassword) {
    const isValid = verifyPassword(oldPassword, user.passwordHash);
    if (!isValid) {
      throw new Error("Kata sandi saat ini tidak cocok.");
    }
  }

  const newHash = hashPassword(newPassword);

  await prisma.user.update({
    where: { email: cleanEmail },
    data: { passwordHash: newHash },
  });

  return { success: true, message: "Kata sandi berhasil diperbarui." };
}
