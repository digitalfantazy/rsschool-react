import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { useGetAllRecipesQuery } from '../../api/recipeApi';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';

import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  searchQuery: string;
}

const Pagination: React.FC<PaginationProps> = ({ page, searchQuery }) => {
  const { data } = useGetAllRecipesQuery({ query: searchQuery, page });

  const { setCurrentPage, setTotalPages } = useActions();
  const { totalPages, currentPage } = useAppSelector((state) => state.pagination);

  const { push } = useRouter();
  const searchParams = useSearchParams();

  const pagesQuantity = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.total / 10));
    }
    setCurrentPage(page);
  }, [data, searchParams, page, setCurrentPage, setTotalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // setSearchParams({
    //   page: page.toString(),
    //   search: searchQuery,
    // });
    push(`/?page=${page}&search=${searchQuery}`);
  };

  return (
    <>
      {totalPages > 1 ? (
        <div className={styles.pagination}>
          <button
            className={currentPage === 1 ? styles.disabled : ''}
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pagesQuantity.map((page) => (
            <button
              key={page}
              onClick={() => {
                handlePageChange(page);
              }}
              className={page === currentPage ? styles.active : ''}
            >
              {page}
            </button>
          ))}
          <button
            className={currentPage === totalPages ? styles.disabled : ''}
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Pagination;