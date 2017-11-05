import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

class KeywordForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      keywordSearch: ''
    };
  }

  onChange = (val) => {
    this.setState({keywordSearch: val});
  }

  onKeywordSearch = () => {
    if (this.props.addKeyword) this.props.addKeyword(this.state.keywordSearch);
  }


  render() {
    return (
      <div className='keyword-search-container'>
        <SearchBar
          className='keyword-search-bar'
          hintText='Search keywords'
          onChange={(val) => this.onChange(val)}
          onRequestSearch={this.onKeywordSearch}
          value={this.state.keywordSearch}
        />
        <FlatButton
          className='keyword-search-button'
          label='Add keywords'
          backgroundColor='#2474C3'
          hoverColor='#3ab0f4'
          rippleColor='#7fd0ff'
          labelStyle={{'fontSize': '14px'}}
          style={{'color': '#fff', 'minWidth': '0px', 'width': '140px', 'lineHeight': '0px', 'marginLeft': '20px'}}
          onClick={this.onKeywordSearch}
          />
      </div>
    );
  }
}

KeywordForm.propTypes = {
  addKeyword: PropTypes.func,
}


export default KeywordForm;
