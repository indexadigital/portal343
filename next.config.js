const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Accept',
    value: '*/*'
  }
]

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0],
      },
      { hostname: '0.gravatar.com' },
      { hostname: '1.gravatar.com' },
      { hostname: '2.gravatar.com' },
      { hostname: 'secure.gravatar.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://portal343.com/graphql',
      },
    ]
  }
}
