// lib/auth.ts - Helper untuk mengelola session penjual di localStorage + cookie

export interface PenjualSession {
    id: number;
    nama: string;
    email: string;
}

// ── Cookie helpers (dibaca oleh Next.js middleware di server-side) ──────────

const COOKIE_NAME = "penjual_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 jam

function setCookie(value: string, maxAge: number): void {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(): void {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

// ── Session helpers ──────────────────────────────────────────────────────────

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
    // Simpan ke localStorage (untuk dipakai komponen client-side)
    localStorage.setItem("penjual", JSON.stringify(data));

    // Simpan ke cookie (untuk dipakai Next.js middleware server-side)
    setCookie(JSON.stringify({ id: data.id, nama: data.nama }), COOKIE_MAX_AGE);
}

export function clearSession(): void {
    localStorage.removeItem("penjual");
    deleteCookie();
}
