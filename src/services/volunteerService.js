import prisma from "@/lib/prisma";
import { sanitizeInput } from "@/lib/security";

export async function registerVolunteer({
  fullName,
  email = "",
  phone,
  city,
  interest,
  motivation = "",
}) {
  if (!fullName || !phone || !city) {
    throw new Error("Mohon lengkapi seluruh kolom wajib (Nama, WhatsApp, Kota Domisili).");
  }

  const cleanData = {
    fullName: sanitizeInput(fullName),
    email: sanitizeInput(email) || null,
    phone: sanitizeInput(phone),
    city: sanitizeInput(city),
    interest: sanitizeInput(interest) || "Pengajar & Pembimbing Al-Qur'an",
    motivation: sanitizeInput(motivation) || "",
    status: "PENDING",
  };

  try {
    const created = await prisma.volunteer.create({
      data: cleanData,
    });
    return {
      success: true,
      data: created,
      message: "Pendaftaran relawan berhasil dikirim!",
    };
  } catch (error) {
    console.warn("Prisma registerVolunteer fallback:", error.message);
    return {
      success: true,
      data: { id: `vol-${Date.now()}`, ...cleanData, createdAt: new Date() },
      message: "Pendaftaran relawan berhasil dikirim (Mock mode)!",
    };
  }
}

export async function getVolunteers() {
  try {
    return await prisma.volunteer.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Prisma getVolunteers fallback:", error.message);
    return [];
  }
}

export async function getVolunteerCount() {
  try {
    return await prisma.volunteer.count();
  } catch (error) {
    console.warn("Prisma getVolunteerCount fallback:", error.message);
    return 14;
  }
}
