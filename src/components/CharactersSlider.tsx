"use client";

import { NavigateButton } from "./NavigateButton";
import { Card } from "./Card";
import { useCharactersData } from "../hooks/useCharactersData";
import { useSlider } from "../hooks/useSlider";
import { ProgressBar } from "./ProgressBar";
import { CharactersSliderSkeleton } from "./CharactersSliderSkeleton";

interface CharactersSliderProps {
  id: number;
  location: string;
}

export const CharactersSlider = ({
  id: characterId,
  location: characterLocation,
}: CharactersSliderProps) => {
  const { characters, isLoading, error } = useCharactersData(
    characterId,
    characterLocation,
  );

  const {
    visibleCards,
    progressPercent,
    isButtonDisabled,
    handlePrev,
    handleNext,
  } = useSlider(characters);

  if (error || !characters.length) {
    return (
      <section
        aria-label="Character location information"
        className="text-center py-8 text-gray-500"
      >
        <p>There are no other characters from this location.</p>
      </section>
    );
  }

  return (
    <section aria-label="Characters from the same location">
      <div className="flex mb-5 h-full gap-24.5 items-center">
        <ProgressBar percent={progressPercent} />
        <div
          className="flex gap-2.5"
          role="group"
          aria-label="Slider navigation"
        >
          <NavigateButton
            iconDirection="left"
            onClick={handlePrev}
            isDisabled={isButtonDisabled || isLoading}
            aria-label="Previous characters"
          />
          <NavigateButton
            iconDirection="right"
            onClick={handleNext}
            isDisabled={isButtonDisabled || isLoading}
            aria-label="Next characters"
          />
        </div>
      </div>
      <div className="min-h-[325px] grid grid-cols-4 gap-5" aria-live="polite">
        {isLoading ? (
          <CharactersSliderSkeleton />
        ) : (
          visibleCards.map((character) => (
            <Card key={character.id} character={character} />
          ))
        )}
      </div>
    </section>
  );
};
