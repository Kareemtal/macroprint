/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    serverComponentsExternalPackages: ['stripe', 'undici'],
  },
  webpack: (config, { isServer }) => {
    // Don't parse undici - it uses private class fields that webpack struggles with
    config.module = {
      ...config.module,
      noParse: /undici/,
    }
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
      }
      // Exclude server-only packages from client bundle
      config.externals = [...(config.externals || []), 'stripe', 'undici']
    }
    
    return config
  },
}

module.exports = nextConfig
