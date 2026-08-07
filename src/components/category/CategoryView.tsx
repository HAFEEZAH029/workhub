import CategoryDisplay from "./CategoryDisplay";
import OtherCategories from "./OtherCategories";
import { getWorkspaces, getCategoryBySlug, getCategories } from "@/lib/db/data-query";



const CategoryView = async ({category}: {category:string}) => {

    const Category = await getCategoryBySlug(category);
    const catWorkspaces =  await getWorkspaces(Category.id);
    const categories = await getCategories();
    const otherCategories = categories.filter((item) => item.slug !== Category.slug);

  return (
    <>
      <CategoryDisplay category={category} initialWorkspaces={catWorkspaces} Category={Category} />
      <OtherCategories categories={otherCategories} />
    </>
  )
}

export default CategoryView
