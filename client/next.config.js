const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV !== 'production',
  dest: 'public',
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

const ContentSecurityPolicy = `
  Content-Security-Policy: default-src *; 
  script-src-attr 'unsafe-hashes' 'sha256-1jAmyYXcRq6zFldLe/GCgIDJBiOONdXjTLgEFMDnDSM='; 
  style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; 
  frame-ancestors 'self';
`;

const securityHeaders = () => [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Option',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];

const nextConfig = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders(),
      },
    ];
  },
});

module.exports = nextConfig;
