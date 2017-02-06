import React, { Component } from 'react';

// Needed as the reference to this object inside event handlers
var _this;

class HomePage extends Component {
  constructor() {
    super();
    _this = this;
    this.state = {
      total_items: 0,
      items: null,
      page: ""
    };
  }

  render() {
    return (
        <div></div>
    );
  }
}

export default HomePage;