"use client";

import CartItem from "./CartItem";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

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

    const total = cart.reduce(
        (acc: number, item: CartItemType) => acc + item.price * item.qty,
        0
    );

    const handleBeliSekarang = () => {
        if (!isLoggedIn) {
            // Simpan cart agar bisa di-restore setelah login
            try {
                sessionStorage.setItem("sejuba_pending_cart", JSON.stringify(cart));
            } catch {}
            setOpen(false);
            router.push("/pembeli/login?from=/pembeli/pemesanan");
            return;
        }

        try {
            sessionStorage.setItem("sejuba_cart", JSON.stringify(cart));
        } catch {}
        window.location.href = "/pembeli/pemesanan2";
    };

    return (
        <>
            {/* ================= OVERLAY ================= */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/20 z-40"
                />
            )}

            {/* ================= SIDEBAR ================= */}
            <div
                className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* HEADER */}
                <div className="bg-green-700 text-white p-4 flex justify-between items-center">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <button onClick={() => setOpen(false)}>✕</button>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-400">Keranjang kosong</p>
                    ) : (
                        cart.map((item: CartItemType, i: number) => (
                            <CartItem
                                key={i}
                                item={item}
                                onRemove={() =>
                                    setCart((prev: CartItemType[]) =>
                                        prev.filter((_, idx) => idx !== i)
                                    )
                                }
                            />
                        ))
                    )}
                </div>

                {/* FOOTER */}
                <div className="absolute bottom-0 w-full">
                    <div className="bg-green-700 text-white text-center py-3 font-semibold">
                        Total: Rp. {total.toLocaleString()}
                    </div>

                    <button
                        onClick={handleBeliSekarang}
                        className="block w-full bg-orange-500 text-white py-4 text-lg font-semibold text-center hover:bg-orange-600 transition"
                    >
                        Beli Sekarang
                    </button>
                </div>

            </div>
        </>
    );
}