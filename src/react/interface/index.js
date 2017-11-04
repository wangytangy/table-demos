import React, { Component } from 'react';
import TableManager from '../table_manager';
import Search from '../search_bar';
import { populateDB } from '../../actions/keywords';
import { getProducts } from '../../actions/products';

class Interface extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    // fetch keywords from DB and query Walmart API
    return populateDB()
    .then(() => getProducts())
    .then((products) => {
      this.setState({products});
    });
  }

  render() {
    const {
      products,
    } = this.state;

    return (
      <div className='interface'>
        <div className='component-container'>
          <Search />
          {/* pagination component */}
          <TableManager 
            products={products}
            />
        </div>
      </div>
    );
  }
}

export default Interface;
