import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';
import brace from 'brace';
import axios from 'axios';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import HealthBar from "./HealthBar";

const LOBBY = "LOBBY";
const SETUP = "SETUP";
const GAME = "GAME";

const player = require("./player.png");
const enemy = require("./enemy.png");
// const path = "http://ec2-54-183-30-60.us-west-1.compute.amazonaws.com:8080";
const path = "http://localhost:8080";
// function onChange(newValue) {
//   console.log('change',newValue);
// }
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProblem:0,
      problemLoading:true,
      totalHealth:this.props.problems.length,
      playerHealth:this.props.problems.length,
      enemyHealth:this.props.problems.length,
      loading:false,
      content:"",
      errorMessage:"",
      problemSummary:""
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getProblem = this.getProblem.bind(this);
    this.getProblem();
  }

  getProblem(){
    axios.post(path+"/hackerearth/problem",{problemLink:this.props.problems[this.state.currentProblem]})
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
    axios.post(path+"/hackerearth/compile",{toCompile:this.state.content,problemLink:this.props.problems[this.state.currentProblem]})
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

        this.setState({
          errorMessage:"Nice! That is a correct answer.",
          loading:false,
          problemLoading:true,
          enemyHealth:this.state.enemyHealth-1,
          currentProblem:this.state.currentProblem+1
        },
        ()=>{
            if(this.state.currentProblem < this.props.problems.length)
            {
              this.getProblem();
            }
          }
      );

      }
      else
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
