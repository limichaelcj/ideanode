import React, { Component } from 'react';
import {connect} from 'react-redux';

const IdeaNode = (props) => {
  return (
    <div
      id={props.id}
      className={props.class}
      style={props.dim}
      onMouseDown={props.mousedown}
    >
      <header>{props.text.head}</header>
      <p>{props.text.body}</p>
      <footer>{props.text.foot}</footer>
    </div>
  )
}

export default IdeaNode;
