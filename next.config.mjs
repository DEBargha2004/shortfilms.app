/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:'cdnb.artstation.com'
      }
    ]
  },
}

export default nextConfig
