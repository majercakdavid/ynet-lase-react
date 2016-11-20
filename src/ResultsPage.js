import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600, darkBlack } from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import SearchForm from './SearchForm';

// Needed as the reference to this object inside event handlers
var _this;

class Results extends Component {
    constructor() {
        super();
        _this = this;
        this.state = {
            show_details_id: -1
        }
    }

    static propTypes = {
        items: PropTypes.array,
    };

    handleOpenDetails(id, e, args) {
        _this.setState({ show_details_id: id });
    }

    handleCloseDetails() {
        _this.setState({ show_details_id: -1 });
    }

    render() {
        var items = null;
        if (this.props.items) {
            items = this.props.items.map((result, i) => (
                <div key={i}>
                    <Divider inset={true} />
                    <ListItem
                        leftAvatar={<Avatar icon={<FileFolder />} />}
                        rightIcon={
                            <ActionInfo
                                onClick={this.handleOpenDetails.bind(this, i)}
                                />
                        }
                        primaryText={result.filename}
                        secondaryText={
                            <p>
                                <span style={{ color: darkBlack }}>Cesta: </span>{result.path}<br />
                                <span style={{ color: darkBlack }}>Host: </span>{result.host}<br />
                                <span style={{ color: darkBlack }}>Online: </span>{result.online}<br />
                                <span style={{ color: darkBlack }}>Veľkosť: </span>{result.size}<br />
                                <span style={{ color: darkBlack }}>Typ súboru: </span>{result.file_type}<br />
                                <span style={{ color: darkBlack }}>Koncovka: </span>{result.extension}<br />
                            </p>
                        }
                        secondaryTextLines={2}
                        />
                    <Dialog
                        title="Dialog With Actions"
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
                        open={this.state.show_details_id === i}
                        onRequestClose={this.handleCloseDetails}>
                        <div>
                            <span style={{ color: darkBlack }}>Cesta: </span>{result.path}<br />
                            <span style={{ color: darkBlack }}>Host: </span>{result.host}<br />
                            <span style={{ color: darkBlack }}>Online: </span>{result.online}<br />
                            <span style={{ color: darkBlack }}>Veľkosť: </span>{result.size}<br />
                            <span style={{ color: darkBlack }}>Typ súboru: </span>{result.file_type}<br />
                            <span style={{ color: darkBlack }}>Koncovka: </span>{result.extension}<br />
                        </div>
                    </Dialog>
                </div>
            ));
        }
        return (
            <div>
                <List>
                    <Subheader inset={true}>Folders</Subheader>
                    {items}
                </List>
            </div>);
    }
}

export default Results;