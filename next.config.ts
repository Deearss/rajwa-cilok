import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.18.44",
    "*.192.168.18.44",
    "192.168.18.8",
    "*.192.168.18.8",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.18.44",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.18.8",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rajwa-cilok-api.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img-global.cpcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.pikiran-rakyat.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
