/**
 * Standar acuan syariat zakat nasional & nilai acuan emas (BAZNAS / Antam)
 */
export const ZAKAT_GOLD_NISAB_GRAMS = 85;
export const ZAKAT_RATE = 0.025; // 2.5%

// Harga acuan emas per gram default (dapat disesuaikan di form zakat emas)
export const DEFAULT_GOLD_PRICE_PER_GRAM = 2492965;

// Nisab tahunan default (85 gram * harga emas)
export const DEFAULT_ANNUAL_NISAB = ZAKAT_GOLD_NISAB_GRAMS * DEFAULT_GOLD_PRICE_PER_GRAM; // Rp 211.902.025

// Nisab bulanan default untuk Zakat Penghasilan (Nisab tahunan / 12)
export const DEFAULT_MONTHLY_NISAB = Math.round(DEFAULT_ANNUAL_NISAB / 12); // ~Rp 17.658.502
