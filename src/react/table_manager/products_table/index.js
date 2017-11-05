import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class ProductsTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableProps: {
        showCheckboxes: false,
        selectable: false,
      },
      sort: { order: 'desc', field: 'name'}
    };
  }

  toggleSort = () => {
    const sortOrder = this.state.sort.order === 'desc' ? 'asc' : 'desc';
    this.setState({sort: { order: sortOrder}});
  }

  renderHeaders = () => {
    return (
      <TableHeader
        adjustForCheckbox={this.state.tableProps.showCheckboxes}
        displaySelectAll={this.state.tableProps.showCheckboxes}
        className='table-header'
        >
        <TableRow>
            <TableHeaderColumn
              className='product-name'
              style={{'color': '#000', 'fontSize': '16px'}}>
              Product
              {
                this.state.sort.order === 'desc' ?
                  <i
                    class="material-icons sort-desc" onClick={this.toggleSort}>keyboard_arrow_down
                  </i> :
                  <i
                    class="material-icons sort-asc"  onClick={this.toggleSort}>keyboard_arrow_up
                  </i>
                }
            </TableHeaderColumn>
          <TableHeaderColumn
            className='brand-name'
            style={{'color': '#000', 'fontSize': '16px'}}>
            Brand Name
          </TableHeaderColumn>
          <TableHeaderColumn
            className='category'
            style={{'color': '#000', 'fontSize': '16px'}}>
            Category
          </TableHeaderColumn>
          <TableHeaderColumn
            className='price'
            style={{'color': '#000', 'fontSize': '16px'}}>
            Price
          </TableHeaderColumn>
          <TableHeaderColumn
            className='msrp'
            style={{'color': '#000', 'fontSize': '16px'}}>
            MSRP
          </TableHeaderColumn>
          <TableHeaderColumn
            className='ratings'
            style={{'color': '#000', 'fontSize': '16px'}}>
            Reviews
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  renderRows = () => {

    if (this.props.products.length === 0) {
      return <div className='no-products-message'>No products to show</div>
    }

    return this.props.products.map((p) => {
      return (
        <TableRow key={p.id}>
          <TableRowColumn
            className='row-col product-name'
            style={{'padding': '10px 40px 10px 10px'}}>
            <div className='product-name-container'>
              <div className='name-image-container'>
                <img src={p.thumbnailImage} />
                <span>{p.name}</span>
              </div>
              <a href={p.productUrl} className='open-in-new'><i className="material-icons">open_in_new</i></a>
            </div>
          </TableRowColumn>
          // needs to be brand name AND editable textfield
          <TableRowColumn className='row-col brand-name'>{p.brandName}</TableRowColumn>
          <TableRowColumn className='row-col category'>{p.categoryPath}</TableRowColumn>
          <TableRowColumn className='row-col price'>${p.salePrice}</TableRowColumn>
          <TableRowColumn className='row-col msrp'>{p.msrp ? `$${p.msrp}` :  '(none)'}</TableRowColumn>
          <TableRowColumn className='row-col ratings'>
            <div className='ratings-container'>
              <img src={p.customerRatingImage} />
              <span>({p.numReviews})</span>
            </div>
          </TableRowColumn>

        </TableRow>
      );
    });

  }

  render() {

    const {
      tableProps
    } = this.state;

    return (
      <Table
        selectable={tableProps.showCheckboxes}
        className='products-table'
        >
        {this.renderHeaders()}
        <TableBody className='table-body' displayRowCheckbox={tableProps.showCheckboxes}>
          {this.renderRows()}
        </TableBody>
      </Table>
    );
  }
}

ProductsTable.propTypes = {
  headers: PropTypes.array.isRequired,
  className: PropTypes.string,
  products: PropTypes.array.isRequired,
}

export default ProductsTable;
