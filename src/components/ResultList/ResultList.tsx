import { Link } from 'react-router-dom';

import Loading from '../Loading/loading';
import Favorite from '../Favourite/Favourite';

import { useGetAllRecipesQuery } from '../../api/recipeApi';

import styles from './ResultList.module.css';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';

const ResultsList: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('search') || '';
  const page = parseInt(urlParams.get('page') || '1', 10);

  const { openDetails } = useActions();
  const { isOpen } = useAppSelector((state) => state.openDetails);

  const { data, isError, isFetching, isLoading } = useGetAllRecipesQuery({ query, page });
  const recipes = data?.recipes;

  return (
    <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
      <div className={styles.results}>
        <ul className={styles.results_list}>
          {isError && <p>Failed to load data</p>}
          {isFetching || isLoading ? (
            <Loading />
          ) : recipes && recipes.length > 0 ? (
            recipes.map((item) => (
              <li className={styles.results_item} key={item.id}>
                <Favorite
                  id={item.id}
                  name={item.name}
                  ingredients={item.ingredients}
                  instructions={item.instructions}
                />
                <Link
                  to={`/details/${item.id}?page=${page}&search=${query}`}
                  className={styles.link}
                  onClick={() => openDetails()}
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
