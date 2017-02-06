import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { darkBlack } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import CopyToClipboard from 'react-copy-to-clipboard';

// Needed as the reference to this object inside event handlers
var _this;

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
        var items = null;
        if (this.props.items) {
            items = this.props.items.map((result, i) => {
                var linuxLink = encodeURIComponent(result.path.substring(0, result.path.lastIndexOf('/')));

                var windowsLink;
                if (result.path.substring(0, 3) === "smb")
                    windowsLink = result.path.substring(4, result.path.length).replace(new RegExp('/', 'g'), '\\');
                else
                    windowsLink = linuxLink;

                var isOnline = result.online ? "Áno" : "Nie";
                var extension = null;
                var size = null;
                var fileType;
                switch (result.file_type) {
                    case "file": {
                        fileType = 'Súbor';
                        extension = <div><span style={{ color: darkBlack }}>Koncovka: </span>{result.extension}</div>;
                        size = <div><span style={{ color: darkBlack }}>Veľkosť: </span>{result.size}</div>;
                        break;
                    }
                    case "dir": fileType = 'Priečinok'; break;
                    default: fileType = 'Neznáme'; break;
                }
                return (<div key={i + "result"}>
                    <Divider inset={true} />
                    <ListItem
                        leftAvatar={<Avatar icon={<FileFolder />} onClick={this.handleOpenDetails.bind(this, result)} />}
                        rightIcon={
                            <div style={{ width: '100px', margin: '8px' }}>
                                <CopyToClipboard text={windowsLink}
                                    onCopy={this.handleOpenSnackbar}>
                                    <FlatButton label="Windows" />
                                </CopyToClipboard>
                                <CopyToClipboard text={linuxLink}
                                    onCopy={this.handleOpenSnackbar}>
                                    <FlatButton label="Linux" />
                                </CopyToClipboard>
                            </div>
                        }
                        primaryText={
                            <div>
                                {result.filename}
                            </div>
                        }
                        secondaryText={
                            <div>
                                <span style={{ color: darkBlack }}>Cesta: </span>{result.path}<br />
                                <span style={{ color: darkBlack }}>Host: </span>{result.host}{"\x09"}
                                <span style={{ color: darkBlack }}>Online: </span>{isOnline}{"\x09"}
                                <span style={{ color: darkBlack }}>Typ súboru: </span>{result.file_type}{"\x09"}
                                {size}{"\x09"}
                                {extension}
                            </div>
                        }
                        secondaryTextLines={2}
                        innerDivStyle={{ padding: '16px 102px 16px 72px' }}>
                    </ListItem>
                </div>
                )
            });
        }
        var navigation = null;
        if (this.props.current_page && this.props.page_count && this.props.onPageChange) {
            navigation = [];
            for (let i = 1; i <= this.props.page_count; i++) {
                if (i === this.props.current_page)
                    navigation.push(<FlatButton label={i} onClick={this.props.onPageChange.bind(null, i)} primary={true} key={i + "page"} />);
                else
                    navigation.push(<FlatButton label={i} onClick={this.props.onPageChange.bind(null, i)} key={i + "page"} />);
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
            <div className="container">
                <List>
                    <Subheader inset={true}>Folders</Subheader>
                    {items}
                </List>
                {navigation}
                {dialog}
                <Snackbar
                    open={this.state.show_snackbar}
                    message="Link skopírovany"
                    autoHideDuration={2000}
                    onRequestClose={this.handleCloseSnackbar}
                />
            </div>);
    }
}

export default Results;