import Image from "next/image";

export default function PembeliPage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#f8f8f3]">
        <div className="mx-auto grid max-w-7xl gap-10 px-8 pt-8 md:grid-cols-2 md:px-14 md:pt-10">
          {/* KIRI */}
          <div className="flex flex-col justify-start">
            <h1 className="max-w-[520px] text-[42px] font-extrabold leading-[1.08] md:text-[64px]">
              <span className="text-[#5E8E1B]">Not just </span>
              <span className="text-[#F59B22]">Refreshing,</span>
              <br />
              <span className="text-[#5E8E1B]">Something More is</span>
              <br />
              <span className="text-[#F59B22]">Happening</span>
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
              Freshness for Your Lifestyle
            </h2>

            <p className="mt-5 max-w-[470px] text-[15px] leading-8 text-gray-700 md:mt-6 md:text-[20px] md:leading-[1.8]">
              Sejuba Drink kini hadir sebagai sahabat terbaik untuk hidup
              sehatmu. 100% dari buah, sayur, dan rempah alami, tanpa gula
              tambahan! Rasakan kesegaran alami dalam setiap tegukannya!
            </p>

            <p className="mt-8 text-[20px] font-bold leading-relaxed md:mt-12 md:text-[24px]">
              <span className="text-[#79B51C]">Ubah kebiasaanmu, </span>
              <span className="text-[#F59B22]">mulai dengan Sejuba Drink</span>
            </p>
          </div>
        </div>

        <div className="mt-6 h-20 bg-gradient-to-b from-[#f8f8f3] to-[#9BBE87] md:mt-8 md:h-28" />
      </section>

      {/* TENTANG SECTION */}
      <section className="bg-[#9BBE87] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 md:grid-cols-2 md:px-14">
          <div className="text-white">
            <h2 className="text-4xl font-bold md:text-5xl">Tentang Sejuba</h2>

            <p className="mt-8 max-w-md text-lg leading-8 text-white/90">
              Sejuba Drink hadir dengan visi menyediakan minuman sehat yang
              dapat dinikmati oleh semua kalangan, mulai dari anak-anak hingga
              orang dewasa.
            </p>

            <button className="mt-10 rounded-full bg-[#F5A623] px-8 py-3 text-sm font-semibold text-white shadow hover:opacity-90">
              Selengkapnya
            </button>
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
        className="bg-[#f8f8f3] py-20"
        style={{
          backgroundImage: "url('/images/decorations/bg-pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-8 text-center md:px-14">
          <h2 className="text-5xl font-bold text-[#F59B22]">Produk</h2>
          <p className="mt-4 text-xl text-gray-700">
            Quench your thirsty with Sejuba Drink
          </p>

          <div className="mt-12 flex justify-center">
            <Image
              src="/images/beranda/produk2.png"
              alt="Produk Sejuba Drink"
              width={900}
              height={420}
              className="h-auto w-full max-w-5xl"
            />
          </div>

          <div className="mt-10 text-lg leading-9 text-gray-700">
            <p>
              Jelajahi rangkaian produk Sejuba Drink dan{" "}
              <span className="font-medium text-[#5E8E1B] underline">
                temukan rasa favoritmu.
              </span>
            </p>
            <p>
              Jangan tunda—segarin harimu,{" "}
              <span className="font-medium text-[#F59B22] underline">
                pesan sekarang!
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}