"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";

interface Product {
    id: number;
    name: string;
    image?: string;
    category?: string;
}

interface ReviewModalProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    preselectedProduct?: Product | null;
}

export default function ReviewModal({ open, setOpen, preselectedProduct }: ReviewModalProps) {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [ulasan, setUlasan] = useState("");
    const { pembeli } = useAuth();

    // Jika ada produk yang sudah dipilih dari luar (misal dari riwayat pesanan)
    useEffect(() => {
        if (preselectedProduct) {
            setSelectedProduct(preselectedProduct);
        }
    }, [preselectedProduct]);

    useEffect(() => {

        const loadProduk = async () => {

            try {

                const response = await fetch(
                    "http://127.0.0.1:8000/api/products"
                );

                const data = await response.json();

                console.log(data);

                setProducts(data);

                if (data.length > 0) {
                    setSelectedProduct(data[0]);
                }

            } catch (error) {

                console.error(error);

            }
        };

        loadProduk();

    }, []);

    // Reset form setiap kali modal ditutup
    useEffect(() => {
        if (!open) {
            setRating(0);
            setHover(0);
            setUlasan("");
            setShowDropdown(false);
        }
    }, [open]);

    const submitUlasan = async () => {
        try {

            if (!pembeli) {
                toast.error(t("review_modal.toast_login"));
                return;
            }

            if (!selectedProduct) {
                alert(t("review_modal.alert_select_product"));
                return;
            }

            if (rating === 0) {
                alert(t("review_modal.alert_select_rating"));
                return;
            }

            if (!ulasan.trim()) {
                alert(t("review_modal.alert_write_review"));
                return;
            }

            const response = await fetch(
                "http://127.0.0.1:8000/api/ulasan",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_pembeli: pembeli?.id_pembeli,
                        id_produk: selectedProduct.id,
                        rating,
                        ulasan,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                toast.success(t("review_modal.toast_success"));

                setOpen(false);

                window.location.reload();
            }

        } catch (error) {

            toast.error(t("review_modal.toast_failed"));

        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

            {/* ================= MODAL ================= */}
            <div className="bg-[#F4F4F4] w-[90%] max-w-xl rounded-[28px] p-6 md:p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.2)]">

                {/* CLOSE */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                >
                    <span className="material-symbols-outlined text-[26px]">
                        close
                    </span>
                </button>

                {/* TITLE */}
                <h2 className="text-center text-[22px] font-bold">
                    {t("review_modal.title")}
                </h2>

                <p className="text-center text-[13px] text-gray-500 mt-1">
                    {t("review_modal.subtitle")}
                </p>

                {/* ================= PRODUK (dropdown jika bebas, readonly jika dari riwayat) ================= */}
                <div className="mt-6 relative">

                    {preselectedProduct ? (
                        // Tampilan read-only: produk sudah terpilih dari riwayat pesanan
                        <div className="flex items-center gap-3">
                            <div className="bg-[#DCE5DE] rounded-[14px] p-3">
                                <img
                                    src={
                                        selectedProduct?.image
                                            ? `http://127.0.0.1:8000/storage/${selectedProduct.image}`
                                            : "/images/logo/logo-sejuba.png"
                                    }
                                    alt=""
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-[16px]">{selectedProduct?.name}</p>
                                <p className="text-gray-500 text-xs">{t("review_modal.purchased_product")}</p>
                            </div>
                        </div>
                    ) : (
                        // Dropdown biasa jika dibuka dari halaman ulasan
                        <>
                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#DCE5DE] rounded-[14px] p-3">
                                        <img
                                            src={
                                                selectedProduct?.image
                                                    ? `http://127.0.0.1:8000/storage/${selectedProduct.image}`
                                                    : "/images/logo/logo-sejuba.png"
                                            }
                                            alt=""
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[16px]">{selectedProduct?.name}</p>
                                        <p className="text-gray-500 text-xs">{t("review_modal.product_placeholder")}</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-500">expand_more</span>
                            </div>

                            {showDropdown && (
                                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg z-50">
                                    {products.map((p) => (
                                        <div
                                            key={p.id}
                                            onClick={() => {
                                                setSelectedProduct(p);
                                                setShowDropdown(false);
                                            }}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <img
                                                src={
                                                    p.image
                                                        ? `http://127.0.0.1:8000/storage/${p.image}`
                                                        : "/images/logo/logo-sejuba.png"
                                                }
                                                alt=""
                                                width={35}
                                                height={35}
                                            />
                                            <div>
                                                <p className="text-sm font-medium">{p.name}</p>
                                                <p className="text-xs text-gray-500">{t("review_modal.product_placeholder")}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="border-b mt-4"></div>

                {/* ================= RATING ================= */}
                <div className="mt-6">
                    <p className="font-semibold text-[16px] mb-3">{t("review_modal.give_rating")}</p>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="material-symbols-outlined cursor-pointer text-[30px]"
                                style={{
                                    color:
                                        star <= (hover || rating)
                                            ? "#F59B22"
                                            : "#E0E0E0",
                                }}
                            >
                                star
                            </span>
                        ))}
                    </div>
                </div>

                {/* ================= TEXTAREA ================= */}
                <div className="mt-6">
                    <p className="font-semibold text-[16px] mb-2">{t("review_modal.write_review")}</p>

                    <textarea
                        value={ulasan}
                        onChange={(e) => setUlasan(e.target.value)}
                        placeholder={t("review_modal.textarea_placeholder")}
                        className="w-full h-[90px] rounded-xl bg-[#EAEAEA] p-3 text-sm outline-none resize-none"
                    ></textarea>
                </div>

                {/* ================= BUTTON ================= */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={() => setOpen(false)}
                        className="flex-1 border border-green-600 text-green-600 py-2.5 rounded-xl font-medium"
                    >
                        {t("review_modal.cancel")}
                    </button>

                    <button
                        onClick={submitUlasan}
                        className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition"
                    >
                        {t("review_modal.submit")}
                    </button>
                </div>

            </div>
        </div>
    );
}