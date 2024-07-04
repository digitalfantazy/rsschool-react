import { Component } from 'react';

import SearchBar from './components/searchBar/SearchBar';
import ResultsList from './components/searchResults/SearchResults';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Loading from './components/loading/loading';

import { IStarship } from './types/StarshipType';
import { getStarships } from './api/getStarships';
import './App.css';

interface AppState {
  starship: IStarship[];
  loading: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      starship: [],
      loading: false,
    };
  }

  getData = async (query: string) => {
    this.setState({ loading: true });
    const data = await getStarships(query);
    this.setState({ starship: data.results, loading: false });
  };

  handleSearch = (query: string) => {
    this.getData(query);
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="container">
          <h1>StarShips From StarWars</h1>
          <SearchBar onSearch={this.handleSearch} />
          {this.state.loading ? <Loading /> : <ResultsList results={this.state.starship} />}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
