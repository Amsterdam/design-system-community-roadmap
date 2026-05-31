import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Image uploads run through Server Actions; raise the default 1 MB body
    // limit to fit up to MAX_IMAGES (4) × MAX_IMAGE_SIZE (5 MB) plus overhead.
    serverActions: {
      bodySizeLimit: '25mb',
    },
  },
  reactCompiler: true,
  transpilePackages: ['@design-system-community-roadmap/ui'],
}

export default nextConfig
