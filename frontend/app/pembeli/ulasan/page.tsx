"use client";

import { useState } from "react";
import Image from "next/image";
import ReviewModal from "@/components/pembeli/ReviewModal";

/* ================= TESTIMONI DATA ================= */
const testimonials = [
  {
    id: 1,
    name: "Deviana",
    age: "25 tahun",
    image: "/images/tentang/coba1.png",
    quote:
      "Ini rasanya buah alami tanpa ada rasa pemanis buatan sama sekali. Rasanya tuh buah 100% buah asli.",
  },
  {
    id: 2,
    name: "Gunawan",
    age: "39 tahun",
    image: "/images/tentang/coba2.png",
    quote:
      "Lebih enak dari jus lain yang ini manisnya pas. Cocok diminum setiap hari.",
  },
  {
    id: 3,
    name: "Puja",
    age: "18 tahun",
    image: "/images/tentang/coba3.png",
    quote:
      "Seger banget sih, tidak terlalu manis jadi cocok untuk pecinta minuman sehat.",
  },
];

/* ================= ULASAN DATA ================= */
const initialReviews = [
  { id: 1, name: "Martin Edwards", rating: 5, text: "Minumannya segar dan enak, recommended deh!" },
  { id: 2, name: "James", rating: 5, text: "Rasanya pas, nggak terlalu manis." },
  { id: 3, name: "Juhoon", rating: 5, text: "Fresh banget, cocok diminum kapan aja." },
  { id: 4, name: "Seonghyeon", rating: 5, text: "Enak dan bikin nagih!" },
  { id: 5, name: "Keonho", rating: 5, text: "Packaging bagus, rasanya juga oke." },
];

export default function UlasanPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
      <section
        className="bg-[#f8f8f3]"
        style={{
          backgroundImage: "url('/images/pattern/beranda1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-8 py-10 md:grid-cols-[1fr_1.6fr] md:px-14 md:pt-28">
          <div>
            <h1 className="text-[36px] font-extrabold text-[#F59B22] md:text-[56px]">
              Tentang Kami
            </h1>

            <p className="mt-8 max-w-[520px] text-[15px] leading-8 text-[#333333] md:text-[20px]">
              Sejuba Drink hadir dengan visi menyediakan minuman sehat yang dapat
              dinikmati oleh semua kalangan, mulai dari anak-anak hingga orang
              dewasa.
            </p>
          </div>

          <div className="flex justify-center md:justify-end overflow-visible">
            <Image
              src="/images/tentang/tentang2.png"
              alt="Produk Sejuba Drink"
              width={1113}
              height={742}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        <div className="h-20 bg-gradient-to-b from-[#f8f8f3] to-[#9BBE87] md:h-24" />
      </section>


      {/* ================= TESTIMONI ================= */}
      <section
        className="py-24 bg-[#f8f8f3]"
        style={{
          backgroundImage: "url('/images/pattern/tentang1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="max-w-6xl mx-auto px-8">

          <div className="bg-[#F59E2E] rounded-[32px] px-6 py-12 md:px-12 text-center">

            <h2 className="text-[28px] md:text-[40px] font-bold text-white">
              Experience The Freshness
            </h2>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F5EFE7] rounded-[24px] p-6 shadow-md hover:shadow-xl transition"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={140}
                    height={140}
                    className="mx-auto rounded-[16px]"
                  />

                  <h3 className="mt-4 font-bold text-[18px]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600">{item.age}</p>

                  <p className="mt-3 text-[13px] text-gray-700 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= ULASAN ================= */}
      <section className="bg-[#7FA86A] py-20 mb-24">
        <div className="max-w-7xl mx-auto px-10">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl md:text-[38px] font-bold text-white">
              Ulasan & Rating
            </h1>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#F59B22] text-white px-6 py-3 rounded-full hover:bg-orange-500 transition shadow-sm"
            >
              + Tambah Ulasan
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-8">
            {reviews.map((r, i) => (
              <div key={r.id}>
                <div className="flex gap-5">

                  {/* AVATAR */}
                  <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white">
                      person
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <p className="text-white font-semibold text-[16px]">
                      {r.name}
                    </p>

                    <div className="text-yellow-300 text-sm mt-1 mb-1">
                      {"★★★★★"}
                    </div>

                    <p className="text-white text-[14px] leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                </div>

                {i !== reviews.length - 1 && (
                  <div className="border-b border-white/30 mt-6"></div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= MODAL ================= */}
      <ReviewModal open={openModal} setOpen={setOpenModal} />

    </div>
  );
}