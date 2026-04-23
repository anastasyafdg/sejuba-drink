"use client";

import { useState } from "react";
import ProductCard from "@/components/pembeli/ProductCard";
import ProductModal from "@/components/pembeli/ProductModal";
import CartSidebar from "@/components/pembeli/CartSidebar";

const products = [
  {
    id: 1,
    name: "Green Series",
    image: "/images/produk/green.png",
    bg: "#CFE8D3",
    sizes: [
      { label: "250 ml", price: 29500 },
      { label: "100 ml", price: 15500 },
      { label: "50 ml", price: 8500 },
    ],
  },
  {
    id: 2,
    name: "Red Series",
    image: "/images/produk/red.png",
    bg: "#FFE5EC",
    sizes: [
      { label: "250 ml", price: 29500 },
      { label: "100 ml", price: 15500 },
      { label: "50 ml", price: 8500 },
    ],
  },
  {
    id: 3,
    name: "Orange Series",
    image: "/images/produk/orange.png",
     bg: "#FFECE5",
    sizes: [
      { label: "250 ml", price: 29500 },
      { label: "100 ml", price: 15500 },
      { label: "50 ml", price: 8500 },
    ],
  },
  {
    id: 4,
    name: "Yellow Series",
    image: "/images/produk/yellow.png",
    bg: "#FFF9E5",
    sizes: [
      { label: "250 ml", price: 29500 },
      { label: "100 ml", price: 15500 },
      { label: "50 ml", price: 8500 },
    ],
  },
  {
    id: 5,
    name: "Purple Series",
    image: "/images/produk/purple.png",
    bg: "#F3E5F5",
    sizes: [
      { label: "250 ml", price: 29500 },
      { label: "100 ml", price: 15500 },
      { label: "50 ml", price: 8500 },
    ],
  },
  {
    id: 6,
    name: "Blue Series",
    image: "/images/produk/blue.png",
    bg: "#E3F2FD",
    sizes: [
      { label: "250 ml", price: 29500 },
      { label: "100 ml", price: 15500 },
      { label: "50 ml", price: 8500 },
    ],
  },
];

export default function PemesananPage() {
  const [selected, setSelected] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-orange-500">
          Pilih Kesukaanmu!
        </h1>

        {/* SUBTITLE */}
        <p className="mt-3 text-gray-600 max-w-xl">
          Pilih produk Sejuba Drink sesuai pilihanmu dan rasakan kesegaran
          alaminya dalam setiap tegukan.
        </p>

        {/* ================= CART ICON ================= */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOpen(true)}
            className="relative bg-orange-500 text-white p-3 rounded-xl shadow-md hover:scale-105 transition"
          >
            <span className="material-symbols-outlined text-[22px]">
              shopping_cart
            </span>

            {/* BADGE */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#6BAA4F] text-white text-[10px] px-1.5 py-[2px] rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* ================= GRID PRODUK ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onAdd={(item: any) => {
            setCart((prev) => [...prev, item]);
            setOpen(true);
          }}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <CartSidebar open={open} setOpen={setOpen} cart={cart} />

      {/* ================= CARA PEMESANAN ================= */}
      <div className="bg-[#6FAE54] py-24 mt-28 mb-20">
        
        <h2 className="text-center text-[32px] font-bold text-white mb-14">
          Cara Pemesanan
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 px-6">
          
          {/* CARD 1 */}
          <div className="bg-[#F59E2E] text-white p-6 rounded-[20px] text-center shadow-md h-[260px] flex flex-col justify-center">
            <h3 className="font-semibold text-sm mb-4 leading-snug">
              Pilih Produk <br /> Sejuba Drink
            </h3>

            <span className="material-symbols-outlined text-[48px] mb-4">
              shopping_cart
            </span>

            <p className="text-xs leading-relaxed">
              Kamu bisa memilih produk Sejuba Drink sebanyak yang kamu inginkan
              dengan menambahkannya ke keranjang. Kemudian, kamu bisa melakukan
              checkout pada produk-produk tersebut.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#F59E2E] text-white p-6 rounded-[20px] text-center shadow-md h-[260px] flex flex-col justify-center">
            <h3 className="font-semibold text-sm mb-4 leading-snug">
              Isi Data <br /> Pengiriman
            </h3>

            <span className="material-symbols-outlined text-[48px] mb-4">
              edit_square
            </span>

            <p className="text-xs leading-relaxed">
              Isi alamat pengiriman dan metode pembayaran pilihan kamu.
              Selanjutnya, lakukan pembayaran agar produk yang kamu pilih
              dapat diproses pengirimannya.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-[#F59E2E] text-white p-6 rounded-[20px] text-center shadow-md h-[260px] flex flex-col justify-center">
            <h3 className="font-semibold text-sm mb-4 leading-snug">
              Lakukan <br /> Pembayaran
            </h3>

            <span className="material-symbols-outlined text-[48px] mb-4">
              payments
            </span>

            <p className="text-xs leading-relaxed">
              Setelah proses pembayaran terkonfirmasi, produk pesanan kamu
              akan dikirim di hari yang sama. Kamu bisa menunggu dan melihat
              track perjalanan melalui WhatsApp dan Gojek.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}