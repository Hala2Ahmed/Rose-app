"use client";

import { useTranslations } from "next-intl";
import FilterTitle from "../filter-title";
import { Input } from "@/components/ui/input";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceFilterSchema } from "@/lib/schemes/filter.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PriceFilterForm } from "@/lib/types/filters.types";
import { useUrlParams } from "@/hooks/use-url-params";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

export default function PriceFilter() {
  //translations
  const t = useTranslations("products.filters");

  //form
  const form = useForm<PriceFilterForm>({
    resolver: zodResolver(priceFilterSchema(t)) as Resolver<PriceFilterForm>,
    mode: "onChange",

    defaultValues: {
      priceFrom: undefined,
      priceTo: undefined,
    },
  });

  //variables
  const watchedValues = form.watch();
  const { trigger } = form;

  //hooks
  const { setParam } = useUrlParams();
  const debouncedPriceFrom = useDebounce(watchedValues.priceFrom ?? "", 1000);
  const debouncedPriceTo = useDebounce(watchedValues.priceTo ?? "", 1000);
  const priceParamFilter = useSearchParams();
  const hasPriceFilter = useMemo(() => {
    const gte = priceParamFilter.get("price[gte]");
    const lte = priceParamFilter.get("price[lte]");
    return Boolean(gte?.trim()) || Boolean(lte?.trim());
  }, [priceParamFilter]);

  //initialize prices from url if exists
  useEffect(() => {
    const gte = priceParamFilter.get("price[gte]");
    const lte = priceParamFilter.get("price[lte]");

    form.setValue("priceFrom", gte ? Number(gte) : undefined);
    form.setValue("priceTo", lte ? Number(lte) : undefined);
  }, [priceParamFilter, form]);

  //set prices on url after user end typing
  useEffect(() => {
    if (form.formState.isValidating) return;
    if (!form.formState.isValid) return;

    // Only update URL if debounced values are in sync with current form values
    const currentFrom = watchedValues.priceFrom ?? "";
    const currentTo = watchedValues.priceTo ?? "";

    if (String(debouncedPriceFrom) !== String(currentFrom)) return;
    if (String(debouncedPriceTo) !== String(currentTo)) return;

    setParam([
      ["price[gte]", debouncedPriceFrom ? String(debouncedPriceFrom) : null],
      ["price[lte]", debouncedPriceTo ? String(debouncedPriceTo) : null],
    ]);
  }, [
    debouncedPriceFrom,
    debouncedPriceTo,
    form.formState.isValid,
    form.formState.isValidating,
    watchedValues.priceFrom,
    watchedValues.priceTo,
    setParam,
  ]);
  return (
    <div>
      <FilterTitle
        title={t("price-title")}
        isFilterSelected={hasPriceFilter}
        paramsToReset={["price[gte]", "price[lte]"]}
        resetFn={() => {
          form.reset(
            { priceFrom: undefined, priceTo: undefined },
            { keepDefaultValues: false },
          );
        }}
      />

      <Form {...form}>
        <form className="flex gap-2 pb-5 border-b">
          <FormField
            control={form.control}
            name="priceFrom"
            render={({ field }) => (
              <FormItem className="col-span-1">
                {/* Label */}
                <FormLabel>{t("price-from-label")}</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="0"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("priceTo"); // re-validate priceFrom when priceTo changes
                    }}
                  />
                </FormControl>

                {/* Error Message */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceTo"
            render={({ field }) => (
              <FormItem className="col-span-1">
                {/* Label */}
                <FormLabel>{t("price-to-label")}</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="10000"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("priceFrom"); // re-validate PriceTo when PriceFrom changes
                    }}
                  />
                </FormControl>

                {/* Error Message */}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
