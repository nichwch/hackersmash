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
        <Game problems={["https://www.hackerrank.com/challenges/simple-array-sum/problem","https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays"]}/>
      </React.Fragment>
    );
  }
}

export default App;
