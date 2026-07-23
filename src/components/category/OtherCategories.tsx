import Image from "next/image";
import Link from "next/link";
import { workspacecategory } from "@/types/category";

type OtherCategoriesProps = {
  categories: workspacecategory[];
};

export default function OtherCategories({ categories }: OtherCategoriesProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-60 mb-24 max-w-304 px-5 sm:px-8 lg:px-5">
      <h2 className="text-center text-2xl font-bold text-app-primary">
        Checkout other workspaces
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.id}
            className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-app-neutral/10"
          >
            <div className="relative aspect-[1.65] w-full bg-app-primary/10">
              <Image
                src={category.cover_image_path}
                alt={category.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-app-neutral">{category.name}</h3>
              <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-app-neutral/65">
                {category.description}
              </p>
              <Link
                href={`/workspaces/${category.slug}`}
                className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md border border-app-neutral/35 px-4 text-sm font-bold text-app-primary transition hover:border-app-primary hover:bg-app-primary hover:text-app-tertiary"
              >
                View Catalog
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
