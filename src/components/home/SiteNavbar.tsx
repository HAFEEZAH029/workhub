import { createClient } from "@/lib/supabase/server";
import { HomeNavbar, type HomeNavUser } from "./HomeNavbar";

function getUsername(email?: string | null, metadataName?: string | null) {
  if (metadataName?.trim()) {
    return metadataName.trim();
  }

  if (!email) {
    return "Account";
  }

  return email.split("@")[0]?.replace(/[._-]+/g, " ") || "Account";
}

export default async function SiteNavbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const provider = user?.app_metadata?.provider;
  const metadataName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined);

  const navUser: HomeNavUser | null = user
    ? {
        username: getUsername(user.email, metadataName),
        avatarUrl:
          provider === "google"
            ? (user.user_metadata?.avatar_url as string | undefined)
            : undefined,
        showAvatar: provider === "google",
      }
    : null;

  return <HomeNavbar user={navUser} />;
}
