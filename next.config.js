const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
  images: {
    domains: ["blogy-store.s3.us-west-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
