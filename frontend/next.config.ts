import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Leaflet perlu ditranspile agar tidak error di Next.js SSR
  transpilePackages: ["leaflet"],
};

export default nextConfig;
