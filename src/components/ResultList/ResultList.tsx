import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetAllRecipesQuery } from '../../api/recipeApi';
import Loading from '../loading/loading';

import styles from './ResultList.module.css';
import { RootState } from '../../store/store';
import { openDetails } from '../../store/slices/openDetailsSlice';

const ResultsList: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('search') || '';
  const page = parseInt(urlParams.get('page') || '1', 10);

  const dispatch = useDispatch();
  const isDetailsOpen = useSelector((state: RootState) => state.openDetails.isOpen);

  const { data, isError, isFetching, isLoading } = useGetAllRecipesQuery({ query, page });
  const recipes = data?.recipes;

  return (
    <div className={`${styles.content} ${isDetailsOpen ? styles.open : ''}`}>
      <div className={styles.results}>
        <ul className={styles.results_list}>
          {isError && <p>Failed to load data</p>}
          {isFetching || isLoading ? (
            <Loading />
          ) : recipes && recipes.length > 0 ? (
            recipes.map((item) => (
              <li className={styles.results_item} key={item.id}>
                <Link
                  to={`/details/${item.id}?page=${page}&search=${query}`}
                  className={styles.link}
                  onClick={() => dispatch(openDetails())}
                >
                  <img src={item.image} alt="dish-image" width={150} height={150} />
                  <h3>{item.name}</h3>
                  <p>Calories: {item.caloriesPerServing}</p>
                  <p>Difficulty: {item.difficulty}</p>
                  <p>Rating: {item.rating}</p>
                </Link>
              </li>
            ))
          ) : (
            <p>No results</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResultsList;
