"use client";

import { useState, useMemo } from "react";

/* ── Types ── */
type StatusPesanan = "Diproses" | "Dikirim" | "Selesai";

interface Pesanan {
    id: string;
    pelanggan: string;
    produk: string;
    qty: number;
    total: number;
    status: StatusPesanan;
    tanggal: string;
}

/* ── Dummy Data ── */
const INITIAL_PESANAN: Pesanan[] = [
    { id: "SJB-001", pelanggan: "Ameylia", produk: "Green Series", qty: 2, total: 45000, status: "Selesai", tanggal: "22 April 2026" },
    { id: "SJB-002", pelanggan: "Saskia", produk: "Orange Series", qty: 3, total: 35000, status: "Diproses", tanggal: "22 April 2026" },
    { id: "SJB-003", pelanggan: "Jena", produk: "Red Series", qty: 1, total: 55000, status: "Dikirim", tanggal: "21 April 2026" },
    { id: "SJB-004", pelanggan: "Windy", produk: "Purple Series", qty: 4, total: 40000, status: "Selesai", tanggal: "21 April 2026" },
    { id: "SJB-005", pelanggan: "Upay", produk: "Yellow Series", qty: 2, total: 50000, status: "Selesai", tanggal: "20 April 2026" },
    { id: "SJB-006", pelanggan: "Grace", produk: "Blue Series", qty: 5, total: 38000, status: "Selesai", tanggal: "20 April 2026" }
];

/* ── Helpers ── */
const P = "#52b788";
const DK = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD = "0 2px 16px rgba(27,67,50,0.07)";

function formatRp(n: number) {
    return "Rp " + new Intl.NumberFormat("id-ID").format(n);
}

const STATUS_STYLE: Record<StatusPesanan, { bg: string; color: string; dot: string }> = {
    Diproses: { bg: "rgba(245,158,11,0.12)", color: "#b45309", dot: "#f59e0b" },
    Dikirim: { bg: "rgba(59,130,246,0.1)", color: "#1d4ed8", dot: "#3b82f6" },
    Selesai: { bg: "rgba(82,183,136,0.12)", color: "#1b7a4a", dot: "#52b788" },
};

const AVATAR_COLORS = ["#52b788", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
function avatarColor(name: string) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

/* ── Tambah Pesanan Modal ── */
function TambahModal({ onClose, onSave }: { onClose: () => void; onSave: (p: Pesanan) => void }) {
    const [form, setForm] = useState({ pelanggan: "", produk: "", qty: 1, total: 0, status: "Diproses" as StatusPesanan, tanggal: "" });
    const [error, setError] = useState("");

    const handleSave = () => {
        if (!form.pelanggan.trim() || !form.produk.trim() || !form.tanggal.trim()) {
            setError("Nama pelanggan, produk, dan tanggal wajib diisi.");
            return;
        }
        const id = "SJB-" + String(Date.now()).slice(-4);
        onSave({ ...form, id });
        onClose();
    };

    const field = (label: string, child: React.ReactNode) => (
        <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DK, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
            {child}
        </div>
    );

    const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 13px", borderRadius: 9, border: "1.5px solid #d0ead9", fontSize: 13, fontFamily: "'Poppins', sans-serif", outline: "none", boxSizing: "border-box" };

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.4)", backdropFilter: "blur(4px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "28px 32px", width: 520, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(27,67,50,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: 0 }}>➕ Tambah Pesanan</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>

                {error && <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 12, color: "#dc2626", fontWeight: 600 }}>{error}</div>}

                {field("Nama Pelanggan", <input style={inputStyle} value={form.pelanggan} onChange={e => setForm(f => ({ ...f, pelanggan: e.target.value }))} placeholder="" />)}
                {field("Produk", <input style={inputStyle} value={form.produk} onChange={e => setForm(f => ({ ...f, produk: e.target.value }))} placeholder="" />)}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                    {field("Qty", <input style={inputStyle} value={form.qty} onChange={e => setForm(f => ({ ...f, qty: +e.target.value || 0 }))} placeholder="Contoh: 2" />)}
                    {field("Total (Rp)", <input style={inputStyle} value={form.total} onChange={e => setForm(f => ({ ...f, total: +e.target.value.replace(/\D/g, "") || 0 }))} placeholder="Contoh: 45000" />)}
                </div>

                {field("Status",
                    <select style={{ ...inputStyle, background: "#fff" }} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as StatusPesanan }))}>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                    </select>
                )}
                {field("Tanggal", <input style={inputStyle} value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} placeholder="" />)}

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
                    <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: 10, border: "1.5px solid #d0ead9", background: "#fff", color: "#4b7a5f", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Batal</button>
                    <button onClick={handleSave} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: P, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(82,183,136,0.3)" }}>Simpan</button>
                </div>
            </div>
        </div>
    );
}

