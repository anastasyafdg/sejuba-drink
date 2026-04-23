"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Beranda", href: "/pembeli" },
  { name: "Tentang", href: "/pembeli/tentang" },
  { name: "Produk", href: "/pembeli/produk" },
  { name: "Pemesanan", href: "/pembeli/pemesanan" },
];

export default function NavbarPembeli() {
  const pathname = usePathname();
  const isProdukPage = pathname === "/pembeli/produk";

  const [search, setSearch] = useState("");

  return (
    <header className="w-full px-6 md:px-10 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* LOGO */}
        <Link href="/pembeli" className="flex items-center">
          <Image
            src="/images/logo/logo-sejuba.png"
            alt="Sejuba Drink"
            width={140}
            height={50}
            className="h-auto w-auto"
          />
        </Link>

        {/* SEARCH (HANYA DI PRODUK) */}
        {isProdukPage && (
          <div className="hidden md:flex items-center bg-[#E5EFE7] rounded-full px-4 py-2 w-[300px]">
            <span className="material-symbols-outlined mr-2 text-gray-500 text-[20px]">
              search 
            </span>
            <input
              type="text"
              placeholder="Cari rasa anda"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        )}

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full border px-5 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}