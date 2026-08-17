import Image from "next/image";
import Link from "next/link";

const COPYRIGHT_YEAR = 2026;

export default function SiteFooter() {
  return (
    <footer className="bg-app-neutral px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/images/app/Logosymbol.png"
            alt=""
            width={28}
            height={28}
            className="size-8 shrink-0"
          />
          <span className="text-lg font-bold tracking-tight text-app-secondary">
            WorkCorp
          </span>
        </Link>

        <p className="text-sm font-medium text-app-tertiary/60">
          &copy; {COPYRIGHT_YEAR} WorkCorp. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
