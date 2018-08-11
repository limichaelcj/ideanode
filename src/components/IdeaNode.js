import React, { Component } from 'react';
import {connect} from 'react-redux';

const IdeaNode = (props) => {
  return (
    <div
      id={'node'+props.id}
      data-id={props.id}
      className={props.class}
      style={props.dim}
    >
      {props.head}
      {props.body}
      {props.foot}
      {props.overlay}
      {props.editButton}
    </div>
  )
}

export default IdeaNode;
