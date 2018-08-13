import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../css/IdeaNode.css';

const IdeaNode = (props) => {
  return (
    <div
      id={'node'+props.id}
      data-id={props.id}
      className={props.class}
      style={props.dim}
    >
      {props.editing?
        <input className='Node-head' data-id={props.id}
          data-section='head' defaultValue={props.head}
          id={'node'+props.id+'-head'} />
        : <p className='Node-head' id={'node'+props.id+'-head'}
          data-id={props.id} >{props.head}</p>
      }
      {props.editing?
        <textarea className='Node-body' data-id={props.id}
          data-section='body' defaultValue={props.body}
          id={'node'+props.id+'-body'} />
        : <p className='Node-body' id={'node'+props.id+'-body'}
          data-id={props.id} >{props.body}</p>
      }
      {props.editing?
        <input className='Node-foot' data-id={props.id}
          data-section='foot' defaultValue={props.foot}
          id={'node'+props.id+'-foot'} />
        : <p className='Node-foot' id={'node'+props.id+'-foot'}
          data-id={props.id} >{props.foot}</p>
      }
      {props.overlay}
      {props.editButton}
      {props.resizer}
    </div>
  )
}

export default IdeaNode;
