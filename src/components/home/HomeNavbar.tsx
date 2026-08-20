 "use client";

import { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, Mail, PanelsTopLeft } from "lucide-react";
import { logout } from "@/lib/actions/auth-action";

export type HomeNavUser = {
  username: string;
  avatarUrl?: string;
  showAvatar: boolean;
};

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/workspaces", label: "Workspaces", icon: PanelsTopLeft },
  { href: "/contact", label: "Contact", icon: Mail },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function UserAvatar({ user }: { user: HomeNavUser }) {
  if (!user.showAvatar) {
    return null;
  }

  if (user.avatarUrl) {
    return (
      // Google avatar hosts vary, so use the browser image element here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatarUrl}
        alt=""
        className="size-8 rounded-full object-cover ring-1 ring-white/30"
      />
    );
  }

  return (
    <span className="grid size-8 place-items-center rounded-full bg-white/18 text-xs font-bold text-white ring-1 ring-white/25">
      {user.username.charAt(0).toUpperCase()}
    </span>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="block w-full ml-2 mr-2 rounded-md cursor-pointer px-4 py-1.5 text-left font-medium bg-red-200 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}

function AccountMenu({ user }: { user: HomeNavUser }) {

  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node) || !detailsRef.current) {
        return;
      }

      if (!detailsRef.current.contains(target)) {
        detailsRef.current.open = false;
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <details ref={detailsRef} className="group relative">
      <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-full bg-app-neutral/70 px-3 text-[12px] sm:text-sm font-semibold text-white ring-1 ring-white/18 transition hover:bg-app-secondary/80 [&::-webkit-details-marker]:hidden">
        <UserAvatar user={user} />
        <span className="max-w-34 text-app-tertiary truncate sm:max-w-44">
          {user.username}
        </span>
        <ChevronDown className="size-4 transition group-open:rotate-180" />
      </summary>
      <div className="absolute right-0 top-13 z-30 w-40 overflow-hidden rounded-lg bg-app-tertiary py-1 text-sm text-app-primary shadow-xl ring-1 ring-black/10">
        <Link
          href="/history"
          className="block px-4 py-1.5 font-medium hover:bg-app-tertiary"
        >
          History
        </Link>
        <form action={logout}>
          <LogoutButton />
        </form>
      </div>
    </details>
  );
}

function AuthSlot({ user }: { user: HomeNavUser | null }) {
  if (user) {
    return <AccountMenu user={user} />;
  }

  return (
    <Link
      href="/register"
      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[12px] sm:text-sm font-bold text-app-primary shadow-lg shadow-black/15 transition hover:bg-app-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      Get Started
    </Link>
  );
}

export function HomeNavbar({ user }: { user: HomeNavUser | null }) {
  const pathname = usePathname();

  return (
    <>
      <header className="absolute left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-xl border-t border-l border-app-tertiary/18 bg-app-tertiary/10  msm:px-4 py-3  sm:top-6 sm:px-6">
        <nav className="flex items-center justify-between gap-5">
          <Link href="/" className="flex min-w-0 items-center gap-1 sm:gap-2.5">
            <Image
              src="/images/app/Logosymbol.png"
              alt=""
              width={28}
              height={28}
              className="size-8 sm:size-10 shrink-0"
              priority
            />
            <span className="text-[14px] sm:text-xl font-bold tracking-tight text-app-secondary">
              WorkCorp
            </span>
          </Link>

          <div className="hidden items-center gap-10 text-sm font-semibold md:flex">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-xl transition duration-200 hover:text-app-secondary ${
                    isActive ? "text-app-secondary" : "text-app-neutral"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <AuthSlot user={user} />
        </nav>
      </header>

      <nav className="fixed bottom-4 left-1/2 z-40 grid w-[min(22rem,calc(100%-2rem))] -translate-x-1/2 grid-cols-3 rounded-xl border border-app-tertiary/18 bg-app-primary p-2 shadow-2xl shadow-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-app-primary md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold transition hover:bg-white/12 hover:text-app-secondary ${
                isActive ? "text-app-secondary" : "text-app-tertiary"
              }`}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
