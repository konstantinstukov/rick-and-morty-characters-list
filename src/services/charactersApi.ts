import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CharacterByIdResponse,
  AllCharactersResponse,
  EpisodeByIdResponse,
  FilterParams,
  LocationByIdResponse,
} from '../types/types';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
    timeout: 5000,
  }),
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    getFilteredCharacters: builder.query<
      AllCharactersResponse,
      FilterParams | undefined
    >({
      query: (params) => ({
        url: 'character',
        params:
          params &&
          Object.fromEntries(
            Object.entries(params).filter(([, value]) => value !== '')
          ),
      }),
      extraOptions: {
        maxRetries: 3,
        backoff: (attempt: number) =>
          Math.min(1000 * Math.pow(2, attempt), 15000),
      },
    }),
    getCharacterById: builder.query<
      CharacterByIdResponse | CharacterByIdResponse[],
      string
    >({
      query: (id) => `character/${id}`,
    }),
    getEpisodeByIds: builder.query<EpisodeByIdResponse, string>({
      query: (ids) => `episode/${ids}`,
    }),
    getLocationById: builder.query<LocationByIdResponse, string>({
      query: (id) => `location/${id}`,
    }),
  }),
});

export const {
  useGetFilteredCharactersQuery,
  useGetCharacterByIdQuery,
  useGetEpisodeByIdsQuery,
  useGetLocationByIdQuery,
} = charactersApi;
