import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
//import components
import ControlContainer from './components/ControlContainer';
import WorkspaceContainer from './components/WorkspaceContainer';

const App = (props)=> (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">IdeaNode</h1>
      <ControlContainer />
    </header>
    <WorkspaceContainer />
  </div>
);

export default App;
