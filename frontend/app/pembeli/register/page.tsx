"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noTelepon, setNoTelepon] = useState("");
    const [password, setPassword] = useState("");
    const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showKonfirmasi, setShowKonfirmasi] = useState(false);
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const [sukses, setSukses] = useState(false);

    const handleDaftar = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!nama || !email || !noTelepon || !password || !konfirmasiPassword) {
            setError("Semua field wajib diisi.");
            return;
        }

        if (password !== konfirmasiPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }

        if (password.length < 8) {
            setError("Password minimal 8 karakter.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/pembeli/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        nama_pembeli:          nama,
                        email:                 email,
                        no_telepon:            noTelepon,
                        password:              password,
                        password_confirmation: konfirmasiPassword,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok || !data.success) {
                // Tangani pesan error validasi dari Laravel
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0];
                    setError(Array.isArray(firstError) ? firstError[0] as string : String(firstError));
                } else {
                    setError(data.message || "Registrasi gagal. Coba lagi.");
                }
                return;
            }

            setSukses(true);
            setTimeout(() => {
                router.push("/pembeli/login");
            }, 2000);

        } catch {
            setError("Tidak dapat terhubung ke server. Pastikan backend berjalan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

            {/* ================= LEFT — Gambar Produk ================= */}
            <div
                className="hidden md:flex flex-col items-center justify-center relative px-10 py-10"
                style={{
                    background: "linear-gradient(180deg, #BFD8C2 0%, #A9C5A8 100%)",
                }}
            >
                {/* PATTERN OVERLAY */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: "url('/images/decorations/bg-pattern.png')",
                        backgroundSize: "cover",
                    }}
                />

                {/* LOGO + TAGLINE */}
                <div className="relative z-10 self-start">
                    <Link href="/pembeli">
                        <Image
                            src="/images/logo/logo-sejuba.png"
                            alt="Sejuba Drink"
                            width={140}
                            height={50}
                        />
                    </Link>
                    <p className="mt-3 text-3xl font-extrabold text-[#F25C22] leading-tight tracking-wide">
                        FRESHNESS FOR YOUR <br /> LIFESTYLE
                    </p>
                </div>

                {/* GAMBAR PRODUK */}
                <div className="relative z-10 w-full max-w-xl flex-1 flex items-center justify-center">
                    <Image
                        src="/images/beranda/produk02.png"
                        alt="Produk Sejuba Drink"
                        width={800}
                        height={450}
                        className="w-full h-auto object-contain drop-shadow-xl"
                        priority
                    />
                </div>
            </div>

            {/* ================= RIGHT — Form Registrasi ================= */}
            <div
                className="relative flex flex-col items-center justify-center px-8 md:px-14 py-10"
                style={{
                    backgroundImage: "url('/images/decorations/bg-pattern.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backgroundColor: "#f0f5f0",
                    backgroundBlendMode: "soft-light",
                }}
            >
                {/* Logo mobile — tampil hanya di layar kecil */}
                <div className="md:hidden mb-6">
                    <Link href="/pembeli">
                        <Image
                            src="/images/logo/logo-sejuba.png"
                            alt="Sejuba Drink"
                            width={120}
                            height={45}
                        />
                    </Link>
                </div>

                {/* CARD */}
                <div className="bg-[#E9EFE8] rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] w-full max-w-[480px]">

                    {/* JUDUL */}
                    <p className="text-[#F25C22] font-bold text-lg mb-6">Daftar</p>

                    {/* SUKSES MESSAGE */}
                    {sukses && (
                        <div className="mb-5 rounded-xl bg-green-50 border border-green-300 px-4 py-3 text-sm text-green-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Registrasi berhasil! Mengarahkan ke halaman login...
                        </div>
                    )}

                    {/* ERROR MESSAGE */}
                    {error && (
                        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleDaftar} className="space-y-5" noValidate>

                        {/* NAMA LENGKAP */}
                        <div>
                            <label
                                htmlFor="reg-nama"
                                className="block text-gray-500 font-semibold text-sm mb-1 tracking-wide uppercase"
                            >
                                Nama Lengkap :
                            </label>
                            <input
                                id="reg-nama"
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                className="w-full bg-transparent border-b border-gray-400 focus:border-[#F25C22] outline-none py-1.5 text-gray-800 placeholder:text-gray-400 transition"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label
                                htmlFor="reg-email"
                                className="block text-gray-500 font-semibold text-sm mb-1 tracking-wide uppercase"
                            >
                                Email :
                            </label>
                            <input
                                id="reg-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="contoh@email.com"
                                className="w-full bg-transparent border-b border-gray-400 focus:border-[#F25C22] outline-none py-1.5 text-gray-800 placeholder:text-gray-400 transition"
                            />
                        </div>

                        {/* NOMOR TELEPON */}
                        <div>
                            <label
                                htmlFor="reg-telepon"
                                className="block text-gray-500 font-semibold text-sm mb-1 tracking-wide uppercase"
                            >
                                Nomor Telepon :
                            </label>
                            <input
                                id="reg-telepon"
                                type="tel"
                                value={noTelepon}
                                onChange={(e) => setNoTelepon(e.target.value)}
                                placeholder="0812xxxx"
                                className="w-full bg-transparent border-b border-gray-400 focus:border-[#F25C22] outline-none py-1.5 text-gray-800 placeholder:text-gray-400 transition"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label
                                htmlFor="reg-password"
                                className="block text-gray-500 font-semibold text-sm mb-1 tracking-wide uppercase"
                            >
                                Password :
                            </label>
                            <div className="relative">
                                <input
                                    id="reg-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Minimal 8 karakter"
                                    className="w-full bg-transparent border-b border-gray-400 focus:border-[#F25C22] outline-none py-1.5 pr-10 text-gray-800 placeholder:text-gray-400 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                >
                                    {showPassword ? (
                                        /* eye-off icon */
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        /* eye icon */
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* KONFIRMASI PASSWORD */}
                        <div>
                            <label
                                htmlFor="reg-konfirmasi"
                                className="block text-gray-500 font-semibold text-sm mb-1 tracking-wide uppercase"
                            >
                                Konfirmasi Password :
                            </label>
                            <div className="relative">
                                <input
                                    id="reg-konfirmasi"
                                    type={showKonfirmasi ? "text" : "password"}
                                    value={konfirmasiPassword}
                                    onChange={(e) => setKonfirmasiPassword(e.target.value)}
                                    placeholder="Ulangi password"
                                    className="w-full bg-transparent border-b border-gray-400 focus:border-[#F25C22] outline-none py-1.5 pr-10 text-gray-800 placeholder:text-gray-400 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    aria-label={showKonfirmasi ? "Sembunyikan konfirmasi" : "Tampilkan konfirmasi"}
                                >
                                    {showKonfirmasi ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* TOMBOL DAFTAR */}
                        <div className="pt-4">
                            <button
                                id="btn-daftar"
                                type="submit"
                                disabled={loading || sukses}
                                className="w-full bg-[#F25C22] hover:bg-[#d94a15] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-white font-bold py-3 rounded-full shadow-md tracking-widest disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                            >
                                {loading ? "Memproses..." : "DAFTAR"}
                            </button>
                        </div>

                        {/* LINK KE LOGIN */}
                        <p className="text-center text-sm text-gray-500 pt-1">
                            Sudah punya akun?{" "}
                            <Link
                                href="/pembeli/login"
                                className="text-[#F25C22] font-semibold hover:underline"
                            >
                                Masuk
                            </Link>
                        </p>

                    </form>
                </div>
            </div>

        </div>
    );
}
