"use client";

import { useState } from "react";
import Image from "next/image";

const products = [
    {
        id: 1,
        name: "Green Series",
        size: "250 ml",
        image: "/images/produk/green.png",
    },
    {
        id: 2,
        name: "Red Series",
        size: "250 ml",
        image: "/images/produk/red.png",
    },
    {
        id: 3,
        name: "Orange Series",
        size: "250 ml",
        image: "/images/produk/orange.png",
    },
];

interface ReviewModalProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export default function ReviewModal({ open, setOpen }: ReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [showDropdown, setShowDropdown] = useState(false);

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
                                <Image
                                    src={selectedProduct.image}
                                    alt=""
                                    width={50}
                                    height={50}
                                />
                            </div>

                            <div>
                                <p className="font-semibold text-[16px]">
                                    {selectedProduct.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {selectedProduct.size}
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
                                    <Image src={p.image} alt="" width={35} height={35} />
                                    <div>
                                        <p className="text-sm font-medium">{p.name}</p>
                                        <p className="text-xs text-gray-500">{p.size}</p>
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

                    <button className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition">
                        Kirim Ulasan
                    </button>
                </div>

            </div>
        </div>
    );
}