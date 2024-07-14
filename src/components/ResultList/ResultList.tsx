import { Link, useSearchParams } from 'react-router-dom';

import { IRecipe } from '../../types/RecipeTypes';
import PropTypes from 'prop-types';
import styles from './ResultList.module.css';

interface ResultsListProps {
  results: IRecipe[];
  setIsDetailsOpen: (isOpen: boolean) => void;
  isDetailsOpen: boolean;
}

const ResultsList: React.FC<ResultsListProps> = ({ results, setIsDetailsOpen, isDetailsOpen }) => {
  const [urlParams] = useSearchParams();
  const query = urlParams.get('search') || '';
  const page = urlParams.get('page') || '';

  return (
    <div className={`${styles.content} ${isDetailsOpen ? styles.open : ''}`}>
      <div className={styles.results}>
        <ul className={styles.results_list}>
          {results.length > 0 ? (
            results.map((item) => (
              <li className={styles.results_item} key={item.id}>
                <Link
                  to={`/details/${item.id}?page=${page}&search=${query}`}
                  className={styles.link}
                  onClick={() => setIsDetailsOpen(true)}
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

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  setIsDetailsOpen: PropTypes.func.isRequired,
  isDetailsOpen: PropTypes.bool.isRequired,
};

export default ResultsList;
