import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { darkBlack } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import CopyToClipboard from 'react-copy-to-clipboard';

// Needed as the reference to this object inside event handlers
var _this;

export default class Results extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.items !== nextProps.items) {
            return true;
        }
        return false;
    }

    render() {
        var items = null;
        if (this.props.items.length > 0) {
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
                var fileType = "";
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
                        leftAvatar={<Avatar icon={<FileFolder />} onClick={this.props.handleOpenDetails.bind(this, result)} />}
                        rightIcon={
                            <div style={{ width: '100px', margin: '8px' }}>
                                <CopyToClipboard text={windowsLink}
                                    onCopy={this.props.handleOpenSnackbar}>
                                    <FlatButton label="Windows" />
                                </CopyToClipboard>
                                <CopyToClipboard text={linuxLink}
                                    onCopy={this.props.handleOpenSnackbar}>
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
            return <div>{items}</div>;
        }
        return items;
    }
}