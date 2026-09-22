import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

export const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000];

export const DAYS_OF_WEEK = [
  { id: "senin", label: "Senin" },
  { id: "selasa", label: "Selasa" },
  { id: "rabu", label: "Rabu" },
  { id: "kamis", label: "Kamis" },
  { id: "jumat", label: "Jumat" },
  { id: "sabtu", label: "Sabtu" },
  { id: "minggu", label: "Minggu" },
];

export const FREQUENCY_OPTIONS = [
  { value: "DAILY", label: "Setiap Hari" },
  { value: "WEEKLY", label: "Setiap Pekan (Pilih Hari)" },
  { value: "MONTHLY", label: "Setiap Bulan (Pilih Tanggal)" },
];

export const ROUTINE_TYPE_OPTIONS = [
  {
    value: "REMINDER_ONLY",
    title: "Pengingat WhatsApp Saja",
    desc: "Sistem hanya mengirim pengingat ke WA saat jadwal tiba (tidak membuat invoice tagihan).",
  },
  {
    value: "AUTO_DONATION",
    title: "Donasi Otomatis (Auto-Invoice)",
    desc: "Sistem otomatis membuatkan invoice & link QRIS siap bayar yang langsung dikirimkan ke WA.",
  },
];

export function normalizeFrequency(freq) {
  if (freq === "DAILY_SUBUH" || freq === "DAILY") return "DAILY";
  if (freq === "WEEKLY_FRIDAY" || freq === "WEEKLY") return "WEEKLY";
  if (freq === "MONTHLY_PAYDAY" || freq === "MONTHLY") return "MONTHLY";
  return "DAILY";
}

export function formatRoutineSchedule(item) {
  if (!item) return "Setiap Hari";
  const freq = normalizeFrequency(item.frequency);

  if (freq === "DAILY") {
    return "Setiap Hari";
  }

  if (freq === "WEEKLY") {
    const dayObj = DAYS_OF_WEEK.find((d) => d.id === (item.selectedDay || "jumat"));
    const dayLabel = dayObj ? dayObj.label : "Jumat";
    return `Setiap Pekan (${dayLabel})`;
  }

  if (freq === "MONTHLY") {
    let dateStr = "1";
    if (item.monthlyDate) {
      try {
        dateStr = format(new Date(item.monthlyDate), "d MMMM", { locale: idLocale });
      } catch {
        dateStr = "1";
      }
    }
    return `Setiap Bulan (Tgl ${dateStr})`;
  }

  return "Setiap Hari";
}
