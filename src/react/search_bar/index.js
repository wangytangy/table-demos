import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';
import _ from 'lodash';

class Search extends Component {

  constructor(props) {
    super(props);

    this.timerId = null;

    this.state = {
      searchTerms: '',
    }
  }

  onChange = (val) => {
    this.setState({searchTerms: val});
    // for some reason lodash 'debounce' still calls multiple searches on each keystroke
    // solution: we reset timeout of search function until user stops typing
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.onSearch, 300);
  }

  onSearch = () => {
    const searchTerm = _.get(this.state, 'searchTerms', '');
    if (this.props.searchProducts) this.props.searchProducts({searchTerm});
  }

  render() {

    return (
      <div className='search-container'>
        <SearchBar
          className='search-bar'
          hintText='Search products'
          onChange={(val) => this.onChange(val)}
          onRequestSearch={this.onSearch}
          value={this.state.searchTerms}
        />
      </div>
    );
  }
}

Search.propTypes = {
  searchProducts: PropTypes.func,
}

export default Search;
