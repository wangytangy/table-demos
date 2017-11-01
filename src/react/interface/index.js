import React, { Component } from 'react';
import TableManager from '../table_manager';
import Search from '../search_bar';

class Interface extends Component {
  render() {

    return (
      <div className='interface'>
        <Search />
        {/* pagination component */}
        <TableManager />
      </div>
    );
  }
}

export default Interface;
