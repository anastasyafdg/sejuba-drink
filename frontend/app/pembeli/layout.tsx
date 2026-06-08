import NavbarPembeli from "../../components/pembeli/Navbar";
import FooterPembeli from "../../components/pembeli/Footer";
import { AuthProvider } from "../../lib/AuthContext";

export default function PembeliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen text-gray-900">
        <NavbarPembeli />
        <main>{children}</main>
        <FooterPembeli />
      </div>
    </AuthProvider>
  );
}