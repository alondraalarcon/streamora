import Link from 'next/link';
import React from 'react';

interface PaginationProps {
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
  totalPages: number;
}
const Pagination = ({ page, handlePrev, handleNext, totalPages }: PaginationProps) => {

  return (
    <div style={{ marginTop: '1rem' }}>
    <button
        onClick={handlePrev}
        disabled={page === 1}
        className="bg-zinc-800 hover:animate-pulse p-2 rounded-lg cursor-pointer"
    >
        Previous
    </button>
    <span style={{ margin: '0 1rem' }}>
        Page {page} of {totalPages}
    </span>
    <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="bg-zinc-800 p-2 hover:animate-pulse rounded-lg cursor-pointer"
    >
        Next
    </button>
    </div>
  );
};

export default Pagination;
