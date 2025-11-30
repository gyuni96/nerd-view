import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // 필요한 다른 이미지 호스트 추가
    ],
  },
}

export default nextConfig
