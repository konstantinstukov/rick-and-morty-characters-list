import { useMemo } from "react";
import {
  useGetCharacterByIdQuery,
  useGetLocationByIdQuery,
} from "../services/charactersApi";
import { Character } from "../types/types";

export const useCharactersData = (characterId: number, locationUrl: string) => {
  const locationId = locationUrl ? Number(locationUrl.split("/").pop()) : 0;

  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
  } = useGetLocationByIdQuery({ id: locationId }, { skip: !locationId });

  const charactersIds = useMemo(() => {
    if (locationData && locationData.residents) {
      return locationData.residents
        .map((url) => Number(url.split("/").pop()))
        .filter((residentId) => residentId !== characterId);
    }
    return [];
  }, [locationData, characterId]);

  const { data: charactersData, isLoading: isCharactersLoading } =
    useGetCharacterByIdQuery(
      { id: charactersIds },
      { skip: charactersIds.length === 0 },
    );

  const characters: Character[] = useMemo(() => {
    if (!charactersData) return [];
    return Array.isArray(charactersData) ? charactersData : [charactersData];
  }, [charactersData]);

  return {
    characters,
    isLoading: isCharactersLoading || isLocationLoading,
    error: locationError,
  };
};
