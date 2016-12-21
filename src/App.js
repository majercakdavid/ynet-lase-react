import React, { Component } from 'react';
//import Helmet from 'react-helmet';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';
import SearchForm from './SearchForm';
import MockedResults from './mock_service/MockedResults';
import './styles/styles.scss';

// Needed as the reference to this object inside event handlers
var _this;

class App extends Component {
    constructor() {
        super();
        _this = this;
        this.isMock = false;
        this.requestTimeout = null;
        this.state = {
            is_query_empty: true,
            total_items: 0,
            items: [],
            page: ""
        };
    }

    _checkAndUpdate(JSONResult, callback) {
        // Render the results only in the case that the query was not changed in a mean time while waiting for the fetch response
        if (!_this.state.is_query_empty) {
            _this.setState({ total_items: JSONResult.total_items, items: JSONResult.items }, callback);
        }
    }

    _initiateSearch(options) {
        if (options.query.length === 0) {
            _this.setState({ total_items: 0, items: [], is_query_empty: true });
        } else {
            // Change state of the App component so the query is no more empty
            _this.setState({ is_query_empty: false });
            if (_this.isMock) {
                return setTimeout(() => {
                    _this._checkAndUpdate({ total_items: 3, items: MockedResults });
                }, 200);
            } else {
                // Create an empty Headers instance
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');

                var requestOptions = {
                    method: 'GET',
                    headers: headers
                };
                fetch("http://lase.ynet.sk:5000/api/search?query=" + options.query +
                    "&host=" + options.host +
                    "&content_type=" + options.content_type +
                    "&file_type=" + options.file_type +
                    "&size_from=" + options.size_from +
                    "&size_to=" + options.size_to +
                    "&page=" + options.page, requestOptions)
                    .then(response => {
                        if (response.ok) {
                            response.json().then(result => {
                                _this._checkAndUpdate({ total_items: result.data.total, items: result.data.items }, () => {
                                    _this.lookupStarted = false;
                                });
                            });
                        } else {
                            console.log('Network response was not ok.');
                        }
                    })
                    .catch(error => {
                        console.log('There has been a problem with your fetch operation: ' + error.message);
                    });
            }
        }
    }

    render() {
        var display = <HomePage />;
        var contentClass = "content";
        var blockClass = "block";
        if (this.state.items.length > 0) {
            display = <ResultsPage items={this.state.items} />
            contentClass = "";
            blockClass = "";
        }
        return (
            //<Helmet title="Lase - Ynet"/>
            <div>
                <div className={contentClass}>
                    <div className={blockClass}>
                        <SearchForm onChange={this._initiateSearch} />
                    </div>
                </div>;
                {display}
            </div>
        );
    }
}

export default App;