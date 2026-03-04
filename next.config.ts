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
        source: "/days-until-date",
        destination: "/days-until",
        permanent: true,
      },
      {
        source: "/days-until-date/:month/:day",
        destination: "/days-until/:month/:day",
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
