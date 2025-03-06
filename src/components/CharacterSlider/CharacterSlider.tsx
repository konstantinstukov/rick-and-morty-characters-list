import { useState } from 'react';
import { CharacterSliderProps } from '../../types/types';
import style from './CharacterSlider.module.css';
import { CharacterList } from '../CharacterList/CharacterList';
import { SliderButton } from '../SliderButton/SliderButton';
import { useGetLocationByIdQuery } from '../../services/charactersApi';
import { skipToken } from '@reduxjs/toolkit/query';

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

  const handlePrevClick = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  return (
    <div className={style.characterSlider}>
      <div className={style.characterSliderControl}>
        <div className={style.progressBarContainer}>
          <div
            className={style.progressBar}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className={style.characterSliderButtons}>
          <SliderButton
            direction="prev"
            changeSlide={handlePrevClick}
            isDisabled={currentSlide === 0}
          />
          <SliderButton
            direction="next"
            changeSlide={handleNextClick}
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
    </div>
  );
};
