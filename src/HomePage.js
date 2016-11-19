import React, { Component } from 'react';
import ResultsPage from './ResultsPage';
import SearchForm from './SearchForm';

// Needed as the reference to this object inside event handlers
var _this;

class HomePage extends Component {
  constructor() {
    super();
    _this = this;
    this.state = {
      total_items: 0,
      items: null,
      page: ""
    };
  }

  render() {
    return (
      <div className="content">
      <div className="block">
        <SearchForm onChange={this.props.onChange} />
      </div>
      </div>
    );
  }
}

export default HomePage;