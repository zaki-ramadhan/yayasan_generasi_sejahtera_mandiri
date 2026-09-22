/**
 * Data master ketentuan batas minimum dan maksimum transaksi donasi.
 * Hanya menautkan logo yang benar-benar tersedia di direktori aset publik.
 */

export const VA_TRANSACTION_LIMITS = [
  {
    id: "va-bri",
    name: "VA BRI",
    description: "BRImo, ATM BRI, AgenBRILink",
    logo: "/img/payments/BRI.png",
    minAmount: 10000,
    maxAmount: 50000000,
  },
  {
    id: "va-bni",
    name: "VA BNI",
    description: "BNI Mobile Banking, ATM BNI",
    logo: "/img/payments/BNI.png",
    minAmount: 10000,
    maxAmount: 50000000,
  },
  {
    id: "va-permata",
    name: "VA Permata",
    description: "PermataMobile X, ATM Permata, Transfer Antar Bank",
    logo: "/img/payments/permata.png",
    minAmount: 10000,
    maxAmount: 9999999999,
  },
  {
    id: "va-mandiri",
    name: "VA Mandiri",
    description: "Livin' by Mandiri, ATM Mandiri",
    logo: "/img/payments/mandiri.png",
    minAmount: 10000,
    maxAmount: 50000000,
  },
];

export const EWALLET_QRIS_TRANSACTION_LIMITS = [
  {
    id: "qris-nasional",
    name: "QRIS",
    description: "Standar Bank Indonesia (Seluruh M-Banking & Dompet Digital)",
    logo: "/img/payments/qris.png",
    minAmount: 10000,
    maxAmount: 20000000,
  },
  {
    id: "gopay",
    name: "GoPay",
    description: "Aplikasi GoPay & Gojek",
    logo: "/img/payments/gopay.png",
    minAmount: 10000,
    maxAmount: 20000000,
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    description: "Aplikasi Shopee & ShopeePay",
    logo: "/img/payments/shopeepay.png",
    minAmount: 10000,
    maxAmount: 20000000,
  },
];
