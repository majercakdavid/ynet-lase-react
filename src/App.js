import React, { Component } from 'react';
import Results from './Results';
import SearchForm from './SearchForm';

// NEEDED FOR REDUX-FORMS
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  form: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

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

  _handleFormSubmit(e) {
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
    return (
      <div>
        <SearchForm handleSubmit={this._handleFormSubmit}/>
        <Results items={this.state.items}/>
      </div>
    );
  }
}

export default App;

/*
<form>
          <div>
            <label>Hľadaný výraz</label>
            <input name="query" type="text" placeholder="Hľadaný výraz" value={this.state.query} onChange={this._handleFormChange.bind(this)} required />
          </div>
          <div>
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
          <div>
            <label>Typ súboru</label>
            <select name="file_type" value={this.state.file_type} onChange={this._handleFormChange.bind(this)} >
              <option value="all">Všetko</option>
              <option value="directory">Priečinky</option>
              <option value="file">Súbory</option>
            </select>
          </div>
          <div>
            <label>Minimálna veľkosť</label>
            <input name="size_from" type="number" value={this.state.size_from} onChange={this._handleFormChange.bind(this)} />
          </div>
          <div>
            <label>Maximálnaveľkosť</label>
            <input name="size_to" type="number" value={this.state.size_to} onChange={this._handleFormChange.bind(this)} />
          </div>
          <div>
            <input name="request_query" type="button" onClick={this._initiateSearch.bind(this)} value="Hľadaj" />
          </div>
        </form>
*/