import Image from "next/image";
import Link from "next/link";
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

export function SiteNavbarFallback() {
  return (
    <>
      <header className="absolute left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-xl border-t border-l border-app-tertiary/18 bg-app-tertiary/10 py-3 msm:px-4 sm:top-6 sm:px-6">
        <nav className="flex items-center justify-between gap-5">
          <Link href="/" className="flex min-w-0 items-center gap-1 sm:gap-2.5">
            <Image
              src="/images/app/Logosymbol.png"
              alt=""
              width={28}
              height={28}
              className="size-8 shrink-0 sm:size-10"
              priority
            />
            <span className="text-[14px] font-bold tracking-tight text-app-secondary sm:text-xl">
              WorkCorp
            </span>
          </Link>

          <div className="hidden items-center gap-10 text-sm font-semibold md:flex">
            <Link href="/" className="text-xl text-app-neutral transition duration-200 hover:text-app-secondary">
              Home
            </Link>
            <Link href="/workspaces" className="text-xl text-app-neutral transition duration-200 hover:text-app-secondary">
              Workspaces
            </Link>
            <Link href="/contact" className="text-xl text-app-neutral transition duration-200 hover:text-app-secondary">
              Contact
            </Link>
          </div>

          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[12px] font-bold text-app-primary shadow-lg shadow-black/15 transition hover:bg-app-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:text-sm"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <nav className="fixed bottom-4 left-1/2 z-40 grid w-[min(22rem,calc(100%-2rem))] -translate-x-1/2 grid-cols-3 rounded-xl border border-app-tertiary/18 bg-app-primary p-2 shadow-2xl shadow-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-app-primary md:hidden">
        <Link href="/" className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold text-app-tertiary transition hover:bg-white/12 hover:text-app-secondary">
          Home
        </Link>
        <Link href="/workspaces" className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold text-app-tertiary transition hover:bg-white/12 hover:text-app-secondary">
          Workspaces
        </Link>
        <Link href="/contact" className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold text-app-tertiary transition hover:bg-white/12 hover:text-app-secondary">
          Contact
        </Link>
      </nav>
    </>
  );
}
