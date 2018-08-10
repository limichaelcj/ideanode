import React, { Component } from 'react';
import {connect} from 'react-redux';

const IdeaNode = (props) => {
  return (
    <div
      id={'node'+props.id}
      data-id={props.id}
      className={props.class}
      style={props.dim}
      onMouseDown={props.mousedown}
    >
      <p className='Node-head' data-id={props.id}>{props.text.head}</p>
      <p className='Node-body' data-id={props.id}>{props.text.body}</p>
      <p className='Node-foot' data-id={props.id}>{props.text.foot}</p>
    </div>
  )
}

export default IdeaNode;
