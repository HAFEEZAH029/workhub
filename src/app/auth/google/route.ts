import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getRequestOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto ?? (host?.includes("localhost") ? "http" : "https");
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.DEPLOY_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  const origin =
    (host ? `${protocol}://${host}` : undefined) ??
    (siteUrl
      ? siteUrl.startsWith("http")
        ? siteUrl
        : `https://${siteUrl}`
      : "http://localhost:3000");

  return origin.replace(/\/$/, "");
}

function getErrorRedirectPath(request: NextRequest, origin: string) {
  const referer = request.headers.get("referer");

  if (!referer) {
    return "/login";
  }

  try {
    const pathname = new URL(referer, origin).pathname;

    if (pathname === "/login" || pathname === "/register") {
      return pathname;
    }
  } catch {
    return "/login";
  }

  return "/login";
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const origin = getRequestOrigin(request);
  const errorRedirectPath = getErrorRedirectPath(request, origin);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    const redirectUrl = new URL(errorRedirectPath, origin);
    redirectUrl.searchParams.set("error", error.message);

    return NextResponse.redirect(redirectUrl);
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  const redirectUrl = new URL(errorRedirectPath, origin);
  redirectUrl.searchParams.set("error", "Google sign-in failed.");

  return NextResponse.redirect(redirectUrl);
}
