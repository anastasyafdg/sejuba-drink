"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";

// ── Color tokens ──────────────────────────────────────────
// Primary:   #52b788  (medium green)
// Dark:      #1b4332  (deep green)
// Mid:       #2d6a4f
// Light:     #d8f3dc
// BG:        #f7fbf9
// Text:      #1b4332
// Muted:     #74a78a
// Border:    rgba(82,183,136,0.15)

const STATS = [
    {
        label: "Total Produk",
        value: 30,
        suffix: "item",
        color: "primary" as const,
        change: "+3",
        changeType: "up" as const,
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        iconBg: "rgba(82,183,136,0.12)",
        iconFg: "#2d6a4f",
    },
    {
        label: "Total Pesanan",
        value: 18,
        suffix: "pesanan",
        color: "amber" as const,
        change: "+5",
        changeType: "up" as const,
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
        ),
        iconBg: "rgba(245,158,11,0.12)",
        iconFg: "#b45309",
    },
    {
        label: "Pelanggan",
        value: 10,
        suffix: "orang",
        color: "blue" as const,
        change: "+2",
        changeType: "up" as const,
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        iconBg: "rgba(59,130,246,0.12)",
        iconFg: "#1d4ed8",
    },
];

const RECENT_ORDERS = [
    { id: "ORD-001", pelanggan: "Ahmad Hidayat", produk: "Green Series", total: 45000, status: "selesai", tanggal: "22 Apr 2026" },
    { id: "ORD-002", pelanggan: "Siti Nurhaliza", produk: "Orange Series", total: 35000, status: "proses", tanggal: "22 Apr 2026" },
    { id: "ORD-003", pelanggan: "Budi Santoso", produk: "Red Series", total: 55000, status: "dikirim", tanggal: "21 Apr 2026" },
    { id: "ORD-004", pelanggan: "Dewi Lestari", produk: "Purple Lime", total: 40000, status: "pending", tanggal: "21 Apr 2026" },
    { id: "ORD-005", pelanggan: "Rudi Hermawan", produk: "Yellow Series", total: 50000, status: "selesai", tanggal: "20 Apr 2026" },
    { id: "ORD-006", pelanggan: "Maya Sari", produk: "Blue Lime", total: 38000, status: "selesai", tanggal: "20 Apr 2026" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; dot: string; label: string }> = {
    selesai: { bg: "rgba(82,183,136,0.1)", color: "#1b7a4a", dot: "#52b788", label: "Selesai" },
    proses: { bg: "rgba(245,158,11,0.10)", color: "#92400e", dot: "#f59e0b", label: "Diproses" },
    dikirim: { bg: "rgba(59,130,246,0.10)", color: "#1e40af", dot: "#3b82f6", label: "Dikirim" },
    pending: { bg: "rgba(239,68,68,0.10)", color: "#991b1b", dot: "#ef4444", label: "Pending" },
};

const QUICK_ACTIONS = [
    {
        title: "Tambah Produk",
        desc: "Upload produk baru ke katalog",
        href: "/penjual/dashboard/produk",
        gradient: "linear-gradient(135deg, #52b788, #2d6a4f)",
        shadow: "rgba(82,183,136,0.30)",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        ),
    },
    {
        title: "Kelola Pesanan",
        desc: "Proses & update pesanan masuk",
        href: "/penjual/dashboard/pesanan",
        gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
        shadow: "rgba(245,158,11,0.28)",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        ),
    },
    {
        title: "Lihat Laporan",
        desc: "Analisis penjualan & statistik",
        href: "/penjual/dashboard/laporan",
        gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
        shadow: "rgba(59,130,246,0.28)",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
];

function formatCurrency(n: number) {
    return new Intl.NumberFormat("id-ID").format(n);
}

const PRIMARY = "#52b788";
const DARK = "#1b4332";
const MUTED = "#74a78a";
const BORDER = "rgba(82,183,136,0.15)";
const CARD_SHAD = "0 2px 16px rgba(27,67,50,0.07)";

