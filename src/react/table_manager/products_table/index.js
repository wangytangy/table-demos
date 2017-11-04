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
    const headers = this.props.headers.map((header, i) => <TableHeaderColumn key={i}>{header}</TableHeaderColumn>);

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
          <TableRowColumn>
            <div>{p.name}</div>
            <img src={p.thumbnailImage} />
          </TableRowColumn>
          <TableRowColumn>{p.name}</TableRowColumn> // needs to be brand name AND editable
          <TableRowColumn>{p.categoryPath}</TableRowColumn>
          <TableRowColumn>${p.salePrice}</TableRowColumn>
          <TableRowColumn>${p.salePrice}</TableRowColumn> // needs to be MSRP
          <TableRowColumn>
            <img src={p.customerRatingImage} />
            <div>({p.customerRating})</div>
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
        >
        {this.renderHeaders()}
        <TableBody displayRowCheckbox={tableProps.showCheckboxes}>
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
