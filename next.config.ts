import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
  cacheComponents: true,
  logging: {
    fetches:{
      fullUrl: true,
    }
  },
};

export default nextConfig;
