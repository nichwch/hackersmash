import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';
import brace from 'brace';
import axios from 'axios';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import HealthBar from "./HealthBar";

const player = require("./player.png");
const enemy = require("./enemy.png");
const path = "http://ec2-54-183-30-60.us-west-1.compute.amazonaws.com:8080";
const default_content = `var __input_stdin = "";
var __input_stdin_array = "";
var __input_currentline = 0;

process.stdin.on('data', function (data) {
    __input_stdin += data;
});

function solveMeFirst(a, b) {
    //type return a+b

}
process.stdin.on('end', function () {
    __input_stdin_array = __input_stdin.split("\n");
    var res;
    var _a = parseInt(__input_stdin_array[__input_currentline].trim(), 10);
    __input_currentline += 1;

    var _b = parseInt(__input_stdin_array[__input_currentline].trim(), 10);
    __input_currentline += 1;

    res = solveMeFirst(_a, _b);
    process.stdout.write(""+res+"\n");

});`
// const path = "http://localhost:8080";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProblem:0,
      problemLoading:true,
      questions:[],
      totalHealth:0,
      playerHealth:0,
      enemyHealth:0,
      loading:false,
      content:default_content,
      errorMessage:"",
      problemSummary:""
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getProblem = this.getProblem.bind(this);
    this.pingRoom = this.pingRoom.bind(this);

    document.interval = setInterval(this.pingRoom,1000);
  }

  componentDidMount(){
    console.log("id"+this.props.id)
    axios.get(path+"/checkstatus",{params:{id:this.props.id}})
    .then(res=>{
        var playerscore = 0;
        var enemyscore = 0;
        console.log(res);
        if(this.props.p1)
        {
          playerscore = res.data.playerOne.score;
          enemyscore = res.data.playerTwo.score;
        }
        else{
          playerscore = res.data.playerTwo.score;
          enemyscore = res.data.playerOne.score;
        }
        this.setState({
          totalHealth:res.data.questions.length,
          questions:res.data.questions,
          playerHealth:res.data.questions - enemyscore,
          enemyHealth:res.data.questions - playerscore
        });
        this.getProblem();
        console.log(res);
    });
  }
  pingRoom(){
    console.log("lol");
    axios.get(path+"/checkstatus",{params:{id:this.props.id}})
    .then(res=>{
        var playerscore = 0;
        var enemyscore = 0;
        if(this.props.p1)
        {
          playerscore = res.data.playerOne.score;
          enemyscore = res.data.playerTwo.score;
        }
        else{
          playerscore = res.data.playerTwo.score;
          enemyscore = res.data.playerOne.score;
        }
        this.setState({
          totalHealth:res.data.questions.length,
          questions:res.data.questions,
          playerHealth:this.state.totalHealth - enemyscore,
          enemyHealth:this.state.totalHealth - playerscore
        });
    })
  }

  getProblem(){
    axios.post(path+"/hackerearth/problem",{problemLink:this.state.questions[this.state.currentProblem]})
    .then(res=>{
      console.log(res);
      this.setState({
        problemSummary:res.data.concat("#view=FitH"),
        problemLoading:false,
      })
    });
  }
  onChange(newValue,e) {
    this.setState({
      content:newValue,
    });
  }
  onClick(){
    this.setState({
      loading:true,
      errorMessage:""
    })
    axios.post(path+"/hackerearth/compile",{toCompile:this.state.content,problemLink:this.state.questions[this.state.currentProblem]})
    .then(res=>{
      console.log(res.data);
      if(res.data == "error")
      {
        this.setState({
          errorMessage:"Sorry, that answer is not correct.",
          loading:false,
        });
      }
      else if(res.data == "success")
      {
        var playerr = "playerTwo"
        if(this.props.p1)
        {
          playerr = "playerOne"
        }
        axios.post(path+"/incrementscore",{id:this.props.id,player:playerr,amount:1});
        this.setState({
          errorMessage:"Nice! That is a correct answer.",
          loading:false,
          problemLoading:true,
          enemyHealth:this.state.enemyHealth-1,
          currentProblem:this.state.currentProblem+1
        },
        ()=>{
            if(this.state.currentProblem < this.state.questions.length)
            {
              this.getProblem();
            }
          }
      );

      }
      else if(res.data =="our bad...")
      {
        this.setState({
          errorMessage:"Network error. Try submitting again.",
          loading:false,
        });
      }
    });
  }

  render() {
    var button = (<button className = "submit" onClick = {this.onClick}>submit</button>);
    var problemStatement = (
      <object className = "problemSummary" data={this.state.problemSummary} type="application/pdf">
        <embed src={this.state.problemSummary} type="application/pdf" />
      </object>

    )
    if(this.state.loading){
      button = (
        <div className="loadWrapper">
          <div className="loadSpinner"></div>
          Loading...
        </div>
      );

    }
    if(this.state.problemLoading){
      problemStatement = (

        <div className="bigLoadWrapper">
          <div className="bigLoadSpinner"></div>
          <div> >Loading...</div>
          <div> >initilizing combat systems... </div>
          <div> >charging weapons... </div>
        </div>

      )
    }

    return (
      <React.Fragment>
      <div className = "codeContainer">
        {problemStatement}
        <AceEditor
          fontSize = {14}
          height = {'270px'}
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          value={this.state.content}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
        {button}
        <div className = "errorMessage">{this.state.errorMessage}</div>
      </div>
        <div className = "gameContainer">
          <div className = "enemyHealth">
            Enemy HP: <HealthBar health={this.state.enemyHealth} max={this.state.totalHealth}/>
          </div>
          <div className = "combat">
            <img className = "playerPortrait" src = {player}></img>
            <img className = "enemyPortrait" src = {enemy}></img>
          </div>
          <div className = "playerHealth">
            Player Health: <HealthBar health={this.state.playerHealth} max={this.state.totalHealth}/>
          </div>

      </div>

      </React.Fragment>
    );
  }

}

export default Game;
