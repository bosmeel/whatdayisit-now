import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/days-between-dates",
        destination: "/days-between",
        permanent: true,
      },

      // legacy: /days-until/january/1  ->  /days-until-date/january/1
      {
        source: "/days-until/:month/:day",
        destination: "/days-until-date/:month/:day",
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