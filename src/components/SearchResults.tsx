import { Component } from 'react';
import { ResultItem } from '../types/ResultItem';

interface ResultsListProps {
  results: ResultItem[];
}

class ResultsList extends Component<ResultsListProps> {
  render() {
    const { results } = this.props;
    // console.log(results);
    return (
      <div className="results">
        {results.map((item, index) => (
          <div className="results-item" key={index}>
            <h3>{item.name}</h3>
            <p>Model: {item.model}</p>
            <p>Manufacturer: {item.manufacturer}</p>
            <p>Crew: {item.crew}</p>
            {/* Добавьте другие поля, которые хотите отображать */}
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsList;
