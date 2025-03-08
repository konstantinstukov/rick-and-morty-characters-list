import { useState } from 'react';
import { CharacterList } from './CharacterList.tsx';
import { useGetLocationByIdQuery } from '../services/charactersApi.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button } from './Button.tsx';

interface CharacterSliderProps {
  locationId: string;
  excludeId?: string;
}

export const CharacterSlider = ({
  locationId,
  excludeId,
}: CharacterSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide: number = 4;
  const { data: locationData } = useGetLocationByIdQuery(
    locationId ?? skipToken
  );
  const totalCharacters =
    locationData?.residents?.filter(
      (url) => !excludeId || !url.endsWith(`/${excludeId}`)
    ).length ?? 0;
  const totalSlides = Math.ceil(totalCharacters / cardsPerSlide);
  const progressPercentage =
    totalSlides > 1 ? (currentSlide / (totalSlides - 1)) * 100 : 100;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };
  const handleNextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex mb-5 h-full gap-24.5 items-center">
        <div className="grow h-0.5 bg-[rgba(159,159,159,0.5)] rounded-sm overflow-hidden">
          <div
            className="h-full bg-primary-green transition-[width] duration-300 rounded-sm"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex gap-2.5">
          <Button
            iconDirection="left"
            changeSlide={handlePrevSlide}
            isDisabled={currentSlide === 0}
          />
          <Button
            iconDirection="right"
            changeSlide={handleNextSlide}
            isDisabled={currentSlide >= totalSlides - 1}
          />
        </div>
      </div>
      <div>
        <CharacterList
          locationId={locationId}
          maxCards={cardsPerSlide}
          startIndex={currentSlide * cardsPerSlide}
          excludeId={excludeId}
        />
      </div>
    </>
  );
};
