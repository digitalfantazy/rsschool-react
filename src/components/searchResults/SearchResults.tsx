import { Component } from 'react';
import { IStarship } from '../../types/StarshipType';
import './searchResults.css';

interface ResultsListProps {
  results: IStarship[];
}

class ResultsList extends Component<ResultsListProps> {
  render() {
    const { results } = this.props;
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
  }
}

export default ResultsList;
