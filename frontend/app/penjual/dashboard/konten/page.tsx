"use client";

import { useState, useRef } from "react";

// ── Color tokens ────────────────────────────────────────
const P = "#52b788";
const DK = "#1b4332";
const BORDER = "rgba(82,183,136,0.15)";
const CARD = "0 2px 16px rgba(27,67,50,0.07)";

// ── Types ───────────────────────────────────────────────
type SectionType = "teks" | "gambar" | "hero";

interface ContentSection {
    id: number;
    type: SectionType;
    content: string;     // teks / URL gambar
    editing: boolean;
}

interface PageContent {
    sections: ContentSection[];
}

// ── Default data ─────────────────────────────────────────
const DEFAULT_PAGES: Record<string, PageContent> = {
    "HOME PAGE": {
        sections: [
            { id: 1, type: "teks", content: "Selamat datang di **Sejuba Drink** — minuman sehat untuk gaya hidup aktif Anda!", editing: false },
            { id: 2, type: "gambar", content: "", editing: false },
        ],
    },
    "TENTANG KAMI": {
        sections: [
            { id: 10, type: "teks", content: "Sejuba Drink adalah brand minuman kesehatan berbasis bahan-bahan alami pilihan Indonesia.", editing: false },
            { id: 11, type: "gambar", content: "", editing: false },
        ],
    },
    "PRODUK": {
        sections: [
            { id: 20, type: "teks", content: "Temukan berbagai pilihan minuman sehat Sejuba Drink untuk mendukung gaya hidupmu.", editing: false },
        ],
    },
    "KONTAK": {
        sections: [
            { id: 30, type: "teks", content: "Hubungi kami melalui email: hello@sejubadrink.com atau WhatsApp: +62 812-xxxx-xxxx", editing: false },
        ],
    },
};

const PAGES = Object.keys(DEFAULT_PAGES);

// ── Render bold text (** notation) ──────────────────────
function RenderText({ text }: { text: string }) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
        <span>
            {parts.map((part, i) =>
                i % 2 === 1
                    ? <strong key={i} style={{ color: DK }}>{part}</strong>
                    : <span key={i}>{part}</span>
            )}
        </span>
    );
}

// ── Image Upload Box ─────────────────────────────────────
function ImageBox({ src, onUpload, onRemove, editing }: {
    src: string;
    onUpload: (url: string) => void;
    onRemove: () => void;
    editing: boolean;
}) {
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => onUpload(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Preview */}
            <div style={{
                width: 200, height: 140, borderRadius: 12,
                background: src ? "transparent" : "linear-gradient(135deg, #d8f3dc, #b7e4c7)",
                border: src ? "none" : "2px dashed #95d5b2",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", flexShrink: 0,
            }}>
                {src
                    ? <img src={src} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
                    : <div style={{ textAlign: "center", color: "#74a78a" }}>
                        <div style={{ fontSize: 36, marginBottom: 6 }}>🖼️</div>
                        <div style={{ fontSize: 12 }}>Belum ada gambar</div>
                    </div>
                }
            </div>

            {/* Buttons */}
            {editing && (
                <div style={{ display: "flex", gap: 10 }}>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
                    <button
                        onClick={() => fileRef.current?.click()}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, border: `1.5px solid ${P}`, background: "#fff", color: P, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = P; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = P; }}
                    >
                        🖼️ Upload gambar
                    </button>
                    {src && (
                        <button
                            onClick={onRemove}
                            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, border: "1.5px solid #fca5a5", background: "#fff", color: "#ef4444", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
                        >
                            🗑️ Hapus gambar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Section Card ─────────────────────────────────────────
function SectionCard({
    section, onEdit, onSave, onCancel, onTextChange, onImageUpload, onImageRemove, onDelete,
}: {
    section: ContentSection;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onTextChange: (v: string) => void;
    onImageUpload: (url: string) => void;
    onImageRemove: () => void;
    onDelete: () => void;
}) {
    return (
        <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${BORDER}`, boxShadow: CARD, overflow: "hidden", marginBottom: 16 }}>
            {/* Card header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: `1px solid ${BORDER}`, background: "#f9fdfa" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#74a78a", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {section.type === "teks" ? "📝 Teks" : "🖼️ Gambar"}
                    </span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {!section.editing ? (
                        <>
                            <button onClick={onEdit} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8, border: `1.5px solid ${BORDER}`, background: "#fff", color: "#4b7a5f", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(82,183,136,0.06)"}
                                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                                ✏️ Edit
                            </button>
                            <button onClick={onDelete} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8, border: "1.5px solid #fca5a5", background: "#fff", color: "#ef4444", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                                onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                                🗑️
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={onSave} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: P, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", boxShadow: "0 3px 10px rgba(82,183,136,0.3)" }}>
                                💾 Simpan
                            </button>
                            <button onClick={onCancel} style={{ padding: "6px 14px", borderRadius: 8, border: `1.5px solid ${BORDER}`, background: "#fff", color: "#9ca3af", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
                                Batal
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "18px 20px" }}>
                {section.type === "teks" ? (
                    section.editing ? (
                        <textarea
                            value={section.content}
                            onChange={e => onTextChange(e.target.value)}
                            rows={4}
                            placeholder="Tulis konten teks di sini... Gunakan **teks** untuk cetak tebal."
                            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid #d0ead9`, fontSize: 14, fontFamily: "'Poppins', sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box", color: "#374151", lineHeight: 1.7 }}
                        />
                    ) : (
                        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, margin: 0 }}>
                            {section.content
                                ? <RenderText text={section.content} />
                                : <span style={{ color: "#9ca3af", fontStyle: "italic" }}>Belum ada konten teks.</span>
                            }
                        </p>
                    )
                ) : (
                    <ImageBox
                        src={section.content}
                        editing={section.editing}
                        onUpload={onImageUpload}
                        onRemove={onImageRemove}
                    />
                )}
            </div>
        </div>
    );
}

