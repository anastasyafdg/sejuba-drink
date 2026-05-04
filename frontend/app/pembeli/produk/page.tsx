"use client";
import { useState } from "react";
import ProductSwitcher from "@/components/pembeli/ProductSwitcher";

export default function ProdukPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="bg-[#f8f8f3]"
        style={{
          backgroundImage: "url('/images/pattern/beranda1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="text-center py-16 px-4 md:pt-48">
          <h1 className="text-4xl font-bold text-orange-500">
            Produk Sejuba
          </h1>

          <p className="mt-4 text-gray-600">
            Yuk, Temukan Varian Favoritmu!
          </p>


          <div className="mt-8 flex justify-center">
            <img
              src="/images/produk/produk1.1.png"
              alt="produk sejuba"
              className="w-[600px]"
            />
          </div>
        </div>
        <div className="mt-6 h-20 bg-gradient-to-b from-[#f8f8f3] to-[#9BBE87] md:mt-8 md:h-28" />
      </section>

      {/* ================= PRODUCT SWITCHER ================= */}
      <ProductSwitcher search={search} />

      {/* ================= SECTION GAMBAR + HIJAU ================= */}
      <div className="grid md:grid-cols-2">

        {/* KIRI */}
        <div>
          <img
            src="/images/produk/bg.png"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* KANAN */}
        <div className="bg-[#5FA544] text-white p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold leading-snug">
            Tahukah Kamu Rahasia <br />
            Simple Untuk Upgrade{" "}
            <span className="text-yellow-300">Tubuhmu?</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed">
            Cold Pressed Juice kami adalah{" "}
            <span className="font-semibold text-yellow-200">
              "Sari Murni Nutrisi"
            </span>{" "}
            yang menjamin kamu mendapat 100% vitamin dan enzim powerhouse
            untuk energi instan dan detoks.
          </p>

          <p className="mt-4 text-sm leading-relaxed">
            Sementara, Infused Nature Drink kami adalah{" "}
            <span className="font-semibold text-yellow-200">
              "Solusi Hidrasi Super Segar"
            </span>{" "}
            yang secara cerdas membantu kamu mudah minum air lebih banyak,
            kunci untuk kulit glowing dan menjaga body goals tanpa kalori tambahan.
          </p>
        </div>
      </div>

      {/* ================= TEXT BESAR ================= */}
      <div className="text-center py-36 bg-white px-6">
        <p className="text-2xl md:text-4xl font-bold max-w-3xl mx-auto leading-snug text-[#7F7F7F]">
          <span className="text-[#FA5318]">
            100% Buah Alami
          </span>{" "}
          , tanpa air dan gula tambahan. Baik dikonsumsi setiap hari.{" "}
          <br className="hidden md:block" />
          Setiap tetes Sejuba adalah{" "}
          <span className="text-[#445C49]">
            kesegaran murni dari alam.
          </span>
        </p>
      </div>
    </>
  );
}