import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@boilerplate/shared"],
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/posts",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
