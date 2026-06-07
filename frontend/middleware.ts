import { NextRequest, NextResponse } from "next/server";

// ── Halaman yang dilindungi (semua di bawah /penjual/dashboard)
const PROTECTED_PREFIX = "/penjual/dashboard";

// ── Halaman login penjual (bebas diakses)
const LOGIN_PATH = "/penjual/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya proses path yang dimulai dengan /penjual/dashboard
  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  // Cek token login dari cookie "penjual_session"
  // (ditulis saat login berhasil di halaman login)
  const session = request.cookies.get("penjual_session");

  if (!session || !session.value) {
    // Belum login → redirect ke halaman login
    const loginUrl = new URL(LOGIN_PATH, request.url);

    // Simpan halaman tujuan asal agar bisa redirect kembali setelah login
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Sudah login → lanjutkan
  return NextResponse.next();
}

export const config = {
  // Matcher: jalankan middleware di semua path /penjual/dashboard dan sub-path-nya
  matcher: ["/penjual/dashboard", "/penjual/dashboard/:path*"],
};
