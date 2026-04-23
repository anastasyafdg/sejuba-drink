"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [penjual, setPenjual] = useState<{ nama: string } | null>(null);

    useEffect(() => {
        // Cek apakah user sudah login
        const storedPenjual = localStorage.getItem("penjual");
        if (!storedPenjual) {
            router.push("/penjual/login");
        } else {
            setPenjual(JSON.parse(storedPenjual));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("penjual");
        router.push("/penjual/login");
    };

    if (!penjual) {
        return null; // Tunda render sampai ada data (hindari hydration flash)
    }

    // Helper untuk menentukan menu aktif
    const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

    return (
        <div className="bg-[#f5f5f5] min-h-screen font-sans">
            <div className="max-w-[1060px] mx-auto py-6">
                {/* Header/Top Bar */}
                <div className="bg-white rounded-2xl shadow-md px-8 py-6 flex items-center justify-between">
                    <Link href="/penjual/dashboard">
                        <Image
                            src="/images/logo/logo-sejuba.png"
                            alt="Logo Sejuba"
                            width={144}
                            height={50}
                            className="w-36 h-auto cursor-pointer"
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="w-11 h-11 rounded-full border-2 border-[#46684d] flex items-center justify-center text-[#46684d] text-xl font-bold bg-[#f5f5f5]">
                            {penjual.nama ? penjual.nama.charAt(0).toUpperCase() : "👤"}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-[#46684d] hover:bg-[#35533a] transition-colors text-white px-6 py-2 rounded-full text-sm font-semibold"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>

                {/* Layout with Sidebar & Main */}
                <div className="mt-4 grid grid-cols-[260px_1fr] gap-0">
                    {/* Sidebar */}
                    <aside className="bg-[#dce5de] min-h-[760px] rounded-tl-[30px] rounded-bl-[30px] overflow-hidden flex flex-col">
                        <div className="bg-[#46684d] text-white text-2xl font-semibold px-10 py-5 tracking-wide">
                            DASHBOARD
                        </div>

                        <nav className="flex flex-col text-[#35643d] text-[22px] font-medium mt-2">
                            <Link
                                href="/penjual/dashboard/produk"
                                className={`px-10 py-6 hover:bg-[#c8d9cc] transition-colors ${isActive('/penjual/dashboard/produk') ? 'bg-[#c8d9cc] font-bold' : ''}`}
                            >
                                PRODUK
                            </Link>
                            <Link
                                href="/penjual/dashboard/konten"
                                className={`px-10 py-6 hover:bg-[#c8d9cc] transition-colors ${isActive('/penjual/dashboard/konten') ? 'bg-[#c8d9cc] font-bold' : ''}`}
                            >
                                KONTEN
                            </Link>
                            <Link
                                href="/penjual/dashboard/pesanan"
                                className={`px-10 py-6 hover:bg-[#c8d9cc] transition-colors ${isActive('/penjual/dashboard/pesanan') ? 'bg-[#c8d9cc] font-bold' : ''}`}
                            >
                                PESANAN
                            </Link>
                            <Link
                                href="/penjual/dashboard/pelanggan"
                                className={`px-10 py-6 hover:bg-[#c8d9cc] transition-colors ${isActive('/penjual/dashboard/pelanggan') ? 'bg-[#c8d9cc] font-bold' : ''}`}
                            >
                                PELANGGAN
                            </Link>
                            <Link
                                href="/penjual/dashboard/laporan"
                                className={`px-10 py-6 hover:bg-[#c8d9cc] transition-colors ${isActive('/penjual/dashboard/laporan') ? 'bg-[#c8d9cc] font-bold' : ''}`}
                            >
                                LAPORAN
                            </Link>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="bg-[#f5f5f5] pl-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
