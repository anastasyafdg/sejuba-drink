"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const tabs = [
  "Semua",
  "Menunggu Pembayaran",
  "Diproses",
  "Dikirim",
  "Selesai",
];

interface OrderItem {
  id_pesanan: number;
  status_pesanan: string;
  total_harga: number;
  detail_pesanan: {
    ukuran: string;
    produk: {
      name: string;
      image: string;
    };
  }[];
}

export default function RiwayatPemesananPage() {

  const [activeTab, setActiveTab] = useState("Semua");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const router = useRouter();

  useEffect(() => {

    const loadRiwayat = async () => {

      try {

        const pembeli = JSON.parse(
          localStorage.getItem("pembeli") || "{}"
        );

        const idPembeli = pembeli.id_pembeli;

        if (!idPembeli) return;

        const response = await fetch(
          `http://127.0.0.1:8000/api/pembeli/${idPembeli}/pesanan`
        );

        const data = await response.json();

        console.log(data);

        setOrders(data.data);

      } catch (error) {

        console.error(error);
      }
    };

    loadRiwayat();

  }, []);

  const filteredOrders =
    activeTab === "Semua"
      ? orders
      : orders.filter(
        (order: OrderItem) =>
          order.status_pesanan === activeTab
      );

  console.log("ORDERS =", orders);
  console.log("FILTERED =", filteredOrders);

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
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors border ${isActive
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

          {filteredOrders.length === 0 ? (

            <div className="border border-dashed border-gray-300 rounded-2xl py-20 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Belum ada pesanan
              </h3>

              <p className="text-gray-500 mt-2">
                Pesanan yang kamu buat akan muncul di sini.
              </p>
            </div>

          ) : (

            filteredOrders.map((order: OrderItem) => (
              <div
                key={order.id_pesanan}
                className="border border-gray-300 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                {/* Left Side: Product Info */}
                <div className="flex items-center gap-6">
                  <div className="bg-[#E5EFE7] w-24 h-24 rounded-lg flex items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`http://127.0.0.1:8000/storage/${order.detail_pesanan?.[0]?.produk?.image}`}
                      alt={order.detail_pesanan?.[0]?.produk?.name || "Produk"}
                      className="h-[70px] w-auto object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{order.detail_pesanan?.[0]?.produk?.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{order.detail_pesanan?.[0]?.ukuran}</p>
                    <button onClick={() => {

                      sessionStorage.setItem(
                        "id_pesanan",
                        order.id_pesanan.toString()
                      );

                      router.push("/pembeli/status_pesanan");
                    }}>
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
                    Total {order.detail_pesanan.length} Produk : Rp. {order.total_harga.toLocaleString("id-ID")}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
