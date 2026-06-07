"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function StatusPesananPage() {

    const [pesanan, setPesanan] = useState<any>(null);
    useEffect(() => {

        const loadPesanan = async () => {

            const idPesanan =
                sessionStorage.getItem("id_pesanan");

            if (!idPesanan) return;

            try {

                const response = await fetch(
                    `http://127.0.0.1:8000/api/pesanan/${idPesanan}`
                );

                const data = await response.json();

                setPesanan(data.data);

            } catch (error) {

                console.error(error);
            }
        };

        loadPesanan();

    }, []);

    if (!pesanan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const items = pesanan.detail_pesanan;

    const ongkir = 5000;

    const subtotal = items.reduce(
        (acc: number, item: any) =>
            acc + item.subtotal,
        0
    );

    const total = subtotal + ongkir;

    const formatRupiah = (angka: number) => {
        return "Rp." + angka.toLocaleString("id-ID") + ",00";
    };

    const formatTotal = (angka: number) => {
        return "Rp. " + angka.toLocaleString("id-ID");
    };

    const currentStep = (() => {

        if (pesanan.status_pesanan === "Selesai") {
            return 5;
        }

        if (pesanan.status_pesanan === "Dikirim") {
            return 4;
        }

        if (pesanan.status_pesanan === "Diproses") {
            return 3;
        }

        if (pesanan.status_pembayaran === "Lunas") {
            return 2;
        }

        return 1;

    })();

    const getStep = () => {
        switch (pesanan.status_pesanan) {
            case "Menunggu Konfirmasi":
                return 2; // Pending + Dibayar
            case "Diproses":
                return 3;
            case "Dikirim":
                return 4;
            case "Selesai":
                return 5;
            default:
                return 1;
        }
    };

    const isActive = (step: number) => {
        return step <= getStep();
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
                        Pesanan #{pesanan.id_pesanan}
                    </p>
                </div>

                {/* ════════════════════════════════════════
                    PROGRESS TRACKER
                ════════════════════════════════════════ */}
                <div className="relative mb-16 px-4 md:px-12">
                    {/* Garis background abu (inactive) */}
                    <div className="absolute top-6 left-12 right-12 h-1.5 bg-gray-200 z-0"></div>

                    {/* Garis hijau (active) - sampai ke tahap 4 (Dikirim) */}
                    <div
                        className="absolute top-6 left-12 h-1.5 bg-[#5B9B34] z-0"
                        style={{
                            width:
                                currentStep === 1 ? "0%" :
                                    currentStep === 2 ? "25%" :
                                        currentStep === 3 ? "50%" :
                                            currentStep === 4 ? "75%" :
                                                "100%"
                        }}
                    ></div>

                    <div className="flex justify-between relative z-10">
                        {/* Step 1: Pending */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isActive(1)
                                    ? "bg-[#5B9B34]"
                                    : "bg-gray-200"
                                    }`}
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <span className="font-semibold text-gray-800 text-sm mb-1">
                                Pending
                            </span>
                        </div>

                        {/* Step 2: Dibayar */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isActive(2) ? "bg-[#5B9B34]" : "bg-gray-200"
                                    }`}
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <span className="font-semibold text-gray-800 text-sm mb-1">
                                Dibayar
                            </span>
                        </div>

                        {/* Step 3: Proses */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isActive(3) ? "bg-[#5B9B34]" : "bg-gray-200"
                                    }`}
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <span className="font-semibold text-gray-800 text-sm mb-1">
                                Proses
                            </span>
                        </div>

                        {/* Step 4: Dikirim */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isActive(4) ? "bg-[#5B9B34]" : "bg-gray-200"
                                    }`}
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <span className="font-semibold text-gray-800 text-sm mb-1">
                                Dikirim
                            </span>
                        </div>

                        {/* Step 5: Selesai (Inactive) */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isActive(5) ? "bg-[#5B9B34]" : "bg-gray-200"
                                    }`}
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <span className="font-semibold text-gray-800 text-sm mb-1">
                                Selesai
                            </span>
                        </div>

                    </div>

                    {/* ════════════════════════════════════════
                    PRODUK DIPESAN CARD
                ════════════════════════════════════════ */}
                    <div className="mt-10 rounded-xl overflow-hidden border border-gray-200 shadow-sm max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="bg-[#4F7703] px-6 py-4">
                            <h3 className="font-bold text-white">Produk Dipesan</h3>
                        </div>

                        {/* Body */}
                        <div className="bg-white px-6 py-4">
                            <div className="flex flex-col">

                                {items.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`py-4 ${index !== 0 ? "border-t border-gray-200" : ""}`}
                                    >
                                        <div className="flex items-start gap-6">

                                            <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative flex items-center justify-center p-2">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${item.produk?.image}`}
                                                    alt={item.produk?.name}
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-sm">
                                                    {item.produk?.name}
                                                </h4>

                                                <p className="text-sm font-bold text-gray-700 mt-1">
                                                    {formatRupiah(item.harga_satuan)}
                                                </p>

                                                <p className="text-sm text-gray-600 mt-2">
                                                    Jumlah: {item.jumlah}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-2">
                                            <p className="text-sm font-bold text-gray-700">
                                                Subtotal: {formatRupiah(item.subtotal)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div className="border-t-2 border-dashed border-gray-300 mt-2 mb-4"></div>

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
        </div>
    );
}
