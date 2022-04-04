/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withBundleAnalyzer(nextConfig)
