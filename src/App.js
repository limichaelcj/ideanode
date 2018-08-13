import React, { Component } from 'react'
import {connect} from 'react-redux'

import logo from './logo.svg'
import './css/App.css'
//import components
import ControlContainer from './components/ControlContainer'
import WorkspaceContainer from './components/WorkspaceContainer'
import Tooltip from './components/Tooltip'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      edit: null
    }
    this.globalHandleMouseMove=this.globalHandleMouseMove.bind(this);
  }

  globalHandleMouseMove(e){
    this.setState({
      x: e.pageX,
      y: e.pageY
    });
  }

  componentDidMount(){
    document.addEventListener('mousemove', this.globalHandleMouseMove);
  }

  componentDidUpdate(){
    console.log('Update: App')
  }

  componetWillUnmount(){
    document.removeEventListener('mousemove', this.globalHandleMouseMove);
  }

  render(){
    return(
      <div className="App">
        <WorkspaceContainer
          cursor={this.state}
        />
        <header id='App-control' className="App-control">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IdeaNode</h1>
          <ControlContainer
            cursor={this.state}
          />
        </header>
        <Tooltip />
      </div>
    );
  }
}

export default App;
