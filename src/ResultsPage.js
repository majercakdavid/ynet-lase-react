import React, { Component, PropTypes } from 'react';
import ResultsList from './ResultsList';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { darkBlack } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';

// Needed as the reference to this object inside event handlers
var _this;

const styles = {
    button: {
        cursor: 'pointer',
        minWidth: '36px'
    },
    primary: {
        cursor: 'pointer',
        minWidth: '36px',
        backgroundColor: '#FF8247',
        color: '#fff'
    }
};


class Results extends Component {
    constructor() {
        super();
        _this = this;
        this.state = {
            show_snackbar: false,
            show_details: false,
            current_details: null
        }
    }

    static propTypes = {
        items: PropTypes.array,
    };

    handleOpenDetails(result) {
        _this.setState({ show_details: true, current_details: result });
    }

    handleCloseDetails() {
        _this.setState({ show_details: false, current_details: null });
    }

    handleOpenSnackbar() {
        _this.setState({ show_snackbar: true, show_details: false, current_details: null });
    }

    handleCloseSnackbar() {
        _this.setState({ show_snackbar: false });
    }

    render() {
        var navigation = null;
        if (this.props.current_page && this.props.page_count && this.props.onPageChange) {
            navigation = [];
            let min = this.props.current_page - 2;
            let max = this.props.current_page + 2;
            if (min < 1) {
                max += 1 - min;
                min = 1;
            }
            if (max > this.props.page_count)
                min -= max - this.props.page_count;
            if (min < 1)
                min = 1;
            for (let i = min; i <= max; i++) {
                if (i === this.props.current_page)
                    navigation.push(<FlatButton label={i} onClick={this.props.onPageChange.bind(null, i)} primary={true} key={i + "page"} style={styles.primary} />);
                else
                    navigation.push(<FlatButton label={i} onClick={this.props.onPageChange.bind(null, i)} key={i + "page"} style={styles.button}/>);
            }
        }
        var dialog = null;
        if (this.state.current_details != null) {
            var isOnline = this.state.current_details.online ? "Áno" : "Nie";
            var fileType = null;
            var size = null;
            var extension = null;
            switch (this.state.current_details.file_type) {
                case "file": {
                    fileType = 'Súbor';
                    extension = <div><span style={{ color: darkBlack }}>Koncovka: </span>{this.state.current_details.extension}</div>;
                    size = <div><span style={{ color: darkBlack }}>Veľkosť: </span>{this.state.current_details.size}</div>;
                    break;
                }
                case "dir": fileType = 'Priečinok'; break;
                default: fileType = 'Neznáme'; break;
            }
            dialog = <Dialog
                title="Informácie o súbore/zložke"
                actions={
                    [
                        <FlatButton
                            label="Zatvor"
                            primary={true}
                            keyboardFocused={true}
                            onClick={this.handleCloseDetails}
                            onTouchTap={this.handleCloseDetails}
                        />,
                    ]
                }
                modal={false}
                open={this.state.show_details}
                onRequestClose={this.handleCloseDetails}>
                <div>
                    <span style={{ color: darkBlack }}>Cesta: </span>{this.state.current_details.path}<br />
                    <span style={{ color: darkBlack }}>Host: </span>{this.state.current_details.host}<br />
                    <span style={{ color: darkBlack }}>Online: </span>{isOnline}<br />
                    <span style={{ color: darkBlack }}>Typ súboru: </span>{fileType}<br />
                    {size}<br />
                    {extension}
                </div>
            </Dialog>;
        }
        return (
            <div id="results">
                <div className="container">
                    <List>
                        <Subheader inset={true}>Folders</Subheader>
                        <ResultsList items={this.props.items} handleOpenDetails={this.handleOpenDetails} handleOpenSnackbar={this.handleOpenSnackbar} />
                    </List>
                    {dialog}
                    <Snackbar
                        open={this.state.show_snackbar}
                        message="Link skopírovany"
                        autoHideDuration={2000}
                        onRequestClose={this.handleCloseSnackbar}
                    />
                    <div className="pagination">
                        {navigation}
                    </div>
                </div>

            </div>);
    }
}

export default Results;