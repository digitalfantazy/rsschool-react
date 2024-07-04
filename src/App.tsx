import { Component } from 'react';

import SearchBar from './components/SearchBar';
import ResultsList from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';

import { ResultItem } from './types/ResultItem';
import './App.css';

interface AppState {
  results: ResultItem[];
  loading: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData(localStorage.getItem('searchTerm') || '');
  }

  fetchData = (term: string) => {
    this.setState({ loading: true });
    const url = term
      ? `https://swapi.dev/api/starships/?search=${term}`
      : `https://swapi.dev/api/starships/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ results: data.results, loading: false });
        console.log('Data:', data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ loading: false });
      });
  };

  handleSearch = (term: string) => {
    this.fetchData(term);
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <h1>StarShips From StarWars</h1>
          <SearchBar onSearch={this.handleSearch} />
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <ResultsList results={this.state.results} />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
