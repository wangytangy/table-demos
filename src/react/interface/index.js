import React, { Component } from 'react';
import TableManager from '../table_manager';
import Search from '../search_bar';
import { populateDB } from '../../actions/keywords';
import { getProducts, searchProducts } from '../../actions/products';

class Interface extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchTerm: '',
      sort: { order: 'desc', field: 'name'},
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

  onSearchProducts = ({searchTerm = this.state.searchTerm, sort = this.state.sort} = {}) => {
    this.setState({searchTerm, sort}, () => {
      searchProducts({searchTerm: this.state.searchTerm, sort: this.state.sort}).then((products) => {
        this.setState({products});
      });
    })
  }

  render() {
    const {
      products,
    } = this.state;

    return (
      <div className='interface'>
        <div className='component-container'>
          <Search
            searchProducts={this.onSearchProducts}
            />
          {/* pagination component */}
          <TableManager
            searchProducts={this.onSearchProducts}
            products={products}
            />
        </div>
      </div>
    );
  }
}

export default Interface;
