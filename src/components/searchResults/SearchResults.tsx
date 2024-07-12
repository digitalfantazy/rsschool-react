import { IRecipe } from '../../types/RecipeTypes';
import PropTypes from 'prop-types';
import './searchResults.css';

interface ResultsListProps {
  results: IRecipe[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <>
      <div className="results">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div className="results-item" key={index}>
              <img src={`${item.image}`} alt="dish-image" width={150} height={150} />
              <h3>{item.name}</h3>
              <p>Calories: {item.caloriesPerServing}</p>
              <p>Cook time: {item.prepTimeMinutes + item.cookTimeMinutes} min</p>
              <p>Difficulty: {item.difficulty}</p>
              <p>Rating: {item.rating}</p>
            </div>
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    </>
  );
};

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
};

export default ResultsList;
