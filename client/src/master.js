import React, { Component } from 'react';


//Need this component for React Router

export default class Master extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}