export default function DashboardPage() {
    const [session, setSession] = useState<{ nama: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const s = getSession();
        if (s) setSession({ nama: s.nama });
        setMounted(true);
    }, []);

    const greeting = (() => {
        const h = new Date().getHours();
        if (h < 12) return "Selamat Pagi";
        if (h < 15) return "Selamat Siang";
        if (h < 18) return "Selamat Sore";
        return "Selamat Malam";
    })();

    return (
        <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease", background: "#f7fbf9", minHeight: "100vh", padding: 0 }}>

            {/* ── Greeting banner ─────────────────────── */}
            <div style={{
                background: "#fff",
                borderRadius: 20, padding: "24px 32px", marginBottom: 24,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                border: "1px solid #e4f2ea",
                boxShadow: "0 2px 16px rgba(82,183,136,0.08)",
            }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1b4332", margin: 0, letterSpacing: "-0.3px" }}>
                        {greeting}, {session?.nama ?? "Penjual"} 👋
                    </h2>
                    <p style={{ fontSize: 13, color: "#74a78a", margin: "6px 0 0" }}>
                        Berikut ringkasan toko Anda hari ini
                    </p>
                </div>
                <div style={{
                    background: "rgba(82,183,136,0.08)", borderRadius: 14,
                    padding: "10px 18px", fontSize: 12, color: "#2d6a4f", fontWeight: 600,
                    border: "1px solid #d0ead9",
                }}>
                    {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
            </div>

            {/* ── Stats Cards ─────────────────────────── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24, maxWidth: 900, margin: "0 auto 24px" }}>
                {STATS.map((stat, i) => (
                    <div key={stat.label} style={{
                        background: "#fff", borderRadius: 18, padding: "22px 24px",
                        border: `1px solid ${BORDER}`, boxShadow: CARD_SHAD,
                        transition: "transform 0.25s, box-shadow 0.25s", cursor: "default",
                        animationDelay: `${i * 0.06}s`,
                    }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(27,67,50,0.12)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = CARD_SHAD;
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div style={{
                                width: 46, height: 46, borderRadius: 13,
                                background: stat.iconBg,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: stat.iconFg,
                            }}>
                                {stat.icon}
                            </div>
                            <div style={{
                                padding: "4px 10px", borderRadius: 20,
                                background: "rgba(82,183,136,0.09)",
                                fontSize: 11, fontWeight: 600, color: "#1b7a4a",
                            }}>
                                ↑ {stat.change}
                            </div>
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: "#1b4332", lineHeight: 1.1, marginBottom: 4, letterSpacing: "-0.03em" }}>
                            {(stat as any).prefix && <span style={{ fontSize: 15, fontWeight: 600, marginRight: 2 }}>{(stat as any).prefix}</span>}
                            {stat.value > 9999 ? formatCurrency(stat.value) : stat.value}
                        </div>
                        <div style={{ fontSize: 11, color: MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Pesanan Terbaru ─────────────────────── */}
            <div style={{
                background: "#fff", borderRadius: 18, border: "1px solid #e4f2ea",
                boxShadow: "0 2px 16px rgba(82,183,136,0.07)", overflow: "hidden", marginBottom: 20,
            }}>
                {/* Header */}
                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "20px 24px 16px",
                    borderBottom: `1px solid ${BORDER}`,
                }}>
                    <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1b4332", margin: 0 }}>Pesanan Terbaru</h3>
                        <p style={{ fontSize: 12, color: "#74a78a", margin: "3px 0 0" }}>6 pesanan terakhir</p>
                    </div>
                    <button style={{
                        fontSize: 12, fontWeight: 600, color: "#2d6a4f",
                        background: "rgba(82,183,136,0.08)", border: "1px solid #d0ead9",
                        padding: "7px 16px", borderRadius: 9, cursor: "pointer",
                        fontFamily: "'Poppins', sans-serif", transition: "all 0.2s",
                    }}>
                        Lihat Semua →
                    </button>
                </div>

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: `linear-gradient(90deg, ${DARK}, #2d6a4f)` }}>
                                {["ID", "Pelanggan", "Produk", "Total", "Status", "Tanggal"].map(h => (
                                    <th key={h} style={{
                                        padding: "13px 20px", textAlign: "left",
                                        fontSize: 11, fontWeight: 700,
                                        color: "rgba(255,255,255,0.9)",
                                        textTransform: "uppercase", letterSpacing: "0.06em",
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_ORDERS.map((order, idx) => {
                                const s = STATUS_STYLES[order.status];
                                return (
                                    <tr key={order.id}
                                        style={{ background: idx % 2 === 0 ? "#fff" : "#f9fdfa", transition: "background 0.15s", cursor: "default" }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(82,183,136,0.05)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f9fdfa")}
                                    >
                                        <td style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700, color: PRIMARY, borderBottom: `1px solid ${BORDER}` }}>{order.id}</td>
                                        <td style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 9,
                                                    background: "linear-gradient(135deg, #d8f3dc, #95d5b2)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: 12, fontWeight: 700, color: DARK, flexShrink: 0,
                                                }}>
                                                    {order.pelanggan[0]}
                                                </div>
                                                <span style={{ fontWeight: 500, fontSize: 13, color: "#374151" }}>{order.pelanggan}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "14px 20px", fontSize: 13, color: "#4b5563", borderBottom: `1px solid ${BORDER}` }}>{order.produk}</td>
                                        <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, color: DARK, borderBottom: `1px solid ${BORDER}` }}>Rp {formatCurrency(order.total)}</td>
                                        <td style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{
                                                display: "inline-flex", alignItems: "center", gap: 6,
                                                padding: "4px 12px", borderRadius: 20,
                                                background: s.bg, color: s.color,
                                                fontSize: 11, fontWeight: 600,
                                            }}>
                                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                                                {s.label}
                                            </span>
                                        </td>
                                        <td style={{ padding: "14px 20px", fontSize: 12, color: MUTED, borderBottom: `1px solid ${BORDER}` }}>{order.tanggal}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Quick Actions ───────────────────────── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {QUICK_ACTIONS.map((action) => (
                    <Link key={action.title} href={action.href} style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "20px 24px", borderRadius: 18,
                        background: "#fff", border: `1px solid ${BORDER}`,
                        boxShadow: CARD_SHAD, cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        textAlign: "left", fontFamily: "'Poppins', sans-serif",
                        textDecoration: "none",
                    }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 28px ${action.shadow}`;
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = CARD_SHAD;
                        }}
                    >
                        <div style={{
                            width: 50, height: 50, borderRadius: 14,
                            background: action.gradient,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", flexShrink: 0,
                            boxShadow: `0 4px 14px ${action.shadow}`,
                        }}>
                            {action.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1b4332", marginBottom: 3 }}>{action.title}</div>
                            <div style={{ fontSize: 12, color: "#74a78a" }}>{action.desc}</div>
                        </div>
                        <div style={{ marginLeft: "auto", color: "rgba(82,183,136,0.4)", fontSize: 22, lineHeight: 1 }}>›</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
