"use client";
import { useState } from "react";
import ProductSwitcher from "@/components/pembeli/ProductSwitcher";

export default function ProdukPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="text-center py-16 px-4">
        
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-orange-500">
          Produk Sejuba
        </h1>

        {/* SUBTITLE */}
        <p className="mt-4 text-gray-600">
          Yuk, Temukan Varian Favoritmu!
        </p>

        {/* IMAGE */}
        <div className="mt-8 flex justify-center">
          <img
            src="/images/produk/produk1.1.png"
            alt="produk sejuba"
            className="w-[600px]"
          />
        </div>
      </div>

      {/* ================= PRODUCT SWITCHER ================= */}
      <ProductSwitcher search={search} />

      {/* ================= SECTION GAMBAR + HIJAU ================= */}
      <div className="grid md:grid-cols-2 mt-20">
        
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
      <div className="text-center py-20 bg-[#F5F5F5] px-4">
        <p className="text-xl font-medium max-w-2xl mx-auto leading-relaxed text-gray-700">
          <span className="text-orange-500 font-semibold">
            100% Buah Alami
          </span>{" "}
          , tanpa air dan gula tambahan. Baik dikonsumsi setiap hari. <br />
          Setiap tetes Sejuba adalah{" "}
          <span className="text-green-600 font-semibold">
            kesegaran murni dari alam.
          </span>
        </p>
      </div>
    </>
  );
}