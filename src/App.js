import React, { Component } from 'react';
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
      query: "",
      host: "",
      content_type: "",
      file_type: "",
      size_from: "",
      size_to: "",
      page: "",
    };
  }

  _handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _initiateSearch() {
    // Create an empty Headers instance
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.requestOptions = {
      method: 'GET',
      headers: headers
    };

    fetch(`http://lase.ynet.sk:5000/api/search?query=ocelova+past&host=&content_type=all&file_type=all&size_from=&size_to=&page=3`)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            console.log(result);
            _this.setState({ total_item: result.total, items: result.items });
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
    return(
    <div>
      <form id="send_message_form">
        <div className="form-group">
          <label>Hľadaný výraz</label>
          <input name="search_query" type="text" placeholder="Hľadaný výraz" value={this.state.query} onChange={this._handleFormChange.bind(this)} required />
        </div>
        <div className="form-group">
          <label>Maximálna veľkosť</label>
          <input name="search_query" type="text" placeholder="Hľadaný výraz" value={this.state.max_size} onChange={this._handleFormChange.bind(this)} required />
        </div>
        <div className="form-actions">
          <input name="send_error_data_button" type="button" className="btn btn-form btn-negative" onClick={this._initiateSearch.bind(this)} value="Search" />
        </div>
      </form>
    </div>
    );
  }
}

export default App;