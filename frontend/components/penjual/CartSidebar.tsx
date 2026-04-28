"use client";

interface CartItemData {
    image: string;
    name: string;
    price: number;
    label: string;
    qty: number;
}

function CartItem({ item }: { item: CartItemData }) {
    return (
        <div style={{
            display: "flex", gap: 14, alignItems: "center",
            padding: "12px 0",
            borderBottom: "1px solid rgba(92,139,4,0.06)",
        }}>
            <div style={{
                width: 64, height: 64, borderRadius: 14,
                background: "linear-gradient(135deg, #e8f5e9, #d8f3dc)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
            }}>
                <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: "contain" }} />
            </div>

            <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1b4332", margin: 0 }}>{item.name}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#F45B25", margin: "2px 0" }}>
                    Rp. {item.price.toLocaleString()}
                </p>
                <p style={{ fontSize: 12, color: "#8aaa55", margin: 0 }}>
                    {item.label} • Qty: {item.qty}
                </p>
            </div>
        </div>
    );
}

interface CartSidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    cart: CartItemData[];
}

export default function CartSidebar({ open, setOpen, cart }: CartSidebarProps) {
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: "fixed", inset: 0, zIndex: 40,
                        background: "rgba(0,0,0,0.3)",
                        transition: "opacity 0.3s",
                    }}
                />
            )}

            {/* Sidebar */}
            <div style={{
                position: "fixed", top: 0, right: 0, height: "100%", width: 370,
                background: "#fff", zIndex: 50,
                boxShadow: open ? "-8px 0 32px rgba(0,0,0,0.12)" : "none",
                transform: open ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex", flexDirection: "column",
                fontFamily: "'Poppins', sans-serif",
            }}>
                {/* Header */}
                <div style={{
                    background: "linear-gradient(135deg, #1b4332, #2d6a4f)",
                    color: "#fff", padding: "18px 24px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 22 }}>🛒</span>
                        <span style={{ fontSize: 16, fontWeight: 700 }}>Keranjang</span>
                        <span style={{
                            background: "rgba(255,255,255,0.2)", borderRadius: 20,
                            padding: "2px 10px", fontSize: 12, fontWeight: 600,
                        }}>
                            {cart.length} item
                        </span>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        style={{
                            background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8,
                            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: 16, cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div style={{
                    flex: 1, overflowY: "auto",
                    padding: "16px 24px",
                }}>
                    {cart.length === 0 ? (
                        <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            justifyContent: "center", height: "100%", color: "#8aaa55",
                        }}>
                            <span style={{ fontSize: 48, marginBottom: 12 }}>🛒</span>
                            <p style={{ fontSize: 14, fontWeight: 500 }}>Keranjang kosong</p>
                        </div>
                    ) : (
                        cart.map((item, i) => <CartItem key={i} item={item} />)
                    )}
                </div>

                {/* Footer */}
                <div style={{ borderTop: "1px solid rgba(92,139,4,0.08)" }}>
                    {/* Total */}
                    <div style={{
                        background: "linear-gradient(135deg, #1b4332, #2d6a4f)",
                        color: "#fff", padding: "16px 24px",
                        textAlign: "center",
                    }}>
                        <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.8, marginBottom: 4 }}>Total Belanja</div>
                        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>
                            Rp. {total.toLocaleString()}
                        </div>
                        <button style={{
                            marginTop: 10, background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            color: "#fff", padding: "8px 24px", borderRadius: 20,
                            fontSize: 13, fontWeight: 600, cursor: "pointer",
                            transition: "all 0.2s",
                            fontFamily: "'Poppins', sans-serif",
                        }}>
                            Lanjut Belanja
                        </button>
                    </div>

                    {/* Beli Button */}
                    <button style={{
                        width: "100%", padding: "16px",
                        background: "linear-gradient(135deg, #F45B25, #F89D25)",
                        color: "#fff", border: "none",
                        fontSize: 16, fontWeight: 700,
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                        fontFamily: "'Poppins', sans-serif",
                        letterSpacing: "0.5px",
                    }}>
                        Beli Sekarang
                    </button>
                </div>
            </div>
        </>
    );
}
