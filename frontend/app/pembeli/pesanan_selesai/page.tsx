"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PesananSelesaiPage() {
    const router = useRouter();

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: "url('/images/pattern/pemesanan1.png')",
                backgroundSize: "cover",
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
                backgroundColor: "#fafaf7",
            }}
        >
            {/* ══════════════════════════════════════════
                HERO — Terima Kasih
            ══════════════════════════════════════════ */}
            <div className="flex-1 flex flex-col items-center justify-center pt-48 pb-20 px-6 text-center">

                {/* Teks + ikon centang */}
                <div className="flex items-center justify-center gap-3 mb-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#F59B22]">
                        Terima Kasih
                    </h1>
                    {/* Lingkaran centang hijau */}
                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#5B9B34] flex items-center justify-center shadow-md shrink-0">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 md:w-7 md:h-7"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3A7D14] mb-6">
                    Sudah Berbelanja!
                </h2>

                {/* Tombol Lihat Status */}
                <button
                    id="btn-lihat-status"
                    onClick={() => router.push("/pembeli/status_pesanan")}
                    className="bg-[#4F7703] hover:bg-[#3e5f02] text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md transition mb-10"
                >
                    Lihat Status Pesanan
                </button>

                {/* Gambar produk */}
                <div className="w-full max-w-3xl">
                    <Image
                        src="/images/beranda/produk02.png"
                        alt="Produk Sejuba Drink"
                        width={900}
                        height={480}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
