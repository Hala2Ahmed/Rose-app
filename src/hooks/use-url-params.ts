import { toReadableQueryString } from "@/lib/utils/query-string";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export { toReadableQueryString };

export function useUrlParams() {
  //hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  const pushQuery = useCallback(
    (params: URLSearchParams) => {
      router.push(`?${toReadableQueryString(params.toString())}`, {
        scroll: false,
      });
    },
    [router],
  );

  //for multiplie selection
  const appendParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.getAll(key);

      if (!currentValues.includes(value)) {
        params.append(key, value);
        pushQuery(params);
      }
    },
    [searchParams, pushQuery],
  );

  //for toggle single selection
  const toggleParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValue = params.get(key);

      if (currentValue === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      pushQuery(params);
    },
    [searchParams, pushQuery],
  );
  const setMultipleParams = useCallback(
    (key: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      // Remove all existing values for this key
      params.delete(key);
      // Add all new values
      values.forEach((value) => params.append(key, value));
      pushQuery(params);
    },
    [searchParams, pushQuery],
  );
  const setParam = useCallback(
    (entries: [string, string | null][]) => {
      const params = new URLSearchParams(searchParams.toString());

      entries.forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      pushQuery(params);
    },
    [searchParams, pushQuery],
  );
  return { appendParam, toggleParam, setMultipleParams, setParam };
}
