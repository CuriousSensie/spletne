import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Inquiry attachments: MAX_TOTAL_BYTES (lib/inquiry.ts) plus multipart overhead. Default is 1 MB.
    serverActions: { bodySizeLimit: "11mb" },
  },
  // Legal pages were renamed; keep the old addresses working.
  async redirects() {
    return [
      { source: "/pogoji", destination: "/splosni-pogoji", permanent: true },
      { source: "/zasebnost", destination: "/politika-zasebnosti", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
