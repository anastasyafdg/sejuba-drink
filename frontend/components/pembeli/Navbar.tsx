import Link from "next/link";
import Image from "next/image";

const navItems = [
  { name: "Beranda", href: "/pembeli" },
  { name: "Tentang", href: "/pembeli/tentang" },
  { name: "Produk", href: "/pembeli/produk" },
  { name: "Pemesanan", href: "/pembeli/pemesanan" },
];

export default function NavbarPembeli() {
  return (
    <header className="w-full px-8 md:px-14 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/pembeli" className="flex items-center">
          <Image
            src="/images/logo/logo-sejuba.png"
            alt="Sejuba Drink"
            width={223}
            height={90}
            className="h-auto w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-full border px-7 py-2 text-sm font-medium transition ${
                index === 0
                  ? "border-gray-500 bg-white-500 text-gray"
                  : "border-gray-400 bg-white text-gray-700 hover:border-white-400 hover:text-white-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}