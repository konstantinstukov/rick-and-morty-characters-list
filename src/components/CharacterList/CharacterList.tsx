import { memo } from 'react';
import style from './CharacterList.module.css';
import {
  useGetCharacterByIdQuery,
  useGetFilteredCharactersQuery,
  useGetLocationByIdQuery,
} from '../../services/charactersApi';
import Card from '../Card/Card';
import { CharacterListProps } from '../../types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { skipToken } from '@reduxjs/toolkit/query';

const getErrorMessage = (error: FetchBaseQueryError) => {
  if ('status' in error) {
    switch (error.status) {
      case 404:
        return 'По вашему запросу ничего не найдено';
      default:
        return `Ошибка: ${error.status}`;
    }
  }
  return 'Произошла неизвестная ошибка';
};

export const CharacterList = memo(
  ({
    filters,
    locationId,
    maxCards,
    startIndex = 0,
    excludeId,
  }: CharacterListProps) => {
    const {
      data: characterData,
      error: characterError,
      isLoading: characterIsLoading,
    } = useGetFilteredCharactersQuery(filters, {
      skip: !!locationId,
    });

    const {
      data: locationData,
      error: locationError,
      isLoading: locationIsLoading,
    } = useGetLocationByIdQuery(locationId ?? skipToken);

    const characterIds = locationData?.residents
      ?.filter((url) => !excludeId || !url.endsWith(`/${excludeId}`))
      .slice(
        startIndex,
        startIndex + (maxCards || locationData.residents.length)
      )
      ?.map((url) => url.split('/').pop())
      .join(',');

    const {
      data: characters,
      error: charactersError,
      isLoading: charactersLoading,
    } = useGetCharacterByIdQuery(characterIds || skipToken, {
      skip: !locationId || !characterIds,
    });

    if (characterError || locationError || charactersError) {
      const error = characterError || locationError || charactersError;
      return <p>{getErrorMessage(error as FetchBaseQueryError)}</p>;
    }

    if (characterIsLoading || locationIsLoading || charactersLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className={`wrapper ${style.characterListContainer}`}>
        {locationId
          ? characters && (
              <>
                {Array.isArray(characters) ? (
                  characters.map((character) => (
                    <Card key={character.id} character={character} />
                  ))
                ) : (
                  <Card key={characters.id} character={characters} />
                )}
              </>
            )
          : characterData?.results.map((character) => (
              <Card key={character.id} character={character} />
            ))}
      </div>
    );
  }
);

CharacterList.displayName = 'CharacterList';
