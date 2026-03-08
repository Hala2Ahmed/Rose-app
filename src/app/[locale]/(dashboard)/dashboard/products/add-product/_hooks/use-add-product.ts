import { useMutation } from "@tanstack/react-query";
import { addProductAction } from "../_actions/add-product.action";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function useAddProduct() {
  //translations
  const t = useTranslations("dashboard.products-form");

  //navigation
  const router = useRouter();

  //mutation
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await addProductAction(data);

      return response;
    },
    onSuccess: () => {
      toast.success(t("product-added-successfully"));
      router.push("/dashboard/products");
    },

    onError: (error: Error) => toast.error(error.message),
  });

  return { isPending, addProduct: mutate };
}
