"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/pembeli/ProductCard";
import ProductModal from "@/components/pembeli/ProductModal";
import CartSidebar from "@/components/pembeli/CartSidebar";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  bg_color: string;

  price_50: number;
  stock_50: number;

  price_100: number;
  stock_100: number;

  price_250: number;
  stock_250: number;
}

interface FormattedProduct {
  id: number;
  name: string;
  image: string;
  bg: string;
  category: string;
  sizes: { label: string; price: number }[];
}

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  qty: number;
}

export default function PemesananPage() {

  const [products, setProducts] = useState<Product[]>([]);

  const [selected, setSelected] = useState<FormattedProduct | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [open, setOpen] = useState(false);

  const [animateCart, setAnimateCart] = useState(false);

  const [toast, setToast] = useState("");

  const [loading, setLoading] = useState(true);

  // ================= RESTORE PENDING CART SETELAH LOGIN =================
  useEffect(() => {
    try {
      const pendingCart = sessionStorage.getItem("sejuba_pending_cart");
      if (pendingCart) {
        const parsed = JSON.parse(pendingCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
          sessionStorage.removeItem("sejuba_pending_cart");
          // Auto-buka sidebar keranjang agar user sadar cartnya ter-restore
          setOpen(true);
        }
      }
    } catch {}
  }, []);

  // ================= RESTORE PENDING CART SETELAH LOGIN =================
  useEffect(() => {
    try {
      const pendingCart = sessionStorage.getItem("sejuba_pending_cart");
      if (pendingCart) {
        const parsed = JSON.parse(pendingCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
          sessionStorage.removeItem("sejuba_pending_cart");
          // Auto-buka sidebar keranjang agar user sadar cartnya ter-restore
          setOpen(true);
        }
      }
    } catch {}
  }, []);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/api/products"
        );

        const data = await response.json();

        setProducts(data);

      } catch (error) {

        console.error("Failed to fetch products:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  // ================= FORMAT PRODUCT =================
  const formattedProducts = products.map((product) => {
    // Fallback to static high-fidelity image based on name if no image uploaded
    let defaultImg = "/images/produk/green.png";
    const lowerName = product.name.toLowerCase();
    if (lowerName.includes("red")) defaultImg = "/images/produk/red.png";
    else if (lowerName.includes("orange")) defaultImg = "/images/produk/orange.png";
    else if (lowerName.includes("yellow")) defaultImg = "/images/produk/yellow.png";
    else if (lowerName.includes("purple")) defaultImg = "/images/produk/purple.png";
    else if (lowerName.includes("blue")) defaultImg = "/images/produk/blue.png";

    return {
      id: product.id,
      name: product.name,
      image: product.image
        ? (product.image.startsWith("http")
          ? product.image
          : `http://127.0.0.1:8000/storage/${product.image}`)
        : defaultImg,
      bg: product.bg_color || "#F5F5F5",
      category: product.category,
      sizes: [
        {
          label: "250 ml",
          price: product.price_250,
        },
        {
          label: "100 ml",
          price: product.price_100,
        },
        {
          label: "50 ml",
          price: product.price_50,
        },
      ],
    };
  });

  return (
    <>
      {/* ================= HEADER ================= */}
      <section
        className="bg-[#f8f8f3] pb-28"
        style={{
          backgroundImage: "url('/images/pattern/beranda1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 md:pt-48">

          {/* ================= TITLE ================= */}
          <h1 className="text-4xl font-bold text-orange-500">
            Pilih Kesukaanmu!
          </h1>

          {/* ================= SUBTITLE ================= */}
          <p className="mt-3 text-gray-600 max-w-xl">
            Pilih produk Sejuba Drink sesuai pilihanmu dan rasakan kesegaran
            alaminya dalam setiap tegukan.
          </p>

          {/* ================= CART ICON ================= */}
          <div className="flex justify-end mt-6 pr-8">

            <button
              onClick={() => setOpen(true)}
              className={`relative bg-orange-500 text-white p-3 rounded-xl shadow-md transition ${animateCart ? "scale-125" : "scale-100"
                }`}
            >

              <span className="material-symbols-outlined text-[22px]">
                shopping_cart
              </span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6BAA4F] text-white text-[10px] px-1.5 py-[2px] rounded-full">
                  {cart.length}
                </span>
              )}

            </button>
          </div>

          {/* ================= PRODUCT GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">

            {loading ? (

              <p className="text-gray-500">
                Memuat produk...
              </p>

            ) : formattedProducts.length === 0 ? (

              <p className="text-gray-500">
                Belum ada produk tersedia.
              </p>

            ) : (

              formattedProducts.map((p) => (

                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={(prod) => setSelected(prod as FormattedProduct)}
                />

              ))

            )}

          </div>
        </div>

        {/* ================= PRODUCT MODAL ================= */}
        {selected && (

          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}

            onAdd={(item) => {
              // item dari ProductModal: { ...product, ...size(label,price), qty }
              // label (misal "250 ml") adalah ukuran yang dipilih
              const cartItem: CartItem = {
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                size: item.label ?? "",
                qty: item.qty,
              };

              setCart((prev) => [...prev, cartItem]);

              setAnimateCart(true);

              setTimeout(() => setAnimateCart(false), 300);

              setToast("Produk ditambahkan ke keranjang");

              setTimeout(() => setToast(""), 2000);
            }}
          />
        )}

        {/* ================= CART SIDEBAR ================= */}
        <CartSidebar
          open={open}
          setOpen={setOpen}
          cart={cart}
          setCart={setCart}
        />

      </section>

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-sm shadow-lg z-50">
          {toast}
        </div>
      )}


      {/* ================= CARA PEMESANAN ================= */}
      <div className="bg-[#6FAE54] py-24 mb-32">

        <h2 className="text-center text-[32px] font-bold text-white mb-14">
          Cara Pemesanan
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 px-6">

          {/* ================= CARD 1 ================= */}
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

          {/* ================= CARD 2 ================= */}
          <div className="bg-[#F59E2E] text-white p-6 rounded-[20px] text-center shadow-md h-[260px] flex flex-col justify-center">

            <h3 className="font-semibold text-sm mb-4 leading-snug">
              Isi Data <br /> Pengiriman
            </h3>

            <span className="material-symbols-outlined text-[48px] mb-4">
              edit_square
            </span>

            <p className="text-xs leading-relaxed">
              Isi alamat pengiriman dan metode pembayaran menggunakan QRIS.
              Selanjutnya, lakukan pembayaran agar produk yang kamu pilih
              dapat diproses pengirimannya.
            </p>

          </div>

          {/* ================= CARD 3 ================= */}
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
              track perjalanan melalui halaman riwayat pemesanan.
            </p>

          </div>

        </div>
      </div>
    </>
  );
}