// ── Add Section Modal ────────────────────────────────────
function AddSectionModal({ onAdd, onClose }: { onAdd: (type: SectionType) => void; onClose: () => void }) {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,67,50,0.35)", backdropFilter: "blur(4px)" }} onClick={onClose} />
            <div style={{ position: "relative", background: "#fff", borderRadius: 20, padding: "28px 32px", width: 420, boxShadow: "0 24px 64px rgba(27,67,50,0.2)" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: DK, margin: "0 0 20px" }}>+ Tambah Section</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {([
                        { type: "teks" as const, label: "Konten Teks", icon: "📝", desc: "Paragraf / heading teks" },
                        { type: "gambar" as const, label: "Gambar", icon: "🖼️", desc: "Upload foto / banner" },
                    ]).map(opt => (
                        <button key={opt.type} onClick={() => { onAdd(opt.type); onClose(); }}
                            style={{ padding: "20px 16px", borderRadius: 14, border: `2px solid ${BORDER}`, background: "#f9fdfa", cursor: "pointer", textAlign: "left", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${P}`; e.currentTarget.style.background = "rgba(82,183,136,0.06)"; }}
                            onMouseLeave={e => { e.currentTarget.style.border = `2px solid ${BORDER}`; e.currentTarget.style.background = "#f9fdfa"; }}
                        >
                            <div style={{ fontSize: 32, marginBottom: 8 }}>{opt.icon}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: DK, marginBottom: 3 }}>{opt.label}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af" }}>{opt.desc}</div>
                        </button>
                    ))}
                </div>
                <button onClick={onClose} style={{ marginTop: 16, width: "100%", padding: "10px", borderRadius: 10, border: `1.5px solid ${BORDER}`, background: "#fff", color: "#9ca3af", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Batal</button>
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────
export default function KontenPage() {
    const [activePage, setActivePage] = useState(PAGES[0]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [pages, setPages] = useState(DEFAULT_PAGES);
    const [savedState, setSavedState] = useState<Record<number, string>>({});
    const [toast, setToast] = useState("");

    const sections = pages[activePage]?.sections ?? [];

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const updateSection = (id: number, patch: Partial<ContentSection>) => {
        setPages(prev => ({
            ...prev,
            [activePage]: {
                sections: prev[activePage].sections.map(s => s.id === id ? { ...s, ...patch } : s),
            },
        }));
    };

    const handleEdit = (id: number) => {
        const section = sections.find(s => s.id === id)!;
        setSavedState(prev => ({ ...prev, [id]: section.content }));
        updateSection(id, { editing: true });
    };

    const handleSave = (id: number) => {
        updateSection(id, { editing: false });
        showToast("✅ Konten berhasil disimpan!");
    };

    const handleCancel = (id: number) => {
        updateSection(id, { editing: false, content: savedState[id] ?? "" });
    };

    const handleDelete = (id: number) => {
        setPages(prev => ({
            ...prev,
            [activePage]: {
                sections: prev[activePage].sections.filter(s => s.id !== id),
            },
        }));
        showToast("🗑️ Section dihapus.");
    };

    const handleAddSection = (type: SectionType) => {
        const newSection: ContentSection = {
            id: Date.now(),
            type,
            content: "",
            editing: true,
        };
        setPages(prev => ({
            ...prev,
            [activePage]: {
                sections: [...(prev[activePage]?.sections ?? []), newSection],
            },
        }));
    };

    return (
        <>
            {showAddModal && <AddSectionModal onAdd={handleAddSection} onClose={() => setShowAddModal(false)} />}

            {/* Toast */}
            {toast && (
                <div style={{ position: "fixed", top: 24, right: 24, zIndex: 200, background: DK, color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 24px rgba(27,67,50,0.25)", fontFamily: "'Poppins', sans-serif", animation: "fadeInUp 0.3s ease" }}>
                    {toast}
                </div>
            )}

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: DK, margin: 0 }}>Manajemen Konten 📌</h2>
                <p style={{ fontSize: 13, color: "#74a78a", margin: "4px 0 0" }}>Edit konten halaman website Sejuba Drink.</p>
            </div>

            {/* Page Dropdown Selector */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
                <button
                    onClick={() => setShowDropdown(d => !d)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 20px", borderRadius: 12, background: DK, color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.04em", boxShadow: "0 4px 14px rgba(27,67,50,0.25)", transition: "all 0.2s" }}
                >
                    {activePage}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: showDropdown ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {showDropdown && (
                    <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setShowDropdown(false)} />
                        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50, background: "#fff", borderRadius: 14, boxShadow: "0 8px 32px rgba(27,67,50,0.15)", border: `1px solid ${BORDER}`, minWidth: 200, overflow: "hidden" }}>
                            {PAGES.map(page => (
                                <button key={page} onClick={() => { setActivePage(page); setShowDropdown(false); }}
                                    style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 18px", border: "none", background: page === activePage ? "rgba(82,183,136,0.1)" : "#fff", color: page === activePage ? DK : "#374151", fontSize: 13, fontWeight: page === activePage ? 700 : 500, cursor: "pointer", fontFamily: "'Poppins', sans-serif", borderBottom: `1px solid ${BORDER}`, transition: "background 0.15s" }}
                                    onMouseEnter={e => { if (page !== activePage) e.currentTarget.style.background = "#f9fdfa"; }}
                                    onMouseLeave={e => { if (page !== activePage) e.currentTarget.style.background = "#fff"; }}
                                >
                                    {page === activePage && <span style={{ color: P, marginRight: 6 }}>●</span>}
                                    {page}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Sections */}
            <div>
                {sections.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px 24px", color: "#9ca3af", fontSize: 14 }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                        Belum ada section. Klik "+ Tambah Section Baru" untuk mulai.
                    </div>
                )}

                {sections.map(section => (
                    <SectionCard
                        key={section.id}
                        section={section}
                        onEdit={() => handleEdit(section.id)}
                        onSave={() => handleSave(section.id)}
                        onCancel={() => handleCancel(section.id)}
                        onTextChange={v => updateSection(section.id, { content: v })}
                        onImageUpload={url => updateSection(section.id, { content: url })}
                        onImageRemove={() => updateSection(section.id, { content: "" })}
                        onDelete={() => handleDelete(section.id)}
                    />
                ))}
            </div>

            {/* Add Section Button */}
            <button
                onClick={() => setShowAddModal(true)}
                style={{ width: "100%", padding: "14px", borderRadius: 14, border: "2px dashed #95d5b2", background: "rgba(82,183,136,0.03)", color: P, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s", marginTop: 4 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(82,183,136,0.08)"; e.currentTarget.style.border = `2px dashed ${P}`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(82,183,136,0.03)"; e.currentTarget.style.border = "2px dashed #95d5b2"; }}
            >
                + Tambah Section Baru
            </button>
        </>
    );
}
