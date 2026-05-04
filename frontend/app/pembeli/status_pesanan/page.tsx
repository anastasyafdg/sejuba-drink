"use client";

import Image from "next/image";

export default function StatusPesananPage() {
    // Data dummy sesuai Figma
    const items = [
        {
            name: "Purple Lime",
            price: 10000,
            qty: 4,
            image: "/images/produk/purple.png"
        },
        {
            name: "Blue Lime",
            price: 10000,
            qty: 1,
            image: "/images/produk/blue.png"
        },
        {
            name: "Green Series",
            price: 10000,
            qty: 2,
            image: "/images/produk/green.png"
        }
    ];

    const ongkir = 5000;
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const total = subtotal + ongkir;

    const formatRupiah = (angka: number) => {
        return "Rp." + angka.toLocaleString("id-ID") + ",00";
    };

    const formatTotal = (angka: number) => {
        return "Rp. " + angka.toLocaleString("id-ID");
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-5 pt-48 pb-24">

                {/* ════════════════════════════════════════
                    HEADER
                ════════════════════════════════════════ */}
                <div className="mb-12">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                        Status Pemesanan
                    </h1>
                    <p className="text-gray-600 font-medium">
                        Pesanan #INV/20260425/1234
                    </p>
                </div>

                {/* ════════════════════════════════════════
                    PROGRESS TRACKER
                ════════════════════════════════════════ */}
                <div className="relative mb-16 px-4 md:px-12">
                    {/* Garis background abu (inactive) */}
                    <div className="absolute top-6 left-12 right-12 h-1.5 bg-gray-200 z-0"></div>

                    {/* Garis hijau (active) - sampai ke tahap 4 (Dikirim) */}
                    <div className="absolute top-6 left-12 right-1/4 h-1.5 bg-[#5B9B34] z-0"></div>

                    <div className="flex justify-between relative z-10">
                        {/* Step 1: Pending */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#5B9B34] flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm mb-1">Pending</span>
                            <span className="text-xs text-gray-500 text-center">
                                10 Maret 2026<br />08:10 WIB
                            </span>
                        </div>

                        {/* Step 2: Dibayar */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#5B9B34] flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm mb-1">Dibayar</span>
                            <span className="text-xs text-gray-500 text-center">
                                10 Maret 2026<br />08:20 WIB
                            </span>
                        </div>

                        {/* Step 3: Proses */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#5B9B34] flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm mb-1">Proses</span>
                            <span className="text-xs text-gray-500 text-center">
                                10 Maret 2026<br />08:24 WIB
                            </span>
                        </div>

                        {/* Step 4: Dikirim */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#5B9B34] flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm mb-1">Dikirim</span>
                            <span className="text-xs text-gray-500 text-center">
                                10 Maret 2026<br />08:31 WIB
                            </span>
                        </div>

                        {/* Step 5: Selesai (Inactive) */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm mb-1">Selesai</span>
                        </div>
                    </div>
                </div>

                {/* ════════════════════════════════════════
                    PRODUK DIPESAN CARD
                ════════════════════════════════════════ */}
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="bg-[#4F7703] px-6 py-4">
                        <h3 className="font-bold text-white">Produk Dipesan</h3>
                    </div>

                    {/* Body */}
                    <div className="bg-white px-6 py-4">
                        <div className="flex flex-col">
                            {items.map((item, index) => (
                                <div key={index} className={`py-4 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
                                    <div className="flex items-start gap-6">
                                        {/* Product Image */}
                                        <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative flex items-center justify-center p-2">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                            <p className="text-sm font-bold text-gray-700 mt-1">{formatRupiah(item.price)}</p>
                                            <p className="text-sm text-gray-600 mt-2">Jumlah: {item.qty}</p>
                                        </div>
                                    </div>

                                    {/* Subtotal align right */}
                                    <div className="flex justify-end mt-2">
                                        <p className="text-sm font-bold text-gray-700">Subtotal: {formatRupiah(item.price * item.qty)}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Dashed Separator */}
                            <div className="border-t-2 border-dashed border-gray-300 mt-2 mb-4"></div>

                            {/* Summary */}
                            <div className="space-y-4 px-2">
                                <div className="flex justify-between items-center text-sm font-bold text-gray-700">
                                    <span>Biaya Kirim</span>
                                    <span>{formatRupiah(ongkir)}</span>
                                </div>
                                <div className="flex justify-between items-center text-base font-extrabold text-gray-900 pt-2">
                                    <span>Total Harga</span>
                                    <span>{formatTotal(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
