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
      'mouseup', //closing mouse event
      this.props.moveNode //the redux action to be called to save state
    );
  }

  //translate file data to JSX
  constructIdeas(ideas){
    let ideaJSX=[];
    for(let key in ideas){
      let i=ideas[key];
      ideaJSX.push(
        <div
          key={i.id}
          id={'node'+i.id}
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

  componentDidUpdate(prevProps){
    //When adding new node, enter drag element for new node
    if(prevProps.uniqueID===this.props.uniqueID-1){
      dragElement(
        document.getElementById('node'+prevProps.uniqueID),
        this.props.client.x,
        this.props.client.y,
        'mousedown',
        this.props.moveNode
      )
    }
  }

  render(){
    return(
      <Workspace
        file={this.constructIdeas(this.props.file.ideas)}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.node,
  client: state.client
});

const mapDispatchToProps = dispatch => ({
  moveNode: (id,x,y) => dispatch(moveNode(id,x,y))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);
