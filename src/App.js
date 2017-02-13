import React, { Component } from 'react';
//import Helmet from 'react-helmet';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';
import SearchForm from './SearchForm';
import MockedResults from './mock_service/MockedResults';
import Snackbar from 'material-ui/Snackbar';
import './styles/styles.scss';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';



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
            page: "",
            show_snackbar: false,
            snackbar_message: "",
            searchFormId: "home",
            last_search_options: null,
            current_page: 1,
            pages_count: 0
        };
    }

    _handleToggleSnackbar(showSnackbar, message, e) {
        if (showSnackbar)
            _this.setState({ show_snackbar: true, snackbar_message: message });
        else
            _this.setState({ show_snackbar: false });
    }

    _checkAndUpdate(JSONResult, callback) {
        // Render the results only in the case that the query was not changed in a mean time while waiting for the fetch response
        if (!_this.state.is_query_empty) {
            if (JSONResult.total_items === 0)
                this._handleToggleSnackbar(true, "Žiadne výsledky!", this);
            else
                _this.setState({ total_items: JSONResult.total_items, items: JSONResult.items }, callback);
        }
    }

    _goToPage(index) {
        if (index > 0 && index <= _this.state.pages_count) {
            _this.setState({ current_page: index });
            _this._initiateSearch(_this.state.last_search_options, false);
        }
    }

    _initiateSearch(options, isNewSearch) {
        if (options.query.length === 0) {
            _this.setState({ total_items: 0, items: [], is_query_empty: true, searchFormId: "home-header" });
        } else {
            if (isNewSearch) {
                _this.setState({ current_page: 1, last_search_options: options });
            }
            // Change state of the App component so the query is no more empty
            _this.setState({ is_query_empty: false, searchFormId: "result-header" });
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
                    "&page=" + _this.state.current_page, requestOptions)
                    .then(response => {
                        if (response.ok) {
                            response.json().then(result => {
                                if (isNewSearch) {
                                    _this.setState({ pages_count: Math.ceil(result.data.total / 100) });
                                }
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


        if (!this.state.is_query_empty) {
            // display = <div className="loading"></div>;
            // if (this.state.items.length > 0) {

            display = <ResultsPage items={this.state.items} current_page={this.state.current_page} page_count={this.state.pages_count} onPageChange={this._goToPage} />;
            contentClass = "";
            blockClass = "";
            // }
        }


        return (
            <div>
                <div className={contentClass}>
                    <div></div>
                    <div id={this.state.searchFormId} className={blockClass}>
                        <SearchForm onChange={this._initiateSearch} />
                    </div>
                </div>
                <div>
                    {display}
                </div>
                <Snackbar
                    open={this.state.show_snackbar}
                    message={this.state.snackbar_message}
                    autoHideDuration={2000}
                    onRequestClose={this._handleToggleSnackbar.bind(this, false)}
                />
                <div className="footer">
                    <a href="https://goo.gl/forms/QVIoFnUT8HHCliau1" target="_blank">Aký je tvoj názor?</a> | <a href="https://goo.gl/forms/wIpxqiaSnBn0cryJ3" target="_blank">Našiel si bug?</a>
                </div>
            </div>
        );
    }
}

export default App;