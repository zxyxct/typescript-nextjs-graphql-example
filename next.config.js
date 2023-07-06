/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  swcMinify: true,
  productionBrowserSourceMaps: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
    //These are the default device/image sizes provided by Next.js  Leaving them.
    deviceSizes: [
      16, 32, 48, 64, 82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // 60 seconds  - this cannot be invalidated
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Match all routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Update this with the appropriate origin or list of allowed origins
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, HEAD, PUT, PATCH, POST, DELETE', // Specify the allowed HTTP methods
          },
        ],
      },
    ];
  },

  /*  async headers() {
    const ContentSecurityPolicy1 = `
      default-src https: http: 'self' 'unsafe-eval' 'unsafe-inline';
      style-src https: http: 'self' 'unsafe-inline';
      font-src https: http: 'self';
      img-src https: http: 'self' http://localhost:3000/* data:;
      connect-src https: http: ws: wss: http://localhost:3000/*;
      upgrade-insecure-requests;
    `.replace(/\n/g, ' ');
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy1.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },*/
});
