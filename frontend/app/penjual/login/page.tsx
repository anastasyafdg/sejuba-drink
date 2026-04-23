"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPenjualPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8f4]">
      {/* Background pattern samar */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/pattern-bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* Blur hijau bawah */}
      <div className="absolute bottom-[-80px] left-1/2 h-[300px] w-[1100px] -translate-x-1/2 rounded-full bg-[#b8d7b5] blur-3xl opacity-60" />

      <div className="relative z-10 min-h-screen px-6 py-8 md:px-10 md:py-8">
        <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[1280px] flex-col">
          {/* Logo kiri atas */}
          <div className="mb-4">
            <Image
              src="/images/logo/logo-sejuba.png"
              alt="Sejuba Drink"
              width={150}
              height={80}
              className="h-auto w-[115px] md:w-[135px]"
              priority
            />
          </div>

          {/* Konten utama */}
          <div className="relative flex flex-1 flex-col justify-start">
            {/* Judul kiri */}
            <div className="ml-2 mt-2 md:mt-0">
              <h1 className="max-w-[360px] text-[34px] font-bold leading-[1.35] text-[#f15a18] md:text-[44px]">
                FRESHNESS FOR YOUR LIFESTYLE
              </h1>
            </div>

            {/* Area gambar + form */}
            <div className="relative mx-auto mt-6 flex w-full max-w-[1100px] flex-1 items-center justify-center">
              {/* Gambar botol */}
              <div className="relative mt-24 w-full max-w-[880px]">
                <Image
                  src="/images/beranda/produk02.png"
                  alt="Produk Sejuba Drink"
                  width={900}
                  height={520}
                  className="mx-auto h-auto w-full object-contain"
                  priority
                />
              </div>

              {/* Box login */}
              <div className="absolute top-[20px] z-20 w-full max-w-[560px] rounded-[38px] border border-white/40 bg-[#a8c9a8]/72 px-10 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:px-12 md:py-11">
                <form className="space-y-8">
                  <div>
                    <label className="mb-2 block text-[18px] font-semibold text-white md:text-[20px]">
                      Username:
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border-0 border-b-2 border-white bg-transparent pb-2 text-base text-white outline-none placeholder:text-white/70"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[18px] font-semibold text-white md:text-[20px]">
                      Password:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-0 border-b-2 border-white bg-transparent pb-2 text-base text-white outline-none placeholder:text-white/70"
                      placeholder=""
                    />
                  </div>

                  <div className="flex justify-center pt-1">
                    <button
                      type="submit"
                      className="min-w-[160px] rounded-full bg-[#ff5a14] px-10 py-3 text-[18px] font-bold text-white transition hover:scale-[1.02]"
                    >
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}