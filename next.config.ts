/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  reactStrictMode: false, // Disabled to prevent double-rendering in development
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google OAuth avatars
      "avatars.githubusercontent.com", // GitHub OAuth avatars
      "s.gravatar.com", // Gravatar images
    ],
    minimumCacheTTL: 86400, // 24 hours cache for optimized images
    formats: ["image/webp"], // Serve modern webp format
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Standard device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Common image sizes
  },
  // Enable React compiler if using React 19 (optional)
  experimental: {
    reactCompiler: false,
    // Other experimental features can go here
  },
  // Production browser source maps (optional)
  productionBrowserSourceMaps: false,
  // Configure headers (security)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
