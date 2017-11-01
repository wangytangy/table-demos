import React, { Component } from 'react';
import { getProducts } from '../../actions';
import ProductsTable from './products_table';

class TableManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableHeaders: ['Product', 'Brand Name', 'Category', 'Price', 'MSRP', 'Reviews'],
    }
  }

  componentDidMount() {
    // fetch keywords from DB and query Walmart API
  }

  render() {
    return (
      <div className='table-manager'>
        <h1>Table Manager</h1>
        <ProductsTable
          headers={this.state.tableHeaders}
          className='products-table'
        />
      </div>
    );
  }
}

TableManager.propTypes = {

}
export default TableManager;
