/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        perf_hooks: false,
        fs: false,
      };
    }

    return config;
  },
};
export default nextConfig;
