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
    const headers = this.props.headers.map((header, i) => <TableHeaderColumn key={i}>{header}</TableHeaderColumn>)
    return (
      <TableHeader
        adjustForCheckbox={this.state.tableProps.showCheckboxes}
        displaySelectAll={this.state.tableProps.showCheckboxes}
        >
        <TableRow>
          {headers}
        </TableRow>
      </TableHeader>
    );
  }

  render() {
    return (
      <Table
        selectable={this.state.tableProps.showCheckboxes}
        >
        {this.renderHeaders()}
      </Table>
    );
  }
}

ProductsTable.propTypes = {
  headers: PropTypes.array.isRequired,
  className: PropTypes.string,
}

export default ProductsTable;
