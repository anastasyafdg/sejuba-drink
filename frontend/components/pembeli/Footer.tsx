import Image from "next/image";

export default function FooterPembeli() {
  return (
    <footer className="rounded-t-[40px] bg-[#6BA043] px-8 py-12 text-white md:px-14">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="flex items-start gap-6">
          <Image
            src="/images/logo/logo2.png"
            alt="Sejuba Drink"
            width={90}
            height={90}
          />
          <div className="h-24 w-px bg-white/60" />
          <Image
            src="/images/logo/logo_halal.png"
            alt="Halal"
            width={90}
            height={90}
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Us:</h3>
          <div className="space-y-3 text-sm">
            <p>@sejubadrink</p>
            <p>+62 812 2062 6565</p>
            <p>sejubadrink@gmail.com</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Alamat:</h3>
          <p className="text-sm leading-7">
            Jl. Perumahan Dotamana
            <br />
            Blok B No 19 Batam Center
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Feedback:</h3>
          <p className="text-sm leading-7">
            Masukan Kritik dan Saran
            <br />
            kamu di sini!
          </p>
        </div>
      </div>
    </footer>
  );
}