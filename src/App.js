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
      content_type: "all",
      file_type: "all",
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

    fetch("http://lase.ynet.sk:5000/api/search?query=" + this.state.query +
      "&host=" + this.state.host +
      "&content_type=" + this.state.content_type +
      "&file_type=" + this.state.file_type +
      "&size_from=" + this.state.size_from +
      "&size_to=" + this.state.size_to +
      "&page=" + this.state.page)
      .then(response => {
        if (response.ok) {
          response.json().then(result => {
            console.log(result);
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
    var results = null;
    var totalItems = null;
    if(this.state.items){
      results = JSON.stringify(this.state.items);
      totalItems = JSON.stringify(this.state.total_items);
    } 

    return (
      <div>
        <form id="send_message_form">
          <div className="form-group">
            <label>Hľadaný výraz</label>
            <input name="query" type="text" placeholder="Hľadaný výraz" value={this.state.query} onChange={this._handleFormChange.bind(this)} required />
          </div>
          <div className="form-group">
            <label>Typ Obsahu</label>
            <select name="content_type" value={this.state.content_type} onChange={this._handleFormChange.bind(this)} >
              <option value="all">Všetko</option>
              <option value="video">Videá</option>
              <option value="music">Hudba</option>
              <option value="img">Obrázky</option>
              <option value="document">Dokumenty</option>
              <option value="application">Aplikácie</option>
              <option value="iso">ISO</option>
            </select>
          </div>
          <div className="form-group">
            <label>Typ súboru</label>
            <select name="file_type" value={this.state.file_type} onChange={this._handleFormChange.bind(this)} >
              <option value="all">Všetko</option>
              <option value="directory">Priečinky</option>
              <option value="file">Súbory</option>
            </select>
          </div>
          <div className="form-group">
            <label>Minimálna veľkosť</label>
            <input name="size_from" type="number" value={this.state.size_from} onChange={this._handleFormChange.bind(this)} />
          </div>
          <div className="form-group">
            <label>Maximálnaveľkosť</label>
            <input name="size_to" type="number" value={this.state.size_to} onChange={this._handleFormChange.bind(this)} />
          </div>
          <div className="form-actions">
            <input name="request_query" type="button" onClick={this._initiateSearch.bind(this)} value="Hľadaj" />
          </div>
        </form>
        <div id="results">  
          { results }
        </div>
      </div>
    );
  }
}

export default App;