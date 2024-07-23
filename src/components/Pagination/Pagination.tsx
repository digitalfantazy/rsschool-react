import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store/store';
import styles from './Pagination.module.css';
import { useGetAllRecipesQuery } from '../../api/recipeApi';
import { setCurrentPage, setTotalPages } from '../../store/slices/paginationSlice';

interface PaginationProps {
  page: number;
  searchQuery: string;
}

const Pagination: React.FC<PaginationProps> = ({ page, searchQuery }) => {
  const { data } = useGetAllRecipesQuery({ query: searchQuery, page });

  // const qu = `getAllRecipes({"page":${page},"query":"${query}"})`;
  // const total = useSelector((state: RootState) => state.recipeApi.queries[qu]?.data?.total);
  // console.log(total);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
  const totalPages = useSelector((state: RootState) => state.pagination.totalPages);

  const pagesQuantity = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (data) {
      dispatch(setTotalPages(Math.ceil(data.total / 10)));
    }
    const page = parseInt(searchParams.get('page') || '1', 10);
    dispatch(setCurrentPage(page));
  }, [data, dispatch, searchParams]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    setSearchParams({
      page: page.toString(),
      search: searchQuery,
    });
    navigate(`/?page=${page}&search=${searchQuery}`);
  };

  return (
    <>
      {totalPages > 1 ? (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
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
            disabled={currentPage === totalPages}
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
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
