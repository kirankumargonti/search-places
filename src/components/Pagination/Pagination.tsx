import React, { useCallback } from 'react';
import './Pagination.css';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = React.memo(({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = useCallback((number: number) => {
    setCurrentPage(number);
  }, [setCurrentPage]);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <nav className="pagination">
      <ul>
        {currentPage > 1 && (
          <li>
            <button onClick={() => handleClick(currentPage - 1)}>Previous</button>
          </li>
        )}
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {number === '...' ? (
              <span className="ellipsis">...</span>
            ) : (
              <button
                onClick={() => handleClick(number as number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button onClick={() => handleClick(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
});

export default Pagination;