/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export to enable API routes
  // output: 'export',  // <- This line should be removed or commented out
  
  // Keep images unoptimized if you were using it for static export
  images: {
    unoptimized: true,
  },
  
  // Optional: Add trailing slash if you prefer
  trailingSlash: false,
  
  // Optional: Optimize for production
  swcMinify: true,
  
  // Optional: Headers for security and CORS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
}


export default nextConfig;