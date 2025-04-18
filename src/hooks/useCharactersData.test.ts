import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { useCharactersData } from "./useCharactersData";
import * as api from "../services/charactersApi";

vi.mock("../services/charactersApi.ts", () => ({
  useGetLocationByIdQuery: vi.fn(),
  useGetCharacterByIdQuery: vi.fn(),
}));

describe("useCharactersData", () => {
  it("should return an array of non-resident characters if the data is loaded successfully", () => {
    const locationMock = {
      residents: [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
        "https://rickandmortyapi.com/api/character/3",
      ],
    };

    const charactersMock = [
      { id: 2, name: "Morty" },
      { id: 3, name: "Rick" },
    ];

    (api.useGetLocationByIdQuery as unknown as Mock).mockReturnValue({
      data: locationMock,
      isLoading: false,
      error: undefined,
    });

    (api.useGetCharacterByIdQuery as unknown as Mock).mockReturnValue({
      data: charactersMock,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useCharactersData(1, "https://rickandmortyapi.com/api/location/1")
    );

    expect(result.current.characters).toEqual(charactersMock);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(undefined);
  });

  it("should return loading state when location is loading", () => {
    (api.useGetLocationByIdQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    const { result } = renderHook(() =>
      useCharactersData(1, "https://rickandmortyapi.com/api/location/1")
    );

    expect(result.current.isLoading).toBe(true);
  });

  it("should return loading state when characters are loading", () => {
    const locationMock = {
      residents: [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
      ],
    };

    (api.useGetLocationByIdQuery as unknown as Mock).mockReturnValue({
      data: locationMock,
      isLoading: false,
      error: undefined,
    });

    (api.useGetCharacterByIdQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() =>
      useCharactersData(1, "https://rickandmortyapi.com/api/location/1")
    );

    expect(result.current.isLoading).toBe(true);
  });

  it("should return error if location fetch fails", () => {
    const errorMock = new Error("Failed to fetch location");

    (api.useGetLocationByIdQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: errorMock,
    });

    const { result } = renderHook(() =>
      useCharactersData(1, "https://rickandmortyapi.com/api/location/1")
    );

    expect(result.current.error).toEqual(errorMock);
  });

  it("should skip fetching characters if no residents", () => {
    const locationMock = {
      residents: [],
    };

    (api.useGetLocationByIdQuery as unknown as Mock).mockReturnValue({
      data: locationMock,
      isLoading: false,
      error: undefined,
    });

    (api.useGetCharacterByIdQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useCharactersData(1, "https://rickandmortyapi.com/api/location/1")
    );

    expect(result.current.characters).toEqual([]);
  });

  it("should skip fetching location if locationUrl is empty", () => {
    (api.useGetLocationByIdQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
    });

    const { result } = renderHook(() => useCharactersData(1, ""));

    expect(result.current.characters).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(undefined);
  });

  it("should return an empty array if the character is alone in the location", () => {
    const locationMock = {
      residents: ["https://rickandmortyapi.com/api/character/1"],
    };

    (api.useGetLocationByIdQuery as unknown as Mock).mockReturnValue({
      data: locationMock,
      isLoading: false,
      error: undefined,
    });

    (api.useGetCharacterByIdQuery as unknown as Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useCharactersData(1, "https://rickandmortyapi.com/api/location/1")
    );

    expect(result.current.characters).toEqual([]);
  });
});
