import React, { Component } from 'react';
import ResultsPage from './ResultsPage';
import SearchForm from './SearchForm';

// NEEDED FORM MATERIAL-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
      <div>
        <SearchForm onChange={this.props.onChange}/>
      </div>
    );
  }
}

export default HomePage;