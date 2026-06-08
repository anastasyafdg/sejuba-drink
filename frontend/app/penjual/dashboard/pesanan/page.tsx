"use client";

import { useState, useMemo, useEffect } from "react";

/* ── Types (sesuai struktur API Laravel) ── */
type StatusPesanan = "Diproses" | "Dikirim" | "Selesai";

interface ApiDetailPesanan {
    id_detail: number;
    id_pesanan: number;
    id_produk: number;
    ukuran: string;
    jumlah: number;
    harga_satuan: number;
    subtotal: number;
    produk?: {
        id: number;
        name: string;
        [key: string]: any;
    };
}

interface ApiPembeli {
    id_pembeli: number;
    nama_pembeli: string;
    email: string;
    no_telepon: string;
    [key: string]: any;
}

interface ApiPesanan {
    id_pesanan: number;
    id_pembeli: number;
    tanggal_pesanan: string;
    total_harga: number;
    alamat_pengiriman: string;
    status_pembayaran: string;
    status_pesanan: string;
    pembeli?: ApiPembeli;
    detail_pesanan?: ApiDetailPesanan[];
    [key: string]: any;
}

/* ── Helpers ── */
const P = "#52b788";
const DK = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD = "0 2px 16px rgba(27,67,50,0.07)";

function formatRp(n: number) {
    if (isNaN(n) || n === undefined || n === null) return "Rp 0";
    return "Rp " + new Intl.NumberFormat("id-ID").format(n);
}

function formatTanggal(raw: string): string {
    if (!raw) return "-";
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const STATUS_STYLE: Record<StatusPesanan, { bg: string; color: string; dot: string }> = {
    Diproses: { bg: "rgba(245,158,11,0.12)", color: "#b45309", dot: "#f59e0b" },
    Dikirim: { bg: "rgba(59,130,246,0.1)", color: "#1d4ed8", dot: "#3b82f6" },
    Selesai: { bg: "rgba(82,183,136,0.12)", color: "#1b7a4a", dot: "#52b788" },
};

const VALID_STATUSES: StatusPesanan[] = ["Diproses", "Dikirim", "Selesai"];

function isValidStatus(s: string): s is StatusPesanan {
    return VALID_STATUSES.includes(s as StatusPesanan);
}

const AVATAR_COLORS = ["#52b788", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
function avatarColor(name: string) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

/* ── Helper: ambil field dari ApiPesanan ── */
function getNamaPelanggan(p: ApiPesanan): string {
    return p.pembeli?.nama_pembeli || "-";
}
function getNoTelepon(p: ApiPesanan): string {
    return p.pembeli?.no_telepon || "-";
}
function getNamaProduk(p: ApiPesanan): string {
    return p.detail_pesanan?.[0]?.produk?.name || "-";
}
function getQty(p: ApiPesanan): number {
    // jumlah total qty dari semua detail
    if (!p.detail_pesanan || p.detail_pesanan.length === 0) return 0;
    return p.detail_pesanan.reduce((sum, d) => sum + (d.jumlah || 0), 0);
}
function getTotalHarga(p: ApiPesanan): number {
    return Number(p.total_harga) || 0;
}
function getOngkir(p: ApiPesanan): number {
    // ongkir tidak ada di model, default 0
    return 0;
}
function getStatus(p: ApiPesanan): StatusPesanan {
    const s = p.status_pesanan;
    if (isValidStatus(s)) return s;
    // fallback: status lain dari API ("Menunggu Konfirmasi", dll) → tampilkan Diproses
    return "Diproses";
}

/* ── Detail Modal ── */
function DetailModal({ pesanan, onClose }: { pesanan: ApiPesanan; onClose: () => void }) {
    const subTotal = getTotalHarga(pesanan);
    const ongkir = getOngkir(pesanan);
    const grandTotal = subTotal + ongkir;

    const RowInfo = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: "#6b7280", width: 140, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 13, color: "#111827", fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
        </div>
    );

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 16, width: 460, maxWidth: "94vw", boxShadow: "0 24px 64px rgba(0,0,0,0.15)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto", padding: "30px 26px" }}>

                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: "0 0 24px 0", fontFamily: "'Poppins', sans-serif" }}>
                    Detail Pesanan #{pesanan.id_pesanan}
                </h2>

                {/* Section 1: Informasi Pesanan */}
                <div style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: "20px 20px 6px 20px", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 18px 0" }}>Informasi Pesanan</h3>
                    <RowInfo label="Pelanggan" value={getNamaPelanggan(pesanan)} />
                    <RowInfo label="No. HP" value={getNoTelepon(pesanan)} />
                    <RowInfo label="Alamat" value={pesanan.alamat_pengiriman || "-"} />
                    <RowInfo label="Tanggal Pesan" value={formatTanggal(pesanan.tanggal_pesanan)} />
                </div>

                {/* Section 2: Rincian Pesanan */}
                <div style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: "20px", marginBottom: 8 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 18px 0" }}>Rincian Pesanan</h3>

                    {/* Items dari detail_pesanan */}
                    {(pesanan.detail_pesanan && pesanan.detail_pesanan.length > 0)
                        ? pesanan.detail_pesanan.map((d, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{d.produk?.name || "-"}</div>
                                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{d.jumlah} pcs</div>
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                                    {formatRp(Number(d.subtotal) || 0)}
                                </div>
                            </div>
                        ))
                        : (
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{getNamaProduk(pesanan)}</div>
                                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{getQty(pesanan)} pcs</div>
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                                    {formatRp(subTotal)}
                                </div>
                            </div>
                        )
                    }

                    <div style={{ height: 1, background: "#f3f4f6", margin: "0 0 16px 0" }} />

                    {/* Subtotals */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>Subtotal</span>
                        <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{formatRp(subTotal)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                        <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>Ongkir</span>
                        <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{formatRp(ongkir)}</span>
                    </div>

                    {/* Total */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, color: "#16a34a", fontWeight: 700 }}>Total Pembayaran</span>
                        <span style={{ fontSize: 14, color: "#16a34a", fontWeight: 700 }}>{formatRp(grandTotal)}</span>
                    </div>
                </div>

                <button onClick={onClose} style={{ position: "absolute", top: 26, right: 26, background: "none", border: "none", fontSize: 20, color: "#9ca3af", cursor: "pointer" }}>✕</button>

            </div>
        </div>
    );
}

