import type { NextConfig } from "next";

const nextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: true,
  },
  middleware: true,
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
