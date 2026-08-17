import { categoryConfig } from "@/util/config";
import { Suspense } from "react";
import TopInfo from "@/components/category/TopInfo";
import { getCategoryBySlug, getWorkspaceRouteBySlug } from "@/lib/db/data-query";
import CategoryView from "@/components/category/CategoryView";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category ?? 'workspaces';

  return {
    title: `Premium ${categoryName} for Rent`,
    description: `Book high-quality ${categoryName} on-demand. Flexible hourly and daily rates for remote workers.`,
  };
}

async function TopComponent ({category}:{category:string}) {

  const Category = await getCategoryBySlug(category);

  const config = categoryConfig[Category.slug] || {
    title: "Workspace",
    label: "label",
    capacity: "From 1 person",
    price_range: "$$$"
  };

  return (
   <>
    <TopInfo
      data={Category}
      price_range={config.price_range}
      capacity={config.capacity}
      />
   </>
  )

}

async function CategoryPageContent({ params }: CategoryPageProps) {
  const { category } = await params;
  const workspaceRoute = await getWorkspaceRouteBySlug(category);

  if (workspaceRoute) {
    redirect(`/workspaces/${workspaceRoute.category}/${workspaceRoute.slug}`);
  }

  try {
    await getCategoryBySlug(category);
  } catch {
    notFound();
  }

  return (
    <>
      <TopComponent category={category} />
      <CategoryView category={category} />
    </>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <main>
      <Suspense fallback={<p className="text-center mt-10 text-app-primary font-semibold text-2xl">Loading....</p>}>
        <CategoryPageContent params={params} />
      </Suspense>
    </main>
  );
}
