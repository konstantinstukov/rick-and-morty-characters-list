import { useRouter } from "next/navigation";
import { ButtonProps } from "../types/types";
import { memo, useCallback } from "react";
import { NavArrowRightIcon, NavArrowLeftIcon } from "./Icons";

export const NavigateButton = memo(
  ({
    iconDirection,
    spanText,
    navigateBack,
    isDisabled,
    onClick,
  }: ButtonProps) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
      if (navigateBack) {
        router.back();
      } else if (onClick) {
        onClick();
      }
    }, [navigateBack, router, onClick]);

    const ariaLabel = navigateBack
      ? "Return to previous page"
      : iconDirection === "right"
        ? "Go to next page"
        : "Go to previous page";

    return (
      <button
        type="button"
        className={`group flex items-center gap-2.75 cursor-pointer hover:text-white ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
      >
        <span
          className="size-12 bg-[#EEF0F4] rounded-xl flex items-center justify-center group-hover:bg-secondary-green"
          aria-hidden={true}
        >
          {iconDirection === "right" ? (
            <NavArrowRightIcon />
          ) : (
            <NavArrowLeftIcon />
          )}
        </span>

        {spanText && (
          <span className="text-base text-primary-green">{spanText}</span>
        )}
      </button>
    );
  },
);
