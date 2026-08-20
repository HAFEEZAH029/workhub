import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRequestOriginFromHeaders } from "@/lib/url/request-origin";

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
  const origin = getRequestOriginFromHeaders(request.headers);
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
