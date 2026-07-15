import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

type Workspace = {
  slug: string;
  tag: string;
  image: string;
  title: string;
  description: string;
  priceLabel: string;
};

const workspaces: Workspace[] = [
  {
    slug: "phone-booths",
    tag: "PRIVATE",
    image: "/images/workcat/cat-booth.png",
    title: "Phone Booths",
    description: "Quiet, acoustic pods for focused calls and virtual meetings.",
    priceLabel: "From $2.5/hr",
  },
  {
    slug: "hot-desks",
    tag: "FLEX",
    image: "/images/workcat/cat-hotdesk.jpg",
    title: "Hot Desks",
    description:
      "Ergonomic communal desks in our most vibrant open areas.",
    priceLabel: "From $1.5/hr",
  },
  {
    slug: "private-offices",
    tag: "ELITE",
    image: "/images/workcat/cat-private.jpg",
    title: "Private Offices",
    description: "Dedicated, secure suites for individuals or small teams.",
    priceLabel: "From $30/day",
  },
  {
    slug: "meeting-rooms",
    tag: "TECH-READY",
    image: "/images/workcat/cat-meeting.jpg",
    title: "Meeting Rooms",
    description:
      "Fully-equipped boardrooms with state-of-the-art AV tech.",
    priceLabel: "From $80/day",
  },
];

export default function FeaturedWorkspacesSection() {
  return (
    <section className="bg-app-tertiary px-5 mt-25 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-app-neutral sm:text-4xl">
            Featured Workspaces
          </h2>
          <Link
            href="/workspaces"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-app-primary transition hover:text-app-primary/80"
          >
            View All
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.slug}
              href={`/workspaces/${workspace.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-app-neutral/8 transition hover:shadow-md"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={workspace.image}
                  alt={workspace.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-app-neutral shadow-sm">
                  {workspace.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-app-neutral">
                  {workspace.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-6 text-app-neutral/65">
                  {workspace.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-app-neutral">
                    {workspace.priceLabel}
                  </span>
                  <ChevronRight className="size-4 text-app-neutral/50 transition group-hover:translate-x-0.5 group-hover:text-app-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}