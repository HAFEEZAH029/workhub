import CategoryInfo from "@/components/workspaces/CategoryInfo";
import Hero from "@/components/workspaces/Hero";
import Message from "@/components/workspaces/Message";
import {getCategories} from "@/lib/db/data-query";
import { categoryconfig } from "@/types/category";
import {Suspense} from "react";
import { categoryConfig } from "@/util/config";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "Browse Workspaces",
  description: "Explore on-demand phone-booths, hot desks, meeting rooms, and private offices for hybrid teams and remote workers.",
};


async function CategoryList ({categoryConfig}: {categoryConfig: categoryconfig}) {
   const categories = await getCategories();

   return (
    <section className="mb-5">
        {categories.map((category, index) => {
          const config = categoryConfig[category.slug] || {
            title: category.name,
            label: "Workspace",
            capacity: "Above 1 person",
            price_range: "$$"
          };
          const reverse = index % 2 !== 0;

            return (
              <CategoryInfo
              key={category.id}
              data={category}
              title={config.title}
              label={config.label}
              capacity={config.capacity}
              price_range={config.price_range}
              reverse={reverse}
              />
            )
        })}
      </section>
   );

}


export default async function WorkspacesPage() {

  return (
   <>
    <Hero />
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryList categoryConfig={categoryConfig} />
    </Suspense>
    <Message />
   </>
)};