import React, { Component } from 'react';
import './App.css';

const LOBBY = "LOBBY";
const SETUP = "SETUP";
const GAME = "GAME";
class Lobby extends Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
      Lobby
        <input className = "form"></input>
      </React.Fragment>
    );
  }
}

export default Lobby;
