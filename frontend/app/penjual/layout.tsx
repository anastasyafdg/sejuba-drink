"use client";

import { usePathname } from "next/navigation";

export default function PenjualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Kalau lagi di halaman login → jangan pakai layout
  if (pathname === "/penjual/login") {
    return <>{children}</>;
  }

  // Selain login → pakai layout penjual
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Penjual</h2>
        <ul className="space-y-3">
          <li>Dashboard</li>
          <li>Produk</li>
          <li>Pesanan</li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}