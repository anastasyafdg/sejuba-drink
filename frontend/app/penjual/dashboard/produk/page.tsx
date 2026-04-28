"use client";

import { useState, useMemo } from "react";

/* ── Types ── */
interface Varian {
    ukuran: "50ml" | "100ml" | "250ml";
    harga: number;
    stok: number;
}

interface Product {
    id: number;
    nama: string;
    jenis: string;
    deskripsi: string;
    kandungan: string;
    varian: Varian[];
    status: "Tersedia" | "Habis";
}

/* ── Dummy data (Sejuba Drink) ── */
const HARGA = { "50ml": 8500, "100ml": 15500, "250ml": 29500 };

const INITIAL_PRODUCTS: Product[] = [
    {
        id: 1, nama: "Sejuba Green Detox", jenis: "Detox",
        deskripsi: "Minuman detoks hijau kaya klorofil dan antioksidan.",
        kandungan: "Pandan, Daun Suji, Lemon, Madu, Spirulina",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 80 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 60 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 35 },
        ],
        status: "Tersedia",
    },
    {
        id: 2, nama: "Sejuba Orange Boost", jenis: "Energi",
        deskripsi: "Minuman energi alami berbasis jeruk nipis dan jahe.",
        kandungan: "Jeruk Nipis, Jahe, Madu, Vitamin C, Gula Aren",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 50 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 40 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 20 },
        ],
        status: "Tersedia",
    },
    {
        id: 3, nama: "Sejuba Lemon Mint", jenis: "Segar",
        deskripsi: "Perpaduan lemon dan mint yang menyegarkan.",
        kandungan: "Lemon, Daun Mint, Madu, Air Kelapa, Garam Himalaya",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 70 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 45 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 0 },
        ],
        status: "Tersedia",
    },
    {
        id: 4, nama: "Sejuba Berry Blend", jenis: "Antioksidan",
        deskripsi: "Campuran berry pilihan kaya vitamin C dan antioksidan.",
        kandungan: "Blueberry, Strawberry, Raspberry, Madu, Lemon",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 0 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 0 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 0 },
        ],
        status: "Habis",
    },
    {
        id: 5, nama: "Sejuba Mango Glow", jenis: "Vitamin",
        deskripsi: "Minuman mango segar dengan kolagen untuk kulit sehat.",
        kandungan: "Mangga Harum Manis, Kunyit, Madu, Kolagen Ikan, Lemon",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 90 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 65 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 30 },
        ],
        status: "Tersedia",
    },
    {
        id: 6, nama: "Sejuba Apple Fiber", jenis: "Serat",
        deskripsi: "Minuman apel kaya serat untuk menjaga pencernaan.",
        kandungan: "Apel Malang, Psyllium Husk, Kayu Manis, Madu, Lemon",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 0 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 0 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 0 },
        ],
        status: "Habis",
    },
    {
        id: 7, nama: "Sejuba Watermelon Refresh", jenis: "Segar",
        deskripsi: "Semangka segar untuk rehidrasi tubuh di hari panas.",
        kandungan: "Semangka, Mint, Lemon, Garam Himalaya, Madu",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 55 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 40 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 20 },
        ],
        status: "Tersedia",
    },
    {
        id: 8, nama: "Sejuba Ginger Immunity", jenis: "Imun",
        deskripsi: "Jahe dan kunyit untuk menjaga daya tahan tubuh.",
        kandungan: "Jahe Merah, Kunyit, Temulawak, Madu, Lemon",
        varian: [
            { ukuran: "50ml", harga: HARGA["50ml"], stok: 60 },
            { ukuran: "100ml", harga: HARGA["100ml"], stok: 50 },
            { ukuran: "250ml", harga: HARGA["250ml"], stok: 25 },
        ],
        status: "Tersedia",
    },
];

const JENIS_LIST = ["Semua", "Detox", "Energi", "Segar", "Antioksidan", "Vitamin", "Serat", "Imun"];

const JENIS_COLORS: Record<string, { bg: string; color: string }> = {
    Detox: { bg: "#d1fae5", color: "#065f46" },
    Energi: { bg: "#fef3c7", color: "#92400e" },
    Segar: { bg: "#dbeafe", color: "#1e3a5f" },
    Antioksidan: { bg: "#ede9fe", color: "#4c1d95" },
    Vitamin: { bg: "#fce7f3", color: "#831843" },
    Serat: { bg: "#d1fae5", color: "#14532d" },
    Imun: { bg: "#e0f2fe", color: "#0c4a6e" },
};

const P = "#52b788";
const DK = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD = "0 2px 16px rgba(27,67,50,0.07)";

function formatRp(n: number) { return "Rp " + new Intl.NumberFormat("id-ID").format(n); }

