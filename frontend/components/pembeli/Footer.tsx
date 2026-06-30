"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function FooterPembeli() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname === "/pembeli/login" || pathname === "/pembeli/register") return null;

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
          <h3 className="mb-4 text-lg font-semibold">{t("footer.contact")}</h3>
          <div className="space-y-3 text-sm">
            <p>@sejubadrink</p>
            <p>+62 812 2062 6565</p>
            <p>sejubadrink@gmail.com</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">{t("footer.address")}</h3>
          <p className="text-sm leading-7">
            Jl. Perumahan Dotamana
            <br />
            Blok B No 19 Batam Center
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">{t("footer.feedback")}</h3>
          <p className="text-sm leading-7">
            {t("footer.feedback_sub")}
          </p>
        </div>
      </div>
    </footer>
  );
}