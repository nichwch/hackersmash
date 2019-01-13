import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';
import brace from 'brace';
import axios from 'axios';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

const LOBBY = "LOBBY";
const SETUP = "SETUP";
const GAME = "GAME";
// function onChange(newValue) {
//   console.log('change',newValue);
// }
class Game extends Component {
  constructor() {
    super();
    this.state = {
      loading:false,
      content:"",
      errorMessage:"",
      problemSummary:""
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount(){
    axios.post("http://localhost:5000/hackerearth/problem",{problemLink:"https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays"})
    .then(res=>{
      console.log(res);
      this.setState({
        problemSummary:res.data.concat("#view=FitH"),
      })
    })
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
    axios.post("http://localhost:5000/hackerearth/compile",{toCompile:this.state.content})
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
        });
      }
    });
  }

  render() {
    var button = (<button onClick = {this.onClick}>submit</button>);
    var problemStatement = (
      <object className = "problemSummary" data={this.state.problemSummary} type="application/pdf">
        <embed src={this.state.problemSummary} type="application/pdf" />
      </object>)
    if(this.state.loading){
      button = (
        <React.Fragment>
          <div className="loadSpinner"></div>
          Loading...
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {problemStatement}
        <AceEditor
          fontSize = {14}
          height = {'300px'}
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          value={this.state.content}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
        {button}
        <div className = "errorMessage">{this.state.errorMessage}</div>
      </React.Fragment>
    );
  }
  // constructor(props)
  // {
  //   super(props);
  // }
  // render() {
  //   return (
  //     <React.Fragment>
  //     <AceEditor
  //       mode="javascript"
  //       theme="monokai"
  //       name="blah2"
  //       onLoad={this.onLoad}
  //       onChange={this.onChange}
  //       fontSize={14}
  //       showPrintMargin={true}
  //       showGutter={true}
  //       highlightActiveLine={true}
  //       value={`function onLoad(editor) {
  //       console.log("i've loaded");
  //     }
  //
  //
  //     `}
  //       setOptions={{
  //       enableBasicAutocompletion: false,
  //       enableLiveAutocompletion: false,
  //       enableSnippets: false,
  //       showLineNumbers: true,
  //       tabSize: 2,
  //       }}/>
  //     </React.Fragment>
  //   );
  // }
}

export default Game;
