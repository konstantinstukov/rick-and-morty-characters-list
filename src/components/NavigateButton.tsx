import { useRouter } from "next/navigation";
import { ButtonProps } from "../types/types";

export const NavigateButton = ({
  iconDirection,
  spanText,
  navigateBack,
  isDisabled,
  onClick,
}: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (navigateBack) {
      router.back();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`group flex items-center gap-2.75 cursor-pointer hover:text-white ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
      onClick={handleClick}
    >
      <span className="size-12 bg-[#EEF0F4] rounded-xl flex items-center justify-center group-hover:bg-secondary-green">
        {iconDirection === "right" ? (
          <svg
            width="10"
            height="16"
            viewBox="0 0 8 12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="fill-primary-green"
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
            className="fill-primary-green"
          >
            <path d="M7.62158 1.40625L3.02783 6L7.62158 10.5938L6.21533 12L0.215332 6L6.21533 0L7.62158 1.40625Z" />
          </svg>
        )}
      </span>

      {spanText ? (
        <span className="text-base text-primary-green">{spanText}</span>
      ) : null}
    </button>
  );
};
