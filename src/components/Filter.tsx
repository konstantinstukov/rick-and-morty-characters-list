"use client";

import { useUrlParams } from "../hooks/useUrlParams";
import { useCallback, useMemo } from "react";

type FilterType = "status" | "gender" | "name";

type FilterState = {
  name: string;
  status: string;
  gender: string;
};

export const Filter = () => {
  const { getParam, setParams } = useUrlParams();

  const currentFilters = useMemo<FilterState>(
    () => ({
      name: getParam("name") || "",
      status: getParam("status") || "",
      gender: getParam("gender") || "",
    }),
    [getParam],
  );

  const handleFilterCHange = useCallback(
    (type: FilterType, value: string) => {
      const newFilters = { ...currentFilters, [type]: value };

      const hasFilterChanged =
        currentFilters.name !== newFilters.name ||
        currentFilters.status !== newFilters.status ||
        currentFilters.gender !== newFilters.gender;

      setTimeout(() => {
        setParams({
          ...newFilters,
          ...(hasFilterChanged ? { page: 1 } : {}),
        });
      }, 500);
    },
    [currentFilters, setParams],
  );
  ``;

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
        value={currentFilters.name}
        onChange={(e) => handleFilterCHange("name", e.target.value)}
      />
      <select
        name="status"
        id="status"
        className="input"
        value={currentFilters.status}
        onChange={(e) => handleFilterCHange("status", e.target.value)}
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
        value={currentFilters.gender}
        onChange={(e) => handleFilterCHange("gender", e.target.value)}
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
