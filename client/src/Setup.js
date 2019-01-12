import React, { Component } from 'react';
import './App.css';

const LOBBY = "LOBBY";
const SETUP = "SETUP";
const GAME = "GAME";
class Setup extends Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
      Setup
        <input className = "form"></input>
      </React.Fragment>
    );
  }
}

export default Setup;
