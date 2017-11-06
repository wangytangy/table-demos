import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
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
    this.setState({keywordSearch: ''});
  }

  handleKeywordDelete = (id) => {
    console.log('delete keyword: ', id);
    if (this.props.onDeleteKeyword) this.props.onDeleteKeyword(id);
  }

  renderKeywords = () => {
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    };

    return this.props.keywords.map((k) => {
      return (
        <li key={k.id}>
          <Chip
            style={styles.chip}
            onRequestDelete={() => this.handleKeywordDelete(k.id)}
            >
            {k.name}
          </Chip>
        </li>
      );
    });
  }


  render() {
    const hasError = this.props.errorMessage ? true : false;

    return (
      <div className='keyword-component-container'>
        <div className='keyword-search-container'>
          <SearchBar
            className='keyword-search-bar'
            hintText='Add keywords'
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
        <div className='keyword-display'>
          <span className='keyword-label'>Keywords: </span>
          <ul className='keyword-list'>
            {this.renderKeywords()}
          </ul>
        </div>

        <div className={`keyword-error-message ${hasError ? '' : 'hide'}`}>
          {this.props.errorMessage || ''}
        </div>
      </div>
    );
  }
}

KeywordForm.propTypes = {
  addKeyword: PropTypes.func,
  keywords: PropTypes.array,
  onDeleteKeyword: PropTypes.func,
  errorMessage: PropTypes.string,
}


export default KeywordForm;
