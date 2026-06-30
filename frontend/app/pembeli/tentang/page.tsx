"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const testimonials = [
  {
    id: 1,
    name: "Deviana",
    age: "25 tahun",
    image: "/images/tentang/coba1.png",
  },
  {
    id: 2,
    name: "Gunawan",
    age: "39 tahun",
    image: "/images/tentang/coba2.png",
  },
  {
    id: 3,
    name: "Puja",
    age: "18 tahun",
    image: "/images/tentang/coba3.png",
  },
];

export default function TentangPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
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
              {t("about.hero.title")}
            </h1>

            <p className="mt-8 max-w-[520px] text-[15px] leading-8 text-[#333333] md:text-[20px]">
              {t("about.hero.desc")}
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

      {/* CERITA DI BALIK SEJUBA */}
      <section className="bg-[#9BBE87] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 md:grid-cols-2 md:px-14">
          <div className="text-white">
            <h2 className="max-w-[520px] text-[34px] font-bold leading-tight md:text-[52px]">
              {t("about.story.title")}
            </h2>

            <div className="mt-8 max-w-[560px] space-y-6 text-[15px] leading-8 text-white/90 md:text-[18px]">
              <p>
                {t("about.story.p1")}
              </p>

              <p>
                {t("about.story.p2")}
              </p>

              <p>
                {t("about.story.p3")}
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/tentang/owner.png"
              alt="Founder Sejuba Drink"
              width={430}
              height={560}
              className="rounded-[24px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section
        className="bg-[#f8f8f3]"
        style={{
          backgroundImage: "url('/images/pattern/tentang1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <section
          className="py-20"
          style={{
            backgroundImage: "url('/images/decorations/bg-pattern.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-7xl px-8 md:px-14">
            <div className="rounded-[32px] bg-[#F5A12A] px-6 py-10 md:px-12 md:py-14">
              <h2 className="text-center text-[32px] font-bold text-white md:text-[52px]">
                {t("about.testi.title")}
              </h2>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[24px] bg-[#F8F1E8] p-6 shadow-md"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={260}
                      height={220}
                      className="h-[220px] w-full rounded-[18px] object-cover"
                    />

                    <h3 className="mt-5 text-[24px] font-bold text-[#1f1f1f]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-[18px] font-semibold text-[#1f1f1f]">
                      {item.age.replace("tahun", t("about.testi.age"))}
                    </p>

                    <p className="mt-5 text-[15px] leading-7 text-[#333333]">
                      "{t("testi.quote." + item.name.toLowerCase())}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* MASA DEPAN SEHAT */}
      <section className="bg-[#9BBE87] py-16 md:py-20 pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 md:grid-cols-2 md:px-14">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/tentang/tentang3.png"
              alt="Sejuba untuk masa depan sehat"
              width={620}
              height={420}
              className="rounded-[24px] object-cover"
            />
          </div>

          <div className="text-white">
            <h2 className="max-w-[520px] text-[34px] font-bold leading-tight md:text-[52px]">
              {t("about.future.title")}
            </h2>

            <div className="mt-8 max-w-[560px] space-y-6 text-[15px] leading-8 text-white/90 md:text-[18px]">
              <p>
                {t("about.future.p1")}
              </p>

              <p>
                {t("about.future.p2")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-[#f8f8f3] py-20 min-h-[200px]"
        style={{
          backgroundImage: "url('/images/pattern/tentang1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >

      </section>
    </div>
  );
}