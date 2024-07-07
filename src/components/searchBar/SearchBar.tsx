import { Component, ChangeEvent, KeyboardEvent } from 'react';
import './searchbar.css';
interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface SearchBarState {
  query: string;
  error: boolean;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { query: '', error: false };
  }

  componentDidMount(): void {
    const queryString = localStorage.getItem('searchTerm');
    if (queryString) {
      this.setState({ query: queryString });
    }
    this.props.onSearch(queryString ? queryString : '');
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const trimmedQuery = this.state.query.trim();
    localStorage.setItem('searchTerm', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error('Test Error occurred');
    }
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={this.state.query}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.handleSearch} type="submit">
          Search
        </button>
        <button onClick={this.handleError}>Throw Error</button>
      </div>
    );
  }
}

export default SearchBar;
