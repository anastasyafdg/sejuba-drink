import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Deviana",
    age: "25 tahun",
    image: "/images/tentang/coba1.png",
    quote:
      "Ini rasanya buah alami tanpa ada rasa pemanis buatan sama sekali. Rasanya tuh buah 100% buah asli. Dengan buah asli yang digunakan harganya sangat wajar.",
  },
  {
    id: 2,
    name: "Gunawan",
    age: "39 tahun",
    image: "/images/tentang/coba2.png",
    quote:
      "Lebih enak dari jus lain yang ini manisnya pas. Cocok di minum setiap hari. Rasa buahnya murni, alami. Harganya juga cocok dengan kualitasnya.",
  },
  {
    id: 3,
    name: "Puja",
    age: "18 tahun",
    image: "/images/tentang/coba3.png",
    quote:
      "Seger banget sih, untuk Infused Water ini tidak terlalu manis, jadi cocok untuk yang pecinta minuman yang tidak terlalu manis.",
  },
];

export default function TentangPage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-[#f8f8f3]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 py-10 md:grid-cols-2 md:px-14 md:py-16">
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

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/tentang/tentang2.png"
              alt="Produk Sejuba Drink"
              width={1113}
              height={742}
              className="h-auto w-full max-w-[800px]"
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
              Cerita di Balik Sejuba Drink
            </h2>

            <div className="mt-8 max-w-[560px] space-y-6 text-[15px] leading-8 text-white/90 md:text-[18px]">
              <p>
                Sejuba Drink adalah UMKM yang bergerak di bidang minuman sehat
                dan berdiri sejak awal Januari 2025.
              </p>

              <p>
                Kehadiran Sejuba berawal dari keprihatinan sang founder terhadap
                semakin banyaknya minuman tidak sehat di pasaran, latar belakang
                keluarga yang memiliki riwayat penyakit jantung, diabetes, dan
                tekanan darah tinggi.
              </p>

              <p>
                Serta pengalaman pribadi saat anak founder gemar mengonsumsi
                minuman berwarna-warni penuh gula, menjadi motivasi kuat untuk
                menghadirkan alternatif yang lebih sehat dan alami.
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
              Experience The Freshness
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
                    {item.age}
                  </p>

                  <p className="mt-5 text-[15px] leading-7 text-[#333333]">
                    "{item.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MASA DEPAN SEHAT */}
      <section className="bg-[#9BBE87] py-16 md:py-20">
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
              Sejuba Untuk Masa Depan Sehat
            </h2>

            <div className="mt-8 max-w-[560px] space-y-6 text-[15px] leading-8 text-white/90 md:text-[18px]">
              <p>
                Sejuba Drink berkomitmen untuk terus menghadirkan minuman sehat
                dari bahan alami dengan tambahan varian baru di masa depan.
                Harapannya, Sejuba dapat menjadi pilihan utama masyarakat untuk
                menikmati minuman sehat yang aman, segar, dan bermanfaat bagi
                tubuh.
              </p>

              <p>
                Bagi founder, Sejuba bukan hanya bisnis, ini adalah warisan
                kepedulian terhadap keluarga, terutama anak-anak, agar mereka
                tumbuh dengan pilihan yang lebih sehat. Setiap botol Sejuba
                adalah ajakan kecil: "Mari kita rawat tubuh dengan cara
                sederhana, lewat apa yang kita minum sehari-hari."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}