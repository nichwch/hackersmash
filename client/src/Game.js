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
      content:"",
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(newValue,e) {
    this.setState({
      content:newValue,
    });
  }
  onClick(){
    console.log("clicked");
    axios.post("http://localhost:5000/hackerearth/compile",{toCompile:this.state.content})
    .then(res=>{
      console.log(res);
    });
  }

  render() {

    return (
      <React.Fragment>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          value={this.state.content}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
        <button onClick = {this.onClick}>submit</button>
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
