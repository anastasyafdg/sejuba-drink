import { NextRequest, NextResponse } from "next/server";

// ── Halaman yang dilindungi penjual (semua di bawah /penjual/dashboard)
const PENJUAL_PROTECTED_PREFIX = "/penjual/dashboard";
const PENJUAL_LOGIN_PATH = "/penjual/login";

// ── Halaman checkout pembeli yang wajib login
//    (melihat produk di /pembeli/pemesanan tetap bebas, tapi checkout tidak)
const PEMBELI_PROTECTED_PATHS = ["/pembeli/pemesanan2", "/pembeli/pembayaran", "/pembeli/profil"];
const PEMBELI_LOGIN_PATH = "/pembeli/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── [1] PENJUAL: Proteksi dashboard ─────────────────────────────────────
  if (pathname.startsWith(PENJUAL_PROTECTED_PREFIX)) {
    const session = request.cookies.get("penjual_session");

    if (!session || !session.value) {
      const loginUrl = new URL(PENJUAL_LOGIN_PATH, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // ── [2] PEMBELI: Proteksi halaman checkout & pembayaran ─────────────────
  const isPembeliProtected = PEMBELI_PROTECTED_PATHS.some((p) =>
    pathname.startsWith(p)
  );

  if (isPembeliProtected) {
    const session = request.cookies.get("pembeli_session");

    if (!session || !session.value) {
      // Simpan intended destination, redirect kembali ke /pembeli/pemesanan
      // (bukan ke halaman checkout itu sendiri, agar user tidak bingung)
      const loginUrl = new URL(PEMBELI_LOGIN_PATH, request.url);
      loginUrl.searchParams.set("from", "/pembeli/pemesanan");
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // ── [3] Semua path lain: biarkan lewat ──────────────────────────────────
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Penjual dashboard
    "/penjual/dashboard",
    "/penjual/dashboard/:path*",
    // Pembeli checkout & pembayaran
    "/pembeli/pemesanan2",
    "/pembeli/pemesanan2/:path*",
    "/pembeli/pembayaran",
    "/pembeli/pembayaran/:path*",
    // Pembeli profil
    "/pembeli/profil",
    "/pembeli/profil/:path*",
  ],
};
