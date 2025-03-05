/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // 确保是对象，而不是布尔值
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // 添加 utfs.io
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  webpack(config) {
    // 如果你确实需要在 webpack 配置中引入 mongoose 等包，请在这里做调整
    config.externals = config.externals || [];
    config.externals.push("mongoose");
    return config;
  },
};

module.exports = nextConfig;
