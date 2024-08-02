import React from 'react';
import { IPaginationProps } from '@/interface/event.interface';

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  maxPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  const startPage = Math.max(
    1,
    Math.min(totalPages - maxPages + 1, currentPage - Math.floor(maxPages / 2)),
  );
  const endPage = Math.min(totalPages, startPage + maxPages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        className="text-red-500 font-bold py-2 px-4 rounded-full border-red-500 mr-2 border-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; {/* Left arrow symbol */}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${
            number === currentPage
              ? 'text-red-500 font-bold py-2 px-4'
              : 'text-black font-bold py-2 px-4'
          } mr-2`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="text-red-500 font-bold py-2 px-4 rounded-full border-red-500 mr-2 border-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt; {/* Right arrow symbol */}
      </button>
    </div>
  );
};

export default Pagination;