function StokBadge({ stok }: { stok: number }) {
    const color = stok === 0 ? "#ef4444" : stok < 30 ? "#f59e0b" : "#52b788";
    return <span style={{ fontSize: 12, fontWeight: 700, color }}>{stok}</span>;
}

/* ── Modal Form ── */
const UKURAN_LIST: Varian["ukuran"][] = ["50ml", "100ml", "250ml"];

function ProductModal({
    open, onClose, initial, onSave,
}: {
    open: boolean;
    onClose: () => void;
    initial?: Partial<Product>;
    onSave: (p: Omit<Product, "id">) => void;
}) {
    const [form, setForm] = useState<Omit<Product, "id">>({
        nama: initial?.nama ?? "",
        jenis: initial?.jenis ?? "Detox",
        deskripsi: initial?.deskripsi ?? "",
        kandungan: initial?.kandungan ?? "",
        status: initial?.status ?? "Tersedia",
        varian: initial?.varian ?? UKURAN_LIST.map(u => ({ ukuran: u, harga: HARGA[u], stok: 0 })),
    });

    if (!open) return null;

    const inp = (label: string, val: string | number, onChange: (v: string) => void, type = "text") => (
        <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DK, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
            <input type={type} value={val} onChange={e => onChange(e.target.value)}
                style={{ width: "100%", padding: "9px 13px", borderRadius: 9, border: "1.5px solid #d0ead9", fontSize: 13, fontFamily: "'Poppins', sans-serif", outline: "none", boxSizing: "border-box" }} />
        </div>
    );

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.4)", backdropFilter: "blur(4px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "28px 32px", width: 560, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(27,67,50,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: "0 0 20px" }}>
                    {initial?.id ? "✏️ Edit Produk" : "➕ Tambah Produk"}
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                    <div style={{ gridColumn: "1/-1" }}>{inp("Nama Produk", form.nama, v => setForm(f => ({ ...f, nama: v })))}</div>

                    {/* Jenis */}
                    <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DK, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Jenis Produk</label>
                        <select value={form.jenis} onChange={e => setForm(f => ({ ...f, jenis: e.target.value }))}
                            style={{ width: "100%", padding: "9px 13px", borderRadius: 9, border: "1.5px solid #d0ead9", fontSize: 13, fontFamily: "'Poppins', sans-serif", outline: "none", background: "#fff", boxSizing: "border-box", marginBottom: 14 }}>
                            {JENIS_LIST.filter(j => j !== "Semua").map(j => <option key={j}>{j}</option>)}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DK, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</label>
                        <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as "Tersedia" | "Habis" }))}
                            style={{ width: "100%", padding: "9px 13px", borderRadius: 9, border: "1.5px solid #d0ead9", fontSize: 13, fontFamily: "'Poppins', sans-serif", outline: "none", background: "#fff", boxSizing: "border-box", marginBottom: 14 }}>
                            <option>Tersedia</option><option>Habis</option>
                        </select>
                    </div>

                    <div style={{ gridColumn: "1/-1" }}>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DK, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Deskripsi Produk</label>
                        <textarea rows={2} value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))}
                            style={{ width: "100%", padding: "9px 13px", borderRadius: 9, border: "1.5px solid #d0ead9", fontSize: 13, fontFamily: "'Poppins', sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 14 }} />
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>{inp("Kandungan Produk", form.kandungan, v => setForm(f => ({ ...f, kandungan: v })))}</div>
                </div>

                {/* Varian harga & stok */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: DK, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Varian & Stok</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                        {UKURAN_LIST.map(ukuran => {
                            const v = form.varian.find(x => x.ukuran === ukuran)!;
                            return (
                                <div key={ukuran} style={{ background: "#f9fdfa", borderRadius: 12, padding: "12px 14px", border: `1px solid ${BORDER}` }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: P, marginBottom: 8 }}>{ukuran}</div>
                                    <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Harga</div>
                                    <input type="number" value={v.harga}
                                        onChange={e => setForm(f => ({ ...f, varian: f.varian.map(x => x.ukuran === ukuran ? { ...x, harga: +e.target.value } : x) }))}
                                        style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: "1.5px solid #d0ead9", fontSize: 12, fontFamily: "'Poppins', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: 8 }} />
                                    <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3 }}>Stok</div>
                                    <input type="number" value={v.stok}
                                        onChange={e => setForm(f => ({ ...f, varian: f.varian.map(x => x.ukuran === ukuran ? { ...x, stok: +e.target.value } : x) }))}
                                        style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: "1.5px solid #d0ead9", fontSize: 12, fontFamily: "'Poppins', sans-serif", outline: "none", boxSizing: "border-box" }} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: 10, border: "1.5px solid #d0ead9", background: "#fff", color: "#4b7a5f", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Batal</button>
                    <button onClick={() => { onSave(form); onClose(); }} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: P, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(82,183,136,0.3)" }}>Simpan</button>
                </div>
            </div>
        </div>
    );
}

