import mainBanner from '../assets/main-banner.png';
import { Filter } from '../components/Filter';
import { CharacterList } from '../components/CharacterList';
import { FilterParams } from '../types/types';
import { Pagination } from '../components/Pagination';
import { useGetFilteredCharactersQuery } from '../services/charactersApi';
import { useFilterParams } from '../hooks/useFilterParams';

const Characters = () => {
  const { filterParams, updateFilterParams } = useFilterParams();
  const { data } = useGetFilteredCharactersQuery(filterParams);

  const handleFilterChange = (newFilters: FilterParams) => {
    updateFilterParams({ ...newFilters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateFilterParams({ ...filterParams, page: newPage });
  };

  const totalPages =
    !data?.results || data.results.length === 0 ? 1 : data.info.pages;

  return (
    <div className="flex flex-col gap-10">
      <img src={mainBanner} alt="Rick and Morty" />
      <Filter
        onFilterChange={handleFilterChange}
        initialFilters={filterParams}
      />
      <CharacterList filters={filterParams} />
      <Pagination
        currentPage={filterParams.page ?? 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Characters;
