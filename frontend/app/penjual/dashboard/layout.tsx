"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function HomeIcon({ active }: { active?: boolean }) {
    const c = active ? "#fff" : "#4a7c59";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}
function ProductIcon({ active }: { active?: boolean }) {
    const c = active ? "#fff" : "#4a7c59";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
    );
}
function ContentIcon({ active }: { active?: boolean }) {
    const c = active ? "#fff" : "#4a7c59";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    );
}
function OrderIcon({ active }: { active?: boolean }) {
    const c = active ? "#fff" : "#4a7c59";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    );
}
function CustomerIcon({ active }: { active?: boolean }) {
    const c = active ? "#fff" : "#4a7c59";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
function ReportIcon({ active }: { active?: boolean }) {
    const c = active ? "#fff" : "#4a7c59";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
    );
}

const menuItems = [
    { label: "Dashboard", href: "/penjual/dashboard", icon: HomeIcon },
    { label: "Produk", href: "/penjual/dashboard/produk", icon: ProductIcon },
    { label: "Konten", href: "/penjual/dashboard/konten", icon: ContentIcon },
    { label: "Pesanan", href: "/penjual/dashboard/pesanan", icon: OrderIcon },
    { label: "Pelanggan", href: "/penjual/dashboard/pelanggan", icon: CustomerIcon },
    { label: "Laporan", href: "/penjual/dashboard/laporan", icon: ReportIcon },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [penjual, setPenjual] = useState<{ nama: string; email?: string } | null>(null);

    useEffect(() => {
        const storedPenjual = localStorage.getItem("penjual");
        if (!storedPenjual) {
            router.push("/penjual/login");
        } else {
            setPenjual(JSON.parse(storedPenjual));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("penjual");
        router.push("/penjual/login");
    };

    if (!penjual) return null;

    const isActive = (href: string) =>
        href === "/penjual/dashboard"
            ? pathname === href
            : pathname === href || pathname.startsWith(href + "/");

    return (
        <div style={{ minHeight: "100vh", display: "flex", background: "#f4f9f6", fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}>
            {/* ===== SIDEBAR ===== */}
            <aside style={{
                width: 230, background: "#fff",
                display: "flex", flexDirection: "column",
                position: "fixed", height: "100vh", zIndex: 30,
                boxShadow: "4px 0 20px rgba(82,183,136,0.10), 1px 0 0 #e4f2ea",
                borderRight: "1px solid #e4f2ea",
            }}>
                {/* Menu label */}
                {/* Sidebar logo */}
                <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #e4f2ea" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                        <div>
                            <Image
                                src="/images/logo/logo-sejuba.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                style={{ borderRadius: 10 }}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ padding: "16px 20px 8px" }}>
                    <span style={{
                        fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5,
                        color: "#a8c5b2", fontWeight: 700,
                    }}>
                        Menu Utama
                    </span>
                </div>

                {/* Nav links */}
                <nav style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 12px", flex: 1 }}>
                    {menuItems.map((item) => {
                        const ItemIcon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: "flex", alignItems: "center", gap: 12,
                                    padding: "11px 14px", borderRadius: 12,
                                    fontSize: 13.5, fontWeight: active ? 600 : 500,
                                    textDecoration: "none",
                                    color: active ? "#fff" : "#4b7a5f",
                                    background: active
                                        ? "linear-gradient(135deg, #52b788, #2d6a4f)"
                                        : "transparent",
                                    boxShadow: active ? "0 4px 14px rgba(82,183,136,0.35)" : "none",
                                    transition: "all 0.2s",
                                }}
                            >
                                <span style={{ display: "flex" }}>
                                    <ItemIcon active={active} />
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom spacer */}
                <div style={{ flex: 1 }} />
                <div style={{ padding: "16px 20px", borderTop: "1px solid #e4f2ea" }}>
                    <p style={{ fontSize: 11, color: "#a8c5b2", margin: 0, textAlign: "center" }}>v1.0.0 — Sejuba Drink</p>
                </div>
            </aside>

            {/* ===== MAIN AREA ===== */}
            <div style={{ flex: 1, marginLeft: 230, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                {/* Top Header/Navbar */}
                <header style={{
                    position: "sticky", top: 0, zIndex: 20,
                    background: "#fff", borderBottom: "1px solid #e4f2ea",
                    padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "flex-end",
                    boxShadow: "0 2px 12px rgba(82,183,136,0.06)",
                }}>

                    {/* Kanan: user info + logout */}
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        {/* Nama & role */}
                        <div style={{ textAlign: "right" }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "#1b4332", margin: 0, lineHeight: 1.2 }}>
                                {penjual.nama || "Admin Sejuba"}
                            </p>
                            <p style={{ fontSize: 11, color: "#52b788", margin: 0, fontWeight: 500 }}></p>
                        </div>

                        {/* Avatar circle */}
                        <div style={{
                            width: 40, height: 40, borderRadius: "50%",
                            background: "linear-gradient(135deg, #d8f3dc, #b7e4c7)",
                            border: "2px solid #52b788",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#1b4332", fontSize: 14, fontWeight: 700,
                        }}>
                            {penjual.nama ? penjual.nama.charAt(0).toUpperCase() : "A"}
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                background: "#52b788",
                                color: "#fff", border: "none", borderRadius: 10,
                                padding: "10px 20px", fontSize: 13, fontWeight: 600,
                                cursor: "pointer", transition: "all 0.2s",
                                boxShadow: "0 4px 12px rgba(82,183,136,0.3)",
                                fontFamily: "'Poppins', sans-serif",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = "#2d6a4f";
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(82,183,136,0.4)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = "#52b788";
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(82,183,136,0.3)";
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main style={{ flex: 1, padding: "28px 32px" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
