import { useMemo } from "react";
import {
  useGetCharacterByIdQuery,
  useGetLocationByIdQuery,
} from "../services/charactersApi";
import { Character } from "../types/types";

/**
 * Custom hook to fetch character and location data from Rick and Morty API
 *
 * @param {number} characterId - The ID of the main character to exclude from residents list
 * @param {string} locationUrl - The URL of the location containing the list of residents
 *
 * @returns {Object} Hook return object containing:
 *   @property {Character[]} characters - Array of character data for location residents
 *   @property {boolean} isLoading - Loading state for both location and characters data
 *   @property {Error|undefined} error - Error object if location fetch fails
 *
 * @example
 * const { characters, isLoading, error } = useCharactersData(1, "https://rickandmortyapi.com/api/location/1");
 *
 * if (isLoading) return <Loading />;
 * if (error) return <Error message={error.message} />;
 *
 * return (
 *   <div>
 *     {characters.map(character => (
 *       <CharacterCard key={character.id} character={character} />
 *     ))}
 *   </div>
 * );
 */

export const useCharactersData = (characterId: number, locationUrl: string) => {
  const locationId = locationUrl ? Number(locationUrl.split("/").pop()) : 0;

  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
  } = useGetLocationByIdQuery({ id: locationId }, { skip: !locationId });

  const charactersIds: number[] = useMemo(() => {
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
      { skip: charactersIds.length === 0 }
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
