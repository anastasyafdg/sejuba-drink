"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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

    const handleSelesai = () => {
        // Bersihkan session lalu arahkan ke halaman pesanan selesai
        try {
            sessionStorage.removeItem("sejuba_order");
            sessionStorage.removeItem("sejuba_cart");
        } catch { }
        router.push("/pembeli/pesanan_selesai");
    };

    if (!order) return null;

    const subtotal = order.total - order.ongkir;

    // QR code placeholder (nanti diganti token Midtrans)
    const qrValue = `SEJUBA-ORDER-${Date.now()}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}&ecc=M`;

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-6 py-16 md:pt-48">
                {/* ════════════════════════════════════════
                    INFORMASI PEMESANAN (read-only)
                ════════════════════════════════════════ */}
                <section className="mb-10">
                    <h2 className="text-xl font-extrabold tracking-wide mb-5 uppercase">
                        Informasi Pemesanan
                    </h2>

                    {/* Nama */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1 font-medium">
                            Nama Pemesan
                        </label>
                        <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700">
                            {order.nama || <span className="text-gray-400">—</span>}
                        </div>
                    </div>

                    {/* Email + Telepon */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
                            <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700">
                                {order.email || <span className="text-gray-400">—</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">
                                Nomor Telepon (WhatsApp)
                            </label>
                            <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700">
                                {order.telepon || <span className="text-gray-400">—</span>}
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 italic">
                        Notifikasi pesanan akan kami kirim melalui WhatsApp dan Email.
                    </p>
                </section>

                {/* ════════════════════════════════════════
                    INFORMASI PENGIRIMAN (read-only, no map)
                ════════════════════════════════════════ */}
                <section className="mb-10">
                    <h2 className="text-xl font-extrabold tracking-wide mb-5 uppercase">
                        Informasi Pengiriman
                    </h2>

                    {/* Alamat */}
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Alamat pengiriman
                    </label>
                    <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-700 mb-5">
                        {order.alamat || <span className="text-gray-400">Belum diisi</span>}
                    </div>

                    {/* Jasa pengiriman — read-only */}
                    <h3 className="text-base font-bold mb-3">Jasa pengiriman</h3>
                    <div className="flex gap-8 mb-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                readOnly
                                checked={order.jasa === "delivery"}
                                onChange={() => { }}
                                className="accent-[#6BAA4F] w-4 h-4"
                            />
                            <span className="text-sm font-medium">Delivery</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                readOnly
                                checked={order.jasa === "selfpickup"}
                                onChange={() => { }}
                                className="accent-[#6BAA4F] w-4 h-4"
                            />
                            <span className="text-sm font-medium">Self Pick-up</span>
                        </label>
                    </div>
                    <p className="text-xs text-gray-600 leading-5 mb-1">
                        <span className="font-semibold">Delivery</span> – Pengiriman cepat dalam 1 hari.
                    </p>
                    <p className="text-xs text-gray-600 leading-5">
                        <span className="font-semibold">Self Pick-up</span> – Ambil sendiri di tempat.
                    </p>
                </section>

                {/* ════════════════════════════════════════
                    RINGKASAN + METODE PEMBAYARAN (QRIS)
                ════════════════════════════════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

                    {/* ── Ringkasan Belanja ── */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        <div className="bg-[#4F7703] px-5 py-3">
                            <h3 className="font-bold text-base text-white">Ringkasan Belanja</h3>
                        </div>
                        <div className="bg-white px-5 py-4">
                            {/* Table header */}
                            <div className="grid grid-cols-3 text-xs font-semibold text-gray-700 mb-2 pb-2 border-b border-gray-200">
                                <span>Produk</span>
                                <span className="text-center">Kuantitas</span>
                                <span className="text-right">Harga</span>
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
                                    <span className="col-span-2">Biaya Kirim</span>
                                    <span className="text-right">
                                        Rp.{order.ongkir.toLocaleString("id-ID")},00
                                    </span>
                                </div>
                            )}

                            {/* Dashed separator */}
                            <div className="border-t-2 border-dashed border-gray-300 my-2" />

                            {/* Total */}
                            <div className="grid grid-cols-3 text-sm font-bold text-gray-900 pt-1">
                                <span className="col-span-2">Total Harga</span>
                                <span className="text-right">
                                    Rp. {order.total.toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── Metode Pembayaran: QRIS ── */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        <div className="bg-[#4F7703] px-5 py-3">
                            <h3 className="font-bold text-base text-white">Metode Pembayaran : QRIS</h3>
                        </div>
                        <div className="bg-white px-5 py-5 flex flex-col items-center gap-4">
                            {/* QR Code */}
                            <div className="border border-gray-200 rounded-xl p-2 bg-white shadow-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    ref={qrRef}
                                    src={qrUrl}
                                    alt="QRIS Payment Code"
                                    width={180}
                                    height={180}
                                    className="block"
                                    crossOrigin="anonymous"
                                />
                            </div>

                            {/* Tombol Unduh */}
                            <button
                                id="btn-unduh-qr"
                                onClick={handleUnduhQR}
                                className="w-full bg-[#F59B22] hover:bg-[#e08c1a] text-white font-semibold text-sm py-2.5 rounded-xl transition"
                            >
                                Unduh QR Code
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
                        Selesai
                    </button>
                </div>

            </div>
        </div>
    );
}