/* ── Detail Modal ── */
function DetailModal({ pesanan, onClose }: { pesanan: Pesanan; onClose: () => void }) {
    const s = STATUS_STYLE[pesanan.status];
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.4)", backdropFilter: "blur(4px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "30px 36px", width: 480, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(27,67,50,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: 0 }}>🛒 Detail Pesanan</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>

                {/* ID + status */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: DK, fontFamily: "'Poppins', sans-serif" }}>#{pesanan.id}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: s.bg, color: s.color }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                        {pesanan.status}
                    </span>
                </div>

                {/* Info rows */}
                {[
                    { label: "Pelanggan", value: pesanan.pelanggan },
                    { label: "Produk", value: pesanan.produk },
                    { label: "Jumlah", value: `${pesanan.qty} pcs` },
                    { label: "Total", value: formatRp(pesanan.total) },
                    { label: "Tanggal", value: pesanan.tanggal },
                ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${BORDER}` }}>
                        <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{row.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: DK }}>{row.value}</span>
                    </div>
                ))}

                <button onClick={onClose} style={{ marginTop: 24, width: "100%", padding: "11px 0", borderRadius: 12, border: "none", background: P, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(82,183,136,0.3)" }}>Tutup</button>
            </div>
        </div>
    );
}

/* ── Invoice Modal ── */
function InvoiceModal({ pesanan, onClose }: { pesanan: Pesanan; onClose: () => void }) {
    const s = STATUS_STYLE[pesanan.status];
    const hargaSatuan = pesanan.qty > 0 ? Math.round(pesanan.total / pesanan.qty) : 0;

    const handlePrint = () => {
        const el = document.getElementById("invoice-print-area");
        if (!el) return;
        const w = window.open("", "_blank", "width=700,height=900");
        if (!w) return;
        w.document.write(`
            <!DOCTYPE html><html><head>
            <title>Invoice #${pesanan.id}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1b4332; }
                .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 3px solid #52b788; padding-bottom: 20px; }
                .brand { font-size: 22px; font-weight: 800; color: #1b4332; }
                .brand span { color: #52b788; }
                .inv-title { font-size: 28px; font-weight: 800; color: #52b788; }
                .inv-id { font-size: 13px; color: #9ca3af; margin-top: 4px; }
                .section { margin-bottom: 24px; }
                .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 8px; }
                .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e4f2ea; font-size: 13px; }
                .info-row span:first-child { color: #6b7280; }
                .info-row span:last-child { font-weight: 700; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                th { background: #1b4332; color: #fff; padding: 10px 14px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; }
                td { padding: 10px 14px; border-bottom: 1px solid #e4f2ea; font-size: 13px; }
                .total-row td { font-weight: 800; font-size: 15px; background: #f0faf4; border-top: 2px solid #52b788; }
                .status-badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
                .footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 32px; border-top: 1px solid #e4f2ea; padding-top: 16px; }
            </style></head><body>
            ${el.innerHTML}
            </body></html>
        `);
        w.document.close();
        w.focus();
        w.print();
        w.close();
    };

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.45)", backdropFilter: "blur(5px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "28px 32px", width: 600, maxWidth: "95vw", boxShadow: "0 24px 80px rgba(27,67,50,0.25)", maxHeight: "90vh", overflowY: "auto" }}>

                {/* Modal header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: 0 }}>🖨️ Cetak Invoice</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>

                {/* Invoice preview */}
                <div id="invoice-print-area" style={{ border: "1px solid #e4f2ea", borderRadius: 14, padding: "28px 30px", background: "#fff" }}>

                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 18, borderBottom: "3px solid #52b788" }}>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: DK }}>Sejuba <span style={{ color: P }}>Drink</span></div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Cold Pressed Juice & Infused Water</div>
                            <div style={{ fontSize: 11, color: "#9ca3af" }}>sejubadrink@gmail.com</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 26, fontWeight: 800, color: P }}>INVOICE</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: DK, marginTop: 2 }}>#{pesanan.id}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Tanggal: {pesanan.tanggal}</div>
                        </div>
                    </div>

                    {/* Info pelanggan */}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9ca3af", marginBottom: 8 }}>Kepada</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: DK }}>{pesanan.pelanggan}</div>
                    </div>

                    {/* Tabel produk */}
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
                        <thead>
                            <tr style={{ background: DK }}>
                                {["Produk", "Qty", "Harga Satuan", "Total"].map(h => (
                                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: "#374151" }}>{pesanan.produk}</td>
                                <td style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 700, color: DK }}>{pesanan.qty}</td>
                                <td style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: "#374151" }}>{formatRp(hargaSatuan)}</td>
                                <td style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 700, color: DK }}>{formatRp(pesanan.total)}</td>
                            </tr>
                            <tr style={{ background: "#f0faf4" }}>
                                <td colSpan={3} style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: DK, borderTop: "2px solid #52b788", textAlign: "right" }}>TOTAL</td>
                                <td style={{ padding: "12px 14px", fontSize: 15, fontWeight: 800, color: DK, borderTop: "2px solid #52b788" }}>{formatRp(pesanan.total)}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Status */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>Status Pesanan</div>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
                            {pesanan.status}
                        </span>
                    </div>

                    {/* Footer */}
                    <div style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
                        Terima kasih telah berbelanja di Sejuba Drink · Sehat dimulai dari minuman yang tepat
                    </div>
                </div>

                {/* Tombol */}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
                    <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: 10, border: "1.5px solid #d0ead9", background: "#fff", color: "#4b7a5f", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Tutup</button>
                    <button onClick={handlePrint} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 22px", borderRadius: 10, border: "none", background: DK, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(27,67,50,0.25)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                        Cetak / Print
                    </button>
                </div>
            </div>
        </div>
    );
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

/* ── Filter Button ── */
function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button onClick={onClick} style={{
            padding: "8px 18px", borderRadius: 9, fontSize: 12, fontWeight: 700,
            border: "1.5px solid " + (active ? P : "#e4f2ea"),
            background: active ? P : "#fff",
            color: active ? "#fff" : "#4b7a5f",
            cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s",
        }}>{label}</button>
    );
}

/* ── Main Page ── */
export default function PesananPage() {
    const [pesanan, setPesanan] = useState<Pesanan[]>(INITIAL_PESANAN);
    const [search, setSearch] = useState("");
    const [activeStatus, setActiveStatus] = useState<"Semua" | StatusPesanan>("Semua");
    const [detailTarget, setDetailTarget] = useState<Pesanan | null>(null);
    const [invoiceTarget, setInvoiceTarget] = useState<Pesanan | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showAdd, setShowAdd] = useState(false);

    const filtered = useMemo(() =>
        pesanan.filter(p =>
            (activeStatus === "Semua" || p.status === activeStatus) &&
            (p.id.toLowerCase().includes(search.toLowerCase()) ||
                p.pelanggan.toLowerCase().includes(search.toLowerCase()) ||
                p.produk.toLowerCase().includes(search.toLowerCase()))
        ), [pesanan, activeStatus, search]);

    const totalPendapatan = pesanan.reduce((s, p) => s + p.total, 0);
    const countOf = (s: StatusPesanan) => pesanan.filter(p => p.status === s).length;

    return (
        <>
            {showAdd && <TambahModal onClose={() => setShowAdd(false)} onSave={p => setPesanan(ps => [p, ...ps])} />}
            {detailTarget && <DetailModal pesanan={detailTarget} onClose={() => setDetailTarget(null)} />}
            {invoiceTarget && <InvoiceModal pesanan={invoiceTarget} onClose={() => setInvoiceTarget(null)} />}

            {/* Konfirmasi Hapus */}
            {deleteId && (
                <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDeleteId(null)} />
                    <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "32px 36px", width: 400, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(27,67,50,0.2)", textAlign: "center" }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: "0 0 8px" }}>Hapus Pesanan?</h3>
                        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px" }}>Pesanan <strong style={{ color: "#ef4444" }}>#{deleteId}</strong> akan dihapus secara permanen.</p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                            <button onClick={() => setDeleteId(null)} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #d0ead9", background: "#fff", color: "#4b7a5f", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Batal</button>
                            <button onClick={() => { setPesanan(ps => ps.filter(p => p.id !== deleteId)); setDeleteId(null); }} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(239,68,68,0.25)" }}>Ya, Hapus</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: DK, margin: 0 }}>Manajemen Pesanan</h2>
                    <p style={{ fontSize: 13, color: "#74a78a", margin: "4px 0 0", fontWeight: 500 }}>
                        {pesanan.length} total pesanan &nbsp;·&nbsp; Pendapatan: <strong style={{ color: DK }}>{formatRp(totalPendapatan)}</strong>
                    </p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    style={{ display: "flex", alignItems: "center", gap: 8, background: P, color: "#fff", border: "none", padding: "12px 22px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(82,183,136,0.35)", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#2d6a4f"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = P; e.currentTarget.style.transform = "translateY(0)"; }}
                >+ Tambah Pesanan</button>
            </div>

            {/* Stat cards */}
            <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
                <StatCard icon="📋" value={pesanan.length} label="Total Pesanan" color="#52b788" />
                <StatCard icon="⏳" value={countOf("Diproses")} label="Diproses" color="#f59e0b" />
                <StatCard icon="🚚" value={countOf("Dikirim")} label="Dikirim" color="#3b82f6" />
                <StatCard icon="✅" value={countOf("Selesai")} label="Selesai" color="#52b788" />
            </div>

            {/* Search + Filter */}
            <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${BORDER}`, boxShadow: CARD, padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#9ca3af" }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Cari ID atau nama pelanggan..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 10, border: "1.5px solid #e4f2ea", fontSize: 13, outline: "none", fontFamily: "'Poppins', sans-serif", boxSizing: "border-box" }}
                    />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(["Semua", "Diproses", "Dikirim", "Selesai"] as const).map(s => (
                        <FilterBtn key={s} label={s} active={activeStatus === s} onClick={() => setActiveStatus(s)} />
                    ))}
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${BORDER}`, boxShadow: CARD, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 750 }}>
                        <thead>
                            <tr style={{ background: `linear-gradient(90deg, ${DK}, #2d6a4f)` }}>
                                {["ID Pesanan", "Pelanggan", "Produk", "Qty", "Total", "Status", "Tanggal", "Aksi"].map(h => (
                                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ padding: 48, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                                        📦 Tidak ada pesanan ditemukan
                                    </td>
                                </tr>
                            ) : filtered.map((p, idx) => {
                                const s = STATUS_STYLE[p.status];
                                const ac = avatarColor(p.pelanggan);
                                const ini = p.pelanggan.charAt(0).toUpperCase();
                                return (
                                    <tr key={p.id}
                                        style={{ background: idx % 2 === 0 ? "#fff" : "#f9fdfa", transition: "background 0.15s" }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(82,183,136,0.04)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f9fdfa")}
                                    >
                                        {/* ID */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: DK, fontFamily: "'Poppins', sans-serif" }}>#{p.id}</span>
                                        </td>

                                        {/* Pelanggan */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{ini}</div>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{p.pelanggan}</span>
                                            </div>
                                        </td>

                                        {/* Produk */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>{p.produk}</td>

                                        {/* Qty */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 700, color: DK, textAlign: "center" }}>{p.qty}</td>

                                        {/* Total */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 700, color: DK, whiteSpace: "nowrap" }}>{formatRp(p.total)}</td>

                                        {/* Status */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>
                                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                                                {p.status}
                                            </span>
                                        </td>

                                        {/* Tanggal */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{p.tanggal}</td>

                                        {/* Aksi */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", gap: 6 }}>
                                                <button
                                                    onClick={() => setDetailTarget(p)}
                                                    style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 9, border: "1.5px solid #e4f2ea", background: "#f9fdfa", color: "#4b7a5f", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap" }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = P; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = P; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = "#f9fdfa"; e.currentTarget.style.color = "#4b7a5f"; e.currentTarget.style.borderColor = "#e4f2ea"; }}
                                                >
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => setInvoiceTarget(p)}
                                                    style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 9, border: "1.5px solid #d0ead9", background: "#f0faf4", color: DK, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap" }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = DK; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = DK; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = "#f0faf4"; e.currentTarget.style.color = DK; e.currentTarget.style.borderColor = "#d0ead9"; }}
                                                >
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                                                    Invoice
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(p.id)}
                                                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 9, border: "1.5px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", cursor: "pointer", transition: "all 0.2s", flexShrink: 0 }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "#fff"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; }}
                                                    title="Hapus"
                                                >
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={{ padding: "13px 18px", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9fdfa", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Menampilkan {filtered.length} dari {pesanan.length} pesanan</span>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#b45309" }}>● {countOf("Diproses")} Diproses</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#1d4ed8" }}>● {countOf("Dikirim")} Dikirim</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#1b7a4a" }}>● {countOf("Selesai")} Selesai</span>
                    </div>
                </div>
            </div>
        </>
    );
}
