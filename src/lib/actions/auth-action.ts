'use server';

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema, signUpSchema, loginInput, signUpInput } from "../validation/auth";
import { createClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/types/action-response"

function getGoogleErrorRedirectPath(referer: string | null, origin: string) {
  if (!referer) {
    return "/register";
  }

  try {
    const pathname = new URL(referer, origin).pathname;

    if (pathname === "/login" || pathname === "/register") {
      return pathname;
    }
  } catch {
    return "/register";
  }

  return "/register";
}

async function getRequestOrigin() {
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");
  const forwardedProto = headerStore.get("x-forwarded-proto");
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

  const resolvedOrigin =
    origin ??
    (host ? `${protocol}://${host}` : undefined) ??
    (siteUrl
      ? siteUrl.startsWith("http")
        ? siteUrl
        : `https://${siteUrl}`
      : "http://localhost:3000");

  return {
    headerStore,
    origin: resolvedOrigin.replace(/\/$/, ""),
  };
}

export async function signupAction (
  dataForm: signUpInput,
): Promise<ActionResponse<{ redirectTo: string }>> {

 const parsedValues = signUpSchema.safeParse(dataForm);

 if (!parsedValues.success) {
    return {success: false, errors: parsedValues.error.flatten().fieldErrors};
 }

 const supabase = await createClient();
 const { origin } = await getRequestOrigin();

 const {data, error}= await supabase.auth.signUp({
    email: parsedValues.data.email,
    password: parsedValues.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/`,
      data: {
        full_name: parsedValues.data.fullName,
      },
    },
 });

 if (error) {
    return {success: false, message: error.message};
 }

 if (data.user && data.user.identities?.length === 0) {
    return {
      success: false,
      message: "Account already exists.",
    };
 }

 if (!data.session) {
    return {
      success: true,
      data: {
        redirectTo: `/check-email?email=${encodeURIComponent(parsedValues.data.email)}`,
      },
    };
  }

 return { success: true, data: { redirectTo: "/" } };
};

export async function signInWithGoogleAction() {
  const supabase = await createClient();
  const { headerStore, origin } = await getRequestOrigin();

  const errorRedirectPath = getGoogleErrorRedirectPath(
    headerStore.get("referer"),
    origin,
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect(`${errorRedirectPath}?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    redirect(data.url);
  }

  redirect(`${errorRedirectPath}?error=Google%20sign-in%20failed.`); //if no error but google didn't send any login link for some reason. Error message get's appended to URL after redirect
}

export async function login(dataForm: loginInput): Promise<ActionResponse> {
 
 const parsed = loginSchema.safeParse(dataForm);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth
    .signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

  if (error) {
    return { success: false, message: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Unable to retrieve user after login." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") {
    redirect("/admin/dashboard");
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
