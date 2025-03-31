import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Хук для управления параметрами URL.
 *
 * Позволяет получать, изменять и удалять параметры в URL.
 *
 * @returns {{
 *   getParams: () => Record<string, string>,
 *   setParams: (params: Record<string, string | number | undefined>) => void,
 *   getParam: (key: string) => string
 * }} Объект с функциями:
 *   - `getParams`: Возвращает объект с текущими параметрами URL.
 *   - `setParams`: Устанавливает новые параметры URL, обновляя адрес в браузере.
 *   - `getParam`: Получает значение конкретного параметра по его ключу.
 *
 * @example
 * const { getParams, setParams, getParam } = useUrlParams();
 *
 * // Получить все параметры
 * const allParams = getParams(); // { page: "2", filter: "active" }
 *
 * // Установить параметры
 * setParams({ page: 2, filter: 'active' });
 *
 * // Получить конкретный параметр
 * const page = getParam('page'); // "2"
 */

type ParamsObject = Record<string, string>;
type SetParamsInput = Record<string, string | number | undefined>;

export const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParams = useCallback((): ParamsObject => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  const setParams = useCallback(
    (newParams: SetParamsInput) => {
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

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key) || "";
    },
    [searchParams],
  );

  return { getParams, setParams, getParam };
};
