"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { name: "Beranda", href: "/pembeli" },
  { name: "Tentang", href: "/pembeli/tentang" },
  { name: "Produk", href: "/pembeli/produk" },
  { name: "Pemesanan", href: "/pembeli/pemesanan" },
];

export default function NavbarPembeli() {
  const pathname = usePathname();
  const router = useRouter();
  const isProdukPage = pathname === "/pembeli/produk";
  const isLoginPage = pathname === "/pembeli/login" || pathname === "/pembeli/register";

  const [search, setSearch] = useState("");
<<<<<<< HEAD
=======

  // Mock login state for demonstration
  const [isLoggedIn, setIsLoggedIn] = useState(false);
>>>>>>> 6cc6feb80e3304da685912dc041706f610de14ff
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auth state dari Context (real, bukan hardcoded)
  const { isLoggedIn, pembeli, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const pembeli = localStorage.getItem("pembeli");

    if (pembeli) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoginPage) return null;

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/pembeli");
  };

  return (
    <header className="absolute top-0 left-0 w-full px-6 md:px-10 py-3 z-50">
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

        {/* RIGHT SIDE: MENU + USER ICON */}
        <div className="flex items-center gap-6">
          {/* MENU */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-full border px-5 py-1.5 text-sm font-medium transition ${isActive
                    ? "bg-[#F59B22] text-white border-[#F59B22]"
                    : "border-gray-400 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* USER ICON */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full border-2 border-[#5E8E1B] text-[#5E8E1B] hover:bg-[#E5EFE7] transition px-3 py-1.5 focus:outline-none"
                title="Profil Pengguna"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                {/* Tampilkan nama pembeli */}
                <span className="text-sm font-medium hidden sm:inline max-w-[100px] truncate">
                  {pembeli?.nama_pembeli?.split(" ")[0] ?? "Akun"}
                </span>
                <span className="material-symbols-outlined text-[16px]">
                  {isDropdownOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 overflow-hidden">
                  {/* Info nama */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Masuk sebagai</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {pembeli?.nama_pembeli ?? "-"}
                    </p>
                  </div>
                  <Link
                    href="/pembeli/profil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E5EFE7] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Edit Profil
                  </Link>
                  <Link
                    href="/pembeli/riwayat-pemesanan"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E5EFE7] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Riwayat Pemesanan
                  </Link>
                  <Link
                    href="/pembeli/ulasan"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E5EFE7] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Ulasan dan Rating
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
<<<<<<< HEAD
                    onClick={handleLogout}
=======
                    onClick={() => {
                      localStorage.removeItem("pembeli");
                      setIsLoggedIn(false);
                      setIsDropdownOpen(false);

                      window.location.href = "/pembeli";
                    }}
>>>>>>> 6cc6feb80e3304da685912dc041706f610de14ff
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/pembeli/login"
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-600 text-gray-600 hover:bg-gray-100 transition shrink-0"
              title="Masuk / Daftar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}