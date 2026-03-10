import { productSchema, updateProductSchema } from "../schemes/products.schema";
import { Category } from "./categories";
import { Occasion } from "./occasions.types";

export type ProductFormData = z.infer<ReturnType<typeof productSchema>>;

export type UpdateProductFormData = z.infer<
  ReturnType<typeof updateProductSchema>
>;

export type AddProps = {
  mode: "add";
  defaultValues: ProductFormData;
  onSubmit: (values: ProductFormData) => void;
  isPending?: boolean;
  occasions: Occasion[];
  categories: Category[];
};

export type EditProps = {
  mode: "edit";
  defaultValues: UpdateProductFormData;
  onSubmit: (values: UpdateProductFormData) => void;
  isPending?: boolean;
  occasions: Occasion[];
  categories: Category[];
  imgCover?: string;
  images?: string[];
};

export type ProductFormProps = AddProps | EditProps;

export type ProductFormValues = ProductFormData | UpdateProductFormData;
