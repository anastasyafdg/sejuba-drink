"use client";

import Image from "next/image";
import { useState } from "react";

const tabs = [
  "Semua",
  "Menunggu Pembayaran",
  "Diproses",
  "Dikirim",
  "Selesai",
];

const orders = [
  {
    id: 1,
    productName: "Purple Lime",
    volume: "100 ml",
    image: "/images/produk/purple.png",
    totalProducts: 3,
    totalPrice: "Rp. 75.000",
  },
  {
    id: 2,
    productName: "Blue Lime",
    volume: "100 ml",
    image: "/images/produk/blue.png",
    totalProducts: 3,
    totalPrice: "Rp. 75.000",
  },
  {
    id: 3,
    productName: "Green Lime",
    volume: "100 ml",
    image: "/images/produk/green.png",
    totalProducts: 3,
    totalPrice: "Rp. 75.000",
  },
];

export default function RiwayatPemesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 pt-48 pb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase">Riwayat Pemesanan</h1>
        <p className="text-gray-600 text-sm">
          Lihat status dan detail semua pesanan yang pernah kamu buat.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  isActive
                    ? "bg-[#70A625] text-white border-[#70A625]"
                    : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        <div className="mt-10 space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              {/* Left Side: Product Info */}
              <div className="flex items-center gap-6">
                <div className="bg-[#E5EFE7] w-24 h-24 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src={order.image}
                    alt={order.productName}
                    width={40}
                    height={80}
                    className="object-contain w-auto h-[70px]"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{order.productName}</h3>
                  <p className="text-gray-500 text-sm mt-1">{order.volume}</p>
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-600 mt-4 hover:text-gray-800 transition">
                    Lihat Semua
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Side: Price & Actions */}
              <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                <p className="font-bold text-gray-800 mb-6">
                  Total {order.totalProducts} Produk : {order.totalPrice}
                </p>
                <div className="flex items-center gap-3 w-full justify-end">
                  <button className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-400 rounded-lg hover:bg-gray-50 transition w-full md:w-auto">
                    Lihat Rating
                  </button>
                  <button className="px-5 py-2 text-sm font-medium text-[#F59B22] bg-white border border-[#F59B22] rounded-lg hover:bg-[#fff7ed] transition w-full md:w-auto">
                    Beli Lagi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
