import React, { Component } from 'react'
import TextField from 'material-ui/TextField/TextField'
import RadioButton from 'material-ui/RadioButton/RadioButton'
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { orange500 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';

var _this;
class SearchForm extends Component {
    static propTypes = {
        onSubmit: React.PropTypes.func
    }
    constructor() {
        super();
        _this = this;
        this.liveUpdateTimeout = null;
        this.state = {
            query: "",
            host: "",
            content_type: "all",
            file_type: "all",
            size_from: "",
            size_to: "",
            show_advanced: false,
            anchorEl: null
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.onChange(this.state);
    }

    _updateLiveResults() {
        // Wait while user is typing
        clearTimeout(_this.liveUpdateTimeout);
        _this.liveUpdateTimeout = setTimeout(() => {
            _this.props.onChange(_this.state, true);
        }, 200);
    }

    _handlePopOverToggle(shouldOpen, e) {
        if (shouldOpen)
            _this.setState({ show_advanced: true, anchorEl: e.currentTarget });
        else
            _this.setState({ show_advanced: false });
    }
    // Handles changes in the state of the page
    _handleFormChange(e) {
        this.setState({ [e.target.name]: e.target.value }, this._updateLiveResults);
    }

    render() {
        const styles = {
            underlineStyle: {
                borderColor: orange500,
            }
        };
        return (
            <form onSubmit={this._handleSubmit.bind(this)}>
                <Popover
                    open={this.state.show_advanced}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this._handlePopOverToggle.bind(this, false)}
                    zDepth={5}
                    >
                    <div className="box">
                        <div className="left-box">
                            <Subheader>Obsah</Subheader>
                            <RadioButtonGroup
                                name="content_type"
                                onChange={this._handleFormChange.bind(this)}
                                defaultSelected={this.state.content_type}>
                                <RadioButton
                                    value="all"
                                    label="Všetko"
                                    />
                                <RadioButton
                                    value="video"
                                    label="Videá"
                                    />
                                <RadioButton
                                    value="music"
                                    label="Hudba"
                                    />
                                <RadioButton
                                    value="img"
                                    label="Obrázky"
                                    />
                                <RadioButton
                                    value="document"
                                    label="Dokumenty"
                                    />
                                <RadioButton
                                    value="application"
                                    label="Aplikácie"
                                    />
                                <RadioButton
                                    value="iso"
                                    label="ISO"
                                    />
                            </RadioButtonGroup>
                        </div>
                        <div className="right-box">
                            <Subheader>Typ Súboru</Subheader>
                            <RadioButtonGroup
                                name="file_type"
                                onChange={this._handleFormChange.bind(this)}
                                defaultSelected={this.state.file_type}>
                                <RadioButton
                                    value="all"
                                    label="Všetko"
                                    />
                                <RadioButton
                                    value="dir"
                                    label="Priečinky"
                                    />
                                <RadioButton
                                    value="file"
                                    label="Súbory"
                                    />
                            </RadioButtonGroup>
                            <TextField
                                name="size_from"
                                value={this.state.size_from}
                                hintText="Minimálna veľkosť"
                                floatingLabelText="Minimálna veľkosť"
                                onChange={this._handleFormChange.bind(this)}
                                />
                            <TextField
                                name="size_to"
                                value={this.state.size_to}
                                hintText="Maximálna veľkosť"
                                floatingLabelText="Maximálna veľkosť"
                                onChange={this._handleFormChange.bind(this)}
                                />
                        </div>
                    </div>
                </Popover>
                <div className="search-box">
                    <div className="logo"></div>
                    <TextField
                        name="query"
                        value={this.state.query}
                        hintText="Vyhľadávanie"
                        className="input-search"
                        underlineFocusStyle={styles.underlineStyle}
                        onChange={this._handleFormChange.bind(this)}
                        />
                    <FlatButton
                        type="submit"
                        icon={<ActionSearch />}
                        className="submit-search"
                        />
                    <FlatButton
                        icon={<ActionSettings />}
                        className="submit-search"
                        onClick={this._handlePopOverToggle.bind(this, true)}
                        />
                </div>
            </form>
        );
    }
}

export default SearchForm;