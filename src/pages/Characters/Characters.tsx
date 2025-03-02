import style from './Characters.module.css';
import mainBanner from '../../assets/main-banner.png';
import { Filter } from '../../components/Filter/Filter';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { useState } from 'react';
import { FilterParams } from '../../types/types';
import { Pagination } from '../../components/Pagination/Pagination';
import { useGetCharactersQuery } from '../../services/charactersApi';

const Characters = () => {
  const [filterParams, setFilterParams] = useState<FilterParams>({
    name: '',
    status: '',
    gender: '',
    page: 1,
  });

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilterParams({ ...newFilters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setFilterParams((prev) => ({ ...prev, page: newPage }));
  };

  const { data } = useGetCharactersQuery(filterParams);

  return (
    <main className={`wrapper ${style.mainPage}`}>
      <img src={mainBanner} alt="Rick and Morty" className={style.mainBanner} />
      <Filter onFilterChange={handleFilterChange} />
      <CharacterList filters={filterParams} />
      <Pagination
        currentPage={filterParams.page}
        totalPages={data?.info.pages ?? 1}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Characters;
