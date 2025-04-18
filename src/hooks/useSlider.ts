import { useState, useMemo } from "react";
import { Character } from "../types/types";

export const useSlider = (
  characters: Character[],
  cardsPerPage: number = 4
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, characters.length - cardsPerPage)
        : prevIndex - cardsPerPage
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const remaining = characters.length - (prevIndex + cardsPerPage);
      if (remaining <= 0) {
        return 0;
      }
      return prevIndex + cardsPerPage;
    });
  };

  const visibleCards = useMemo(() => {
    const end = currentIndex + cardsPerPage;
    const slicedCards = characters.slice(currentIndex, end);
    return slicedCards;
  }, [characters, currentIndex, cardsPerPage]);

  const progressPercent = useMemo(
    () =>
      characters?.length > 0
        ? (Math.min(currentIndex + cardsPerPage, characters.length) /
            characters.length) *
          100
        : 100,
    [characters, currentIndex, cardsPerPage]
  );

  const isButtonDisabled = characters.length <= cardsPerPage;

  return {
    currentIndex,
    visibleCards,
    progressPercent,
    isButtonDisabled,
    handlePrev,
    handleNext,
  };
};
