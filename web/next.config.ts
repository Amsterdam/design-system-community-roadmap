import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ['@design-system-community-roadmap/ui'],
}

export default nextConfig
