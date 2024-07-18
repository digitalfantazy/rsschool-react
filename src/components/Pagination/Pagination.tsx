import React from 'react';

import styles from './Pagination.module.css';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  ChangePage: (page: number) => void;
  setCurrentPage: (page: number) => void;
  setIsDetailsOpen: (isOpen: boolean) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  ChangePage,
  setCurrentPage,
  setIsDetailsOpen,
}) => {
  const pagesQuantity = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage(currentPage - 1);
          ChangePage(currentPage - 1);
          setIsDetailsOpen(false);
        }}
      >
        Prev
      </button>
      {pagesQuantity.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
            ChangePage(page);
            setIsDetailsOpen(false);
          }}
          className={page === currentPage ? styles.active : ''}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          ChangePage(currentPage + 1);
          setIsDetailsOpen(false);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
