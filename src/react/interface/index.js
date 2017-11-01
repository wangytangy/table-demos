import React, { Component } from 'react';
import TableManager from '../table_manager';
import Search from '../search_bar';
import { populateDB } from '../../actions/keywords';

class Interface extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch keywords from DB and query Walmart API
    populateDB();
  }

  render() {

    return (
      <div className='interface'>
        <div className='component-container'>
          <Search />
          {/* pagination component */}
          <TableManager />
        </div>
      </div>
    );
  }
}

export default Interface;
