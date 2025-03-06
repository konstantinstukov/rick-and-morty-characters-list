import style from './Characters.module.css';
import mainBanner from '../../assets/main-banner.png';
import { Filter } from '../../components/Filter/Filter';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { FilterParams } from '../../types/types';
import { Pagination } from '../../components/Pagination/Pagination';
import { useGetFilteredCharactersQuery } from '../../services/charactersApi';
import { useFilterParams } from '../../hooks/useFilterParams';

const Characters = () => {
  const { filterParams, updateFilterParams } = useFilterParams();

  const handleFilterChange = (newFilters: FilterParams) => {
    updateFilterParams({ ...newFilters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateFilterParams({ ...filterParams, page: newPage });
  };

  const { data } = useGetFilteredCharactersQuery(filterParams);

  return (
    <main className={`wrapper ${style.mainPage}`}>
      <img src={mainBanner} alt="Rick and Morty" className={style.mainBanner} />
      <Filter
        onFilterChange={handleFilterChange}
        initialFilters={filterParams}
      />
      <CharacterList filters={filterParams} />
      <Pagination
        currentPage={filterParams.page ?? 1}
        totalPages={data?.info.pages ?? 1}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Characters;
