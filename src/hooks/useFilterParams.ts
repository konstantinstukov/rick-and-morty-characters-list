import { useSearchParams } from 'react-router-dom';
import { FilterParams } from '../types/types';

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilterParamsFromUrl = (): FilterParams => ({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || '',
    page: Number(searchParams.get('page')) || 1,
  });

  const updateFilterParams = (params: FilterParams) => {
    const newParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.toString());
      }
    });

    setSearchParams(newParams);
  };

  return {
    filterParams: getFilterParamsFromUrl(),
    updateFilterParams,
  };
};
