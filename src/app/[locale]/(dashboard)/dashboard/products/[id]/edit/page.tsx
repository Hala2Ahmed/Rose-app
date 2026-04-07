import { getProductDetails } from "@/app/[locale]/(site)/products/[id]/_actions/product-content.action";
import UpdateProductForm from "./_components/update-product-form";
import { getAllCategories } from "@/lib/services/get-all-categories.service";
import { getAllOccasions } from "@/app/[locale]/(site)/(homepage)/_services/get-all-occasions-server";

export default async function Page({ params }: { params: { id: string } }) {
  const [product, occasionsResult, categoriesResult] = await Promise.all([
    getProductDetails(params.id),
    getAllOccasions({ limit: 1000 }),
    getAllCategories({ limit: 1000 }),
  ]);

  const occasions = occasionsResult.success
    ? occasionsResult.data.occasions
    : [];
  const categories = categoriesResult.success
    ? categoriesResult.data.categories
    : [];

  return (
      <UpdateProductForm
        product={product}
        id={params.id}
        occasions={occasions}
        categories={categories}
      />
  );
}
