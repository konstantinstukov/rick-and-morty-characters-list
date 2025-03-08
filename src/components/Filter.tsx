import { memo } from 'react';
import { FilterParams, FilterProps } from '../types/types';
import { useState, ChangeEvent } from 'react';

export const Filter = memo(
  ({ onFilterChange, initialFilters }: FilterProps) => {
    const [filters, setFilters] = useState<FilterParams>(initialFilters);

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
      <div className="max-w-7xl flex gap-6">
        <input
          type="text"
          className="input"
          name="name"
          placeholder="Имя"
          value={filters.name ?? ''}
          onChange={handleChange}
        />
        <select
          name="status"
          id="status"
          className="input"
          value={filters.status ?? ''}
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
          value={filters.gender ?? ''}
          onChange={handleChange}
          className="input"
        >
          <option value="">Пол</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
    );
  }
);

Filter.displayName = 'Filter';
