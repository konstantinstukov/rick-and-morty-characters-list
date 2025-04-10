"use client";

import { useUrlParams } from "../hooks/useUrlParams";
import { useCallback, useRef, useState } from "react";

type FilterType = "status" | "gender" | "name";

type FilterState = {
  name: string;
  status: string;
  gender: string;
};

export const Filter = () => {
  const { getParam, setParams } = useUrlParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [localFilters, setLocalFilters] = useState<FilterState>({
    name: getParam("name") || "",
    status: getParam("status") || "",
    gender: getParam("gender") || "",
  });

  const handleFilterChange = useCallback(
    (type: FilterType, value: string) => {
      setLocalFilters((prev) => ({
        ...prev,
        [type]: value,
      }));

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setParams({
          ...localFilters,
          [type]: value,
          page: 1,
        });
      }, 500);
    },
    [setParams]
  );

  return (
    <form
      className="w-full max-w-7xl mx-auto flex gap-6 mb-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        className="input"
        name="name"
        placeholder="Name"
        value={localFilters.name}
        onChange={(e) => handleFilterChange("name", e.target.value)}
      />
      <select
        name="status"
        id="status"
        className="input"
        value={localFilters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
      >
        <option value="">Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">unknown</option>
      </select>
      <select
        name="gender"
        id="gender"
        className="input"
        value={localFilters.gender}
        onChange={(e) => handleFilterChange("gender", e.target.value)}
      >
        <option value="">Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
    </form>
  );
};
