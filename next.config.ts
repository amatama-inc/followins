import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/',
      },
    ]
  },
};

export default nextConfig;
