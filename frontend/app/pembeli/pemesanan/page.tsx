"use client";

import { useEffect, useRef, useState } from "react";

import ProductCard from "@/components/pembeli/ProductCard";
import ProductModal from "@/components/pembeli/ProductModal";
import CartSidebar from "@/components/pembeli/CartSidebar";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";

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
  const { t } = useLanguage();
  const { pembeli } = useAuth();

  // Key unik per pembeli agar keranjang tidak tercampur antar akun
  const cartKey = pembeli?.id_pembeli
    ? `sejuba_cart_${pembeli.id_pembeli}`
    : "sejuba_cart_guest";

  // ─────────────────────────────────────────────────────────────────────────
  // Ref di-init dengan cartKey saat ini agar saat useEffect([cartKey])
  // pertama kali jalan, prevKey === cartKey → tahu ini mount, bukan login/logout.
  // ─────────────────────────────────────────────────────────────────────────
  const prevCartKeyRef = useRef<string>(cartKey);

  const [products, setProducts] = useState<Product[]>([]);

  const [selected, setSelected] = useState<FormattedProduct | null>(null);

  // Cart selalu dimulai KOSONG agar server render = client render (tidak hydration error).
  // Data dari localStorage dimuat setelah hydration selesai (di useEffect bawah).
  const [cart, setCart] = useState<CartItem[]>([]);

  // Flag: true setelah hydration selesai dan cart sudah dimuat dari localStorage.
  // Save effect hanya boleh jalan setelah flag ini true agar tidak menghapus data.
  const [hasHydrated, setHasHydrated] = useState(false);

  const [open, setOpen] = useState(false);

  const [animateCart, setAnimateCart] = useState(false);

  const [toast, setToast] = useState("");

  const [loading, setLoading] = useState(true);

  // ================= LOAD CART SETELAH HYDRATION (mount-only) =================
  // Runs hanya di client setelah React selesai hydration, aman baca localStorage.
  useEffect(() => {
    try {
      if (pembeli?.id_pembeli) {
        // 1. Pending cart dari redirect setelah login
        const pendingCart = sessionStorage.getItem("sejuba_pending_cart");
        if (pendingCart) {
          const parsed = JSON.parse(pendingCart);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCart(parsed);
            sessionStorage.removeItem("sejuba_pending_cart");
            localStorage.setItem(cartKey, JSON.stringify(parsed));
            setHasHydrated(true);
            setOpen(true);
            return;
          }
        }

        // 2. Load cart dari localStorage sesuai akun saat ini
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCart(parsed);
          }
        }
      } else {
        // Jika tidak login, pastikan keranjang kosong dan hapus guest cart
        setCart([]);
        localStorage.removeItem("sejuba_cart_guest");
      }
    } catch {}

    setHasHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-only

  // ================= HANDLE LOGIN / LOGOUT (cartKey berubah) =================
  useEffect(() => {
    const prevKey = prevCartKeyRef.current;
    prevCartKeyRef.current = cartKey;

    // Abaikan saat mount (prevKey === cartKey karena ref di-init dengan cartKey)
    if (prevKey === cartKey) return;

    // ─── USER LOGOUT ─────────────────────────────────────────────────────────
    if (cartKey === "sejuba_cart_guest") {
      // Kosongkan keranjang saat logout dan hapus guest/session cart
      setCart([]);
      try {
        localStorage.removeItem("sejuba_cart_guest");
        sessionStorage.removeItem("sejuba_cart");
      } catch {}
      return;
    }

    // ─── USER LOGIN ──────────────────────────────────────────────────────────
    // Muat cart milik akun yang baru login dari localStorage.
    try {
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
          return;
        }
      }
      // Akun ini belum punya cart tersimpan → kosongkan
      setCart([]);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartKey]);

  // ================= SIMPAN CART KE LOCALSTORAGE =================
  // Guard: hanya jalan setelah hasHydrated = true agar tidak menghapus
  // data localStorage sebelum cart sempat dimuat dari storage.
  useEffect(() => {
    if (!hasHydrated) return;
    // Jangan simpan ke localStorage jika user tidak login
    if (!pembeli?.id_pembeli) return;
    try {
      if (cart.length > 0) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
      } else {
        localStorage.removeItem(cartKey);
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, cartKey, hasHydrated]);

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
            {t("order.hero.title")}
          </h1>

          {/* ================= SUBTITLE ================= */}
          <p className="mt-3 text-gray-600 max-w-xl">
            {t("order.hero.subtitle")}
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
                {t("order.loading")}
              </p>

            ) : formattedProducts.length === 0 ? (

              <p className="text-gray-500">
                {t("order.empty")}
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
              // Harus login untuk bisa menambah ke keranjang
              if (!pembeli) {
                setToast(t("checkout.toast_login"));
                setTimeout(() => {
                  setToast("");
                  window.location.href = "/pembeli/login?from=/pembeli/pemesanan";
                }, 1500);
                return;
              }

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

              setToast(t("order.toast.added"));

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
          {t("order.steps.title")}
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 px-6">

          {/* ================= CARD 1 ================= */}
          <div className="bg-[#F59E2E] text-white p-6 rounded-[20px] text-center shadow-md h-[260px] flex flex-col justify-center">

            <h3 className="font-semibold text-sm mb-4 leading-snug">
              {t("order.steps.step1_title")}
            </h3>

            <span className="material-symbols-outlined text-[48px] mb-4">
              shopping_cart
            </span>

            <p className="text-xs leading-relaxed">
              {t("order.steps.step1_desc")}
            </p>

          </div>

          {/* ================= CARD 2 ================= */}
          <div className="bg-[#F59E2E] text-white p-6 rounded-[20px] text-center shadow-md h-[260px] flex flex-col justify-center">

            <h3 className="font-semibold text-sm mb-4 leading-snug">
              {t("order.steps.step2_title")}
            </h3>

            <span className="material-symbols-outlined text-[48px] mb-4">
              edit_square
            </span>

            <p className="text-xs leading-relaxed">
              {t("order.steps.step2_desc")}
            </p>

          </div>

          {/* ================= CARD 3 ================= */}
          <div className="bg-[#F59E2E] text-white p-6 rounded-[20px] text-center shadow-md h-[260px] flex flex-col justify-center">

            <h3 className="font-semibold text-sm mb-4 leading-snug">
              {t("order.steps.step3_title")}
            </h3>

            <span className="material-symbols-outlined text-[48px] mb-4">
              payments
            </span>

            <p className="text-xs leading-relaxed">
              {t("order.steps.step3_desc")}
            </p>

          </div>

        </div>
      </div>
    </>
  );
}