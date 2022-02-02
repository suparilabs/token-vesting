/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["vesting-bsc.galaxywar.io"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tokensale",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
