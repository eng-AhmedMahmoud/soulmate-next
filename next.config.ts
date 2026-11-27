import type { NextConfig } from "next";

// Static export served by nginx on the Devya VPS (scripts/deploy-vps.sh ships out/).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
