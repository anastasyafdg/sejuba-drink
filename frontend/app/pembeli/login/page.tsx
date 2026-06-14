"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useAuth } from "@/lib/AuthContext";

// Komponen dalam terpisah agar bisa pakai useSearchParams (butuh Suspense)
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email dan password wajib diisi.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/pembeli/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.message || "Login gagal. Coba lagi.");
                return;
            }

            // Simpan session via AuthContext (localStorage + cookie)
            login(data.data);

            // Baca intended redirect dari query param ?from=
            const from = searchParams.get("from") || "/pembeli";

            // Kembali ke halaman asal
            router.push(from);

            localStorage.setItem("pembeli", JSON.stringify(data.data));

            window.location.href = "/pembeli";


        } catch {
            setError("Tidak dapat terhubung ke server. Pastikan backend berjalan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative z-10 flex flex-col justify-center flex-1 max-w-[520px] mx-auto w-full">

            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#F25C22] leading-tight tracking-wide mb-6">
                FRESHNESS FOR YOUR <br /> LIFESTYLE
            </h1>

            {/* CARD */}
            <div className="bg-[#E9EFE8] rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="block text-gray-500 font-semibold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email"
                            className="w-full bg-transparent border-b border-gray-400 focus:border-[#F25C22] outline-none py-1.5 text-gray-800 transition"
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-gray-500 font-semibold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className="w-full bg-transparent border-b border-gray-400 focus:border-[#F25C22] outline-none py-1.5 text-gray-800 transition"
                            required
                        />
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#F25C22] hover:bg-[#d94a15] hover:scale-105 transition-all duration-200 text-white font-bold py-2.5 px-10 rounded-full shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {loading ? "Memproses..." : "LOGIN"}
                        </button>
                    </div>

                    {/* LINK KE REGISTER */}
                    <p className="text-center text-sm text-gray-500 pt-3">
                        Belum punya akun?{" "}
                        <Link
                            href="/pembeli/register"
                            className="text-[#F25C22] font-semibold hover:underline"
                        >
                            Daftar
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2">

            {/* ================= LEFT ================= */}
            <div
                className="relative flex flex-col px-10 md:px-16 py-10"
                style={{
                    background: "linear-gradient(180deg, #BFD8C2 0%, #A9C5A8 100%)",
                }}
            >
                {/* PATTERN */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: "url('/images/decorations/bg-pattern.png')",
                        backgroundSize: "cover",
                    }}
                />

                {/* LOGO */}
                <div className="relative z-10">
                    <Link href="/pembeli">
                        <Image
                            src="/images/logo/logo-sejuba.png"
                            alt="Sejuba Drink"
                            width={140}
                            height={50}
                        />
                    </Link>
                </div>

                {/* FORM dalam Suspense karena pakai useSearchParams */}
                <Suspense fallback={<div className="flex-1" />}>
                    <LoginForm />
                </Suspense>
            </div>

            {/* ================= RIGHT ================= */}
            <div
                className="hidden md:flex items-center justify-center relative"
                style={{
                    backgroundImage: "url('/images/decorations/bg-pattern.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                }}
            >
                <div className="w-full max-w-xl px-10">
                    <Image
                        src="/images/beranda/produk02.png"
                        alt="Produk Sejuba Drink"
                        width={800}
                        height={450}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>

        </div>
    );
}