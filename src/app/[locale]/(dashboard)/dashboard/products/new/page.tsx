import { getAllOccasions } from "@/app/[locale]/(site)/(homepage)/_services/get-all-occasions.service";
import AddProductForm from "./_components/add-product-form";
import { getAllCategories } from "@/lib/services/get-all-categories.service";

export default async function Page() {
  const [occasionsResult, categoriesResult] = await Promise.all([
    getAllOccasions({ limit: 1000 }),
    getAllCategories({ limit: 1000 }),
  ]);

  const occasions = occasionsResult.success
    ? occasionsResult.data.occasions
    : [];
  const categories = categoriesResult.success
    ? categoriesResult.data.categories
    : [];

  return <AddProductForm occasions={occasions} categories={categories} />;
}
