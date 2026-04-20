import NavbarPembeli from "../../components/pembeli/Navbar";
import FooterPembeli from "../../components/pembeli/Footer";

export default function PembeliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavbarPembeli />
      <main>{children}</main>
      <FooterPembeli />
    </div>
  );
}