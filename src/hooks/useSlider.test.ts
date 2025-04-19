import { renderHook, act } from "@testing-library/react";
import { Character } from "types/types";
import { describe, expect, it, beforeEach } from "vitest";
import { useSlider } from "./useSlider";

describe("useSlider", () => {
  const cardsPerPageMock: number = 4;
  const totalCards: number = cardsPerPageMock * 2;

  const charactersMock: Character[] = Array.from(
    { length: totalCards },
    (_, index) => ({
      id: index + 1,
      name: `Character ${index + 1}`,
      gender: "",
      status: "",
      image: "",
      episode: [],
      location: {
        name: "",
        url: "",
      },
    })
  );

  let hookResult: { current: ReturnType<typeof useSlider> };

  beforeEach(() => {
    const { result } = renderHook(() =>
      useSlider(charactersMock, cardsPerPageMock)
    );
    hookResult = result;
  });

  it("should return the correct initial state", () => {
    expect(hookResult.current.currentIndex).toBe(0);
    expect(hookResult.current.visibleCards.length).toBe(cardsPerPageMock);
    expect(hookResult.current.visibleCards[0].id).toBe(1);
    expect(hookResult.current.progressPercent).toBeGreaterThanOrEqual(0);
    expect(hookResult.current.progressPercent).toBeLessThanOrEqual(100);
    expect(hookResult.current.isButtonDisabled).toBe(false);
  });

  it("should return the correct visible cards", () => {
    expect(hookResult.current.visibleCards.length).toBe(cardsPerPageMock);
    expect(hookResult.current.visibleCards[0].id).toBe(1);
    expect(hookResult.current.visibleCards.at(-1).id).toBe(cardsPerPageMock);
  });

  it("should return the correct progress percentage", () => {
    expect(hookResult.current.progressPercent).toBeGreaterThanOrEqual(0);
    expect(hookResult.current.progressPercent).toBeLessThanOrEqual(100);

    act(() => {
      hookResult.current.handleNext();
    });

    expect(hookResult.current.progressPercent).toBe(100);
  });

  it("should return the correct button disabled state", () => {
    expect(hookResult.current.isButtonDisabled).toBe(false);

    act(() => {
      hookResult.current.handleNext();
    });

    expect(hookResult.current.isButtonDisabled).toBe(false);

    const { result: hookResultSingle } = renderHook(() =>
      useSlider([charactersMock[0]], 1)
    );
    expect(hookResultSingle.current.isButtonDisabled).toBe(true);
  });

  it("should handle next/previouse button click correctly", () => {
    expect(hookResult.current.currentIndex).toBe(0);
    expect(hookResult.current.visibleCards[0].id).toBe(1);

    act(() => {
      hookResult.current.handleNext();
    });

    expect(hookResult.current.currentIndex).toBe(cardsPerPageMock);
    expect(hookResult.current.visibleCards[0].id).toBe(cardsPerPageMock + 1);

    act(() => {
      hookResult.current.handlePrev();
    });

    expect(hookResult.current.currentIndex).toBe(0);
    expect(hookResult.current.visibleCards[0].id).toBe(1);
  });

  it("should handle prev button click at the beginning correctly", () => {
    act(() => {
      hookResult.current.handlePrev();
    });

    expect(hookResult.current.currentIndex).toBe(cardsPerPageMock);
    expect(hookResult.current.visibleCards[0].id).toBe(cardsPerPageMock + 1);
  });

  it("should handle next button click at the end correctly", () => {
    act(() => {
      hookResult.current.handleNext();
    });
    act(() => {
      hookResult.current.handleNext();
    });

    expect(hookResult.current.currentIndex).toBe(0);
    expect(hookResult.current.visibleCards[0].id).toBe(1);
  });

  it("should handle empty characters array", () => {
    const { result } = renderHook(() => useSlider([], cardsPerPageMock));

    expect(result.current.progressPercent).toBe(100);
    expect(result.current.isButtonDisabled).toBe(true);
  });
});
