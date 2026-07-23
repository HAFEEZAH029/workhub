import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Workspace, WorkspaceImage } from "@/types/workspace";

type CategoryListProps = {
  workspace: Workspace;
  category: string;
};

function getWorkspaceImage(images?: WorkspaceImage[]) {
  const primaryImage = images?.find((image) => image.is_primary) ?? images?.[0];

  return (
    primaryImage?.image_path ||
    "/images/categories/hot-desk-cover.jpg"
  );
}

function formatCapacity(workspace: Workspace) {
  if (workspace.capacity_min === workspace.capacity_max) {
    return `${workspace.capacity_min}`;
  }

  return `${workspace.capacity_min}-${workspace.capacity_max}`;
}

function formatPrice(workspace: Workspace) {
  if (workspace.hourly_rate) {
    return `$${workspace.hourly_rate}/hr`;
  }

  if (workspace.daily_base_price) {
    return `$${workspace.daily_base_price}/day`;
  }

  return "From $0";
}

export default function CategoryList({ workspace, category }: CategoryListProps) {
  const imageSrc = getWorkspaceImage(workspace.workspace_images);
  const detailHref = `/workspaces/${category}/${workspace.slug}`;
  const firstMeta = workspace.location_label || workspace.workspace_type || "Flexible access";

  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-app-neutral/10 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[1.55] w-full overflow-hidden bg-app-primary/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={workspace.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-app-primary px-3 py-1 text-xs font-bold text-app-tertiary shadow-sm">
          {workspace.code}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-app-neutral">
              {workspace.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-app-neutral/70">
              <Users className="size-3.5" />
              Capacity: {formatCapacity(workspace)}
            </p>
          </div>
          <p className="shrink-0 text-sm font-extrabold text-app-neutral">
            {formatPrice(workspace)}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-app-neutral/70">
          <span className="inline-flex items-center gap-1 rounded-md bg-app-tertiary px-2 py-1 ring-1 ring-app-neutral/10">
            <MapPin className="size-3" />
            {firstMeta}
          </span>
          {workspace.workspace_type && workspace.location_label ? (
            <span className="rounded-md bg-app-tertiary px-2 py-1 ring-1 ring-app-neutral/10">
              {workspace.workspace_type}
            </span>
          ) : null}
        </div>

        <Link
          href={detailHref}
          className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md bg-app-primary px-4 text-sm font-bold text-app-tertiary transition hover:bg-app-primary/90"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
