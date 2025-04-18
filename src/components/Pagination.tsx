"use client";

import { memo, useCallback, useMemo } from "react";
import { useUrlParams } from "../hooks/useUrlParams";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = memo(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const { setParams } = useUrlParams();

    const handlePageChange = useCallback(
      (page: number) => {
        onPageChange(page);
        setParams({ page });
      },
      [onPageChange, setParams]
    );

    const handlePrevPage = useCallback(() => {
      if (currentPage > 1) {
        handlePageChange(currentPage - 1);
      }
    }, [currentPage, handlePageChange]);

    const handleNextPage = useCallback(() => {
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
      }
    }, [currentPage, totalPages, handlePageChange]);

    const pageNumbers = useMemo(() => {
      const result = [];
      const maxPagesToShow = 5;

      if (totalPages <= maxPagesToShow) {
        // Если всего страниц меньше или равно maxPagesToShow, показываем все
        for (let i = 1; i <= totalPages; i++) {
          result.push(i);
        }
      } else if (currentPage <= 3) {
        // Если текущая страница ближе к началу
        for (let i = 1; i <= 4; i++) {
          result.push(i);
        }
        result.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Если текущая страница ближе к концу
        result.push(1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          result.push(i);
        }
      } else {
        // Текущая страница где-то в середине
        result.push(1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          result.push(i);
        }
        result.push(totalPages);
      }

      return result;
    }, [currentPage, totalPages]);

    if (!totalPages || totalPages <= 1) return null;

    return (
      <nav
        aria-label="Page navigation"
        className="flex gap-3.5 justify-center pb-19"
      >
        <button
          className="pagination__button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ArrowLeftIcon />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={`page-${pageNumber}`}
            className={`${"pagination__button"} ${
              pageNumber === currentPage ? "pagination__button_active" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === currentPage ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="pagination__button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ArrowRightIcon />
        </button>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
