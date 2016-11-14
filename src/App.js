import React, { Component } from 'react';
import ResultsPage from './ResultsPage';
import SearchForm from './SearchForm';
import './styles/styles.scss';

// NEEDED FORM MATERIAL-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Needed as the reference to this object inside event handlers
var _this;

class App extends Component {
  constructor() {
    super();
    _this = this;
    this.state = {
      total_items: 0,
      items: null,
      page: ""
    };
  }

  _handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _initiateSearch(options) {
    // Create an empty Headers instance
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.requestOptions = {
      method: 'GET',
      headers: headers
    };

    fetch("http://lase.ynet.sk:5000/api/search?query=" + this.state.query +
      "&host=" + options.host +
      "&content_type=" + options.content_type +
      "&file_type=" + options.file_type +
      "&size_from=" + options.size_from +
      "&size_to=" + options.size_to +
      "&page=" + options.page)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            _this.setState({ total_items: result.data.total, items: result.data.items });
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
  }

  render() {
    var display = <HomePage onChange={this._initiateSearch} />;
    if (this.state.items > 0) {
      display = <ResultsPage onChange={this._initiateSearch} items={this.state.items} />
    }
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default App;