import { getProductDetails } from "@/app/[locale]/(site)/products/[id]/_actions/product-content.action";
import UpdateProductForm from "./_components/update-product-form";
import { getAllOccasions } from "@/app/[locale]/(site)/(homepage)/_services/get-all-occasions-server";
import { getAllCategories } from "@/lib/services/get-all-categories-server";

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
    <div className="bg-zinc-50 px-7">
      <UpdateProductForm
        product={product}
        id={params.id}
        occasions={occasions}
        categories={categories}
      />
    </div>
  );
}
