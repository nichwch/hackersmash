import React, { Component } from 'react';
import './App.css';
import './Lobby.css';
import axios from 'axios';

const LOBBY = "LOBBY";
const GAME = "GAME";
const SETUP = "SETUP";

var timer = null;

const path = "http://ec2-54-183-30-60.us-west-1.compute.amazonaws.com:8080";
// const path = "http://localhost:8080";
class Setup extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      roomCreated:false,
      question:"",
      questions:[],
      errorMessage:"",
      roomID:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.pingRoom = this.pingRoom.bind(this);

    this.props.setP(true);
  }

  handleChange(event){
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  addQuestion(){
    this.setState({
      questions:this.state.questions.concat(this.state.question)
    })
  }

  pingRoom(){
    console.log("lol");
    axios.get(path+"/checkstatus",{params:{id:this.state.roomID}})
    .then(res=>{
      if(res.data.status=="playing"){
        clearInterval(document.interval);
        this.props.setR(this.state.roomID);
        this.props.setAS(GAME);

      }
      console.log(res);
    })
  }

  createRoom(){
    if(this.state.questions.length<2)
    {
      this.setState({
        errorMessage:"Enter at least 2 questions.",
      })
    }
    else{
      //placeholder
      this.setState({
        errorMessage:"",
        roomCreated:true,
      });
      axios.post(path+"/createroom",{name:this.props.getN(),questions:this.state.questions})
      .then(res=>{
        console.log(res);
        this.setState({
          roomID:res.data.shortenedId,
        });

      })
      document.interval = setInterval(this.pingRoom, 1000);
      console.log("created room");
    }
  }


  render() {
    var setup = this.state.questions.map((link)=>{
      return(<div>{link}</div>)
    })
    var roomStuff = (
    <React.Fragment>
      <div>Room created!</div>
      <div>Share this ID with a friend and have him enter it to start a game. The game will start automatically when they join.</div>
      <div>Room ID: {this.state.roomID}</div>
      <div className="loadWrapper">
        <div className="loadSpinner"></div>
        Waiting for other player to join...
      </div>
    </React.Fragment>
    )
    if(!this.state.roomCreated)
    {
      roomStuff = (<div><button className = "submit" onClick = {this.createRoom}>create room</button></div>);
    }
    return (
      <React.Fragment>
        <div className = "lobbyContainer">
          <h1>Setup</h1>
          {setup}
          <div>Enter the links to the hackerrank questions you want to do.</div>
          <input name = "question" className = "form" onChange={this.handleChange} value={this.state.question}></input>
          <div><button className = "submit" onClick = {this.addQuestion}>add question</button></div>
          <br></br>
          <div className = "errorMessage">{this.state.errorMessage}</div>

          {roomStuff}
        </div>
      </React.Fragment>
    );
  }
}

export default Setup;