/* ── Invoice Modal ── */
function InvoiceModal({ pesanan, onClose }: { pesanan: ApiPesanan; onClose: () => void }) {
    const subTotal = getTotalHarga(pesanan);
    const ongkir = getOngkir(pesanan);
    const grandTotal = subTotal + ongkir;

    const RowInfo = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: "#6b7280", width: 140, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 13, color: "#111827", fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
        </div>
    );

    const handlePrint = () => {
        const el = document.getElementById("invoice-print-area");
        if (!el) return;
        const w = window.open("", "_blank", "width=700,height=900");
        if (!w) return;
        w.document.write(`
            <!DOCTYPE html><html><head>
            <title>Invoice #${pesanan.id_pesanan}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap');
                * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #111827; }
                .print-container { max-width: 600px; margin: 0 auto; }
            </style></head><body>
            <div class="print-container">
                ${el.innerHTML}
            </div>
            </body></html>
        `);
        w.document.close();
        w.focus();
        setTimeout(() => { w.print(); w.close(); }, 300);
    };

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(5px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 16, width: 460, maxWidth: "94vw", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto", padding: "30px 26px" }}>

                {/* Wrapper untuk area cetak */}
                <div id="invoice-print-area">
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: "0 0 24px 0", fontFamily: "'Poppins', sans-serif" }}>
                        Invoice #{pesanan.id_pesanan}
                    </h2>

                    {/* Section 1: Informasi Pesanan */}
                    <div style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: "20px 20px 6px 20px", marginBottom: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 18px 0" }}>Informasi Pesanan</h3>
                        <RowInfo label="Pelanggan" value={getNamaPelanggan(pesanan)} />
                        <RowInfo label="No. HP" value={getNoTelepon(pesanan)} />
                        <RowInfo label="Alamat" value={pesanan.alamat_pengiriman || "-"} />
                        <RowInfo label="Tanggal Pesan" value={formatTanggal(pesanan.tanggal_pesanan)} />
                    </div>

                    {/* Section 2: Rincian Pesanan */}
                    <div style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: "20px", marginBottom: 8 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 18px 0" }}>Rincian Pesanan</h3>

                        {/* Items */}
                        {(pesanan.detail_pesanan && pesanan.detail_pesanan.length > 0)
                            ? pesanan.detail_pesanan.map((d, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{d.produk?.name || "-"}</div>
                                        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{d.jumlah} pcs</div>
                                    </div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                                        {formatRp(Number(d.subtotal) || 0)}
                                    </div>
                                </div>
                            ))
                            : (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{getNamaProduk(pesanan)}</div>
                                        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{getQty(pesanan)} pcs</div>
                                    </div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                                        {formatRp(subTotal)}
                                    </div>
                                </div>
                            )
                        }

                        <div style={{ height: 1, background: "#f3f4f6", margin: "0 0 16px 0" }} />

                        {/* Subtotals */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                            <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>Subtotal</span>
                            <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{formatRp(subTotal)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                            <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>Ongkir</span>
                            <span style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{formatRp(ongkir)}</span>
                        </div>

                        {/* Total */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 14, color: "#16a34a", fontWeight: 700 }}>Total Pembayaran</span>
                            <span style={{ fontSize: 14, color: "#16a34a", fontWeight: 700 }}>{formatRp(grandTotal)}</span>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
                    <button onClick={onClose} style={{ padding: "10px 22px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Tutup</button>
                    <button onClick={handlePrint} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 22px", borderRadius: 10, border: "none", background: "#16a34a", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 4px 12px rgba(22,163,74,0.2)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                        Cetak / Print
                    </button>
                </div>

                <button onClick={onClose} style={{ position: "absolute", top: 26, right: 26, background: "none", border: "none", fontSize: 20, color: "#9ca3af", cursor: "pointer" }}>✕</button>

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
    const [pesanan, setPesanan] = useState<ApiPesanan[]>([]);
    const [search, setSearch] = useState("");
    const [activeStatus, setActiveStatus] = useState<"Semua" | StatusPesanan>("Semua");
    const [detailTarget, setDetailTarget] = useState<ApiPesanan | null>(null);
    const [invoiceTarget, setInvoiceTarget] = useState<ApiPesanan | null>(null);

    useEffect(() => {
        const loadPesanan = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/pesanan");
                const data = await response.json();

                console.log("[PesananPage] Raw API data:", data);
                if (data.data && data.data.length > 0) {
                    console.log("[PesananPage] Contoh item pertama:", data.data[0]);
                    console.log("[PesananPage] status_pesanan:", data.data[0].status_pesanan);
                    console.log("[PesananPage] total_harga:", data.data[0].total_harga);
                    console.log("[PesananPage] detail_pesanan:", data.data[0].detail_pesanan);
                }

                setPesanan(data.data || []);
            } catch (error) {
                console.error("[PesananPage] Gagal fetch:", error);
            }
        };

        loadPesanan();
    }, []);

    // Update status lokal sementara (optimistic update)
    const updateStatus = (id: number, status: StatusPesanan) =>
        setPesanan(ps => ps.map(p => p.id_pesanan === id ? { ...p, status_pesanan: status } : p));

    const filtered = useMemo(() => {
        return pesanan.filter((p: ApiPesanan) => {
            const namaPembeli = p.pembeli?.nama_pembeli || "";
            const namaProduk = p.detail_pesanan?.[0]?.produk?.name || "";
            const statusPesanan = p.status_pesanan || "";

            // Filter status: cocokkan dengan status_pesanan dari API
            const statusMatch =
                activeStatus === "Semua" ||
                statusPesanan === activeStatus;

            // Filter pencarian
            const searchMatch =
                p.id_pesanan
                    .toString()
                    .includes(search) ||
                namaPembeli
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                namaProduk
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return statusMatch && searchMatch;
        });
    }, [pesanan, activeStatus, search]);

    // Total pendapatan dari total_harga
    const totalPendapatan = pesanan.reduce((s, p) => s + getTotalHarga(p), 0);

    // Hitung stat berdasarkan status_pesanan
    const countOf = (s: StatusPesanan) =>
        pesanan.filter(p => p.status_pesanan === s).length;

    const [page, setPage] = useState(1);
    const PER_PAGE = 10;
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const safePage = Math.min(page, totalPages);
    const paginated = useMemo(() =>
        filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE),
        [filtered, safePage]
    );

    return (
        <>
            {detailTarget && <DetailModal pesanan={detailTarget} onClose={() => setDetailTarget(null)} />}
            {invoiceTarget && <InvoiceModal pesanan={invoiceTarget} onClose={() => setInvoiceTarget(null)} />}

            {/* Header */}
            <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: DK, margin: 0 }}>Manajemen Pesanan</h2>
                <p style={{ fontSize: 13, color: "#74a78a", margin: "4px 0 0", fontWeight: 500 }}>
                    {pesanan.length} total pesanan &nbsp;·&nbsp; Pendapatan: <strong style={{ color: DK }}>{formatRp(totalPendapatan)}</strong>
                </p>
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 }}>
                <StatCard icon="📋" value={pesanan.length} label="Total Pesanan" color="#52b788" />
                <StatCard icon="📦" value={countOf("Diproses")} label="Diproses" color="#f59e0b" />
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
                                {["ID", "Nama Pelanggan", "Nama Produk", "Total Produk", "Total Harga", "Status", "Tanggal", "Invoice", "Aksi"].map(h => (
                                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={9} style={{ padding: 48, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                                        📦 Tidak ada pesanan ditemukan
                                    </td>
                                </tr>
                            ) : paginated.map((p, idx) => {
                                const namaPelanggan = getNamaPelanggan(p);
                                const ac = avatarColor(namaPelanggan);
                                const ini = namaPelanggan.charAt(0).toUpperCase() || "?";
                                const statusVal = getStatus(p);
                                const statusStyle = STATUS_STYLE[statusVal] ?? STATUS_STYLE["Diproses"];

                                return (
                                    <tr key={p.id_pesanan}
                                        style={{ background: idx % 2 === 0 ? "#fff" : "#f9fdfa", transition: "background 0.15s" }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(82,183,136,0.04)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#f9fdfa")}
                                    >
                                        {/* ID */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: DK, fontFamily: "'Poppins', sans-serif" }}>#{p.id_pesanan}</span>
                                        </td>

                                        {/* Nama Pelanggan */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{ini}</div>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{namaPelanggan}</span>
                                            </div>
                                        </td>

                                        {/* Nama Produk */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>
                                            {getNamaProduk(p)}
                                        </td>

                                        {/* Total Produk (qty) */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 700, color: DK, textAlign: "center" }}>
                                            {getQty(p)} pcs
                                        </td>

                                        {/* Total Harga */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 700, color: DK, whiteSpace: "nowrap" }}>
                                            {formatRp(getTotalHarga(p))}
                                        </td>

                                        {/* Status */}
                                        <td style={{ padding: "10px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <select
                                                value={statusVal}
                                                onChange={e => updateStatus(p.id_pesanan, e.target.value as StatusPesanan)}
                                                style={{ padding: "5px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: `1.5px solid ${statusStyle.dot}`, background: statusStyle.bg, color: statusStyle.color, cursor: "pointer", outline: "none", fontFamily: "'Poppins', sans-serif", appearance: "auto" }}
                                            >
                                                <option value="Diproses">Diproses</option>
                                                <option value="Dikirim">Dikirim</option>
                                                <option value="Selesai">Selesai</option>
                                            </select>
                                        </td>

                                        {/* Tanggal */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>
                                            {formatTanggal(p.tanggal_pesanan)}
                                        </td>

                                        {/* Invoice */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <button
                                                onClick={() => setInvoiceTarget(p)}
                                                style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 9, border: "1.5px solid #d0ead9", background: "#f0faf4", color: DK, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap" }}
                                                onMouseEnter={e => { e.currentTarget.style.background = DK; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = DK; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = "#f0faf4"; e.currentTarget.style.color = DK; e.currentTarget.style.borderColor = "#d0ead9"; }}
                                            >
                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                                                Invoice
                                            </button>
                                        </td>

                                        {/* Aksi */}
                                        <td style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}` }}>
                                            <button
                                                onClick={() => setDetailTarget(p)}
                                                style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 9, border: "1.5px solid #e4f2ea", background: "#f9fdfa", color: "#4b7a5f", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap" }}
                                                onMouseEnter={e => { e.currentTarget.style.background = P; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = P; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = "#f9fdfa"; e.currentTarget.style.color = "#4b7a5f"; e.currentTarget.style.borderColor = "#e4f2ea"; }}
                                            >
                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={{ padding: "13px 18px", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9fdfa", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Menampilkan {paginated.length} dari {filtered.length} pesanan</span>
                    {totalPages > 1 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                                style={{ padding: "5px 12px", borderRadius: 8, border: "1.5px solid #e4f2ea", background: safePage === 1 ? "#f9fdfa" : "#fff", color: safePage === 1 ? "#c4d9cc" : DK, fontSize: 12, fontWeight: 700, cursor: safePage === 1 ? "default" : "pointer", fontFamily: "'Poppins', sans-serif" }}>
                                ←
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                <button key={n} onClick={() => setPage(n)}
                                    style={{ width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${n === safePage ? P : "#e4f2ea"}`, background: n === safePage ? P : "#fff", color: n === safePage ? "#fff" : DK, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
                                    {n}
                                </button>
                            ))}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                                style={{ padding: "5px 12px", borderRadius: 8, border: "1.5px solid #e4f2ea", background: safePage === totalPages ? "#f9fdfa" : "#fff", color: safePage === totalPages ? "#c4d9cc" : DK, fontSize: 12, fontWeight: 700, cursor: safePage === totalPages ? "default" : "pointer", fontFamily: "'Poppins', sans-serif" }}>
                                →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
