import React, { Component } from 'react';

// Needed as the reference to this object inside event handlers
var _this;

class Results extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.props = props;
        this.state = {
            item: props.item
        }
    }

    render(){
        var resultsForm = null;
        if(this.state.items){
            let result = this.state.item;
            resultsForm =
            <div>
                <p>Názov súboru: {result.filename}</p>
                <p>Cesta: {result.path}</p>
                <p>Host: {result.host}</p>
                <p>Online: {result.online}</p>
                <p>Veľkosť: {result.size}</p>
                <p>Typ súboru: {result.file_type}</p>
                <p>Koncovka: {result.extension}</p>
            </div>
        }
        return(<div> {resultsForm} </div>);
    }
}

export default Results;