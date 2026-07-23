import { categoryConfig } from "@/util/config";
import { Suspense } from "react";
import TopInfo from "@/components/category/TopInfo";
import { getCategoryBySlug } from "@/lib/db/data-query";
import CategoryView from "@/components/category/CategoryView";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};
export async function TopComponent ({category}:{category:string}) {

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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return (
    <main>
      <Suspense fallback = {<p className="text-center mt-10 text-app-primary font-semibold text-2xl">Loading....</p>}>
        <TopComponent category={category} />
        <CategoryView category={category} />
      </Suspense>
    </main>
  );
}
