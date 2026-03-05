"use client";

import { Occasion } from "@/lib/types/occasions.types";
import ProductForm from "../../_components/product-form";
import useAddProduct from "../_hooks/use-add-product";
import { ProductFormData } from "@/lib/types/products-dashboard";
import { Category } from "@/lib/types/categories";
import { useTranslations } from "next-intl";

type Props = {
  occasions: Occasion[];
  categories: Category[];
};

export default function AddProduct({ occasions, categories }: Props) {
  //translations
  const t = useTranslations("dashboard.products-form");

  const { addProduct, isPending } = useAddProduct();

  // Handle form submission
  const handleSubmit = (values: ProductFormData) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      // Append multiple gallery images
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file: File) => formData.append(key, file));
        // Append main cover image
      } else if (key === "imgCover" && value instanceof File) {
        formData.append(key, value);
        // Append other fields
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    addProduct(formData);
  };

  const defaultValues: ProductFormData = {
    title: "",
    description: "",
    price: undefined,
    discount: undefined,
    priceAfterDiscount: undefined,
    quantity: undefined,
    category: "",
    occasion: "",
    imgCover: null,
    images: [],
  };

  return (
    <>
      {/* Page header */}
      <h3 className="text-zinc-800 text-2xl font-semibold py-6">
        {t("add-product-header")}
      </h3>

      {/* Render the ProductForm component in "add" mode */}
      <ProductForm
        mode="add"
        isPending={isPending}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        occasions={occasions}
        categories={categories}
      />
    </>
  );
}
