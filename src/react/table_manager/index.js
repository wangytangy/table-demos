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
          products={products || []}
          searchProducts={this.props.searchProducts}
        />
      </div>
    );
  }
}

TableManager.propTypes = {
  products: PropTypes.array.isRequired,
  searchProducts: PropTypes.func,
}
export default TableManager;
