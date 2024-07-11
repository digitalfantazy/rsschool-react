import { IStarship } from '../../types/StarshipType';
import PropTypes from 'prop-types';
import './searchResults.css';

interface ResultsListProps {
  results: IStarship[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <div className="results">
      {results.length > 0 ? (
        results.map((item, index) => (
          <div className="results-item" key={index}>
            <h3>{item.name}</h3>
            <p>Model: {item.model}</p>
            <p>Manufacturer: {item.manufacturer}</p>
            <p>Crew: {item.crew}</p>
          </div>
        ))
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
};

export default ResultsList;
