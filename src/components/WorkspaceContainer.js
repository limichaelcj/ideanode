import React, { Component } from 'react';
import {connect} from 'react-redux';
//components
import Workspace from './Workspace';
//actions
import { moveNode } from '../actions/moveNode'
import { deleteNode } from '../actions/deleteNode'
//util
import dragElement from '../util/dragElement'

class WorkspaceContainer extends Component {
  constructor(props){
    super(props);
    this.handleDragNode=this.handleDragNode.bind(this);
    this.handleDeleteNode=this.handleDeleteNode.bind(this);
  }

  handleDragNode(e){
    e = e || window.event;
    e.preventDefault();
    dragElement(
      e.target, //element being dragged
      e.pageX, //cursor current X position
      e.pageY, //cursor current Y position
      'onmouseup', //closing mouse event
      this.props.moveNode //the redux action to be called to save state
    );
  }

  handleDeleteNode(e){
    this.props.deleteNode(e.target.id.slice(4));
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
          onMouseDown={
            this.props.client.mode==='view' ?
            this.handleDragNode :
            this.handleDeleteNode
          }
        >ID={i.id}</div>
      );
    }
    return ideaJSX;
  }

  shouldComponentUpdate(nextProps){
    if (this.props.cursor !== nextProps.cursor){
      return false;
    } else return true;
  }

  componentDidUpdate(prevProps){
    console.log('Update: Workspace')
    //When adding new node, enter drag element for new node
    if(prevProps.uniqueID===this.props.uniqueID-1){
      dragElement(
        document.getElementById('node'+prevProps.uniqueID),
        this.props.cursor.x,
        this.props.cursor.y,
        'onmousedown',
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
  moveNode: (id,x,y) => dispatch(moveNode(id,x,y)),
  deleteNode: (id) => dispatch(deleteNode(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);
