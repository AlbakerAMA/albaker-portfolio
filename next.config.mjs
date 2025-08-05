/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['framer-motion'],
  output: 'export',
  images: {
    unoptimized: true, 
  }
};
export default nextConfig;


