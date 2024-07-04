import { Component, ChangeEvent } from 'react';
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
    // const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = { query: '', error: false };
  }

  componentDidMount(): void {
    const queryString = localStorage.getItem('searchTerm');
    if (queryString) {
      this.setState({ query: queryString });
    } else {
      this.props.onSearch(queryString ? queryString : '');
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const trimmedQuery = this.state.query.trim();
    localStorage.setItem('searchTerm', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  render() {
    return (
      <div className="search-bar">
        <input type="text" value={this.state.query} onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
