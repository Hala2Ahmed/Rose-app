import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { updateProductAction } from "../_actions/update-product.action";
import { UpdateProductFormData } from "@/lib/types/products-dashboard";
import { useRouter } from "@/i18n/navigation";

export default function useUpdateProduct() {
  //translations
  const t = useTranslations("dashboard.products-form");

  //navigation
  const router = useRouter();

  //mutation
  const { error, mutate, isPending } = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: UpdateProductFormData;
      id: string;
    }) => {
      const response = await updateProductAction(data, id);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    retry: 2,
    retryDelay: 1000,
    onSuccess: async () => {
      toast.success(t("product-updated-successfully"));
      router.push("/dashboard/products");
    },

    onError: (error: Error) => toast.error(error.message),
  });

  return {
    error,
    updateProduct: mutate,
    isPending,
  };
}
