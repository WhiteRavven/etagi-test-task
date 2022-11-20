/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.esoft.digital',
      },
    ],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
