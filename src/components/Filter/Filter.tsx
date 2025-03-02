import { FilterParams } from '../../types/types';
import style from './Filter.module.css';
import { useState, ChangeEvent } from 'react';

interface FilterProps {
  onFilterChange: (filters: FilterParams) => void;
}

export const Filter = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FilterParams>({
    name: '',
    status: '',
    gender: '',
    page: 1,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    } as FilterParams;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={style.filterContainer}>
      <input
        type="text"
        className={style.inputField}
        name="name"
        placeholder="Имя"
        value={filters.name}
        onChange={handleChange}
      />
      <select
        name="status"
        id="status"
        className={style.inputField}
        value={filters.status}
        onChange={handleChange}
      >
        <option value="">Статус</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">unknown</option>
      </select>
      <select
        name="gender"
        id="gender"
        value={filters.gender}
        onChange={handleChange}
        className={style.inputField}
      >
        <option value="">Пол</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
    </div>
  );
};
