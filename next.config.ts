import type { NextConfig } from "next";

// Static export for Cloudflare Pages (scripts/deploy.sh uploads out/).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
