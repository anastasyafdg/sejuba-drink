"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    qty: number;
    size: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID") + ",00";
const ONGKIR = 10000;

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Pemesanan2Page() {
    const router = useRouter();
    const { pembeli, isLoggedIn } = useAuth();
    const { t, language } = useLanguage();

    // Form state
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [telepon, setTelepon] = useState("");
    const [alamat, setAlamat] = useState("");
    const [jasa, setJasa] = useState<"delivery" | "selfpickup">("delivery");

    // Guard login: Arahkan ke halaman login jika belum login
    useEffect(() => {
        if (!isLoggedIn) {
            toast.error(t("checkout.toast_login"));
            router.replace("/pembeli/login?from=/pembeli/pemesanan2");
        }
    }, [isLoggedIn, router, t]);

    // Ambil data profil pembeli dari API secara otomatis saat halaman dimuat
    useEffect(() => {
        if (!pembeli) return;

        const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

        const loadProfilPembeli = async () => {
            try {
                const response = await fetch(`${API}/api/pembeli/profil`, {
                    headers: {
                        Accept: "application/json",
                        "X-Pembeli-Id": String(pembeli.id_pembeli),
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setNama(data.data.nama_pembeli ?? "");
                    setEmail(data.data.email ?? "");
                    setTelepon(data.data.no_telepon ?? "");
                }
            } catch (error) {
                console.error("Gagal mengambil data profil pembeli untuk checkout:", error);
            }
        };

        loadProfilPembeli();
    }, [pembeli]);

    // Map state
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [mapReady, setMapReady] = useState(false);
    const [loadingAddr, setLoadingAddr] = useState(false);

    // Cart
    const [cart, setCart] = useState<CartItem[]>([]);

    // ── Cart dari sessionStorage ──────────────────────────────────────────────
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem("sejuba_cart");

            if (stored) {
                const parsed = JSON.parse(stored);

                // Validasi: semua item harus punya id produk
                const valid = Array.isArray(parsed)
                    ? parsed.filter((item: CartItem) => item.id && item.name)
                    : [];

                if (valid.length > 0) {
                    setCart(valid);
                    return;
                } else {
                    // Cart lama/invalid — hapus dan redirect
                    sessionStorage.removeItem("sejuba_cart");
                    sessionStorage.removeItem("sejuba_pending_cart");
                    router.replace("/pembeli/pemesanan");
                    return;
                }
            }
        } catch { }

        // Tidak ada cart → kembali ke pemesanan
        router.replace("/pembeli/pemesanan");
    }, [router]);

    // ── Inisialisasi Leaflet (client-only) ────────────────────────────────────
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (mapInstanceRef.current) return; // sudah init
        if ((mapContainerRef.current as any)?._leaflet_id) return; // container sudah ada leaflet instance
        if (!mapContainerRef.current) return;

        let isCancelled = false;

        // Leaflet diimport secara dinamis agar tidak error saat SSR
        import("leaflet").then((L) => {
            if (isCancelled) return;
            if (mapInstanceRef.current) return;
            if (!mapContainerRef.current) return;
            if ((mapContainerRef.current as any)?._leaflet_id) return;

            // Fix icon default Leaflet (masalah umum dengan bundler)
            // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            // Titik default: Batam Center
            const defaultPos: [number, number] = [1.1291, 104.0293];

            const map = L.map(mapContainerRef.current!, {
                center: defaultPos,
                zoom: 15,
                zoomControl: true,
            });

            // OpenStreetMap tiles — 100% gratis
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            // Marker draggable
            const marker = L.marker(defaultPos, { draggable: true }).addTo(map);
            markerRef.current = marker;
            mapInstanceRef.current = map;

            // Helper: koordinat → alamat (Nominatim, gratis tanpa API key)
            const reverseGeocode = async (lat: number, lng: number) => {
                setLoadingAddr(true);
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
                        { headers: { "Accept-Language": "id", "User-Agent": "SejubaDrink/1.0" } }
                    );
                    const data = await res.json();
                    if (data?.display_name && !isCancelled) setAlamat(data.display_name);
                } catch {
                    // Gagal → biarkan user isi manual
                } finally {
                    if (!isCancelled) setLoadingAddr(false);
                }
            };

            // Klik peta → pindah marker + isi alamat
            map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
                marker.setLatLng(e.latlng);
                reverseGeocode(e.latlng.lat, e.latlng.lng);
            });

            // Seret marker → isi alamat
            marker.on("dragend", () => {
                const ll = marker.getLatLng();
                reverseGeocode(ll.lat, ll.lng);
            });

            // Lokasi browser
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        if (isCancelled) return;
                        const ll: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                        map.setView(ll, 16);
                        marker.setLatLng(ll);
                        reverseGeocode(ll[0], ll[1]);
                    },
                    () => { /* Izin ditolak — pakai Batam Center */ }
                );
            }

            setMapReady(true);
        });

        // Cleanup saat unmount
        return () => {
            isCancelled = true;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Computed ──────────────────────────────────────────────────────────────
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const total = subtotal + (jasa === "delivery" ? ONGKIR : 0);

    // ── Handlers ──────────────────────────────────────────────────────────────
    const handleBatal = () => router.back();

    const handleBayar = async () => {
        try {
            const pembeli = JSON.parse(
                localStorage.getItem("pembeli") || "{}"
            );

            if (!pembeli.id_pembeli) {
                toast.error(t("checkout.toast_login"));
                router.push("/pembeli/login");
                return;
            }

            if (!alamat.trim()) {
                toast.error(t("checkout.toast_address_required"));
                return;
            }

            if (cart.length === 0) {
                toast.error(t("checkout.toast_cart_empty"));
                return;
            }

            const response = await fetch(
                "http://127.0.0.1:8000/api/pesanan",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        id_pembeli: pembeli.id_pembeli,
                        alamat_pengiriman: alamat,
                        items: cart.map((item) => ({
                            id: item.id,
                            size: item.size,
                            price: item.price,
                            qty: item.qty,
                        })),
                    }),
                }
            );

            // Cek response.ok DULU sebelum parse JSON
            if (!response.ok) {
                const text = await response.text();
                console.error("API error response:", text);
                throw new Error(t("checkout.toast_server_error"));
            }

            const data = await response.json();

            if (!data?.data?.id_pesanan) {
                throw new Error(data?.message || t("checkout.toast_server_error"));
            }

            sessionStorage.setItem(
                "id_pesanan",
                data.data.id_pesanan.toString()
            );

            sessionStorage.setItem(
                "sejuba_order",
                JSON.stringify({
                    nama,
                    email,
                    telepon,
                    alamat,
                    jasa,
                    cart,
                    total,
                    ongkir: jasa === "delivery" ? ONGKIR : 0,
                })
            );

            sessionStorage.removeItem("sejuba_cart");
            // Hapus cart milik pembeli ini dari localStorage
            if (pembeli?.id_pembeli) {
                localStorage.removeItem(`sejuba_cart_${pembeli.id_pembeli}`);
            } else {
                localStorage.removeItem("sejuba_cart_guest");
            }

            toast.success(t("checkout.toast_order_success"));

            setTimeout(() => {
                router.push("/pembeli/pembayaran");
            }, 1500);

        } catch (error) {
            console.error(error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : t("checkout.toast_error")
            );
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <>
            {/* Inject Leaflet CSS via <link> — hanya sekali */}
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            />

            <div className="min-h-screen bg-white">
                <div className="max-w-3xl mx-auto px-5 pt-48 pb-20">

                    {/* ════════════════════════════════════════
                        INFORMASI PEMESANAN
                    ════════════════════════════════════════ */}
                    <section className="mb-10">
                        <h2 className="text-xl font-extrabold tracking-wide mb-5 uppercase">
                            {t("checkout.info_title")}
                        </h2>

                        {/* Nama */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-1 font-medium">
                                {t("checkout.buyer_name")}
                            </label>
                            <input
                                id="input-nama"
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder={t("checkout.name_placeholder")}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6BAA4F] bg-gray-100 placeholder:text-gray-400 transition"
                            />
                        </div>

                        {/* Email + Telepon */}
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1 font-medium">
                                    {t("checkout.email")}
                                </label>
                                <input
                                    id="input-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6BAA4F] bg-gray-100 placeholder:text-gray-400 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1 font-medium">
                                    {t("checkout.phone")}
                                </label>
                                <input
                                    id="input-telepon"
                                    type="tel"
                                    value={telepon}
                                    onChange={(e) => setTelepon(e.target.value)}
                                    placeholder={t("checkout.phone_placeholder")}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6BAA4F] bg-gray-100 placeholder:text-gray-400 transition"
                                />
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 italic">
                            {t("checkout.notify_info")}
                        </p>
                    </section>

                    {/* ════════════════════════════════════════
                        INFORMASI PENGIRIMAN
                    ════════════════════════════════════════ */}
                    <section className="mb-10">
                        <h2 className="text-xl font-extrabold tracking-wide mb-5 uppercase">
                            {t("checkout.shipping_title")}
                        </h2>

                        {/* Alamat */}
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                            {t("checkout.shipping_address")}
                        </label>
                        <div className="relative mb-2">
                            <input
                                id="input-alamat"
                                type="text"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                placeholder={t("checkout.address_placeholder")}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6BAA4F] bg-gray-100 placeholder:text-gray-400 transition pr-24"
                            />
                            {loadingAddr && (
                                <span className="absolute right-3 top-3 text-[#6BAA4F] text-xs animate-pulse font-medium">
                                    {t("checkout.searching")}
                                </span>
                            )}
                        </div>

                        {/* Map hint */}
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-[#F59B22] font-semibold">
                                {t("checkout.select_location")}
                            </span>
                            <span className="text-xs text-gray-500">{t("checkout.auto_from_map")}</span>
                        </div>

                        {/* ── Leaflet Map ────────────────────────────── */}
                        <div
                            className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative"
                            style={{ height: 240 }}
                        >
                            {/* Skeleton saat Leaflet belum siap */}
                            {!mapReady && (
                                <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
                                    <span className="material-symbols-outlined text-4xl text-gray-400 animate-bounce">
                                        map
                                    </span>
                                    <p className="text-sm text-gray-400">{t("checkout.loading_map")}</p>
                                </div>
                            )}
                            {/* Div ini SELALU ada di DOM — Leaflet mount di sini */}
                            <div ref={mapContainerRef} className="w-full h-full" />
                        </div>

                        <p className="text-xs text-gray-400 mt-2 text-center">
                            {t("checkout.map_instruction")}
                        </p>
                    </section>

                    {/* ════════════════════════════════════════
                        JASA PENGIRIMAN
                    ════════════════════════════════════════ */}
                    <section className="mb-10">
                        <h3 className="text-base font-bold mb-3">{t("checkout.shipping_service")}</h3>

                        <div className="flex gap-8 mb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    id="radio-delivery"
                                    type="radio"
                                    name="jasa"
                                    value="delivery"
                                    checked={jasa === "delivery"}
                                    onChange={() => setJasa("delivery")}
                                    className="accent-[#6BAA4F] w-4 h-4"
                                />
                                <span className="text-sm font-medium">{t("checkout.delivery")}</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    id="radio-selfpickup"
                                    type="radio"
                                    name="jasa"
                                    value="selfpickup"
                                    checked={jasa === "selfpickup"}
                                    onChange={() => setJasa("selfpickup")}
                                    className="accent-[#6BAA4F] w-4 h-4"
                                />
                                <span className="text-sm font-medium">{t("checkout.self_pickup")}</span>
                            </label>
                        </div>

                        <p className="text-xs text-gray-600 leading-5 mb-1">
                            <span className="font-semibold">{t("checkout.delivery")}</span> – {language === "id" ? "Pengiriman cepat dalam 1 hari." : "Fast delivery in 1 day."}
                        </p>
                        <p className="text-xs text-gray-600 leading-5">
                            <span className="font-semibold">{t("checkout.self_pickup")}</span> – {language === "id" ? "Ambil sendiri di tempat." : "Pick up by yourself at location."}
                        </p>
                        <p className="text-xs text-[#F59B22] mt-2 italic">
                            {t("checkout.delivery_notice")}
                        </p>
                    </section>

                    {/* ════════════════════════════════════════
                        RINGKASAN + METODE PEMBAYARAN
                    ════════════════════════════════════════ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

                        {/* ── Ringkasan Belanja ── */}
                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            {/* Header */}
                            <div className="bg-[#4F7703] px-5 py-3">
                                <h3 className="font-bold text-base text-white">{t("checkout.order_summary")}</h3>
                            </div>

                            {/* Body */}
                            <div className="bg-white px-5 py-4">
                                {/* Table header */}
                                <div className="grid grid-cols-3 text-xs font-semibold text-gray-700 mb-2 pb-2 border-b border-gray-200">
                                    <span>{t("checkout.product")}</span>
                                    <span className="text-center">{t("checkout.quantity")}</span>
                                    <span className="text-right">{t("checkout.price")}</span>
                                </div>

                                {/* Rows */}
                                {cart.map((item, i) => (
                                    <div key={i} className="grid grid-cols-3 text-xs py-2 border-b border-gray-100 text-gray-800">
                                        <span className="truncate pr-1">{item.name}</span>
                                        <span className="text-center">{item.qty}</span>
                                        <span className="text-right">Rp.{(item.price * item.qty).toLocaleString("id-ID")},00</span>
                                    </div>
                                ))}

                                {/* Biaya Kirim */}
                                {jasa === "delivery" && (
                                    <div className="grid grid-cols-3 text-xs py-2 text-gray-800">
                                        <span className="col-span-2">{t("checkout.shipping_cost")}</span>
                                        <span className="text-right">Rp.{ONGKIR.toLocaleString("id-ID")},00</span>
                                    </div>
                                )}

                                {/* Dashed separator */}
                                <div className="border-t-2 border-dashed border-gray-300 my-2" />

                                {/* Total */}
                                <div className="grid grid-cols-3 text-sm font-bold text-gray-900 pt-1">
                                    <span className="col-span-2">{t("checkout.total_price")}</span>
                                    <span className="text-right">Rp. {total.toLocaleString("id-ID")}</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Metode Pembayaran ── */}
                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            {/* Header */}
                            <div className="bg-[#4F7703] px-5 py-3">
                                <h3 className="font-bold text-base text-white">{t("checkout.payment_method")}</h3>
                            </div>

                            {/* Body */}
                            <div className="bg-white px-5 py-4">
                                <div className="flex items-start gap-3">
                                    {/* QRIS Icon */}
                                    <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center shrink-0 bg-white">
                                        <svg viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" fill="white" />
                                            <rect x="4" y="4" width="14" height="14" rx="2" fill="#222" />
                                            <rect x="6" y="6" width="10" height="10" rx="1" fill="white" />
                                            <rect x="8" y="8" width="6" height="6" fill="#222" />
                                            <rect x="22" y="4" width="14" height="14" rx="2" fill="#222" />
                                            <rect x="24" y="6" width="10" height="10" rx="1" fill="white" />
                                            <rect x="26" y="8" width="6" height="6" fill="#222" />
                                            <rect x="4" y="22" width="14" height="14" rx="2" fill="#222" />
                                            <rect x="6" y="24" width="10" height="10" rx="1" fill="white" />
                                            <rect x="8" y="26" width="6" height="6" fill="#222" />
                                            <rect x="22" y="22" width="4" height="4" fill="#222" />
                                            <rect x="28" y="22" width="4" height="4" fill="#222" />
                                            <rect x="22" y="28" width="4" height="4" fill="#222" />
                                            <rect x="28" y="28" width="8" height="8" fill="#222" />
                                            <rect x="34" y="22" width="2" height="4" fill="#222" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{t("checkout.qris")}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 leading-5">
                                            {t("checkout.qris_desc")}<br />
                                            {t("checkout.qris_support")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ════════════════════════════════════════
                        NOTICE + ACTIONS
                    ════════════════════════════════════════ */}
                    <p className="text-center text-[#F59B22] font-semibold text-sm mb-6">
                        {t("checkout.verify_notice")}
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            id="btn-batal"
                            onClick={handleBatal}
                            className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition"
                        >
                            {t("checkout.cancel")}
                        </button>

                        <button
                            id="btn-bayar"
                            onClick={handleBayar}
                            className="px-8 py-3 rounded-full bg-[#3A6B22] text-white font-semibold text-sm hover:bg-[#2f5a1c] transition shadow-md"
                        >
                            {t("checkout.pay_qris")}
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
