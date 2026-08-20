import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRequestOriginFromHeaders } from "@/lib/url/request-origin";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = getRequestOriginFromHeaders(request.headers);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";
  const oauthError =
    requestUrl.searchParams.get("error_description") ??
    requestUrl.searchParams.get("error");

  if (oauthError) {
    const redirectUrl = new URL("/login", origin);
    redirectUrl.searchParams.set("error", oauthError);

    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }

    const redirectUrl = new URL("/login", origin);
    redirectUrl.searchParams.set("error", error.message);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(new URL("/login", origin));
}
