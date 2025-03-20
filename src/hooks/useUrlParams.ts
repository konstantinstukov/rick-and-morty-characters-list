import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Получение всех текущих параметров URL
  const getParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // Установка параметров URL
  const setParams = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  // Получение конкретного параметра URL
  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key) || "";
    },
    [searchParams],
  );

  return { getParams, setParams, getParam };
};
