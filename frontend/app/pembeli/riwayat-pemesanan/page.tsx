"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewModal from "@/components/pembeli/ReviewModal";
import { useLanguage } from "@/lib/LanguageContext";

// Tab keys (values still match API status)
const TAB_KEYS = [
  "Semua",
  "Menunggu Pembayaran",
  "Diproses",
  "Dikirim",
  "Selesai",
] as const;
type TabKey = typeof TAB_KEYS[number];

interface OrderItem {
  id_pesanan: number;
  status_pesanan: string;
  total_harga: number;
  detail_pesanan: {
    id_produk: number;
    ukuran: string;
    jumlah: number;
    harga_satuan: number;
    produk: {
      id: number;
      name: string;
      image: string;
    };
  }[];
}

interface PreselectedProduct {
  id: number;
  name: string;
  image?: string;
}

export default function RiwayatPemesananPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("Semua");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [reviewModal, setReviewModal] = useState<{ open: boolean; product: PreselectedProduct | null }>({
    open: false,
    product: null,
  });
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

  // ─── Beli Lagi: isi cart dari item pesanan lalu ke halaman pemesanan ───────
  const handleBeliLagi = (order: OrderItem) => {
    const cartItems = order.detail_pesanan.map((d) => ({
      id: d.produk.id,
      name: d.produk.name,
      image: d.produk.image
        ? (d.produk.image.startsWith("http")
          ? d.produk.image
          : `http://127.0.0.1:8000/storage/${d.produk.image}`)
        : "/images/produk/green.png",
      price: d.harga_satuan,
      size: d.ukuran,
      qty: d.jumlah,
    }));

    try {
      // Gunakan key unik per pembeli agar keranjang tidak tercampur
      const pembeliData = JSON.parse(localStorage.getItem("pembeli") || "{}");
      const cartKey = pembeliData?.id_pembeli
        ? `sejuba_cart_${pembeliData.id_pembeli}`
        : "sejuba_cart_guest";
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch { }

    router.push("/pembeli/pemesanan");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 pt-48 pb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase">{t("history.title")}</h1>
        <p className="text-gray-600 text-sm">
          {t("history.subtitle")}
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          {TAB_KEYS.map((tab) => {
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
                {t(`history.tab.${tab}` as any)}
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        <div className="mt-10 space-y-6">

          {filteredOrders.length === 0 ? (

            <div className="border border-dashed border-gray-300 rounded-2xl py-20 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {t("history.empty_title")}
              </h3>
              <p className="text-gray-500 mt-2">
                {t("history.empty_desc")}
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
                    {order.detail_pesanan.length > 1 && (
                      <p className="text-gray-400 text-xs mt-0.5">+{order.detail_pesanan.length - 1} {t("history.other_products")}</p>
                    )}
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
                    {t("history.total_payment")} ({order.detail_pesanan.length} {t("history.products_count")}) : Rp. {(order.detail_pesanan.reduce((sum, item) => sum + (item.harga_satuan * item.jumlah), 0) + 10000).toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center gap-3 w-full justify-end">
                    <button
                      onClick={() =>
                        setReviewModal({
                          open: true,
                          product: {
                            id: order.detail_pesanan?.[0]?.produk?.id,
                            name: order.detail_pesanan?.[0]?.produk?.name,
                            image: order.detail_pesanan?.[0]?.produk?.image,
                          },
                        })
                      }
                      className="bg-[#70A625] text-white px-6 py-2 rounded-lg hover:bg-[#5d8b1f] transition"
                    >
                      {t("history.btn_review")}
                    </button>
                    <button
                      onClick={() => handleBeliLagi(order)}
                      className="border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-50 transition"
                    >
                      {t("history.btn_buy_again")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        open={reviewModal.open}
        setOpen={(v) => setReviewModal((prev) => ({ ...prev, open: v }))}
        preselectedProduct={reviewModal.product}
      />
    </div>
  );
}
