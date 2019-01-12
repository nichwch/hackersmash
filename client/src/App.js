import React, { Component } from 'react';
import './App.css';
import Lobby from './Lobby';
import Setup from './Setup';
import Game from './Game';

const LOBBY = "LOBBY";
const SETUP = "SETUP";
const GAME = "GAME";
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      stage:LOBBY,
    }
  }
  render() {
    return (
      <React.Fragment>
        <Game />
      </React.Fragment>
    );
  }
}

export default App;
