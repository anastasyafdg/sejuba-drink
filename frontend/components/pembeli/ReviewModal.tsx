"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Product {
    id: number;
    name: string;
    image?: string;
    category?: string;
}

export default function ReviewModal({ open, setOpen }: any) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [ulasan, setUlasan] = useState("");

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

    const submitUlasan = async () => {
        try {

            if (!selectedProduct) {
                alert("Pilih produk terlebih dahulu");
                return;
            }

            if (rating === 0) {
                alert("Pilih rating terlebih dahulu");
                return;
            }

            if (!ulasan.trim()) {
                alert("Isi ulasan terlebih dahulu");
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
                        id_pembeli: 2, // sementara dulu
                        id_produk: selectedProduct.id,
                        rating,
                        ulasan,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                toast.success("Ulasan berhasil ditambahkan");

                setOpen(false);

                window.location.reload();
            }

        } catch (error) {

            toast.error("Gagal menambahkan ulasan");

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
                    Beri Ulasan & Rating
                </h2>

                <p className="text-center text-[13px] text-gray-500 mt-1">
                    Bagikan pengalaman mu setelah menikmati Sejuba Drink
                </p>

                {/* ================= DROPDOWN PRODUK ================= */}
                <div className="mt-6 relative">

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
                                <p className="font-semibold text-[16px]">
                                    {selectedProduct?.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    Produk Sejuba Drink
                                </p>
                            </div>
                        </div>

                        <span className="material-symbols-outlined text-gray-500">
                            expand_more
                        </span>
                    </div>

                    {/* DROPDOWN */}
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
                                        <p className="text-xs text-gray-500">Produk Sejuba Drink</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-b mt-4"></div>

                {/* ================= RATING ================= */}
                <div className="mt-6">
                    <p className="font-semibold text-[16px] mb-3">Beri Rating</p>

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
                    <p className="font-semibold text-[16px] mb-2">Tulis Ulasan</p>

                    <textarea
                        value={ulasan}
                        onChange={(e) => setUlasan(e.target.value)}
                        placeholder="Ceritakan pengalaman mu menikmati Sejuba Drink"
                        className="w-full h-[90px] rounded-xl bg-[#EAEAEA] p-3 text-sm outline-none resize-none"
                    ></textarea>
                </div>

                {/* ================= BUTTON ================= */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={() => setOpen(false)}
                        className="flex-1 border border-green-600 text-green-600 py-2.5 rounded-xl font-medium"
                    >
                        Batal
                    </button>

                    <button
                        onClick={submitUlasan}
                        className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition"
                    >
                        Kirim Ulasan
                    </button>
                </div>

            </div>
        </div>
    );
}