import React, { Component } from 'react';
import ProductsTable from './products_table';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TableManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableHeaders: ['Product', 'Brand Name', 'Category', 'Price', 'MSRP', 'Reviews'],
      totalCount: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const totalCount = parseInt(_.get(nextProps, 'products[0].total_count', 0), 10);

    this.setState({totalCount});
  }


  render() {
    const {
      products,
      searchProducts,
      onSave,
    } = this.props;

    const {
      tableHeaders,
      totalCount,
    } = this.state;

    return (
      <div className='table-manager'>
        <div className='count-display'>
          {`${products.length} of ${totalCount} products`}
        </div>
        <ProductsTable
          headers={tableHeaders}
          className='products-table'
          products={products || []}
          searchProducts={searchProducts}
          onSave={onSave}
        />
      </div>
    );
  }
}

TableManager.propTypes = {
  products: PropTypes.array.isRequired,
  searchProducts: PropTypes.func,
  onSave: PropTypes.func,
}
export default TableManager;
