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
      }
    };
  }

  renderHeaders = () => {
    const headers = this.props.headers
      .map((header, i) => {
        return (
          <TableHeaderColumn
            key={i}
            className={header.split(' ').join('-')}
            style={{'color': '#000', 'fontSize': '16px'}}
            >
            {header}
          </TableHeaderColumn>
        );
      });

    return (
      <TableHeader
        adjustForCheckbox={this.state.tableProps.showCheckboxes}
        displaySelectAll={this.state.tableProps.showCheckboxes}
        className='table-header'
        >
        <TableRow>
          {headers}
        </TableRow>
      </TableHeader>
    );
  }

  renderRows = () => {

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
          <TableRowColumn className='row-col brand-name'>{p.name}</TableRowColumn>
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
