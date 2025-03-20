"use client";

import { useGetCharactersQuery } from "../services/charactersApi";
import { Card } from "./Card";
import { CharactersListSkeleton } from "./CharactersListSkeleton";
import { Pagination } from "./Pagination";
import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { useUrlParams } from "../hooks/useUrlParams";

export const CharactersList = () => {
  const { getParam, getParams } = useUrlParams();
  const params = getParams();
  const pageParam = getParam("page");
  const [currentPage, setCurrentPage] = useState(
    pageParam ? Number(pageParam) : 1,
  );

  const { data, error, isLoading, isFetching } = useGetCharactersQuery({
    page: currentPage,
    name: params.name || undefined,
    status: params.status || undefined,
    gender: params.gender || undefined,
  });

  useEffect(() => {
    const page = getParam("page");
    if (page) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
  }, [getParam]);

  if (isLoading || isFetching) {
    return (
      <>
        <Filter />
        <div className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-5 place-items-center mb-10">
          <CharactersListSkeleton />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Filter />
        <div className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-5 place-items-center mb-10">
          <div className="col-span-4 text-center my-10">
            <p className="text-xl text-red-500">
              {"status" in error
                ? error.status
                : error.message || "An unknown error occurred"}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Filter />
      <div className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-5 place-items-center mb-10">
        {data?.results.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={data?.info.pages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
