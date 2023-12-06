/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
            port: '3000',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**',
            port: '0000',
          },
        ],
        domains: ['localhost', '127.0.0.1', 'lh3.googleusercontent.com'],
    },
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig
