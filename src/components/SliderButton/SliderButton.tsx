import { SliderButtonProps } from '../../types/types';
import style from './SliderButton.module.css';

export const SliderButton = ({
  direction,
  changeSlide,
  isDisabled,
}: SliderButtonProps) => {
  return (
    <button
      className={`button ${style.button} ${isDisabled ? style.disabled : ''}`}
      onClick={changeSlide}
      disabled={isDisabled}
    >
      <span className="button-icon">
        {direction === 'next' ? (
          <svg
            width="10"
            height="16"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.78418 0L7.78418 6L1.78418 12L0.37793 10.5938L4.97168 6L0.37793 1.40625L1.78418 0Z" />
          </svg>
        ) : (
          <svg
            width="10"
            height="16"
            viewBox="0 0 8 12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path d="M7.62158 1.40625L3.02783 6L7.62158 10.5938L6.21533 12L0.215332 6L6.21533 0L7.62158 1.40625Z" />
          </svg>
        )}
      </span>
    </button>
  );
};
