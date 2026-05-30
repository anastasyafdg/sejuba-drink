"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ── Types ── */
interface Product {
    id: number;

    name: string;
    category: string;

    image?: string;

    status: "Tersedia" | "Habis";

    price_50: number;
    stock_50: number;

    price_100: number;
    stock_100: number;

    price_250: number;
    stock_250: number;
}

const JENIS_LIST = [
    "Semua",
    "Cold Pressed Juice",
    "Infused Water Drink"
];

const JENIS_COLORS: Record<string, { bg: string; color: string }> = {
    "Cold Pressed Juice": {
        bg: "#d1fae5",
        color: "#065f46"
    },

    "Infused Water Drink": {
        bg: "#dbeafe",
        color: "#1e3a5f"
    },
};

const P = "#52b788";
const DK = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD = "0 2px 16px rgba(27,67,50,0.07)";

function formatRp(n: number) {
    return "Rp " + new Intl.NumberFormat("id-ID").format(n);
}

function StokBadge({ stok }: { stok: number }) {

    const color =
        stok === 0
            ? "#ef4444"
            : stok < 30
                ? "#f59e0b"
                : "#52b788";

    return (
        <span
            style={{
                fontSize: 12,
                fontWeight: 700,
                color
            }}
        >
            {stok}
        </span>
    );
}

/* ───────────────── DETAIL SIDEBAR ───────────────── */

