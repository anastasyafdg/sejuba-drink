"use client";

import CartItem from "./CartItem";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

interface CartItemType {
    id: number;
    name: string;
    image: string;
    price: number;
    size: string;
    qty: number;
}

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    cart: CartItemType[];
    setCart: (fn: (prev: CartItemType[]) => CartItemType[]) => void;
}

export default function CartSidebar({ open, setOpen, cart, setCart }: Props) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const { t, language } = useLanguage();

    const subtotal = cart.reduce(
        (acc: number, item: CartItemType) => acc + item.price * item.qty,
        0
    );
    const totalQty = cart.reduce((acc: number, item: CartItemType) => acc + item.qty, 0);

    const handleBeliSekarang = () => {
        if (!isLoggedIn) {
            try {
                sessionStorage.setItem("sejuba_pending_cart", JSON.stringify(cart));
            } catch { }
            setOpen(false);
            router.push("/pembeli/login?from=/pembeli/pemesanan");
            return;
        }

        try {
            sessionStorage.setItem("sejuba_cart", JSON.stringify(cart));
        } catch { }
        window.location.href = "/pembeli/pemesanan2";
    };

    return (
        <>
            {/* ── OVERLAY ─────────────────────────────────────────────── */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* ── DRAWER ──────────────────────────────────────────────── */}
            <div
                className={`fixed top-0 right-0 h-full w-[360px] max-w-[95vw] bg-[#FAFAF8] shadow-2xl
                    flex flex-col transition-transform duration-300 ease-in-out z-50
                    ${open ? "translate-x-0" : "translate-x-full"}`}
            >

                {/* ── HEADER ──────────────────────────────────────────── */}
                <div className="flex items-center justify-between px-5 py-4 bg-[#4F7703] text-white shrink-0">
                    <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                        <div>
                            <p className="font-bold text-base leading-tight">{t("cart.title")}</p>
                            {cart.length > 0 && (
                                <p className="text-[11px] text-green-200 leading-tight">
                                    {totalQty} {language === "en" ? "item(s)" : "item"} · {cart.length} {language === "en" ? "product(s)" : "produk"}
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition"
                        title={t("cart.close")}
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* ── ITEM LIST ───────────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    {cart.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                            <div className="w-20 h-20 rounded-full bg-[#EEF6EC] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[40px] text-[#6BAA4F]">
                                    shopping_cart
                                </span>
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-700 text-sm">{t("cart.empty")}</p>
                                <p className="text-gray-400 text-xs mt-1">{t("cart.empty_desc")}</p>
                            </div>
                        </div>
                    ) : (
                        cart.map((item: CartItemType, i: number) => (
                            <CartItem
                                key={`${item.id}-${item.size}-${i}`}
                                item={item}
                                onRemove={() =>
                                    setCart((prev: CartItemType[]) =>
                                        prev.filter((_, idx) => idx !== i)
                                    )
                                }
                                onQtyChange={(delta: number) =>
                                    setCart((prev: CartItemType[]) =>
                                        prev.map((it, idx) =>
                                            idx === i
                                                ? { ...it, qty: Math.max(1, it.qty + delta) }
                                                : it
                                        )
                                    )
                                }
                            />
                        ))
                    )}
                </div>

                {/* ── FOOTER ──────────────────────────────────────────── */}
                {cart.length > 0 && (
                    <div className="shrink-0 border-t border-gray-200 bg-white px-5 pt-4 pb-5 space-y-3">

                        {/* Ringkasan harga */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{t("cart.subtotal")} ({totalQty} {language === "en" ? "item(s)" : "item"})</span>
                            <span className="font-bold text-gray-800">
                                Rp {subtotal.toLocaleString("id-ID")}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-dashed border-gray-200" />

                        {/* CTA */}
                        <button
                            onClick={handleBeliSekarang}
                            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white
                                font-bold text-sm py-3.5 rounded-2xl transition-all shadow-md shadow-orange-200
                                flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]"></span>
                            {t("cart.checkout")}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}