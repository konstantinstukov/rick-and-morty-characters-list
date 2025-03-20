"use client";

import Form from "next/form";
import { useUrlParams } from "../hooks/useUrlParams";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export const Filter = () => {
  const { getParam, setParams } = useUrlParams();
  const [filters, setFilters] = useState({
    name: getParam("name") || "",
    status: getParam("status") || "",
    gender: getParam("gender") || "",
  });
  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    if (
      getParam("name") !== debouncedFilters.name ||
      getParam("status") !== debouncedFilters.status ||
      getParam("gender") !== debouncedFilters.gender
    ) {
      setParams({
        ...debouncedFilters,
        page: 1,
      });
    } else {
      setParams({
        ...debouncedFilters,
      });
    }
  }, [debouncedFilters, setParams, getParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="w-full max-w-7xl mx-auto flex gap-6 mb-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        className="input"
        name="name"
        placeholder="Имя"
        value={filters.name}
        onChange={handleChange}
      />
      <select
        name="status"
        id="status"
        className="input"
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
        className="input"
        value={filters.gender}
        onChange={handleChange}
      >
        <option value="">Пол</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
    </form>
  );
};
