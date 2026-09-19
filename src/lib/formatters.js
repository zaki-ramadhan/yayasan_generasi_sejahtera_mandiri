export function formatRupiah(amount) {
  if (typeof amount !== "number" || isNaN(amount)) return "Rp 0";
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

export function formatCompactRupiah(amount, maxDecimals = 1) {
  if (typeof amount !== "number" || isNaN(amount)) return "Rp 0";
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (abs >= 1_000_000_000_000) {
    const val = abs / 1_000_000_000_000;
    const formatted = val.toLocaleString("id-ID", {
      maximumFractionDigits: maxDecimals,
    });
    return `${sign}Rp ${formatted} Triliun`;
  }

  if (abs >= 1_000_000_000) {
    const val = abs / 1_000_000_000;
    const formatted = val.toLocaleString("id-ID", {
      maximumFractionDigits: maxDecimals,
    });
    return `${sign}Rp ${formatted} Miliar`;
  }

  if (abs >= 1_000_000) {
    const val = abs / 1_000_000;
    const formatted = val.toLocaleString("id-ID", {
      maximumFractionDigits: maxDecimals,
    });
    return `${sign}Rp ${formatted} Juta`;
  }

  if (abs >= 1_000) {
    const val = abs / 1_000;
    const formatted = val.toLocaleString("id-ID", {
      maximumFractionDigits: maxDecimals,
    });
    return `${sign}Rp ${formatted} Ribu`;
  }

  return formatRupiah(amount);
}

export function getCompactRupiahParts(amount, maxDecimals = 1) {
  if (typeof amount !== "number" || isNaN(amount) || amount === 0) {
    return { value: 0, unit: "", prefix: "Rp ", decimals: 0, fullFormatted: "Rp 0" };
  }

  const abs = Math.abs(amount);

  if (abs >= 1_000_000_000_000) {
    const val = Number((abs / 1_000_000_000_000).toFixed(maxDecimals));
    return {
      value: val,
      unit: " Triliun",
      prefix: "Rp ",
      decimals: val % 1 !== 0 ? maxDecimals : 0,
      fullFormatted: formatRupiah(amount),
    };
  }

  if (abs >= 1_000_000_000) {
    const val = Number((abs / 1_000_000_000).toFixed(maxDecimals));
    return {
      value: val,
      unit: " Miliar",
      prefix: "Rp ",
      decimals: val % 1 !== 0 ? maxDecimals : 0,
      fullFormatted: formatRupiah(amount),
    };
  }

  if (abs >= 1_000_000) {
    const val = Number((abs / 1_000_000).toFixed(maxDecimals));
    return {
      value: val,
      unit: " Juta",
      prefix: "Rp ",
      decimals: val % 1 !== 0 ? maxDecimals : 0,
      fullFormatted: formatRupiah(amount),
    };
  }

  if (abs >= 1_000) {
    const val = Number((abs / 1_000).toFixed(maxDecimals));
    return {
      value: val,
      unit: " Ribu",
      prefix: "Rp ",
      decimals: val % 1 !== 0 ? maxDecimals : 0,
      fullFormatted: formatRupiah(amount),
    };
  }

  return {
    value: amount,
    unit: "",
    prefix: "Rp ",
    decimals: 0,
    fullFormatted: formatRupiah(amount),
  };
}

export function formatNumber(number) {
  if (typeof number !== "number" || isNaN(number)) return "0";
  return new Intl.NumberFormat("id-ID").format(number);
}

const ID_DAYS = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
];

const ID_MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

const ID_MONTHS_LONG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export function formatDate(dateInput, options = {}) {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "-";

  const { month = "short", withTime = false, withDay = false } = options;
  const dayName = ID_DAYS[date.getDay()];
  const day = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();

  const monthName = month === "long" ? ID_MONTHS_LONG[monthIdx] : ID_MONTHS_SHORT[monthIdx];
  let formatted = `${day} ${monthName} ${year}`;

  if (withDay) {
    formatted = `${dayName}, ${formatted}`;
  }

  if (withTime) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    formatted += `, ${hours}:${minutes} WIB`;
  }

  return formatted;
}

export function calculateProgress(collectedAmount, targetAmount) {
  if (!targetAmount || targetAmount <= 0) return 0;
  const percentage = (collectedAmount / targetAmount) * 100;
  return Math.round(percentage);
}

export function calculateDaysLeft(endDateInput) {
  if (!endDateInput) return 0;
  const targetDate = new Date(endDateInput);
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function formatCompactNumber(num) {
  if (typeof num !== "number" || isNaN(num)) return "0";
  const abs = Math.abs(num);
  if (abs >= 1_000_000_000) {
    const val = num / 1_000_000_000;
    return `${val % 1 === 0 ? val : val.toFixed(1)}B`;
  }
  if (abs >= 1_000_000) {
    const val = num / 1_000_000;
    return `${val % 1 === 0 ? val : val.toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    const val = num / 1_000;
    return `${val % 1 === 0 ? val : val.toFixed(1)}K`;
  }
  return String(num);
}

