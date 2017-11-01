import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';

class Search extends Component {
  render() {

    return (
      <div className='search-container'>
        <SearchBar
          className='search-bar'
          onChange={() => console.log('on change')}
          onRequestSearch={() => console.log('on request search')}
        />
      </div>
    );
  }
}

export default Search;
