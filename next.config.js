/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'indy-app.s3.us-west-2.amazonaws.com'],
  },
}

module.exports = nextConfig
