import React, { Component } from 'react'
import {connect} from 'react-redux'

import logo from './logo.svg'
import './css/App.css'
//import components
import ControlContainer from './components/ControlContainer'
import WorkspaceContainer from './components/WorkspaceContainer'
import Tooltip from './components/Tooltip'

const App = (props)=> (
  <div className="App">
    <WorkspaceContainer />
    <header id='App-header' className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">IdeaNode</h1>
      <ControlContainer />
    </header>
    <Tooltip />
  </div>
);

export default App;
