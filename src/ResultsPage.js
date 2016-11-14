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

import SearchForm from './SearchForm';

// Needed as the reference to this object inside event handlers
var _this;

class Results extends Component {
    static propTypes = {
        items: PropTypes.array
    };

    render() {
        var items = null;
        if (this.props.items) {
            items = this.props.items.map((result, i) => (
                <div key={i}>
                    <Divider inset={true} />
                    <ListItem
                        leftAvatar={<Avatar icon={<FileFolder />} />}
                        rightIcon={<ActionInfo />}
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
                        secondaryTextLines={6}
                        />
                </div>
            ));
        }
        return (
            <div>
                <SearchForm onChange={this.props.onChange} />
                <List>
                    <Subheader inset={true}>Folders</Subheader>
                    {items}
                </List>
            </div>);
    }
}

export default Results;