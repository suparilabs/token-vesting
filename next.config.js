/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["vesting-bsc.galaxywar.io", "seraproject.org", "upload.wikimedia.org"],
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
