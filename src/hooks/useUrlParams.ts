import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for managing URL parameters.
 *
 * Allows you to get, set, and remove parameters in the URL.
 *
 * @returns {{
 *   getParam: (key: string) => string
 *   getParams: () => Record<string, string>,
 *   setParams: (params: Record<string, string | number | undefined>) => void,
 * }} An object containing the following functions:
 *   - `getParams`: Returns an object with the current URL parameters.
 *   - `setParams`: Sets new URL parameters, updating the address in the browser.
 *   - `getParam`: Retrieves the value of a specific parameter by its key.
 *
 * @example
 * const {getParam, getParams, setParams } = useUrlParams();
 *
 * Get a specific parameter
 * const page = getParam('page'); // "2"
 *
 * Get all parameters
 * const allParams = getParams(); // { page: "2", filter: "active" }
 *
 * Set parameters
 * setParams({ page: 2, filter: 'active' });
 *
 */

type ParamsObject = Record<string, string>;
type SetParamsInput = Record<string, string | number | undefined>;

export const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key) || "";
    },
    [searchParams]
  );

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
    [pathname, router, searchParams]
  );

  return { getParams, setParams, getParam };
};
