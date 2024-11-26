import React from 'react';
import { TextButton } from '@/components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
}

const PaginationSearch: React.FC<PaginationProps> = ({ currentPage, totalPages, isLoading, handlePageChange }) => {

  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const range = 1;
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (start > 1) pageNumbers.unshift('...');
    if (end < totalPages) pageNumbers.push('...');

    return pageNumbers;
  };

  const handleChangePage = (page: number) => {
    if (!isLoading && page !== currentPage) {
      handlePageChange(page);
    }
  };

  const deactivatePrevButton = currentPage === 1

  return (
    <div className="w-full rounded-none justify-center flex items-center gap-4 z-30 fixed bottom-0 md:bottom-5 bg-purpleBg p-3 md:rounded-md md:w-auto">
      <TextButton
        active={!deactivatePrevButton}
        onClick={() => handleChangePage(currentPage - 1)}
        className="mr-2 p-2 bg-gray-500 text-white"
      >
        Anterior
      </TextButton>

      {/* Render page numbers */}
      {getPaginationNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handleChangePage(Number(page))}
          disabled={isLoading}
          className={`p-2 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {page}
        </button>
      ))}

      <TextButton
        active={currentPage < totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
        className="ml-2 p-2 bg-gray-500 text-white rounded"
      >
        Próxima
      </TextButton>
    </div>
  );
};

export default PaginationSearch;
