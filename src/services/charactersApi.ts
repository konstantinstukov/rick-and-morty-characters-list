import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharactersResponse, FilterParams } from '../types/types';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, FilterParams | undefined>({
      query: (params) => ({
        url: 'character',
        params:
          params &&
          Object.fromEntries(
            Object.entries(params).filter(([, value]) => value !== '')
          ),
      }),
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
