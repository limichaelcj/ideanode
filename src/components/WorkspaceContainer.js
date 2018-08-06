import React, { Component } from 'react';
import {connect} from 'react-redux';
//components
import Workspace from './Workspace';
//actions
import { moveNode } from '../actions/moveNode'
//util
import dragElement from '../util/dragElement'

class WorkspaceContainer extends Component {
  constructor(props){
    super(props);
    this.handleMouseDown=this.handleMouseDown.bind(this);
  }

  handleMouseDown(e){
    e = e || window.event;
    e.preventDefault();
    dragElement(
      e.target, //element being dragged
      e.clientX, //cursor current X position
      e.clientY, //cursor current Y position
      this.props.moveNode, //the redux action to be called to save state
    );
  }

  //translate file data to JSX
  constructIdeas(ideas){
    console.log(ideas);
    let ideaJSX=[];
    for(let key in ideas){
      let i=ideas[key];
      ideaJSX.push(
        <div
          key={i.id}
          id={i.id}
          className='Node'
          style={{
            top: i.dim.y,
            left: i.dim.x,
            height: i.dim.h,
            width: i.dim.w
          }}
          onMouseDown={this.handleMouseDown}
        >ID={i.id}</div>
      );
    }
    return ideaJSX;
  }

  render(){
    let file=this.constructIdeas(this.props.file.ideas);
    return(
      <Workspace
        file={file}
      />
    );
  }
}

const mapStateToProps = state => ({...state.node});

const mapDispatchToProps = dispatch => ({
  moveNode: (id,x,y) => dispatch(moveNode(id,x,y))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);
