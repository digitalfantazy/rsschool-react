import React from 'react';

import styles from './Pagination.module.css';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  ChangePage: (page: number) => void;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  ChangePage,
  setCurrentPage,
}) => {
  const pagesQuantity = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {pagesQuantity.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
            ChangePage(page);
          }}
          className={page === currentPage ? styles.active : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
