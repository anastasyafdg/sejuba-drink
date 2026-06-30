"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLanguage } from "@/lib/LanguageContext";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CartItem {
    name: string;
    image: string;
    price: number;
    qty: number;
    size: string;
}

interface OrderData {
    nama: string;
    email: string;
    telepon: string;
    alamat: string;
    jasa: "delivery" | "selfpickup";
    cart: CartItem[];
    total: number;
    ongkir: number;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PembayaranPage() {
    const router = useRouter();
    const qrRef = useRef<HTMLImageElement>(null);
    const { t, language } = useLanguage();

    const [order, setOrder] = useState<OrderData | null>(null);

    // ── Baca data order dari sessionStorage ───────────────────────────────────
    useEffect(() => {
        try {
            const raw = sessionStorage.getItem("sejuba_order");
            if (raw) {
                setOrder(JSON.parse(raw));
                return;
            }
        } catch { }

        // Fallback demo jika langsung dibuka
        setOrder({
            nama: "Nama Pemesan",
            email: "email@contoh.com",
            telepon: "+62 812 3456 7890",
            alamat: "Jl. Perumahan Dotamana, Blok B No 19, Batam Center",
            jasa: "delivery",
            cart: [
                { name: "Purple Lime", image: "/images/produk/purple.png", price: 10000, qty: 4, size: "250 ml" },
                { name: "Blue Lime", image: "/images/produk/blue.png", price: 10000, qty: 1, size: "250 ml" },
                { name: "Green Series", image: "/images/produk/green.png", price: 13000, qty: 2, size: "250 ml" },
            ],
            total: 76000,
            ongkir: 10000,
        });
    }, []);

    // ── Unduh QR Code ─────────────────────────────────────────────────────────
    const handleUnduhQR = () => {
        if (!qrRef.current) return;
        const a = document.createElement("a");
        a.href = qrRef.current.src;
        a.download = "QRIS-SejubaDrink.png";
        a.click();
    };

    const handleSelesai = async () => {
        try {
            const idPesanan = sessionStorage.getItem("id_pesanan");

            if (!idPesanan) {
                toast.error(t("payment.toast_id_not_found"));
                return;
            }

            const response = await fetch(
                `http://127.0.0.1:8000/api/pesanan/${idPesanan}/bayar`,
                {
                    method: "PUT",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success(t("payment.toast_payment_success"));

            sessionStorage.removeItem("sejuba_cart");

            setTimeout(() => {
                router.push("/pembeli/status_pesanan");
            }, 1500);

        } catch (error) {
            console.error(error);
            toast.error(t("payment.toast_payment_failed"));
        }
    };

    if (!order) return null;

    const subtotal = order.total - order.ongkir;

    // QR code placeholder (nanti diganti token Midtrans)
    const qrValue = `SEJUBA-ORDER-${Date.now()}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}&ecc=M`;

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-5 pt-48 pb-20">
                {/* ════════════════════════════════════════
                    INFORMASI PEMESANAN (read-only)
                ════════════════════════════════════════ */}
                <section className="mb-10">
                    <h2 className="text-xl font-extrabold tracking-wide mb-5 uppercase">
                        {t("checkout.info_title")}
                    </h2>

                    {/* Nama */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1 font-medium">
                            {t("checkout.buyer_name")}
                        </label>
                        <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700">
                            {order.nama || <span className="text-gray-400">—</span>}
                        </div>
                    </div>

                    {/* Email + Telepon */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">{t("checkout.email")}</label>
                            <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700">
                                {order.email || <span className="text-gray-400">—</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">
                                {t("checkout.phone")}
                            </label>
                            <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700">
                                {order.telepon || <span className="text-gray-400">—</span>}
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 italic">
                        {t("checkout.notify_info")}
                    </p>
                </section>

                {/* ════════════════════════════════════════
                    INFORMASI PENGIRIMAN (read-only, no map)
                ════════════════════════════════════════ */}
                <section className="mb-10">
                    <h2 className="text-xl font-extrabold tracking-wide mb-5 uppercase">
                        {t("checkout.shipping_title")}
                    </h2>

                    {/* Alamat */}
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        {t("checkout.shipping_address")}
                    </label>
                    <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700 mb-5">
                        {order.alamat || <span className="text-gray-400">{t("payment.not_filled")}</span>}
                    </div>

                    {/* Jasa pengiriman — read-only */}
                    <h3 className="text-base font-bold mb-3">{t("checkout.shipping_service")}</h3>
                    <div className="flex gap-8 mb-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                readOnly
                                checked={order.jasa === "delivery"}
                                onChange={() => { }}
                                className="accent-[#6BAA4F] w-4 h-4"
                            />
                            <span className="text-sm font-medium">{t("checkout.delivery")}</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                readOnly
                                checked={order.jasa === "selfpickup"}
                                onChange={() => { }}
                                className="accent-[#6BAA4F] w-4 h-4"
                            />
                            <span className="text-sm font-medium">{t("checkout.self_pickup")}</span>
                        </label>
                    </div>
                    <p className="text-xs text-gray-600 leading-5 mb-1">
                        <span className="font-semibold">{t("checkout.delivery")}</span> – {language === "id" ? "Pengiriman cepat dalam 1 hari." : "Fast delivery in 1 day."}
                    </p>
                    <p className="text-xs text-gray-600 leading-5">
                        <span className="font-semibold">{t("checkout.self_pickup")}</span> – {language === "id" ? "Ambil sendiri di tempat." : "Pick up by yourself at location."}
                    </p>
                </section>

                {/* ════════════════════════════════════════
                    RINGKASAN + METODE PEMBAYARAN (QRIS)
                ════════════════════════════════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 items-start">

                    {/* ── Ringkasan Belanja ── */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-fit">
                        <div className="bg-[#4F7703] px-5 py-3">
                            <h3 className="font-bold text-base text-white">{t("checkout.order_summary")}</h3>
                        </div>
                        <div className="bg-white px-5 py-4">
                            {/* Table header */}
                            <div className="grid grid-cols-3 text-xs font-semibold text-gray-700 mb-2 pb-2 border-b border-gray-200">
                                <span>{t("checkout.product")}</span>
                                <span className="text-center">{t("checkout.quantity")}</span>
                                <span className="text-right">{t("checkout.price")}</span>
                            </div>

                            {/* Rows */}
                            {order.cart.map((item, i) => (
                                <div key={i} className="grid grid-cols-3 text-xs py-2 border-b border-gray-100 text-gray-800">
                                    <span className="truncate pr-1">{item.name}</span>
                                    <span className="text-center">{item.qty}</span>
                                    <span className="text-right">
                                        Rp.{(item.price * item.qty).toLocaleString("id-ID")},00
                                    </span>
                                </div>
                            ))}

                            {/* Biaya Kirim */}
                            {order.ongkir > 0 && (
                                <div className="grid grid-cols-3 text-xs py-2 text-gray-800">
                                    <span className="col-span-2">{t("checkout.shipping_cost")}</span>
                                    <span className="text-right">
                                        Rp.{order.ongkir.toLocaleString("id-ID")},00
                                    </span>
                                </div>
                            )}

                            {/* Dashed separator */}
                            <div className="border-t-2 border-dashed border-gray-300 my-2" />

                            {/* Total */}
                            <div className="grid grid-cols-3 text-sm font-bold text-gray-900 pt-1">
                                <span className="col-span-2">{t("checkout.total_price")}</span>
                                <span className="text-right">
                                    Rp. {order.total.toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── Metode Pembayaran: QRIS ── */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        <div className="bg-[#4F7703] px-5 py-3">
                            <h3 className="font-bold text-base text-white">
                                {t("payment.method_title")}
                            </h3>
                        </div>

                        <div className="bg-white px-5 py-4 flex flex-col items-center gap-3">

                            {/* QR Code */}
                            <div className="border border-gray-200 rounded-xl p-2 bg-white shadow-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    ref={qrRef}
                                    src={qrUrl}
                                    alt="QRIS Payment Code"
                                    width={135}
                                    height={135}
                                    className="block"
                                    crossOrigin="anonymous"
                                />
                            </div>

                            {/* Tombol Unduh */}
                            <button
                                id="btn-unduh-qr"
                                onClick={handleUnduhQR}
                                className="w-[220px] bg-[#F59B22] hover:bg-[#e08c1a] text-white font-semibold text-sm py-2.5 rounded-xl transition"
                            >
                                {t("payment.download_qr")}
                            </button>

                        </div>
                    </div>
                </div>

                {/* ════════════════════════════════════════
                    TOMBOL SELESAI
                ════════════════════════════════════════ */}
                <div className="flex justify-center">
                    <button
                        id="btn-selesai"
                        onClick={handleSelesai}
                        className="px-12 py-3 rounded-full bg-[#4F7703] hover:bg-[#3e5f02] text-white font-semibold text-sm transition shadow-md"
                    >
                        {t("payment.done")}
                    </button>
                </div>

            </div>
        </div>
    );
}
