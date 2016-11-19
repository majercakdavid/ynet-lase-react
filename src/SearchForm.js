import React, { Component } from 'react'
import TextField from 'material-ui/TextField/TextField'
import RadioButton from 'material-ui/RadioButton/RadioButton'
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'
import Checkbox from 'material-ui/Checkbox/Checkbox'
import SelectField from 'material-ui/SelectField/SelectField'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import FlatButton from 'material-ui/FlatButton/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { orange500 } from 'material-ui/styles/colors';

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
            page: 1
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
            _this.props.onChange(_this.state);
        }, 500);
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
                <div className="box">
                    <div className="category">
                        <RadioButtonGroup
                            name="content_type"
                            value={this.state.content_type}
                            onChange={this._handleFormChange.bind(this)}>
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
                        <div>
                            <FlatButton
                                type="submit"
                                icon={<ActionSearch />}
                                className="submit-search"
                                />
                        </div>
                    </div>
                </div>
                <div className="settings">

                    <div>
                        <div>
                            <SelectField
                                name="file_type"
                                value={this.state.file_type}
                                floatingLabelText="Typ súboru"
                                onChange={this._handleFormChange.bind(this)}>
                                <MenuItem
                                    value={"all"}
                                    primaryText="Všetko"
                                    />
                                <MenuItem
                                    value={"directory"}
                                    primaryText="Priečinky"
                                    />
                                <MenuItem
                                    value={"file"}
                                    primaryText="Súbory"
                                    />
                            </SelectField>
                        </div>
                    </div>
                    <div>
                        <TextField
                            name="size_from"
                            value={this.state.size_from}
                            hintText="Minimálna veľkosť"
                            floatingLabelText="Minimálna veľkosť"
                            onChange={this._handleFormChange.bind(this)}
                            />
                    </div>
                    <div>
                        <TextField
                            name="size_to"
                            value={this.state.size_to}
                            hintText="Maxiimálna veľkosť"
                            floatingLabelText="Maximálna veľkosť"
                            onChange={this._handleFormChange.bind(this)}
                            />
                    </div>
                </div>

            </form>
        );
    }
}

export default SearchForm;