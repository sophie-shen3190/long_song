import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'
import nextIntlPlugin from 'next-intl/plugin'

const withNextIntl = nextIntlPlugin('./modules/i18n/request.ts')

const nextConfig: NextConfig = {
  transpilePackages: ['api', 'auth'],
  images: {
    remotePatterns: [
      {
        // google profile images
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        // github profile images
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/app/dashboard',
        permanent: true
      },
      {
        source: '/app/settings',
        destination: '/app/settings/account/general',
        permanent: true
      },
      {
        source: '/app/admin',
        destination: '/app/admin/users',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/dzwlai/:path*',
        destination: 'https://file.dzwlai.com/:path*'
      }
    ]
  },
  // 添加以下配置可能有助于解决问题
  async headers() {
    return [
      {
        source: '/dzwlai/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' }
        ]
      }
    ]
  },
  webpack: (config) => {
    config.externals.push('@node-rs/argon2')
    return config
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default withContentCollections(withNextIntl(nextConfig))
