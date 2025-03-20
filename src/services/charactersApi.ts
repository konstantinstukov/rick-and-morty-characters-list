import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Character } from "../types/types";

interface CharacterResponse {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
  episode: string[];
  location: {
    name: string;
    url: string;
  };
}

interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

interface CharactersQueryParams {
  name?: string;
  status?: string;
  gender?: string;
  page?: number;
}

interface EpisodeResponse {
  id: number;
  air_date: string;
  episode: string;
}

interface LocationResponse {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export const charactersApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api/",
    timeout: 5000,
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, CharactersQueryParams>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value != undefined && value != "") {
            queryParams.append(key, value.toString());
          }
        });

        return `character/?${queryParams.toString()}`;
      },
    }),
    getCharacterById: builder.query<
      CharacterResponse,
      { id: number | number[] }
    >({
      query: ({ id }) =>
        Array.isArray(id) ? `character/${id.join(",")}` : `character/${id}`,
    }),
    getLocationById: builder.query<LocationResponse, { id: number }>({
      query: ({ id }) => `location/${id}`,
    }),
    getEpisodesById: builder.query<
      EpisodeResponse | EpisodeResponse[],
      { ids: number | number[] }
    >({
      query: ({ ids }) =>
        Array.isArray(ids) ? `episode/${ids.join(",")}` : `episode/${ids}`,
      transformResponse: (response: EpisodeResponse | EpisodeResponse[]) => {
        if (Array.isArray(response)) {
          return response.map(({ id, air_date, episode }) => ({
            id,
            air_date,
            episode,
          }));
        }
        return [
          {
            id: response.id,
            air_date: response.air_date,
            episode: response.episode,
          },
        ];
      },
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetLocationByIdQuery,
  useGetEpisodesByIdQuery,
} = charactersApi;
