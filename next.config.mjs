/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdnb.artstation.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
