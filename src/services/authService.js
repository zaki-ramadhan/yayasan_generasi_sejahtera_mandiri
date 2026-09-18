// Authentication Service with Multi-Role Role-Based Access Control (RBAC)

export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  FINANCE: "FINANCE",
  VOLUNTEER: "VOLUNTEER",
  DONOR: "DONOR",
};

export const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin (Ketua Yayasan)",
  ADMIN: "Admin Program & Penyaluran",
  FINANCE: "Finance & Bendahara",
  VOLUNTEER: "Relawan Lapangan",
  DONOR: "Donatur / Muzakki",
};

export const DEMO_USERS = [
  {
    id: "USR-001",
    name: "Drs. H. M. Fauzan, M.Pd",
    username: "superadmin",
    email: "superadmin@ygsm.or.id",
    role: USER_ROLES.SUPER_ADMIN,
    title: "Ketua Dewan Pengurus Yayasan",
    phone: "0811-2233-4455",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "HF",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
  },
  {
    id: "USR-002",
    name: "Ust. Rian Ramadhan",
    username: "admin.program",
    email: "admin.program@ygsm.or.id",
    role: USER_ROLES.ADMIN,
    title: "Kepala Divisi Program & Operasional",
    phone: "0812-3344-5566",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    initials: "RR",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
  },
  {
    id: "USR-003",
    name: "Hj. Annisa Fitriani, S.E., Ak.",
    username: "finance",
    email: "finance@ygsm.or.id",
    role: USER_ROLES.FINANCE,
    title: "Bendahara & Rekonsiliasi ZISWAF",
    phone: "0813-4455-6677",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    initials: "AF",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  {
    id: "USR-004",
    name: "Bagas Pratama",
    username: "bagas.relawan",
    email: "bagas.relawan@gmail.com",
    role: USER_ROLES.VOLUNTEER,
    title: "Koordinator Relawan Aksi Lapangan",
    phone: "0857-1122-3344",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    initials: "BP",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "USR-005",
    name: "H. Hendra Wijaya",
    username: "hendra.donatur",
    email: "hendra.donatur@gmail.com",
    role: USER_ROLES.DONOR,
    title: "Muzakki & Donatur Tetap",
    phone: "0818-9988-7766",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    initials: "HW",
    badgeColor: "bg-cyan-100 text-cyan-900 border-cyan-300",
  },
];

const AUTH_STORAGE_KEY = "ygsm_auth_session";
const REMEMBER_KEY = "ygsm_remember_identifier";

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("ygsm_auth_change"));
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("ygsm_auth_change"));
}

export function getRememberedIdentifier() {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(REMEMBER_KEY) || "";
  } catch {
    return "";
  }
}

export function setRememberedIdentifier(identifier) {
  if (typeof window === "undefined") return;
  try {
    if (identifier) {
      localStorage.setItem(REMEMBER_KEY, identifier);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
  } catch {}
}

export function findUserByIdentifier(identifier) {
  if (!identifier) return null;
  const clean = identifier.trim().toLowerCase();
  return DEMO_USERS.find(
    (u) =>
      u.email.toLowerCase() === clean ||
      (u.username && u.username.toLowerCase() === clean)
  );
}

export function getRedirectPathForRole(role) {
  return "/dashboard";
}
