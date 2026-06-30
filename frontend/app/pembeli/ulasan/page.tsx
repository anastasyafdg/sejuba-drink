"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReviewModal from "@/components/pembeli/ReviewModal";
import { useLanguage } from "@/lib/LanguageContext";

/* ================= TESTIMONI DATA ================= */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Deviana",
    ageKey: "testimonial.deviana.age",
    quoteKey: "testimonial.deviana.quote",
    image: "/images/tentang/coba1.png",
  },
  {
    id: 2,
    name: "Gunawan",
    ageKey: "testimonial.gunawan.age",
    quoteKey: "testimonial.gunawan.quote",
    image: "/images/tentang/coba2.png",
  },
  {
    id: 3,
    name: "Puja",
    ageKey: "testimonial.puja.age",
    quoteKey: "testimonial.puja.quote",
    image: "/images/tentang/coba3.png",
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

interface Review {
  id_ulasan: number;
  rating: number;
  ulasan: string;

  pembeli: {
    nama_pembeli: string;
  };

  produk: {
    id: number;
    name: string;
    image?: string;
  };
}

export default function UlasanPage() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<number | "all">("all");

  useEffect(() => {
    const loadUlasan = async () => {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/api/ulasan"
        );

        const data = await response.json();

        if (data.success) {
          setReviews(data.data);
        }

      } catch (error) {

        console.error(error);

      }
    };

    loadUlasan();

  }, []);

  // Perhitungan statistik ulasan
  const totalReviews = reviews.length;
  const starCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  const filteredReviews = selectedFilter === "all"
    ? reviews
    : reviews.filter((r) => r.rating === selectedFilter);

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
              {t("ulasan.hero.title")}
            </h1>

            <p className="mt-8 max-w-[520px] text-[15px] leading-8 text-[#333333] md:text-[20px]">
              {t("ulasan.hero.desc")}
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
              {TESTIMONIALS.map((item) => (
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

                  <p className="text-sm text-gray-600">{t(item.ageKey)}</p>

                  <p className="mt-3 text-[13px] text-gray-700 leading-relaxed">
                    &ldquo;{t(item.quoteKey)}&rdquo;
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
              {t("reviews.title")}
            </h1>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#F59B22] text-white px-6 py-3 rounded-full hover:bg-orange-500 transition shadow-sm font-semibold text-sm md:text-base"
            >
              {t("reviews.add_review")}
            </button>
          </div>

          {/* RATING SUMMARY & FILTERS CARD */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
            {/* Left Column: Average Rating Summary */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-extrabold text-white">
                  {averageRating}
                </span>
                <span className="text-white/70 text-lg md:text-xl font-medium">/ 5.0</span>
              </div>
              
              {/* Star icons representing average rating */}
              <div className="flex gap-1 text-yellow-300 text-2xl mt-3 select-none">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isFilled = index < Math.round(parseFloat(averageRating));
                  return (
                    <span key={index}>
                      {isFilled ? "★" : "☆"}
                    </span>
                  );
                })}
              </div>

              <p className="text-white/80 mt-3 text-sm font-medium">
                {t("reviews.based_on")} {totalReviews} {t("reviews.buyer_reviews")}
              </p>
            </div>

            {/* Right Column: Star Filter Buttons */}
            <div className="flex-1 w-full border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 pt-6 md:pt-0 md:pl-8">
              <p className="text-white font-semibold mb-4 text-center md:text-left text-sm md:text-base">
                {t("reviews.filter_title")}
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                {/* Semua Filter Button */}
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${
                    selectedFilter === "all"
                      ? "bg-[#F59B22] border-[#F59B22] text-white ring-2 ring-white/20 scale-[1.03]"
                      : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {t("reviews.all")} ({totalReviews})
                </button>

                {/* Star Filter Buttons (5 to 1) */}
                {([5, 4, 3, 2, 1] as const).map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedFilter(star)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-sm border ${
                      selectedFilter === star
                        ? "bg-[#F59B22] border-[#F59B22] text-white ring-2 ring-white/20 scale-[1.03]"
                        : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <span>{star}</span>
                    <span className="text-yellow-300 select-none">★</span>
                    <span className="text-xs text-white/80">({starCounts[star]})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-8">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((r, i) => (
                <div key={r.id_ulasan}>
                  <div className="flex gap-5">

                    {/* AVATAR */}
                    <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white">
                        person
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-[16px]">
                          {r.pembeli?.nama_pembeli}
                        </p>

                        <span className="text-white/70 text-sm">
                          • {r.produk?.name}
                        </span>
                      </div>

                      <div className="text-yellow-300 text-sm mt-1 mb-1 select-none">
                        {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                      </div>

                      <p className="text-white text-[14px] leading-relaxed">
                        {r.ulasan}
                      </p>
                    </div>
                  </div>

                  {i !== filteredReviews.length - 1 && (
                    <div className="border-b border-white/30 mt-6"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-[24px] border border-white/10 flex flex-col items-center">
                <span className="material-symbols-outlined text-white/50 text-5xl mb-3">
                  rate_review
                </span>
                <p className="text-white font-medium text-lg">
                  {t("reviews.empty_title")} {selectedFilter} {t("reviews.empty_star")}
                </p>
                <p className="text-white/60 text-sm mt-2 max-w-md">
                  {t("reviews.empty_desc")}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ================= MODAL ================= */}
      <ReviewModal open={openModal} setOpen={setOpenModal} />

    </div>
  );
}