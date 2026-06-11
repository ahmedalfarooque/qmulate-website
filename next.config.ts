import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vercel production optimizations
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Compress output
  compress: true,
  // Powered by header removal
  poweredByHeader: false,
  // Generate standalone for faster cold starts on Vercel
  output: "standalone",
};

export default nextConfig;
