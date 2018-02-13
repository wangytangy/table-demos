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
    this.state = {};
  }

  render() {

    return (
      <div className='interface'>
        hi
      </div>
    );
  }
}

export default Interface;
