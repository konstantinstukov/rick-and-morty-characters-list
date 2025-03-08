import { PaginationProps } from '../types/types';
import leftArrow from '../assets/icons/arrow-left.svg';
import rightArrow from '../assets/icons/arrow-right.svg';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxButtons = 6;

    if (totalPages <= maxButtons) {
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

  return (
    <div className="flex gap-3.5 justify-center pb-19">
      <button
        className="pagination__button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={leftArrow} alt="previous page" />
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${'pagination__button'} ${pageNumber === currentPage ? 'pagination__button_active' : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="pagination__button"
        onClick={() =>
          onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
        }
        disabled={currentPage === totalPages}
      >
        <img src={rightArrow} alt="next page" />
      </button>
    </div>
  );
};
