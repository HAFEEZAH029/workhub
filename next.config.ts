import type { NextConfig } from "next";

const allowedServerActionOrigins = [
  "workcorp.netlify.app",
  "localhost:3000",
  process.env.URL,
  process.env.DEPLOY_PRIME_URL,
  process.env.DEPLOY_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => origin.replace(/^https?:\/\//, "").replace(/\/$/, ""));

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    serverActions: {
      allowedOrigins: allowedServerActionOrigins,
    },
  },
  transpilePackages: ["msw", "@mswjs/interceptors", "rettime", "until-async"],
};

export default nextConfig;
