type RequestHeaders = {
  get(name: string): string | null;
};

function normalizeOrigin(origin: string) {
  return (origin.startsWith("http") ? origin : `https://${origin}`).replace(/\/$/, "");
}

export function getRequestOriginFromHeaders(headerStore: RequestHeaders) {
  const origin = headerStore.get("origin");
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const protocol = forwardedProto ?? (host?.includes("localhost") ? "http" : "https");

  if (host?.includes("localhost")) {
    return `${protocol}://${host}`;
  }

  if (process.env.NETLIFY === "true") {
    return normalizeOrigin(
      process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_APP_URL ??
        process.env.SITE_URL ??
        process.env.URL ??
        "https://workcorp.netlify.app",
    );
  }

  if (process.env.VERCEL === "1") {
    return normalizeOrigin(
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
        process.env.VERCEL_URL ??
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_APP_URL ??
        "http://localhost:3000",
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.DEPLOY_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  return (
    origin ??
    (host ? `${protocol}://${host}` : undefined) ??
    (siteUrl ? normalizeOrigin(siteUrl) : "http://localhost:3000")
  ).replace(/\/$/, "");
}
