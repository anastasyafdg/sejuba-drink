// lib/auth.ts - Helper untuk mengelola session penjual & pembeli

// ============================================================
//  PENJUAL SESSION
// ============================================================

export interface PenjualSession {
    id: number;
    nama: string;
    email: string;
}

const PENJUAL_COOKIE = "penjual_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 jam

function setCookie(name: string, value: string, maxAge: number): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(name: string): void {
    document.cookie = `${name}=; path=/; max-age=0`;
}

export function getSession(): PenjualSession | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("penjual");
    if (!stored) return null;
    try {
        return JSON.parse(stored) as PenjualSession;
    } catch {
        return null;
    }
}

export function setSession(data: PenjualSession): void {
    localStorage.setItem("penjual", JSON.stringify(data));
    setCookie(PENJUAL_COOKIE, JSON.stringify({ id: data.id, nama: data.nama }), COOKIE_MAX_AGE);
}

export function clearSession(): void {
    localStorage.removeItem("penjual");
    deleteCookie(PENJUAL_COOKIE);
}

// ============================================================
//  PEMBELI SESSION
// ============================================================

export interface PembeliSession {
    id_pembeli: number;
    nama_pembeli: string;
    email: string;
    no_telepon: string;
}

const PEMBELI_COOKIE = "pembeli_session";

export function getPembeliSession(): PembeliSession | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("pembeli");
    if (!stored) return null;
    try {
        return JSON.parse(stored) as PembeliSession;
    } catch {
        return null;
    }
}

export function setPembeliSession(data: PembeliSession): void {
    // Simpan ke localStorage (client-side)
    localStorage.setItem("pembeli", JSON.stringify(data));
    // Simpan ke cookie (untuk middleware Next.js server-side)
    setCookie(PEMBELI_COOKIE, JSON.stringify({ id: data.id_pembeli, nama: data.nama_pembeli }), COOKIE_MAX_AGE);
}

export function clearPembeliSession(): void {
    localStorage.removeItem("pembeli");
    deleteCookie(PEMBELI_COOKIE);
}
