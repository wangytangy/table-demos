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
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class ProductsTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableProps: {
        showCheckboxes: false,
        selectable: false,
      },
      sort: { order: 'asc', field: 'name'},
      currentEditingItemId: null,
      brandNameEditingValue: '',
    };
  }

  toggleSort = () => {
    const sortOrder = this.state.sort.order === 'desc' ? 'asc' : 'desc';
    this.setState({sort: { order: sortOrder, field: 'name'}}, () => {
      if (this.props.searchProducts) this.props.searchProducts({sort: this.state.sort});
    });
  }

  brandNameOnChange = (event, val) => {
    this.setState({brandNameEditingValue: val });
  }

  setCurrentEditingItemId = (itemId, brandName) => {
    this.setState({currentEditingItemId: itemId, brandNameEditingValue: brandName});
  }

  resetCurrentEditingItem = () => {
    this.setState({currentEditingItemId: null });
  }

  onSave = () => {
    const {
      currentEditingItemId,
      brandNameEditingValue,
      products
    } = this.state;

    if (this.props.onSave) this.props.onSave('brandName', currentEditingItemId, brandNameEditingValue);

    this.resetCurrentEditingItem();
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
                    className="material-icons sort-desc" onClick={this.toggleSort}>keyboard_arrow_down
                  </i> :
                  <i
                    className="material-icons sort-asc"  onClick={this.toggleSort}>keyboard_arrow_up
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
      return (
        <TableRow className='no-products-message' style={{'color': '#aaa'}}>
          <TableRowColumn style={{'textAlign': 'center'}}>
            <div>No products to show</div>
          </TableRowColumn>
        </TableRow>
      );
    }

    const {
      brandNameEditingValue,
      currentEditingItemId,
    } = this.state;

    return this.props.products.map((p) => {
      const isBeingEdited = currentEditingItemId === p.itemId;

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
          <TableRowColumn className='row-col brand-name'>
            <div
              className='brand-name-container'
              >
              <div onClick={() => this.setCurrentEditingItemId(p.itemId, p.brandName)}>
                <TextField
                  id={`${p.id}`}
                  value={isBeingEdited ? brandNameEditingValue : p.brandName}
                  onChange={this.brandNameOnChange}
                  disabled={!isBeingEdited}
                  underlineShow={isBeingEdited}
                  />
              </div>
              {
                isBeingEdited &&
                <FlatButton
                  className='brand-name-edit-button'
                  label='save'
                  backgroundColor='#2474C3'
                  hoverColor='#3ab0f4'
                  rippleColor='#7fd0ff'
                  labelStyle={{'fontSize': '12px'}}
                  style={{'color': '#fff', 'minWidth': '0px', 'width': '60px', 'lineHeight': '0px'}}
                  onClick={this.onSave}
                  />
              }
            </div>
          </TableRowColumn>
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
  searchProducts: PropTypes.func,
  onSave: PropTypes.func,
}

export default ProductsTable;