/* ── Delete Confirm ── */
function DeleteConfirm({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.35)", backdropFilter: "blur(4px)" }} onClick={onCancel} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "32px 36px", width: 400, boxShadow: "0 24px 64px rgba(27,67,50,0.2)", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: "0 0 8px" }}>Hapus Produk?</h3>
                <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px" }}><strong style={{ color: "#ef4444" }}>{name}</strong> akan dihapus secara permanen.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    <button onClick={onCancel} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #d0ead9", background: "#fff", color: "#4b7a5f", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Batal</button>
                    <button onClick={onConfirm} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(239,68,68,0.25)" }}>Ya, Hapus</button>
                </div>
            </div>
        </div>
    );
}

/* ── Detail Drawer ── */
function DetailDrawer({ product, onClose }: { product: Product; onClose: () => void }) {
    const jc = JENIS_COLORS[product.jenis] ?? { bg: "#f3f4f6", color: "#374151" };
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.25)", backdropFilter: "blur(2px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", width: 400, height: "100%", boxShadow: "-8px 0 40px rgba(27,67,50,0.15)", padding: "28px 24px", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: 0 }}>Detail Produk</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>

                <div style={{ background: "linear-gradient(135deg, #d8f3dc, #b7e4c7)", borderRadius: 16, height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, marginBottom: 20 }}>🌿</div>

                <h2 style={{ fontSize: 18, fontWeight: 700, color: DK, margin: "0 0 8px" }}>{product.nama}</h2>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: jc.bg, color: jc.color }}>{product.jenis}</span>
                    <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: product.status === "Tersedia" ? "rgba(82,183,136,0.1)" : "rgba(239,68,68,0.1)", color: product.status === "Tersedia" ? "#1b7a4a" : "#dc2626" }}>{product.status}</span>
                </div>

                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 16 }}>{product.deskripsi}</p>

                <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: DK, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Kandungan</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {product.kandungan.split(", ").map(k => (
                            <span key={k} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, background: "rgba(82,183,136,0.08)", color: DK, fontWeight: 500 }}>{k}</span>
                        ))}
                    </div>
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: DK, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Varian & Harga</div>
                {product.varian.map(v => (
                    <div key={v.ukuran} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: "#f9fdfa", border: `1px solid ${BORDER}`, marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: P }}>{v.ukuran}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{formatRp(v.harga)}</span>
                        <span style={{ fontSize: 12, color: v.stok === 0 ? "#ef4444" : "#74a78a" }}>Stok: <strong>{v.stok}</strong></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Action Button ── */
function ActionBtn({ color, onClick, title, children }: { color: string; onClick: () => void; title: string; children: React.ReactNode }) {
    return (
        <button title={title} onClick={onClick} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 8, background: color + "18", color, border: "1.5px solid " + color + "40", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = color; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = color + "18"; (e.currentTarget as HTMLElement).style.color = color; }}>
            {children}
        </button>
    );
}

