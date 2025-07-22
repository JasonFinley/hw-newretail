/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false, // 關閉內建 toast/toast badge
    experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
