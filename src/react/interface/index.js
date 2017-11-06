import React, { Component } from 'react';
import TableManager from '../table_manager';
import Search from '../search_bar';
import KeywordForm from '../keyword_form';
import {
  populateDB,
  addKeyword,
  fetchKeywords,
  deleteKeyword
} from '../../actions/keywords';
import { getProducts, searchProducts, updateProduct } from '../../actions/products';
import _ from 'lodash';

class Interface extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      keywords: [],
      searchTerm: '',
      sort: { order: 'asc', field: 'name'},
      errorMessage: ''
    }
  }

  onAddKeyword = (keyword) => {

    // prevent more than 5 keywords from being added to DB
    // because Walmart API limit certain num queries per second
    if (this.state.keywords.length >= 5) {
      this.setState({
        errorMessage: 'No more than 5 keywords may be added. Try deleting existing keywords.'
      });
      return;
    }

    return addKeyword(keyword).then(() => populateDB())
    .then(() => fetchKeywords())
    .then((keywords) => this.setState({keywords}))
    .then(() => getProducts())
    .then((products) => this.setState({products}));
  }

  onDeleteKeyword = (id) => {
    // update backend
    deleteKeyword(id);

    // update frontend
    const updatedKeywords = this.state.keywords.filter((k) => k.id !== id);
    const errorMessage = updatedKeywords.length < 5 ? '' : 'No more than 5 keywords may be added. Try deleting existing keywords.'
    this.setState({keywords: updatedKeywords, errorMessage });
  }

  componentDidMount() {
    return populateDB()
      .then(() => fetchKeywords())
      .then((keywords) => this.setState({keywords}))
      .then(() => getProducts())
      .then((products) => this.setState({products}))
      .catch((err) => console.error('[interface comp] error fetching products', err));
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
          <KeywordForm
            addKeyword={this.onAddKeyword}
            keywords={this.state.keywords}
            onDeleteKeyword={this.onDeleteKeyword}
            errorMessage={this.state.errorMessage}
            />
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