/* ── Main Page ── */
export default function ProdukPage() {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [search, setSearch] = useState("");
    const [activeJenis, setActiveJenis] = useState("Semua");
    const [showAdd, setShowAdd] = useState(false);
    const [editTarget, setEditTarget] = useState<Product | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
    const [detailTarget, setDetailTarget] = useState<Product | null>(null);

    const filtered = useMemo(() =>
        products.filter(p =>
            (activeJenis === "Semua" || p.jenis === activeJenis) &&
            (p.nama.toLowerCase().includes(search.toLowerCase()) ||
                p.jenis.toLowerCase().includes(search.toLowerCase()) ||
                p.kandungan.toLowerCase().includes(search.toLowerCase()))
        ), [products, activeJenis, search]);

    const tersediaCount = products.filter(p => p.status === "Tersedia").length;
    const habisCount = products.filter(p => p.status === "Habis").length;

    return (
        <>
            {showAdd && <ProductModal open onClose={() => setShowAdd(false)} onSave={d => setProducts(ps => [...ps, { ...d, id: Date.now() }])} />}
            {editTarget && <ProductModal open initial={editTarget} onClose={() => setEditTarget(null)} onSave={d => { setProducts(ps => ps.map(p => p.id === editTarget.id ? { ...d, id: p.id } : p)); setEditTarget(null); }} />}
            {deleteTarget && <DeleteConfirm name={deleteTarget.nama} onConfirm={() => { setProducts(ps => ps.filter(p => p.id !== deleteTarget.id)); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />}
            {detailTarget && <DetailDrawer product={detailTarget} onClose={() => setDetailTarget(null)} />}

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: DK, margin: 0 }}>Manajemen Produk 🌿</h2>
                    <p style={{ fontSize: 13, color: "#74a78a", margin: "4px 0 0" }}>{products.length} produk terdaftar dalam sistem</p>
                </div>
                <button onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: 8, background: P, color: "#fff", border: "none", padding: "12px 22px", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 14px rgba(82,183,136,0.35)", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#2d6a4f"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = P; e.currentTarget.style.transform = "translateY(0)"; }}>
                    + Tambah Produk
                </button>
            </div>

            {/* Search + Filter */}
            <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${BORDER}`, boxShadow: CARD, padding: "14px 18px", marginBottom: 18, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#9ca3af" }}>🔍</span>
                    <input type="text" placeholder="Cari nama, jenis, kandungan..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 10, border: "1.5px solid #e4f2ea", fontSize: 13, outline: "none", fontFamily: "'Poppins', sans-serif", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {JENIS_LIST.map(j => (
                        <button key={j} onClick={() => setActiveJenis(j)} style={{ padding: "7px 14px", borderRadius: 9, fontSize: 12, fontWeight: 600, border: "1.5px solid " + (activeJenis === j ? P : "#e4f2ea"), background: activeJenis === j ? P : "#fff", color: activeJenis === j ? "#fff" : "#4b7a5f", cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}>{j}</button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${BORDER}`, boxShadow: CARD, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                        <thead>
                            <tr style={{ background: `linear-gradient(90deg, ${DK}, #2d6a4f)` }}>
                                {["No", "Foto", "Nama Produk", "Jenis", "Kandungan", "Varian & Harga", "Stok", "Status", "Aksi"].map(h => (
                                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={9} style={{ padding: 48, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>🌿 Tidak ada produk ditemukan</td></tr>
                            ) : filtered.map((p, idx) => {
                                const jc = JENIS_COLORS[p.jenis] ?? { bg: "#f3f4f6", color: "#374151" };
                                const totalStok = p.varian.reduce((a, v) => a + v.stok, 0);
                                return (
                                    <tr key={p.id}
                                        style={{ background: idx % 2 === 0 ? "#fff" : "#f9fdfa", transition: "background 0.15s" }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(82,183,136,0.04)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f9fdfa")}
                                    >
                                        {/* No */}
                                        <td style={{ padding: "12px 16px", fontSize: 12, color: "#9ca3af", fontWeight: 600, borderBottom: `1px solid ${BORDER}` }}>{idx + 1}</td>
                                        {/* Foto */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #d8f3dc, #95d5b2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
                                        </td>
                                        {/* Nama + deskripsi */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, minWidth: 160 }}>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: DK }}>{p.nama}</div>
                                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.deskripsi}</div>
                                        </td>
                                        {/* Jenis */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{ display: "inline-block", padding: "4px 11px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: jc.bg, color: jc.color, whiteSpace: "nowrap" }}>{p.jenis}</span>
                                        </td>
                                        {/* Kandungan */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, maxWidth: 180 }}>
                                            <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>{p.kandungan}</div>
                                        </td>
                                        {/* Varian & harga */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                                {p.varian.map(v => (
                                                    <div key={v.ukuran} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                        <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(82,183,136,0.12)", color: P, padding: "2px 7px", borderRadius: 6 }}>{v.ukuran}</span>
                                                        <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{formatRp(v.harga)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        {/* Stok */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                                {p.varian.map(v => (
                                                    <div key={v.ukuran} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                        <span style={{ fontSize: 10, color: "#9ca3af", width: 32 }}>{v.ukuran}</span>
                                                        <StokBadge stok={v.stok} />
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        {/* Status */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: p.status === "Tersedia" ? "rgba(82,183,136,0.1)" : "rgba(239,68,68,0.1)", color: p.status === "Tersedia" ? "#1b7a4a" : "#dc2626", whiteSpace: "nowrap" }}>
                                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.status === "Tersedia" ? "#52b788" : "#ef4444", flexShrink: 0 }} />
                                                {p.status}
                                            </span>
                                        </td>
                                        {/* Aksi */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", gap: 6 }}>
                                                <ActionBtn color="#3b82f6" onClick={() => setDetailTarget(p)} title="Detail">
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                                </ActionBtn>
                                                <ActionBtn color="#f59e0b" onClick={() => setEditTarget(p)} title="Edit">
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
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
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Menampilkan {filtered.length} dari {products.length} produk</span>
                    <div style={{ display: "flex", gap: 16 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#1b7a4a" }}>✓ {tersediaCount} Tersedia</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#dc2626" }}>✕ {habisCount} Habis Stok</span>
                    </div>
                </div>
            </div>
        </>
    );
}
