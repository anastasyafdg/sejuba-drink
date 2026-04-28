"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPenjualPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/penjual/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ nama_penjual: username, password }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Login gagal. Coba lagi.");
        return;
      }

      localStorage.setItem("penjual", JSON.stringify(data.data));
      router.push("/penjual/dashboard");
    } catch {
      setError("Tidak dapat terhubung ke server. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Kiri — panel hijau muda */}
      <div
        className="w-1/2 bg-[#c9deca] px-12 py-10 flex flex-col"
        style={{
          backgroundImage: "url('/images/pattern-bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      >
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo/logo-sejuba.png"
            alt="Sejuba Drink"
            width={130}
            height={70}
            className="h-auto"
            priority
          />
        </div>

        {/* Tagline */}
        <h1 className="text-[32px] font-extrabold text-[#f15a18] leading-tight mb-10 max-w-[280px]">
          FRESHNESS FOR YOUR LIFESTYLE
        </h1>

        {/* Form Card */}
        <div className="bg-[#e8f1e8] rounded-[24px] px-12 py-12 shadow-sm max-w-[500px] w-full">
          {/* Error pesan */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-100 border border-red-300 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-[17px] font-semibold text-[#2d2d2d] mb-2">
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full border-0 border-b-2 border-[#888] bg-transparent pb-1 text-base text-[#2d2d2d] outline-none placeholder:text-gray-400 focus:border-[#46684d]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[17px] font-semibold text-[#2d2d2d] mb-2">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full border-0 border-b-2 border-[#888] bg-transparent pb-1 text-base text-[#2d2d2d] outline-none placeholder:text-gray-400 focus:border-[#46684d]"
              />
            </div>

            {/* Tombol */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="min-w-[160px] rounded-full bg-[#f15a18] px-10 py-3 text-[17px] font-bold text-white transition hover:scale-[1.03] hover:bg-[#d04a11] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "LOGIN"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Kanan — panel putih + gambar produk */}
      <div
        className="w-1/2 bg-white flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/pattern-bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
          backgroundBlendMode: "soft-light",
          backgroundColor: "#f0f5f0",
        }}
      >
        <Image
          src="/images/beranda/produk02.png"
          alt="Produk Sejuba Drink"
          width={600}
          height={480}
          className="object-contain w-[90%] h-auto drop-shadow-xl"
          priority
        />
      </div>
    </div>
  );
}
