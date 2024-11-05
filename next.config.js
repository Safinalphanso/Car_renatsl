/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['shariandabre.github.io', 'images.pexels.com','img.icons8.com'], // Combine domains into a single array
  },
};

module.exports = nextConfig;
