"use client";

import { useState, useMemo } from "react";

/* ── Types ── */
interface Pelanggan {
    id: string;
    nama: string;
    telepon: string;
    email: string;
    alamat: string;
}

/* ── Dummy Data ── */
const INITIAL_PELANGGAN: Pelanggan[] = [
    { id: "PLG-001", nama: "Ameylia", telepon: "081234567890", email: "ameylia@yahoo.com", alamat: "Puri Agung 3" },
    { id: "PLG-002", nama: "Saskia", telepon: "082345678901", email: "saskia@gmail.com", alamat: "Piayu" },
    { id: "PLG-003", nama: "Jena", telepon: "083456789012", email: "jena@yahoo.com", alamat: "Batu Aji" },
    { id: "PLG-004", nama: "Windy", telepon: "084567890123", email: "windy@gmail.com", alamat: "Bukit Kemuning" },
    { id: "PLG-005", nama: "Upay", telepon: "085678901234", email: "upay@gmail.com", alamat: "SP Batu Aji" },
    { id: "PLG-006", nama: "Grace", telepon: "086789012345", email: "grace@gmail.com", alamat: "Marina" },
];

/* ── Helpers ── */
const P = "#52b788";
const DK = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD = "0 2px 16px rgba(27,67,50,0.07)";

const AVATAR_COLORS = ["#52b788", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
function avatarColor(name: string) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

/* ── Detail Modal ── */
function DetailModal({ pelanggan, onClose }: { pelanggan: Pelanggan; onClose: () => void }) {
    const ac = avatarColor(pelanggan.nama);
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.4)", backdropFilter: "blur(4px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "30px 36px", width: 480, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(27,67,50,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: 0 }}>👤 Detail Pelanggan</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>

                {/* Avatar + nama */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: "16px 20px", borderRadius: 14, background: "#f9fdfa", border: `1px solid ${BORDER}` }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                        {pelanggan.nama.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: DK }}>{pelanggan.nama}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{pelanggan.id}</div>
                    </div>
                </div>

                {/* Info rows */}
                {[
                    { icon: "", label: "No. Telepon", value: pelanggan.telepon },
                    { icon: "", label: "Email", value: pelanggan.email },
                    { icon: "", label: "Alamat", value: pelanggan.alamat },
                ].map(row => (
                    <div key={row.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: `1px solid ${BORDER}` }}>
                        <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{row.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{row.label}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: DK }}>{row.value}</div>
                        </div>
                    </div>
                ))}

                <button onClick={onClose} style={{ marginTop: 24, width: "100%", padding: "11px 0", borderRadius: 12, border: "none", background: P, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(82,183,136,0.3)" }}>
                    Tutup
                </button>
            </div>
        </div>
    );
}

/* ── Delete Confirm Modal ── */
function DeleteConfirm({ nama, onConfirm, onCancel }: { nama: string; onConfirm: () => void; onCancel: () => void }) {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.35)", backdropFilter: "blur(4px)" }} onClick={onCancel} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "32px 36px", width: 400, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(27,67,50,0.2)", textAlign: "center" }}>
                <div style={{ fontSize: 42, marginBottom: 12 }}>🗑️</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: "0 0 8px" }}>Hapus Pelanggan?</h3>
                <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px" }}>
                    <strong style={{ color: "#ef4444" }}>{nama}</strong> akan dihapus secara permanen.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    <button onClick={onCancel} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #d0ead9", background: "#fff", color: "#4b7a5f", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Batal</button>
                    <button onClick={onConfirm} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(239,68,68,0.25)" }}>Ya, Hapus</button>
                </div>
            </div>
        </div>
    );
}

/* ── Tambah Pelanggan Modal ── */
function TambahPelangganModal({ onClose, onSave }: { onClose: () => void; onSave: (p: Pelanggan) => void }) {
    const [form, setForm] = useState({ nama: "", telepon: "", email: "", alamat: "" });
    const [error, setError] = useState("");

    const handleSave = () => {
        if (!form.nama.trim() || !form.telepon.trim()) {
            setError("Nama dan nomor telepon wajib diisi.");
            return;
        }
        const id = "PLG-" + String(Date.now()).slice(-4);
        onSave({ ...form, id });
        onClose();
    };

    const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 13px", borderRadius: 9, border: "1.5px solid #d0ead9", fontSize: 13, fontFamily: "'Poppins', sans-serif", outline: "none", boxSizing: "border-box" };
    const field = (label: string, child: React.ReactNode) => (
        <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DK, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
            {child}
        </div>
    );

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.4)", backdropFilter: "blur(4px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "28px 32px", width: 500, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(27,67,50,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: 0 }}>➕ Tambah Pelanggan</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>

                {error && <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 12, color: "#dc2626", fontWeight: 600 }}>{error}</div>}

                {field("Nama Lengkap", <input style={inputStyle} value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} placeholder="" />)}
                {field("No. Telepon", <input style={inputStyle} value={form.telepon} onChange={e => setForm(f => ({ ...f, telepon: e.target.value }))} placeholder="" />)}
                {field("Email", <input style={inputStyle} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="" />)}
                {field("Alamat", <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 72 }} value={form.alamat} onChange={e => setForm(f => ({ ...f, alamat: e.target.value }))} placeholder="" />)}

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
                    <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: 10, border: "1.5px solid #d0ead9", background: "#fff", color: "#4b7a5f", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Batal</button>
                    <button onClick={handleSave} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: P, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(82,183,136,0.3)" }}>Simpan</button>
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

