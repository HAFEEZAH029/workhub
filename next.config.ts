import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  transpilePackages: ["msw", "@mswjs/interceptors", "rettime", "until-async"],
};

export default nextConfig;
