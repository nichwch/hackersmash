import React, { Component } from 'react';
import './App.css';
import Lobby from './Lobby';
import Game from './Game';
import Setup from './Setup';

const LOBBY = "LOBBY";
const GAME = "GAME";
const SETUP = "SETUP";
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      name:"",
      stage:LOBBY,
      room:"",
      playerOne:true,
    }
    this.setAppState = this.setAppState.bind(this);
    this.setName = this.setName.bind(this);
    this.getName = this.getName.bind(this);
    this.setRoom = this.setRoom.bind(this);
    this.setP1 = this.setP1.bind(this);
  }
  setAppState(newstate){
    this.setState({
      stage:newstate,
    })
  }
  setP1(newstate){
    this.setState({
      playerOne:newstate,
    })
  };
  setName(n){
    this.setState({
      name:n,
    })
  }
  setRoom(n){
    this.setState({
      room:n,
    })
  }
  getName(){
    return this.state.name;
  }
  render() {

    var render = (
      <React.Fragment>
        <Lobby setAS = {this.setAppState} setN = {this.setName} setR = {this.setRoom} setP = {this.setP1}/>
      </React.Fragment>
    )
    if(this.state.stage == SETUP)
    {
      render = (
        <React.Fragment>
          <Setup setAS = {this.setAppState}  getN = {this.getName} setR = {this.setRoom} setP = {this.setP1}/>
        </React.Fragment>
      )
    }
    if(this.state.stage == GAME)
    {
      render = (
        <React.Fragment>
          <Game problems={this.state.questions} id = {this.state.room} p1 = {this.state.playerOne}/>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {render}
      </React.Fragment>
    );
  }
}

export default App;
