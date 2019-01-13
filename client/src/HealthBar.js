import React, { Component } from 'react';
import './App.css';

class HealthBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className = "progress-bar">
        <div className = "bar"  style={{width: `${(this.props.health/this.props.max)*100}%`}}  ></div>
        </div>
      </React.Fragment>
    );
  }
}
export default HealthBar;
