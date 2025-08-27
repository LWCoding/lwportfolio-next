import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.itch.zone',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.itch.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
};

export default nextConfig;
