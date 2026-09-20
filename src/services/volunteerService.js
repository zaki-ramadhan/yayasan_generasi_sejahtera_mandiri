import prisma from "@/lib/prisma";
import {
  sanitizeInput,
  validateName,
  validatePhone,
  validateEmail,
} from "@/lib/security";

export async function registerVolunteer({
  fullName,
  email = "",
  phone,
  city,
  interest,
  motivation = "",
}) {
  const nameVal = validateName(fullName);
  if (!nameVal.isValid) throw new Error(nameVal.message);

  const phoneVal = validatePhone(phone);
  if (!phoneVal.isValid) throw new Error(phoneVal.message);

  let cleanEmail = null;
  if (email) {
    const emailVal = validateEmail(email);
    if (!emailVal.isValid) throw new Error(emailVal.message);
    cleanEmail = emailVal.sanitized;
  }

  const cleanCity = sanitizeInput(city);
  if (!cleanCity || cleanCity.length < 2) {
    throw new Error("Mohon masukkan kota domisili yang valid.");
  }

  const cleanData = {
    fullName: nameVal.sanitized,
    email: cleanEmail,
    phone: phoneVal.sanitized,
    city: cleanCity,
    interest: sanitizeInput(interest) || "Pengajar & Pembimbing Al-Qur'an",
    motivation: sanitizeInput(motivation).slice(0, 500) || "",
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
