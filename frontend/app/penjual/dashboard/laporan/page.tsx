"use client";

import { useState } from "react";

/* ── Helpers ── */
const P      = "#52b788";
const DK     = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD   = "0 2px 16px rgba(27,67,50,0.07)";

function formatRp(n: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

/* ── Data per bulan ── */
type BulanKey = "Jan" | "Feb" | "Mar" | "Apr" | "Mei" | "Jun";

const DATA_BULANAN: Record<BulanKey, { pendapatan: number; pesanan: number; produkTerlaris: string }> = {
    Jan: { pendapatan: 3200000, pesanan: 80,  produkTerlaris: "Cold Pressed" },
    Feb: { pendapatan: 4100000, pesanan: 95,  produkTerlaris: "Cold Pressed" },
    Mar: { pendapatan: 3750000, pesanan: 88,  produkTerlaris: "Infused Water" },
    Apr: { pendapatan: 5200000, pesanan: 120, produkTerlaris: "Cold Pressed" },
    Mei: { pendapatan: 4800000, pesanan: 110, produkTerlaris: "Infused Water" },
    Jun: { pendapatan: 4400000, pesanan: 102, produkTerlaris: "Cold Pressed" },
};

const BULAN_LIST = Object.keys(DATA_BULANAN) as BulanKey[];

/* ── Bar Chart ── */
function BarChart({ bulan, aktif }: { bulan: BulanKey; aktif: BulanKey }) {
    const maxVal = Math.max(...BULAN_LIST.map(b => DATA_BULANAN[b].pendapatan));
    const chartH = 200;

    return (
        <div style={{ position: "relative", paddingBottom: 32 }}>
            {/* Y-axis labels */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: 8 }}>
                {[maxVal, maxVal * 0.75, maxVal * 0.5, maxVal * 0.25, 0].map((v, i) => (
                    <span key={i} style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap" }}>
                        {v === 0 ? "0" : (v / 1000000).toFixed(1) + "jt"}
                    </span>
                ))}
            </div>

            {/* Chart area */}
            <div style={{ marginLeft: 40, border: `1px solid ${BORDER}`, borderRadius: 14, background: "#f9fdfa", padding: "16px 16px 0", overflow: "hidden" }}>
                {/* Grid lines */}
                <div style={{ position: "relative", height: chartH }}>
                    {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => (
                        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${frac * 100}%`, borderTop: `1px dashed ${BORDER}` }} />
                    ))}

                    {/* Bars */}
                    <div style={{ display: "flex", alignItems: "flex-end", height: "100%", gap: 12, justifyContent: "space-around" }}>
                        {BULAN_LIST.map(b => {
                            const ratio = DATA_BULANAN[b].pendapatan / maxVal;
                            const isAktif = b === aktif;
                            return (
                                <div key={b} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
                                    {/* Value label */}
                                    <span style={{ fontSize: 9, color: isAktif ? DK : "#9ca3af", fontWeight: 700, marginBottom: 4, transition: "color 0.3s" }}>
                                        {(DATA_BULANAN[b].pendapatan / 1000000).toFixed(1)}jt
                                    </span>
                                    {/* Bar */}
                                    <div style={{
                                        width: "100%", maxWidth: 52,
                                        height: `${ratio * 100}%`,
                                        borderRadius: "8px 8px 0 0",
                                        background: isAktif
                                            ? `linear-gradient(180deg, ${P}, #2d6a4f)`
                                            : "rgba(82,183,136,0.25)",
                                        transition: "all 0.3s",
                                        boxShadow: isAktif ? `0 4px 16px rgba(82,183,136,0.4)` : "none",
                                    }} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* X-axis labels */}
                <div style={{ display: "flex", justifyContent: "space-around", paddingTop: 10, paddingBottom: 4 }}>
                    {BULAN_LIST.map(b => (
                        <span key={b} style={{ fontSize: 11, fontWeight: b === aktif ? 700 : 500, color: b === aktif ? DK : "#9ca3af", flex: 1, textAlign: "center", transition: "color 0.3s" }}>
                            {b}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Stat Card ── */
function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div style={{
            flex: 1, minWidth: 160,
            background: "rgba(82,183,136,0.08)",
            border: `1px solid rgba(82,183,136,0.2)`,
            borderRadius: 16, padding: "18px 22px",
            boxShadow: CARD,
        }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: DK, marginBottom: 10 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#e05a1e", fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 }}>{value}</div>
            {sub && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{sub}</div>}
        </div>
    );
}

/* ── Main Page ── */
export default function LaporanPage() {
    const [bulanAktif, setBulanAktif] = useState<BulanKey>("Apr");
    const [showFilter, setShowFilter] = useState(false);

    const data = DATA_BULANAN[bulanAktif];

    return (
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: DK, margin: 0 }}>Laporan Penjualan</h2>
                    <p style={{ fontSize: 13, color: "#74a78a", margin: "4px 0 0", fontWeight: 500 }}>
                        Data bulan <strong style={{ color: DK }}>{bulanAktif} 2026</strong>
                    </p>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", position: "relative" }}>
                    {/* Filter Bulan */}
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setShowFilter(v => !v)}
                            style={{ display: "flex", alignItems: "center", gap: 6, background: DK, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(27,67,50,0.25)" }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                            Filter Bulan
                        </button>
                        {showFilter && (
                            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", borderRadius: 12, border: `1px solid ${BORDER}`, boxShadow: "0 8px 24px rgba(27,67,50,0.15)", padding: 8, zIndex: 50, minWidth: 140 }}>
                                {BULAN_LIST.map(b => (
                                    <button key={b} onClick={() => { setBulanAktif(b); setShowFilter(false); }} style={{
                                        display: "block", width: "100%", textAlign: "left",
                                        padding: "9px 14px", borderRadius: 8, border: "none",
                                        background: bulanAktif === b ? `rgba(82,183,136,0.12)` : "transparent",
                                        color: bulanAktif === b ? DK : "#374151",
                                        fontSize: 13, fontWeight: bulanAktif === b ? 700 : 500,
                                        cursor: "pointer", fontFamily: "'Poppins', sans-serif",
                                    }}>
                                        {b} 2026
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Ekspor Data */}
                    <button
                        style={{ display: "flex", alignItems: "center", gap: 6, background: P, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(82,183,136,0.3)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#2d6a4f"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = P; }}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Ekspor Data
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
                <StatCard label="Total Penjualan" value={formatRp(data.pendapatan)} />
                <StatCard label="Jumlah Pesanan" value={`${data.pesanan} Pesanan`} />
                <StatCard label="Produk Terlaris" value={data.produkTerlaris} />
            </div>

            {/* Grafik */}
            <div style={{ background: "rgba(82,183,136,0.06)", border: `1px solid rgba(82,183,136,0.18)`, borderRadius: 20, padding: "24px 28px", boxShadow: CARD }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: DK, marginBottom: 20 }}>Grafik Penjualan Bulanan</div>
                <BarChart bulan={bulanAktif} aktif={bulanAktif} />

                {/* Legend */}
                <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 12, height: 12, borderRadius: 3, background: `linear-gradient(180deg, ${P}, #2d6a4f)` }} />
                        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>Bulan terpilih</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(82,183,136,0.25)" }} />
                        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>Bulan lainnya</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
