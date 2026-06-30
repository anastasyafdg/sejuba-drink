"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type Props = {
  search?: string;
};

const allProducts = [
  {
    id: "green",
    name: "Green Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/green.png",
    descKey: "product.desc.green",
    ingredients: ["Pak Choy", "Timun", "Apel", "Nanas"],
    color: "#5A8A3A",
    bg: "#EEF7E2",
    pattern: "/images/pattern/green1.png",
  },
  {
    id: "red",
    name: "Red Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/red.png",
    descKey: "product.desc.red",
    ingredients: ["Beet", "Apel", "Wortel", "Nanas"],
    color: "#B52020",
    bg: "#FDEAEC",
    pattern: "/images/pattern/red1.png",
  },
  {
    id: "orange",
    name: "Orange Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/orange.png",
    descKey: "product.desc.orange",
    ingredients: ["Apel", "Wortel", "Nanas"],
    color: "#C85A20",
    bg: "#FEF0E8",
    pattern: "/images/pattern/orange1.png",
  },
  {
    id: "yellow",
    name: "Yellow Series",
    type: "Cold Pressed Juice",
    image: "/images/produk/yellow.png",
    descKey: "product.desc.yellow",
    ingredients: ["Pir", "Nanas", "Jahe"],
    color: "#A08000",
    bg: "#FDF8E4",
    pattern: "/images/pattern/yellow1.png",
  },
  {
    id: "purple",
    name: "Purple Series",
    type: "Infused Water Drink",
    image: "/images/produk/purple.png",
    descKey: "product.desc.purple",
    ingredients: ["Bunga Telang", "Sereh", "Lemon", "Jahe"],
    color: "#6A28A0",
    bg: "#F5EAFF",
    pattern: "/images/pattern/purple1.png",
  },
  {
    id: "blue",
    name: "Blue Series",
    type: "Infused Water Drink",
    image: "/images/produk/blue.png",
    descKey: "product.desc.blue",
    ingredients: ["Spirulina", "Sereh", "Lemon", "Jahe"],
    color: "#0E7AAA",
    bg: "#E4F5FE",
    pattern: "/images/pattern/blue1.png",
  },
];

export default function ProductSwitcher({ search = "" }: Props) {
  const { t } = useLanguage();

  const filtered = allProducts.filter((product) => {
    const keyword = search.toLowerCase();
    
    // Translated values
    const transName = t(product.name).toLowerCase();
    const transType = t(product.type).toLowerCase();
    const transIngredients = product.ingredients.map((ing) => t(ing).toLowerCase());

    // Raw/Original values
    const rawName = product.name.toLowerCase();
    const rawType = product.type.toLowerCase();
    const rawIngredients = product.ingredients.map((ing) => ing.toLowerCase());

    return (
      transName.includes(keyword) ||
      transType.includes(keyword) ||
      transIngredients.some((item) => item.includes(keyword)) ||
      rawName.includes(keyword) ||
      rawType.includes(keyword) ||
      rawIngredients.some((item) => item.includes(keyword))
    );
  });

  const [active, setActive] = useState(filtered[0] || allProducts[0]);

  useEffect(() => {
    if (search && filtered.length > 0) {
      setActive(filtered[0]);
    }
  }, [search]);

  const current = active || allProducts[0];

  if (filtered.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        {t("product.switcher.not_found")}
      </p>
    );
  }

  return (
    <div
      className="py-20 text-center px-4 transition-all duration-500"
      style={{
        backgroundImage: `url('${current.pattern}')`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundColor: current.bg,
      }}
    >
      {/* LABEL */}
      <p className="text-sm tracking-widest font-semibold" style={{ color: current.color, opacity: 0.7 }}>
        {t(current.type)?.toUpperCase()}
      </p>

      {/* DESKRIPSI */}
      <h2
        className="max-w-2xl mx-auto mt-3 text-xl font-bold leading-relaxed"
        style={{ color: current.color }}
      >
        {t(current.descKey)}
      </h2>

      {/* ================= PRODUK SECTION ================= */}
      <div className="flex justify-center items-center gap-10 mt-14 flex-wrap">

        {/* CARD KIRI — Tentang Produk */}
        <div className="w-52 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.10)] overflow-hidden bg-white">
          <div
            className="text-white text-sm font-semibold py-2.5 text-center"
            style={{ backgroundColor: current.color }}
          >
            {t("product.switcher.about")}
          </div>
          <div className="p-5 text-left">
            <p className="text-xs text-gray-400 mb-0.5">{t("product.switcher.type")}</p>
            <p className="text-sm font-semibold text-gray-800 mb-4">{t(current.type)}</p>
            <p className="text-xs text-gray-400 mb-0.5">{t("product.switcher.variant")}</p>
            <p className="text-sm font-semibold text-gray-800">{t(current.name)}</p>
          </div>
        </div>

        {/* GAMBAR PRODUK */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.image}
          alt={current.name}
          className="w-44 md:w-56 drop-shadow-xl"
        />

        {/* CARD KANAN — Kandungan Produk */}
        <div className="w-52 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.10)] overflow-hidden bg-white">
          <div
            className="text-white text-sm font-semibold py-2.5 text-center"
            style={{ backgroundColor: current.color }}
          >
            {t("product.switcher.ingredients")}
          </div>
          <div className="p-5 text-left space-y-1.5">
            {current.ingredients.map((ing, idx) => (
              <p key={idx} className="text-sm font-medium text-gray-800">{t(ing)}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ================= COLOR SWITCHER ================= */}
      <div className="flex justify-center items-center gap-4 mt-12">
        {filtered.map((p) => {
          const isActive = current.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              title={t(p.name)}
              className="relative flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 focus:outline-none"
              style={{
                width: 40,
                height: 40,
                backgroundColor: p.color,
                boxShadow: isActive
                  ? `0 0 0 3px white, 0 0 0 5px ${p.color}`
                  : "0 2px 6px rgba(0,0,0,0.18)",
              }}
            >
              {/* Checkmark pada tombol aktif */}
              {isActive && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {t("product.switcher.hint")}
      </p>
    </div>
  );
}