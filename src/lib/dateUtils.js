import { formatDate } from "@/lib/formatters";

/**
 * Returns a YYYY-MM-DD key string in WIB timezone from a date input.
 */
export function getDateKey(dateInput) {
  if (!dateInput) return "unknown";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "unknown";
  const wib = new Date(date.getTime() + (7 * 60 + date.getTimezoneOffset()) * 60000);
  const y = wib.getFullYear();
  const m = String(wib.getMonth() + 1).padStart(2, "0");
  const d = String(wib.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns a human-readable date badge label (Hari Ini / Kemarin / tanggal panjang).
 */
export function getDateBadgeLabel(dateInput) {
  if (!dateInput) return "Lainnya";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Lainnya";

  const now = new Date();
  const nowWIB = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
  const targetWIB = new Date(date.getTime() + (7 * 60 + date.getTimezoneOffset()) * 60000);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const yesterdayWIB = new Date(nowWIB);
  yesterdayWIB.setDate(yesterdayWIB.getDate() - 1);

  if (isSameDay(targetWIB, nowWIB)) return "Hari Ini";
  if (isSameDay(targetWIB, yesterdayWIB)) return "Kemarin";
  return formatDate(date, { month: "long", withDay: true });
}
