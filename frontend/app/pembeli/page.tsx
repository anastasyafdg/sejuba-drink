"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function PembeliPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden bg-[#f8f8f3]"
        style={{
          backgroundImage: "url('/images/pattern/beranda1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-8 pt-32 md:grid-cols-2 md:px-14 md:pt-48">
          {/* KIRI */}
          <div className="flex flex-col justify-start">
            <h1 className="max-w-[520px] text-[42px] font-extrabold leading-[1.08] md:text-[64px]">
              <span className="text-[#5E8E1B]">{t("home.hero.title1")} </span>
              <span className="text-[#F59B22]">{t("home.hero.title2")}</span>
              <br />
              <span className="text-[#5E8E1B]">{t("home.hero.title3")}</span>
              <br />
              <span className="text-[#F59B22]">{t("home.hero.title4")}</span>
            </h1>

            <div className="mt-8 md:mt-10">
              <Image
                src="/images/beranda/produk.png"
                alt="Produk Sejuba Drink"
                width={520}
                height={360}
                className="h-auto w-full max-w-[420px] md:max-w-[520px]"
                priority
              />
            </div>
          </div>

          {/* KANAN */}
          <div className="flex flex-col justify-start pt-2 md:pt-3">
            <h2 className="max-w-[520px] text-[28px] font-bold leading-tight text-[#79B51C] md:text-[40px]">
              {t("home.hero.subtitle")}
            </h2>

            <p className="mt-5 max-w-[470px] text-[15px] leading-8 text-gray-700 md:mt-6 md:text-[20px] md:leading-[1.8]">
              {t("home.hero.desc")}
            </p>

            <p className="mt-8 text-[20px] font-bold leading-relaxed md:mt-12 md:text-[24px]">
              <span className="text-[#79B51C]">{t("home.hero.cta")} </span>
              <span className="text-[#F59B22]">{t("home.hero.cta_sub")}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 h-20 bg-gradient-to-b from-[#f8f8f3] to-[#9BBE87] md:mt-8 md:h-28" />
      </section>

      {/* TENTANG SECTION */}
      <section className="bg-[#9BBE87] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 md:grid-cols-2 md:px-14">
          <div className="text-white">
            <h2 className="text-4xl font-bold md:text-5xl">{t("home.about.title")}</h2>

            <p className="mt-8 max-w-md text-lg leading-8 text-white/90">
              {t("home.about.desc")}
            </p>
            <Link href="/pembeli/tentang">
              <button className="mt-10 rounded-full bg-[#F5A623] px-8 py-3 text-sm font-semibold text-white shadow hover:opacity-90">
                {t("home.about.more")}
              </button>
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/beranda/tentang.png"
              alt="Tentang Sejuba Drink"
              width={620}
              height={430}
              className="rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRODUK SECTION */}
      <section
        className="bg-[#f8f8f3] pt-20 pb-32"
        style={{
          backgroundImage: "url('/images/pattern/beranda2.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="mx-auto max-w-7xl px-8 text-center md:px-14">
          <h2 className="text-5xl font-bold text-[#F59B22]">{t("home.products.title")}</h2>
          <p className="mt-4 text-xl text-gray-700">
            {t("home.products.subtitle")}
          </p>

          <div className="mt-12 flex justify-center">
            <Image
              src="/images/beranda/produk02.png"
              alt="Produk Sejuba Drink"
              width={900}
              height={420}
              className="h-auto w-full max-w-5xl"
            />
          </div>

          <div className="mt-10 text-lg leading-9 text-gray-700">
            <p>
              {t("home.products.find")}{" "}
              <Link href="/pembeli/produk">
                <span className="font-medium text-[#5E8E1B] underline hover:opacity-80 cursor-pointer">
                  {t("home.products.find_link")}
                </span>
              </Link>
            </p>

            <p>
              {t("home.products.order")}{" "}
              <Link href="/pembeli/pemesanan">
                <span className="font-medium text-[#F59B22] underline hover:opacity-80 cursor-pointer">
                  {t("home.products.order_link")}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}