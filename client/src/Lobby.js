import React, { Component } from 'react';
import './App.css';
import './Lobby.css';
import axios from 'axios';

const LOBBY = "LOBBY";
const GAME = "GAME";
const SETUP = "SETUP";

var timer = null;

// const path = "http://ec2-54-183-30-60.us-west-1.compute.amazonaws.com:8080";
const path = "http://localhost:8080";

class Lobby extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      name:"",
      room:"",
      errorMessage:"",
    }
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.pingRoom = this.pingRoom.bind(this);

    this.props.setP(false);
  }

  pingRoom(roomId){
    console.log("lol");
    axios.get(path+"/checkstatus",{params:{id:this.state.room}})
    .then(res=>{
      if(res.data.status=="playing"){
        clearInterval(document.interval);
        this.props.setR(this.state.room);
        this.props.setAS(GAME);

      }
      console.log(res);
    })
  }

  handleChange(event){
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  createRoom(){
    if(this.state.name === "")
    {
      this.setState({
        errorMessage:"Enter a name first",
      })
    }
    else{
      this.props.setN(this.state.name);
      this.setState({
        errorMessage:"",
      })
      this.props.setAS(SETUP);
    }
  }

  joinRoom(){
    if(this.state.name === "")
    {
      this.setState({
        errorMessage:"Enter a name first",
      })
    }
    else{
      axios.post(path+"/joinroom",{id:this.state.room,name:this.state.name});
      document.interval = setInterval(this.pingRoom, 1000);
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className = "lobbyContainer">
          <h1>Lobby</h1>
          <div className = "errorMessage">{this.state.errorMessage}</div>
          <div>Enter your name</div>
          <input name = "name" className = "form" onChange={this.handleChange} value={this.state.name}></input>
          <div>========================</div>
          <div><button className = "submit" onClick = {this.createRoom}>create room</button></div>
          <br></br>
          <div>OR</div>
          <br></br>
          <div>Enter in an existing room code</div>
          <input name = "room" className = "form" onChange={this.handleChange} value={this.state.room}></input>
          <div><button className = "submit" onClick = {this.joinRoom}>join room</button></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Lobby;
