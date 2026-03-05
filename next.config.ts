import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/days-between-dates",
        destination: "/days-between",
        permanent: true,
      },
      {
        source: "/how-many-days-until/:year/:month/:day",
        destination: "/days-until/:year/:month/:day",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;