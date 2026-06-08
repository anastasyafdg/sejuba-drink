"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
    onClose: () => void;
    /** URL halaman yang akan dijadikan ?from= setelah login */
    fromPath?: string;
}

export default function LoginRequiredModal({
    onClose,
    fromPath = "/pembeli/pemesanan",
}: Props) {
    const router = useRouter();

    // Tutup modal dengan tombol Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleLogin = () => {
        onClose();
        router.push(`/pembeli/login?from=${encodeURIComponent(fromPath)}`);
    };

    return (
        /* BACKDROP */
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* MODAL CARD */}
            <div
                className="relative mx-4 w-full max-w-sm rounded-[28px] bg-white p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-4 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Tutup"
                >
                    <span className="material-symbols-outlined text-[22px]">close</span>
                </button>

                {/* ICON */}
                <div className="flex justify-center mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                        <span className="material-symbols-outlined text-[36px] text-orange-500">
                            lock
                        </span>
                    </div>
                </div>

                {/* TEXT */}
                <h2 className="text-center text-[18px] font-bold text-gray-800">
                    Login Diperlukan
                </h2>
                <p className="mt-3 text-center text-sm leading-relaxed text-gray-500">
                    Anda harus login terlebih dahulu untuk memesan.
                    <br />
                    Silakan masuk dengan akun Anda.
                </p>

                {/* ACTIONS */}
                <div className="mt-7 flex flex-col gap-3">
                    <button
                        onClick={handleLogin}
                        className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 hover:scale-[1.02] active:scale-100"
                    >
                        Login Sekarang
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full rounded-full border border-gray-300 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}
