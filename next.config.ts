import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

async redirects() {
  return [
    {
      source: "/days-between-dates",
      destination: "/days-between",
      permanent: true,
    },
  ];
}