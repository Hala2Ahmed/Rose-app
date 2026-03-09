"use client";

import ProductForm from "../../../_components/product-form";
import useUpdateProduct from "../_hooks/use-update-product";
import { UpdateProductFormData } from "@/lib/types/products-dashboard";
import { ProductDetails } from "@/lib/types/product-details";
import { Occasion } from "@/lib/types/occasions.types";
import { Category } from "@/lib/types/categories";
import { useTranslations } from "next-intl";

type Props = {
  product: ProductDetails;
  id: string;
  occasions: Occasion[];
  categories: Category[];
};

export default function UpdateProduct({
  product,
  id,
  occasions,
  categories,
}: Props) {
  //translations
  const t = useTranslations("dashboard.products-form");

  const { updateProduct, isPending } = useUpdateProduct();

  // Handle form submission
  const handleSubmit = (values: UpdateProductFormData) => {
    const { discount, occasion, ...rest } = values;
    updateProduct({ id, data: rest });
  };

  const defaultValues: UpdateProductFormData = {
    title: product.title,
    description: product.description,
    quantity: product.quantity,
    price: product.price,
    discount:
      product.price && product.priceAfterDiscount
        ? product.price - product.priceAfterDiscount
        : 0,
    priceAfterDiscount: product.priceAfterDiscount,
    category: product.category,
    occasion: product.occasion,
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-700 px-7">
      {/* Page header */}
      <h3 className="text-zinc-800 dark:text-white text-2xl font-semibold py-6 truncate">
        {t("update-product-header")}: {product.title}
      </h3>

      {/* Render the ProductForm component in "edit" mode */}
      <ProductForm
        mode="edit"
        isPending={isPending}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        occasions={occasions}
        categories={categories}
        imgCover={product.imgCover}
        images={product.images}
      />
    </div>
  );
}
