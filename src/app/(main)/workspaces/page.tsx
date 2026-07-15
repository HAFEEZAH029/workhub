import CategoryInfo from "@/components/workspaces/CategoryInfo";
import Hero from "@/components/workspaces/Hero";
import Message from "@/components/workspaces/Message";
import {getCategories} from "@/lib/db/data-query";
import { categoryconfig } from "@/types/category";
import {Suspense} from "react";


export async function CategoryList ({categoryConfig}: {categoryConfig: categoryconfig}) {
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
          const reverse = index % 2 !== 0; // Reverse layout for odd-indexed categories

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

 const categoryConfig: categoryconfig = {
  "phone-booths": {
    title: "Phone Booths",
    label: "Focus Zone",
    capacity: "1 person",
    price_range: "From $2.50",
  },
  "hot-desks": {
    title: "Flexible Hot Desking",
    label: "Community",
    capacity: "1-6 people",
    price_range: "From $1.50"
  },
  "private-offices": {
    title: "Executive Private Offices",
    label: "Privacy",
    capacity: "1-15 people",
    price_range: "From $30.00"
  },
  "meeting-rooms": {
    title: "Meeting & Boardrooms",
    label: "Collaboration",
    capacity: "5-15 people",
    price_range: "From $80.00"
  }
 };

  return (
   <>
    <Hero />
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryList categoryConfig={categoryConfig} />
    </Suspense>
    <Message />
   </>
)};