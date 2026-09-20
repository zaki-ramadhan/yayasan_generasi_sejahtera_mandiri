/**
 * Menghapus seluruh karakter emoji, simbol piktografik, dan modifikator Unicode.
 */
export function stripEmojis(input) {
  if (typeof input !== "string") return "";
  return input.replace(
    /[\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Modifier_Base}\uFE0F\u200D]/gu,
    ""
  );
}

/**
 * Sanitasi teks umum (pembersihan tag HTML, simbol berbahaya, dan emoji).
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  const noEmoji = stripEmojis(input);
  return noEmoji
    .replace(/<[^>]*>?/gm, "")
    .replace(/[&<>"']/g, (match) => {
      const escapeMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
      };
      return escapeMap[match] || match;
    })
    .trim();
}

/**
 * Sanitasi input nama orang/donatur (hanya alfabet, spasi, titik, koma, petik, strip; tanpa emoji/angka).
 */
export function sanitizeName(input) {
  if (typeof input !== "string") return "";
  return stripEmojis(input)
    .replace(/<[^>]*>?/gm, "")
    .replace(/[^a-zA-ZÀ-ÿ\s.,'\-]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 60);
}

/**
 * Validasi nama lengkap.
 */
export function validateName(name, isAnonymous = false) {
  if (isAnonymous) {
    return { isValid: true, valid: true, message: "", error: "", sanitized: "Hamba Allah" };
  }
  const clean = sanitizeName(name).trim();
  if (!clean || clean.length < 2) {
    const msg = "Nama lengkap minimal 2 karakter dan hanya boleh berisi huruf serta tanda baca gelar/nama wajar.";
    return { isValid: false, valid: false, message: msg, error: msg };
  }
  if (clean.length > 60) {
    const msg = "Nama lengkap maksimal 60 karakter.";
    return { isValid: false, valid: false, message: msg, error: msg };
  }
  return { isValid: true, valid: true, message: "", error: "", sanitized: clean };
}

/**
 * Sanitasi nomor HP/WhatsApp (hanya angka digit, maksimal 15 digit).
 */
export function sanitizePhone(input) {
  if (typeof input !== "string") return "";
  return stripEmojis(input).replace(/\D/g, "").slice(0, 15);
}

/**
 * Validasi nomor HP/WhatsApp Indonesia (diawali 08 atau 628, panjang 10-14 digit).
 */
export function validatePhone(phone) {
  const digits = sanitizePhone(phone);
  if (!digits) {
    const msg = "Nomor WhatsApp aktif wajib diisi.";
    return { isValid: false, valid: false, message: msg, error: msg };
  }
  // Format nomor seluler Indonesia: diawali 08 atau 628 dengan digit ke-3 dari 1-9
  const isIndonesianFormat = /^(08|628)[1-9][0-9]{7,12}$/.test(digits);
  if (!isIndonesianFormat) {
    const msg = "Nomor WhatsApp tidak valid. Masukkan nomor seluler Indonesia yang aktif (contoh: 08123456789, 10-14 digit).";
    return { isValid: false, valid: false, message: msg, error: msg };
  }
  return { isValid: true, valid: true, message: "", error: "", sanitized: digits };
}

/**
 * Sanitasi alamat email (tanpa spasi, tanpa emoji, lowercase, maksimal 100 karakter).
 */
export function sanitizeEmail(input) {
  if (typeof input !== "string") return "";
  return stripEmojis(input).replace(/\s/g, "").slice(0, 100);
}

/**
 * Validasi alamat email standar.
 */
export function validateEmail(email, isRequired = false) {
  const clean = sanitizeEmail(email).trim().toLowerCase();
  if (!clean) {
    if (isRequired) {
      const msg = "Alamat email wajib diisi.";
      return { isValid: false, valid: false, message: msg, error: msg };
    }
    return { isValid: true, valid: true, message: "", error: "", sanitized: "" };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) {
    const msg = "Format alamat email tidak valid (contoh: nama@email.com).";
    return { isValid: false, valid: false, message: msg, error: msg };
  }
  return { isValid: true, valid: true, message: "", error: "", sanitized: clean };
}

/**
 * Sanitasi doa atau pesan donatur (tanpa emoji, tanpa tag HTML, maksimal 200 karakter).
 */
export function sanitizePrayer(input) {
  if (typeof input !== "string") return "";
  return stripEmojis(input)
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 200);
}

export function generateIdempotencyKey() {
  return "idemp_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 9);
}

export const DONATION_LIMITS = {
  MIN_AMOUNT: 10000,
  MAX_AMOUNT: 100000000,
};

export function validateDonationAmount(amount) {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount < DONATION_LIMITS.MIN_AMOUNT) {
    return {
      isValid: false,
      message: `Nominal donasi minimal Rp ${new Intl.NumberFormat("id-ID").format(DONATION_LIMITS.MIN_AMOUNT)}`,
    };
  }
  if (numericAmount > DONATION_LIMITS.MAX_AMOUNT) {
    return {
      isValid: false,
      message: `Nominal donasi maksimal Rp ${new Intl.NumberFormat("id-ID").format(DONATION_LIMITS.MAX_AMOUNT)}`,
    };
  }
  return { isValid: true, message: "" };
}
