import type { NextConfig } from "next";


const nextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: true,
  },
  middleware: true,
};

module.exports = nextConfig;
