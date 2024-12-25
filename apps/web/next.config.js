const { withContentCollections } = require('@content-collections/next')
const nextIntlPlugin = require('next-intl/plugin')

const withNextIntl = nextIntlPlugin('./modules/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: 'https://file.dzwlai.com/:path*',
        basePath: false
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
      },
    })
    return config
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = withNextIntl(withContentCollections(nextConfig))
