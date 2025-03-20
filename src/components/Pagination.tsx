"use client";

import { useUrlParams } from "../hooks/useUrlParams";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const { setParams } = useUrlParams();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    setParams({ page });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex gap-3.5 justify-center pb-19">
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.62158 1.40625L3.02783 6L7.62158 10.5938L6.21533 12L0.215332 6L6.21533 0L7.62158 1.40625Z"
            fill="black"
          />
        </svg>
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={`page-${pageNumber}`}
          className={`${"pagination__button"} ${
            pageNumber === currentPage ? "pagination__button_active" : ""
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="pagination__button"
        onClick={() =>
          handlePageChange(
            currentPage < totalPages ? currentPage + 1 : totalPages,
          )
        }
        disabled={currentPage === totalPages}
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.78418 0L7.78418 6L1.78418 12L0.37793 10.5938L4.97168 6L0.37793 1.40625L1.78418 0Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};
