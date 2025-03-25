"use client";

import { useGetCharactersQuery } from "../services/charactersApi";
import { Card } from "./Card";
import { CharactersListSkeleton } from "./CharactersListSkeleton";
import { Pagination } from "./Pagination";
import { useEffect, useMemo, useState } from "react";
import { Filter } from "./Filter";
import { useUrlParams } from "../hooks/useUrlParams";

const CharactersContainer = ({ children }) => (
  <>
    <Filter />
    <div className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-5 place-items-center mb-10">
      {children}
    </div>
  </>
);

export const CharactersList = () => {
  const { getParam, getParams } = useUrlParams();
  const params = getParams();
  const [currentPage, setCurrentPage] = useState(Number(getParam("page") || 1));

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      name: params.name || undefined,
      status: params.status || undefined,
      gender: params.gender || undefined,
    }),
    [currentPage, params],
  );

  const { data, error, isLoading, isFetching } =
    useGetCharactersQuery(queryParams);

  useEffect(() => {
    setCurrentPage(Number(getParam("page") || 1));
  }, [getParam]);

  if (isLoading || isFetching) {
    return (
      <CharactersContainer>
        <CharactersListSkeleton />
      </CharactersContainer>
    );
  }

  if (error) {
    return (
      <CharactersContainer>
        <p className="text-xl text-red-500">
          {"status" in error
            ? `${error.status} - Character not found`
            : error.message || "An unknown error occurred"}
        </p>
      </CharactersContainer>
    );
  }

  if (data && data.results.length === 0) {
    return (
      <CharactersContainer>
        <div className="col-span-4 text-center my-10">
          <p className="text-xl">Characters not found</p>
        </div>
      </CharactersContainer>
    );
  }

  return (
    <>
      <CharactersContainer>
        {data?.results.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </CharactersContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={data?.info.pages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
