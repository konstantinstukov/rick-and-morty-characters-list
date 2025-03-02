import style from './CharacterList.module.css';
import { useGetCharactersQuery } from '../../services/charactersApi';
import Card from '../Card/Card';
import { CharacterListProps } from '../../types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const CharacterList = ({ filters }: CharacterListProps) => {
  const { data, error, isLoading } = useGetCharactersQuery(filters);

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

  return (
    <div className={`wrapper ${style.characterListContainer}`}>
      {error ? (
        <p>{getErrorMessage(error as FetchBaseQueryError)}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          {data.results.length > 0
            ? data.results.map((character) => (
                <Card key={character.id} character={character} />
              ))
            : null}
        </>
      ) : null}
    </div>
  );
};
