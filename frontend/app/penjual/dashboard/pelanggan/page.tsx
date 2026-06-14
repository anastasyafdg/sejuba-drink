"use client";

import { useState, useMemo, useEffect } from "react";

/* ── Types ── */
interface Pembeli {
    id: number;
    nama: string;
    email: string;
    no_telepon: string;
    total_pesanan: number;
}

/* ── Design Tokens ── */
const DK     = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD   = "0 2px 16px rgba(27,67,50,0.07)";

const AVATAR_COLORS = ["#52b788", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
function avatarColor(name: string) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

/* ── Stat Card ── */
function StatCard({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
    return (
        <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${BORDER}`, boxShadow: CARD, padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 130 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
            <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: DK, lineHeight: 1.1, fontFamily: "'Poppins', sans-serif" }}>{value}</div>
                <div style={{ fontSize: 11, color: "#74a78a", fontWeight: 600, marginTop: 2 }}>{label}</div>
            </div>
        </div>
    );
}

/* ── Skeleton Row ── */
function SkeletonRow() {
    return (
        <tr>
            {[70, 180, 160, 130].map((w, i) => (
                <td key={i} style={{ padding: "14px 16px", borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ height: 14, width: w, borderRadius: 6, background: "linear-gradient(90deg,#e9f5ee 25%,#d1ead9 50%,#e9f5ee 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.2s infinite" }} />
                </td>
            ))}
        </tr>
    );
}

/* ── Main Page ── */
export default function PelangganPage() {
    const [pembeli, setPembeli] = useState<Pembeli[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);
    const [search, setSearch]   = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/penjual/pembeli")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(json => {
                if (json.success) setPembeli(json.data);
                else throw new Error("Response tidak berhasil");
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() =>
        pembeli.filter(p =>
            p.nama.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase()) ||
            p.no_telepon.includes(search)
        ), [pembeli, search]);

    return (
        <>
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: DK, margin: 0 }}>Manajemen Pembeli</h2>
                <p style={{ fontSize: 13, color: "#74a78a", margin: "4px 0 0", fontWeight: 500 }}>
                    {loading ? "Memuat data..." : `${pembeli.length} pembeli terdaftar`}
                </p>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
                <StatCard icon="👥" value={pembeli.length} label="Total Pembeli" color="#52b788" />
            </div>

            {/* Error Banner */}
            {error && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", marginBottom: 18, color: "#dc2626", fontSize: 13 }}>
                    ⚠️ Gagal memuat data pembeli: <strong>{error}</strong>
                </div>
            )}

            {/* Search */}
            <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${BORDER}`, boxShadow: CARD, padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", flex: 1 }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#9ca3af" }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Cari nama, email, atau telepon..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 10, border: "1.5px solid #e4f2ea", fontSize: 13, outline: "none", fontFamily: "'Poppins', sans-serif", boxSizing: "border-box" }}
                    />
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${BORDER}`, boxShadow: CARD, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
                        <thead>
                            <tr style={{ background: `linear-gradient(90deg, ${DK}, #2d6a4f)` }}>
                                {["ID", "Nama Pembeli", "Email", "No. Telepon"].map(h => (
                                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [1,2,3,4].map(i => <SkeletonRow key={i} />)
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: 48, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                                        👥 Tidak ada pembeli ditemukan
                                    </td>
                                </tr>
                            ) : filtered.map((p, idx) => {
                                const ac = avatarColor(p.nama);
                                return (
                                    <tr
                                        key={p.id}
                                        style={{ background: idx % 2 === 0 ? "#fff" : "#f9fdfa", transition: "background 0.15s" }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(82,183,136,0.04)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f9fdfa")}
                                    >
                                        {/* ID */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", fontFamily: "'Poppins', sans-serif" }}>#{p.id}</span>
                                        </td>

                                        {/* Nama Pembeli */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 34, height: 34, borderRadius: "50%", background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                                                    {p.nama.charAt(0).toUpperCase()}
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: DK, whiteSpace: "nowrap" }}>{p.nama}</span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>
                                            {p.email}
                                        </td>

                                        {/* No. Telepon */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>
                                            {p.no_telepon || "-"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={{ padding: "13px 18px", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9fdfa" }}>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>
                        {loading ? "Memuat..." : `Menampilkan ${filtered.length} dari ${pembeli.length} pembeli`}
                    </span>
                </div>
            </div>
        </>
    );
}
