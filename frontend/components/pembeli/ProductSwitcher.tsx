"use client";
import { useState } from "react";

type Props = {
  search?: string;
};

const allProducts = [
  {
    id: "green",
    name: "Green Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/green.png",
    description:
      "Kaya vitamin & antioksidan, menjaga daya tahan tubuh, hidrasi alami, mendukung pencernaan sehat, baik untuk jantung, serta membantu kontrol berat badan.",
    ingredients: ["Pak Choy", "Timun", "Apel", "Nanas"],
    color: "#94AA66",
    bg: "#EFFBD7",
  },
  {
    id: "red",
    name: "Red Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/red.png",
    description:
      "Menjaga tekanan darah & sirkulasi, meningkatkan stamina, baik untuk mata & kulit, mendukung sistem imun, serta membantu detoks ringan.",
    ingredients: ["Beet", "Apel", "Wortel", "Nanas"],
    color: "#C62828",
    bg: "#FFE5EC",
  },
  {
    id: "orange",
    name: "Orange Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/orange.png",
    description:
      "Menyehatkan mata, kaya antioksidan, memperkuat sistem imun, mendukung detoksifikasi, serta menjaga kesehatan jantung dan gula darah.",
    ingredients: ["Apel", "Wortel", "Nanas"],
    color: "#FF6E3F",
    bg: "#FFECE5",
  },
  {
    id: "yellow",
    name: "Yellow Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/yellow.png",
    description:
      "Memperkuat imun, melawan radikal bebas, mendukung metabolisme, membantu pencernaan, serta baik untuk jantung dan gula darah.",
    ingredients: ["Pir", "Nanas", "Jahe"],
    color: "#FCD53C",
    bg: "#FDF8E6",
  },
  {
    id: "purple",
    name: "Purple Series",
    type: "Infused Water Drink",
    image: "/images/produk/purple.png",
    description:
      "Kaya antioksidan, membantu relaksasi, mendukung pencernaan, memperkuat imun, serta menyegarkan tubuh.",
    ingredients: ["Bunga Telang", "Sereh", "Lemon", "Jahe"],
    color: "#7F3DA8",
    bg: "#F7EAFF",
  },
  {
    id: "blue",
    name: "Blue Series",
    type: "Infused Water Drink",
    image: "/images/produk/blue.png",
    description:
      "Menjaga kesehatan jantung & metabolisme, memberi energi alami, mendukung pencernaan, meredakan inflamasi ringan, serta meningkatkan sistem imun.",
    ingredients: ["Spirulina", "Sereh", "Lemon", "Jahe"],
    color: "#1FA8D8",
    bg: "#D6F3FE",
  },
  
];

export default function ProductSwitcher({ search = "" }: Props) {
  const filtered = allProducts.filter((product) =>
    product.ingredients.some((item) =>
      item.includes(search.toLowerCase())
    )
  );

  const [active, setActive] = useState(filtered[0] || allProducts[0]);

  const current = active || allProducts[0];

  if (filtered.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        Produk tidak ditemukan 😢
      </p>
    );
  }

  return (
    <div className="py-20 text-center px-4">
      {/* LABEL */}
      <p className="text-gray-400 text-sm tracking-wide">
        {current.type?.toUpperCase()}
      </p>

      {/* DESKRIPSI */}
      <h2
        className="max-w-3xl mx-auto mt-4 text-lg font-semibold leading-relaxed"
        style={{ color: current.color }}
      >
        {current.description}
      </h2>

      {/* ================= PRODUK SECTION ================= */}
      <div className="flex justify-center items-center gap-16 mt-14 flex-wrap">
        
        {/* CARD KIRI */}
        <div
          className="w-48 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden"
          style={{ backgroundColor: current.bg }}
        >
          <div
            className="text-white text-sm font-semibold py-2 text-center rounded-t-2xl"
            style={{ backgroundColor: current.color }}
         >
            Tentang Produk
        </div>

          <div className="p-4 text-left text-sm">
            <p className="text-gray-400 text-xs">Jenis Produk</p>
            <p className="mb-2 font-medium">{current.type}</p>

            <p className="text-gray-400 text-xs">Varian Produk</p>
            <p className="font-medium">{current.name}</p>
          </div>
        </div>

        {/* GAMBAR (FOKUS UTAMA) */}
        <img
          src={current.image}
          alt={current.name}
          className="w-44 md:w-52 drop-shadow-xl"
        />

        {/* CARD KANAN */}
        <div
          className="w-48 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden"
          style={{ backgroundColor: current.bg }}
        >
          <div
            className="text-white text-sm font-semibold py-2 text-center rounded-t-2xl"
            style={{ backgroundColor: current.color }}
          >
            Kandungan Produk
          </div>

          <div className="p-4 text-left text-sm">
            {current.ingredients.map((i, idx) => (
              <p key={idx}>{i}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BUTTON WARNA ================= */}
      <div className="flex justify-center gap-4 mt-10">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className="w-10 h-10 rounded-full transition"
            style={{
              backgroundColor: p.color,
              border:
                current.id === p.id
                  ? "3px solid #444"
                  : "2px solid #ddd",
            }}
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Klik tombol di atas untuk melihat varian Sejuba lainnya!
      </p>
    </div>
  );
}