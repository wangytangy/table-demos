import React, { Component } from 'react';
import TableManager from '../table_manager';
import Search from '../search_bar';
import KeywordForm from '../keyword_form';
import { populateDB } from '../../actions/keywords';
import { getProducts, searchProducts, updateProduct } from '../../actions/products';
import _ from 'lodash';

class Interface extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchTerm: '',
      sort: { order: 'asc', field: 'name'},
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

  onSave = (field, itemId, value) => {
    // update frontend
    const products = _.cloneDeep(this.state.products);
    const itemIdx = products.findIndex((item => item.itemId === itemId));

    if (itemIdx >= 0) {
      const productToUpdate = products[itemIdx] || {};
      _.set(productToUpdate, field, value);
      this.setState({products});

      // update backend (don't set state again)
      updateProduct(productToUpdate);
    } else {
      return;
    }
  }

  render() {
    const {
      products,
    } = this.state;

    return (
      <div className='interface'>
        <div className='component-container'>
          <KeywordForm />
          <Search
            searchProducts={this.onSearchProducts}
            />
          {/* pagination component */}
          <TableManager
            searchProducts={this.onSearchProducts}
            products={products}
            onSave={this.onSave}
            />
        </div>
      </div>
    );
  }
}

export default Interface;
