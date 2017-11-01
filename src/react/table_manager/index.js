import React, { Component } from 'react';
import ProductsTable from './products_table';

class TableManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableHeaders: ['Product', 'Brand Name', 'Category', 'Price', 'MSRP', 'Reviews'],
    }
  }

  render() {
    return (
      <div className='table-manager'>
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
