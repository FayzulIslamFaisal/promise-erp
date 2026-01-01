import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // optional: customize body size limit
      allowedOrigins: ["localhost:3000"], // optional: allowed origins
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "erp.e-laeltd.com",
      },
      {
        protocol: "https",
        hostname: "erp.e-laeltd.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
};

export default nextConfig;
