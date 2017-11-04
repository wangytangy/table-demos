import React, { Component } from 'react';
import ProductsTable from './products_table';
import PropTypes from 'prop-types';

class TableManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableHeaders: ['Product', 'Brand Name', 'Category', 'Price', 'MSRP', 'Reviews'],
    }
  }

  render() {
    const {
      products
    } = this.props;

    return (
      <div className='table-manager'>
        <ProductsTable
          headers={this.state.tableHeaders}
          className='products-table'
          products={products}
        />
      </div>
    );
  }
}

TableManager.propTypes = {
  products: PropTypes.array.isRequired,
}
export default TableManager;