function ProductDetailSidebar({
    product,
    onClose,
}: {
    product: Product | null;
    onClose: () => void;
}) {
    const p = product;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.25)",
                    zIndex: 90,
                    opacity: p ? 1 : 0,
                    pointerEvents: p ? "auto" : "none",
                    transition: "opacity 0.25s",
                }}
            />

            {/* Sidebar panel */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100vh",
                    width: 360,
                    maxWidth: "90vw",
                    background: "#fff",
                    zIndex: 100,
                    boxShadow: "-8px 0 40px rgba(27,67,50,0.15)",
                    transform: p ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                {!p ? null : (
                    <>
                        {/* Header */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "22px 24px 16px",
                                borderBottom: "1px solid #e4f2ea",
                            }}
                        >
                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    fontWeight: 700,
                                    color: DK,
                                }}
                            >
                                Detail Produk
                            </h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#74a78a",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: 4,
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div style={{ padding: "24px 24px 32px" }}>

                            {/* Image */}
                            <div
                                style={{
                                    width: "100%",
                                    height: 180,
                                    borderRadius: 16,
                                    background: "#e8f5e9",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    marginBottom: 20,
                                }}
                            >
                                {p.image ? (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${p.image}`}
                                        alt={p.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            padding: 12,
                                        }}
                                    />
                                ) : (
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.8a7 7 0 0 1-9 8.2z" />
                                        <path d="M9 22v-4" />
                                    </svg>
                                )}
                            </div>

                            {/* Name */}
                            <h3
                                style={{
                                    margin: "0 0 12px",
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: DK,
                                }}
                            >
                                {p.name}
                            </h3>

                            {/* Category + Status badges */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 8,
                                    flexWrap: "wrap",
                                    marginBottom: 24,
                                }}
                            >
                                <span
                                    style={{
                                        padding: "5px 14px",
                                        borderRadius: 20,
                                        background: JENIS_COLORS[p.category]?.bg || "#e8f5e9",
                                        color: JENIS_COLORS[p.category]?.color || "#2d6a4f",
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                >
                                    {p.category}
                                </span>

                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "5px 14px",
                                        borderRadius: 20,
                                        background:
                                            p.status === "Tersedia"
                                                ? "rgba(82,183,136,0.12)"
                                                : "rgba(239,68,68,0.12)",
                                        color:
                                            p.status === "Tersedia"
                                                ? "#1b7a4a"
                                                : "#ef4444",
                                        fontSize: 11,
                                        fontWeight: 700,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            background:
                                                p.status === "Tersedia" ? "#1b7a4a" : "#ef4444",
                                            display: "inline-block",
                                        }}
                                    />
                                    {p.status}
                                </span>
                            </div>

                            {/* Divider */}
                            <div style={{ borderTop: "1px solid #e4f2ea", marginBottom: 20 }} />

                            {/* Varian & Harga */}
                            <p
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    color: "#74a78a",
                                    textTransform: "uppercase",
                                    marginBottom: 14,
                                }}
                            >
                                Varian &amp; Harga
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {[
                                    { label: "50ml", price: p.price_50, stock: p.stock_50 },
                                    { label: "100ml", price: p.price_100, stock: p.stock_100 },
                                    { label: "250ml", price: p.price_250, stock: p.stock_250 },
                                ].map((item) => {
                                    const stockColor =
                                        item.stock === 0
                                            ? "#ef4444"
                                            : item.stock < 30
                                                ? "#f59e0b"
                                                : "#52b788";
                                    return (
                                        <div
                                            key={item.label}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                background: "#f8fcf9",
                                                border: "1px solid #e4f2ea",
                                                borderRadius: 12,
                                                padding: "12px 16px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: P,
                                                    minWidth: 48,
                                                }}
                                            >
                                                {item.label}
                                            </span>

                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: DK,
                                                    flex: 1,
                                                    textAlign: "center",
                                                }}
                                            >
                                                {formatRp(item.price)}
                                            </span>

                                            <span
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: stockColor,
                                                    background: `${stockColor}18`,
                                                    padding: "3px 10px",
                                                    borderRadius: 20,
                                                }}
                                            >
                                                Stok: {item.stock}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

/* ───────────────── MODAL ───────────────── */

function ProductModal({
    open,
    onClose,
    initial,
    refreshProducts,
}: {
    open: boolean;
    onClose: () => void;
    initial?: Product | null;
    refreshProducts: () => void;
}) {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        name: initial?.name || "",

        category:
            initial?.category || "Cold Pressed Juice",

        status:
            initial?.status || "Tersedia",

        price_50:
            initial?.price_50 || 0,

        stock_50:
            initial?.stock_50 || 0,

        price_100:
            initial?.price_100 || 0,

        stock_100:
            initial?.stock_100 || 0,

        price_250:
            initial?.price_250 || 0,

        stock_250:
            initial?.stock_250 || 0,
    });

    const [image, setImage] = useState<File | null>(null);

    const [preview, setPreview] = useState(
        initial?.image
            ? `http://127.0.0.1:8000/storage/${initial.image}`
            : ""
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        if (initial) {

            setForm({

                name: initial.name,

                category: initial.category,

                status: initial.status,

                price_50: initial.price_50,
                stock_50: initial.stock_50,

                price_100: initial.price_100,
                stock_100: initial.stock_100,

                price_250: initial.price_250,
                stock_250: initial.stock_250,
            });

            setPreview(
                initial.image
                    ? `http://127.0.0.1:8000/storage/${initial.image}`
                    : ""
            );
        }

    }, [initial]);

    if (!open) return null;

    // ================= HANDLE IMAGE =================
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("name", form.name);

            formData.append("category", form.category);

            formData.append("status", form.status);

            formData.append(
                "price_50",
                String(form.price_50)
            );

            formData.append(
                "stock_50",
                String(form.stock_50)
            );

            formData.append(
                "price_100",
                String(form.price_100)
            );

            formData.append(
                "stock_100",
                String(form.stock_100)
            );

            formData.append(
                "price_250",
                String(form.price_250)
            );

            formData.append(
                "stock_250",
                String(form.stock_250)
            );

            formData.append(
                "bg_color",
                "#CFE8D3"
            );

            if (image) {
                formData.append("image", image);
            }

            // ================= CREATE =================
            if (!initial) {

                await fetch(
                    "http://127.0.0.1:8000/api/products",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

            } else {

                // ================= UPDATE =================
                await fetch(
                    `http://127.0.0.1:8000/api/products/${initial.id}`,
                    {
                        method: "POST",
                        body: (() => {
                            formData.append("_method", "PUT");
                            return formData;
                        })(),
                    }
                );
            }

            refreshProducts();

            onClose();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        border: "1.5px solid #d0ead9",
        fontSize: 13,
        outline: "none",
        boxSizing: "border-box" as const,
        fontFamily: "'Poppins', sans-serif",
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(4px)",
                }}
                onClick={onClose}
            />

            <div
                style={{
                    position: "relative",
                    background: "#fff",
                    width: 560,
                    maxWidth: "92vw",
                    borderRadius: 20,
                    padding: "28px 32px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: 24,
                        color: DK,
                        fontSize: 20,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <span style={{ color: "#7c3aed", fontSize: 22 }}>✦</span>
                    {initial ? "Edit Produk" : "Tambah Produk"}
                </h2>

                {/* IMAGE */}
                <div style={{ marginBottom: 20 }}>

                    <label
                        style={{
                            display: "block",
                            marginBottom: 8,
                            fontSize: 11,
                            fontWeight: 700,
                            color: DK,
                            letterSpacing: 0.8,
                            textTransform: "uppercase",
                        }}
                    >
                        Foto Produk
                    </label>

                    <div
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        style={{
                            height: 180,
                            borderRadius: 16,
                            border: "2px dashed #95d5b2",
                            cursor: "pointer",
                            overflow: "hidden",
                            background: "#f0faf4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >

                        {preview ? (

                            <img
                                src={preview}
                                alt="Preview"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    padding: "8px",
                                }}
                            />

                        ) : (

                            <div
                                style={{
                                    textAlign: "center",
                                    color: P,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 36,
                                        marginBottom: 8,
                                    }}
                                >
                                    📷
                                </div>

                                <div style={{ fontWeight: 600, fontSize: 13, color: P }}>
                                    Klik untuk upload foto
                                </div>
                                <div style={{ fontSize: 11, color: "#95d5b2", marginTop: 4 }}>
                                    PNG, JPG, WEBP maks. 5MB
                                </div>
                            </div>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>

                {/* NAME */}
                <div style={{ marginBottom: 16 }}>

                    <label
                        style={{
                            display: "block",
                            marginBottom: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            color: DK,
                            letterSpacing: 0.8,
                            textTransform: "uppercase",
                        }}
                    >
                        Nama Produk
                    </label>

                    <input
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                        style={inputStyle}
                    />
                </div>

                {/* CATEGORY + STATUS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>

                    <div>
                        <label
                            style={{
                                display: "block",
                                marginBottom: 6,
                                fontSize: 11,
                                fontWeight: 700,
                                color: DK,
                                letterSpacing: 0.8,
                                textTransform: "uppercase",
                            }}
                        >
                            Jenis Produk
                        </label>

                        <select
                            value={form.category}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    category: e.target.value,
                                })
                            }
                            style={inputStyle}
                        >
                            <option>Cold Pressed Juice</option>
                            <option>Infused Water Drink</option>
                        </select>
                    </div>

                    <div>
                        <label
                            style={{
                                display: "block",
                                marginBottom: 6,
                                fontSize: 11,
                                fontWeight: 700,
                                color: DK,
                                letterSpacing: 0.8,
                                textTransform: "uppercase",
                            }}
                        >
                            Status
                        </label>

                        <select
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status: e.target.value as "Tersedia" | "Habis",
                                })
                            }
                            style={inputStyle}
                        >
                            <option value="Tersedia">Tersedia</option>
                            <option value="Habis">Habis</option>
                        </select>
                    </div>

                </div>

                {/* VARIANTS */}
                <div style={{ marginBottom: 4 }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: 10,
                            fontSize: 11,
                            fontWeight: 700,
                            color: DK,
                            letterSpacing: 0.8,
                            textTransform: "uppercase",
                        }}
                    >
                        Varian &amp; Stok
                    </label>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 12,
                            marginBottom: 20,
                        }}
                    >

                        {[
                            ["50", "50ml"],
                            ["100", "100ml"],
                            ["250", "250ml"],
                        ].map(([size, label]) => (

                            <div
                                key={size}
                                style={{
                                    background: "#f9fdfa",
                                    padding: 14,
                                    borderRadius: 14,
                                    border: `1px solid ${BORDER}`,
                                }}
                            >

                                <div
                                    style={{
                                        fontWeight: 700,
                                        color: P,
                                        marginBottom: 10,
                                        fontSize: 15,
                                    }}
                                >
                                    {label}
                                </div>

                                <label
                                    style={{
                                        display: "block",
                                        fontSize: 11,
                                        color: "#9dbfab",
                                        marginBottom: 4,
                                    }}
                                >
                                    Harga
                                </label>
                                <input
                                    type="number"
                                    value={
                                        form[
                                        `price_${size}` as keyof typeof form
                                        ] as number
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [`price_${size}`]:
                                                Number(e.target.value),
                                        })
                                    }
                                    style={{
                                        ...inputStyle,
                                        marginBottom: 10,
                                    }}
                                />

                                <label
                                    style={{
                                        display: "block",
                                        fontSize: 11,
                                        color: "#9dbfab",
                                        marginBottom: 4,
                                    }}
                                >
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    value={
                                        form[
                                        `stock_${size}` as keyof typeof form
                                        ] as number
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [`stock_${size}`]:
                                                Number(e.target.value),
                                        })
                                    }
                                    style={inputStyle}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* BUTTONS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 10,
                    }}
                >

                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 22px",
                            borderRadius: 10,
                            border: "1px solid #d0ead9",
                            background: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Batal
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            padding: "10px 22px",
                            borderRadius: 10,
                            border: "none",
                            background: P,
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        {loading
                            ? "Menyimpan..."
                            : "Simpan"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ───────────────── MAIN PAGE ───────────────── */

export default function ProdukPage() {

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [activeJenis, setActiveJenis] =
        useState("Semua");

    const [showAdd, setShowAdd] =
        useState(false);

    const [editTarget, setEditTarget] =
        useState<Product | null>(null);

    const [detailTarget, setDetailTarget] =
        useState<Product | null>(null);

    // ================= FETCH PRODUCTS =================
    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                "http://127.0.0.1:8000/api/products"
            );

            const data = await response.json();

            setProducts(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ================= DELETE =================
    const handleDelete = async (id: number) => {

        const confirmDelete = confirm(
            "Yakin ingin menghapus produk?"
        );

        if (!confirmDelete) return;

        try {

            await fetch(
                `http://127.0.0.1:8000/api/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            fetchProducts();

        } catch (error) {

            console.error(error);
        }
    };

    // ================= FILTER =================
    const filtered = useMemo(() => {

        return products.filter((p) =>

            (activeJenis === "Semua" ||
                p.category === activeJenis)

            &&

            p.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [products, activeJenis, search]);

    return (
        <>
            {/* ADD */}
            {showAdd && (

                <ProductModal
                    open
                    onClose={() => setShowAdd(false)}
                    refreshProducts={fetchProducts}
                />
            )}

            {/* EDIT */}
            {editTarget && (

                <ProductModal
                    open
                    initial={editTarget}
                    onClose={() => setEditTarget(null)}
                    refreshProducts={fetchProducts}
                />
            )}

            {/* DETAIL SIDEBAR */}
            <ProductDetailSidebar
                product={detailTarget}
                onClose={() => setDetailTarget(null)}
            />

            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                }}
            >

                <div>

                    <h2
                        style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: DK,
                            margin: 0,
                            fontFamily: "'Poppins', sans-serif",
                        }}
                    >
                        Manajemen Produk
                    </h2>

                    <p
                        style={{
                            color: "#74a78a",
                            marginTop: 4,
                            fontSize: 13,
                        }}
                    >
                        {products.length} produk terdaftar dalam sistem
                    </p>
                </div>

                <button
                    onClick={() => setShowAdd(true)}
                    style={{
                        background: P,
                        color: "#fff",
                        border: "none",
                        padding: "12px 22px",
                        borderRadius: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(82,183,136,0.3)",
                        transition: "all 0.2s",
                        fontFamily: "'Poppins', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#2d6a4f";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(82,183,136,0.45)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = P;
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(82,183,136,0.3)";
                    }}
                >
                    + Tambah Produk
                </button>
            </div>

            {/* SEARCH & FILTER BAR */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: `1px solid ${BORDER}`,
                    padding: "16px 20px",
                    marginBottom: 20,
                    boxShadow: CARD,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                }}
            >
                {/* SEARCH INPUT */}
                <div style={{ position: "relative", flex: 1, minWidth: 280 }}>
                    <span style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#74a78a",
                        display: "flex",
                        alignItems: "center",
                        pointerEvents: "none"
                    }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Cari nama, jenis, kandungan..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "11px 14px 11px 40px",
                            borderRadius: 10,
                            border: "1.5px solid #d0ead9",
                            outline: "none",
                            fontSize: 13,
                            color: "#1b4332",
                            fontFamily: "'Poppins', sans-serif",
                        }}
                    />
                </div>

                {/* FILTER BUTTONS */}
                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center"
                    }}
                >
                    {JENIS_LIST.map((j) => (
                        <button
                            key={j}
                            onClick={() =>
                                setActiveJenis(j)
                            }
                            style={{
                                padding: "10px 18px",
                                borderRadius: 10,
                                border:
                                    activeJenis === j
                                        ? "none"
                                        : "1.5px solid #d0ead9",
                                background:
                                    activeJenis === j
                                        ? P
                                        : "#fff",
                                color:
                                    activeJenis === j
                                        ? "#fff"
                                        : "#4b7a5f",
                                cursor: "pointer",
                                fontWeight: 600,
                                fontSize: 13,
                                fontFamily: "'Poppins', sans-serif",
                                transition: "all 0.2s"
                            }}
                        >
                            {j}
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLE CARD */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: 18,
                    overflow: "hidden",
                    border: `1px solid ${BORDER}`,
                    boxShadow: CARD,
                    marginBottom: 30,
                }}
            >

                <div
                    style={{
                        overflowX: "auto",
                    }}
                >

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            minWidth: 900,
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    background: DK,
                                }}
                            >

                                {[
                                    "NO",
                                    "FOTO",
                                    "NAMA PRODUK",
                                    "JENIS",
                                    "VARIAN & HARGA",
                                    "STOK",
                                    "STATUS",
                                    "AKSI",
                                ].map((h) => (

                                    <th
                                        key={h}
                                        style={{
                                            padding: "16px 20px",
                                            textAlign: "left",
                                            color: "#fff",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan={8}
                                        style={{
                                            padding: 40,
                                            textAlign: "center",
                                            color: "#74a78a",
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        Loading...
                                    </td>
                                </tr>

                            ) : filtered.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan={8}
                                        style={{
                                            padding: 40,
                                            textAlign: "center",
                                            color: "#74a78a",
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    >
                                        Tidak ada produk
                                    </td>
                                </tr>

                            ) : (

                                filtered.map((p, idx) => {

                                    const totalStock =
                                        p.stock_50 +
                                        p.stock_100 +
                                        p.stock_250;

                                    return (

                                        <tr
                                            key={p.id}
                                            style={{
                                                background: "#fff",
                                                borderBottom: "1.5px solid #e4f2ea",
                                            }}
                                        >

                                            {/* NO */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                    color: "#74a78a",
                                                    fontWeight: 500,
                                                    fontSize: 13,
                                                }}
                                            >
                                                {idx + 1}
                                            </td>

                                            {/* FOTO */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: 12,
                                                        background: "#e8f5e9",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {p.image ? (
                                                        <img
                                                            src={`http://127.0.0.1:8000/storage/${p.image}`}
                                                            alt={p.name}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    ) : (
                                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#52b788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.8a7 7 0 0 1-9 8.2z" />
                                                            <path d="M9 22v-4" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </td>

                                            {/* NAMA PRODUK */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 700,
                                                        color: DK,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {p.name}
                                                </div>
                                            </td>

                                            {/* JENIS */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        padding: "6px 14px",
                                                        borderRadius: 20,
                                                        background: JENIS_COLORS[p.category]?.bg || "#e8f5e9",
                                                        color: JENIS_COLORS[p.category]?.color || "#2d6a4f",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    {p.category}
                                                </span>
                                            </td>

                                            {/* VARIAN & HARGA */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 6,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {[
                                                        { label: "50ml", price: p.price_50 },
                                                        { label: "100ml", price: p.price_100 },
                                                        { label: "250ml", price: p.price_250 }
                                                    ].map((item, i) => (
                                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                            <span style={{ color: "#74a78a", fontWeight: 600, width: 45 }}>
                                                                {item.label}
                                                            </span>
                                                            <span style={{ color: "#1b4332", fontWeight: 700 }}>
                                                                {formatRp(item.price)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* STOK */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 6,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {[
                                                        { label: "50ml", stock: p.stock_50 },
                                                        { label: "100ml", stock: p.stock_100 },
                                                        { label: "250ml", stock: p.stock_250 }
                                                    ].map((item, i) => {
                                                        const color = item.stock === 0
                                                            ? "#ef4444"
                                                            : item.stock < 30
                                                                ? "#f59e0b"
                                                                : "#52b788";
                                                        return (
                                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                                <span style={{ color: "#a8c5b2", fontWeight: 500, width: 45 }}>
                                                                    {item.label}
                                                                </span>
                                                                <span style={{ color, fontWeight: 700 }}>
                                                                    {item.stock}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </td>

                                            {/* STATUS */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        padding: "6px 14px",
                                                        borderRadius: 20,
                                                        background:
                                                            p.status === "Tersedia"
                                                                ? "rgba(82,183,136,0.12)"
                                                                : "rgba(239,68,68,0.12)",
                                                        color:
                                                            p.status === "Tersedia"
                                                                ? "#1b7a4a"
                                                                : "#ef4444",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: 6,
                                                            height: 6,
                                                            borderRadius: "50%",
                                                            background:
                                                                p.status === "Tersedia"
                                                                    ? "#1b7a4a"
                                                                    : "#ef4444",
                                                            marginRight: 6,
                                                            display: "inline-block",
                                                        }}
                                                    />
                                                    {p.status}
                                                </span>
                                            </td>

                                            {/* AKSI */}
                                            <td
                                                style={{
                                                    padding: "16px 20px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 8,
                                                    }}
                                                >
                                                    {/* VIEW/DETAIL BUTTON */}
                                                    <button
                                                        onClick={() => setDetailTarget(p)}
                                                        style={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 8,
                                                            border: "1.5px solid rgba(59,130,246,0.15)",
                                                            background: "rgba(59,130,246,0.06)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s",
                                                        }}
                                                        title="Detail Produk"
                                                        onMouseEnter={(e) => {
                                                            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.06)";
                                                        }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="11" cy="11" r="8" />
                                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                        </svg>
                                                    </button>

                                                    {/* EDIT BUTTON */}
                                                    <button
                                                        onClick={() => setEditTarget(p)}
                                                        style={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 8,
                                                            border: "1.5px solid rgba(245,158,11,0.15)",
                                                            background: "rgba(245,158,11,0.06)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s",
                                                        }}
                                                        title="Edit Produk"
                                                        onMouseEnter={(e) => {
                                                            (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.12)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.06)";
                                                        }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M12 20h9" />
                                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                        </svg>
                                                    </button>

                                                    {/* DELETE BUTTON */}
                                                    <button
                                                        onClick={() => handleDelete(p.id)}
                                                        style={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 8,
                                                            border: "1.5px solid rgba(239,68,68,0.15)",
                                                            background: "rgba(239,68,68,0.06)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s",
                                                        }}
                                                        title="Hapus Produk"
                                                        onMouseEnter={(e) => {
                                                            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)";
                                                        }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                            <line x1="10" y1="11" x2="10" y2="17" />
                                                            <line x1="14" y1="11" x2="14" y2="17" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* TABLE FOOTER */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                        borderTop: "1px solid #e4f2ea",
                        background: "#fff",
                        flexWrap: "wrap",
                        gap: 12
                    }}
                >
                    {/* Left: display count */}
                    <div style={{ color: "#74a78a", fontSize: 13, fontWeight: 500 }}>
                        Menampilkan {filtered.length} dari {products.length} produk
                    </div>

                    {/* Right: stats */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#1b7a4a", fontSize: 13, fontWeight: 700 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{products.filter(p => p.status === "Tersedia").length} Tersedia</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#ef4444", fontSize: 13, fontWeight: 700 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            <span>{products.filter(p => p.status === "Habis").length} Habis Stok</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}