/* ── Action Button ── */
function ActionBtn({ color, onClick, title, children }: { color: string; onClick: () => void; title: string; children: React.ReactNode }) {
    return (
        <button
            title={title}
            onClick={onClick}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 8, background: color + "18", color, border: "1.5px solid " + color + "40", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = color; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = color + "18"; (e.currentTarget as HTMLElement).style.color = color; }}
        >
            {children}
        </button>
    );
}

/* ── Main Page ── */
export default function PelangganPage() {
    const [pelanggan, setPelanggan] = useState<Pelanggan[]>(INITIAL_PELANGGAN);
    const [search, setSearch] = useState("");
    const [detailTarget, setDetailTarget] = useState<Pelanggan | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Pelanggan | null>(null);
    const [showAdd, setShowAdd] = useState(false);

    const filtered = useMemo(() =>
        pelanggan.filter(p =>
            p.nama.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase()) ||
            p.telepon.includes(search) ||
            p.id.toLowerCase().includes(search.toLowerCase())
        ), [pelanggan, search]);

    return (
        <>
            {showAdd && <TambahPelangganModal onClose={() => setShowAdd(false)} onSave={p => setPelanggan(ps => [p, ...ps])} />}
            {detailTarget && <DetailModal pelanggan={detailTarget} onClose={() => setDetailTarget(null)} />}
            {deleteTarget && (
                <DeleteConfirm
                    nama={deleteTarget.nama}
                    onConfirm={() => { setPelanggan(ps => ps.filter(p => p.id !== deleteTarget.id)); setDeleteTarget(null); }}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: DK, margin: 0 }}>Manajemen Pelanggan</h2>
                    <p style={{ fontSize: 13, color: "#74a78a", margin: "4px 0 0", fontWeight: 500 }}>
                        {pelanggan.length} pelanggan terdaftar
                    </p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    style={{ display: "flex", alignItems: "center", gap: 8, background: P, color: "#fff", border: "none", padding: "12px 22px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(82,183,136,0.35)", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#2d6a4f"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = P; e.currentTarget.style.transform = "translateY(0)"; }}
                >+ Tambah Pelanggan</button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
                <StatCard icon="👥" value={pelanggan.length} label="Total Pelanggan" color="#52b788" />
            </div>

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
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 750 }}>
                        <thead>
                            <tr style={{ background: `linear-gradient(90deg, ${DK}, #2d6a4f)` }}>
                                {["ID", "Nama Pelanggan", "No. Telepon", "Email", "Alamat", "Aksi"].map(h => (
                                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: 48, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                                        👥 Tidak ada pelanggan ditemukan
                                    </td>
                                </tr>
                            ) : filtered.map((p, idx) => {
                                const ac = avatarColor(p.nama);
                                return (
                                    <tr key={p.id}
                                        style={{ background: idx % 2 === 0 ? "#fff" : "#f9fdfa", transition: "background 0.15s" }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(82,183,136,0.04)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f9fdfa")}
                                    >
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", fontFamily: "'Poppins', sans-serif" }}>{p.id}</span>
                                        </td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 34, height: 34, borderRadius: "50%", background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                                                    {p.nama.charAt(0).toUpperCase()}
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: DK, whiteSpace: "nowrap" }}>{p.nama}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: "#374151", whiteSpace: "nowrap" }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                                                <span style={{ fontSize: 12 }}></span>{p.telepon}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                                                <span style={{ fontSize: 12 }}></span>{p.email}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 12, color: "#6b7280", maxWidth: 200 }}>
                                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                <span style={{ marginRight: 4 }}></span>{p.alamat}
                                            </div>
                                        </td>
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", gap: 6 }}>
                                                <ActionBtn color="#3b82f6" onClick={() => setDetailTarget(p)} title="Detail">
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                                </ActionBtn>
                                                <ActionBtn color="#ef4444" onClick={() => setDeleteTarget(p)} title="Hapus">
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                                                </ActionBtn>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={{ padding: "13px 18px", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9fdfa" }}>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Menampilkan {filtered.length} dari {pelanggan.length} pelanggan</span>
                </div>
            </div>
        </>
    );
}
