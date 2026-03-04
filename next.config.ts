import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/days-between-dates",
        destination: "/days-between",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;