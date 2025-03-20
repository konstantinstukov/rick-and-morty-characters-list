"use client";

import { useEffect, useState } from "react";
import {
  useGetLocationByIdQuery,
  useGetCharacterByIdQuery,
} from "../services/charactersApi";
import { Character } from "../types/types";
import { NavigateButton } from "./NavigateButton";
import CharactersSliderSkeleton from "./CharactersSliderSkeleton";
import { Card } from "./Card";

interface CharactersSliderProps {
  id: number;
  location: string;
}

export const CharactersSlider = ({
  id: characterId,
  location: characterLocation,
}: CharactersSliderProps) => {
  const [charactersIds, setCharactersIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const locationId = characterLocation
    ? Number(characterLocation.split("/").pop())
    : 0;

  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
  } = useGetLocationByIdQuery({ id: locationId }, { skip: !locationId });

  useEffect(() => {
    if (locationData && locationData.residents) {
      const charactersIds = locationData.residents
        .map((url) => Number(url.split("/").pop()))
        .filter((residentId) => residentId !== characterId);
      setCharactersIds(charactersIds);
    }
  }, [locationData, characterId]);

  const { data: charactersData, isLoading: isCharactersLoading } =
    useGetCharacterByIdQuery(
      { id: charactersIds },
      { skip: charactersIds.length === 0 },
    );

  const characters: Character[] = charactersData
    ? Array.isArray(charactersData)
      ? charactersData
      : [charactersData]
    : [];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, characters.length - 4) : prevIndex - 4,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= characters.length ? 0 : prevIndex + 4,
    );
  };

  const visibleCards = characters.slice(currentIndex, currentIndex + 4);

  const progressPercent =
    characters?.length > 0
      ? (Math.min(currentIndex + 4, characters.length) / characters.length) *
        100
      : 100;

  const isButtonDisabled =
    isLocationLoading || isCharactersLoading || characters.length <= 4;

  if (locationError || !characters.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        There are no other characters from this location.
      </div>
    );
  }

  return (
    <>
      <div className="flex mb-5 h-full gap-24.5 items-center">
        <div className="grow h-0.5 bg-[rgba(159,159,159,0.5)] rounded-sm overflow-hidden">
          <div
            className="h-full bg-primary-green transition-[width] duration-300 rounded-sm"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex gap-2.5">
          <NavigateButton
            iconDirection="left"
            onClick={handlePrev}
            isDisabled={isButtonDisabled}
          />
          <NavigateButton
            iconDirection="right"
            onClick={handleNext}
            isDisabled={isButtonDisabled}
          />
        </div>
      </div>
      <div className="min-h-[325px] grid grid-cols-4 gap-5">
        {isLocationLoading || isCharactersLoading ? (
          <CharactersSliderSkeleton />
        ) : (
          visibleCards.map((character) => (
            <Card key={character.id} character={character} />
          ))
        )}
      </div>
    </>
  );
};
