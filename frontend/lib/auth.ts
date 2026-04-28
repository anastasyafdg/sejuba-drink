// lib/auth.ts - Helper untuk mengelola session penjual di localStorage

export interface PenjualSession {
    id: number;
    nama: string;
    email: string;
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
}

export function clearSession(): void {
    localStorage.removeItem("penjual");
}
