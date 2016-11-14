import React, { Component } from 'react'
import TextField from 'material-ui/TextField/TextField'
import RadioButton from 'material-ui/RadioButton/RadioButton'
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'
import Checkbox from 'material-ui/Checkbox/Checkbox'
import SelectField from 'material-ui/SelectField/SelectField'
import MenuItem from 'material-ui/MenuItem/MenuItem'

var _this;
class SearchForm extends Component {
  constructor() {
    super();
    _this = this;
    this.propTypes = {
      onSubmit: React.PropTypes.func
    }
    this.state = {
      query: "",
      host: "",
      content_type: "all",
      file_type: "all",
      size_from: "",
      size_to: ""
    };
  }

  _handleSubmit(e) {
    this.props.onChange(this.state);
  }

  // Handles changes in the state of the page
  _handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <div>
        <TextField
      hintText="Custom Underline Focus Color"
      
    />
          <TextField
            name="query"
            value={this.state.query}
            hintText="Hľadaný výraz"
            floatingLabelText="Hľadaný výraz"
            onChange={this._handleFormChange.bind(this)}
            underlineStyle="borderColor: orange500"
          />
        </div>
        <div>
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
        <div>
          <button type="submit">Hľadaj</button>
        </div>
      </form>
    );
  }
}

export default SearchForm;