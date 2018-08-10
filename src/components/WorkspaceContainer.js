import React, { Component } from 'react'
import {connect} from 'react-redux'
//components
import Workspace from './Workspace'
import IdeaNode from './IdeaNode'
//actions
import { changeMode } from '../actions/changeMode'
import { moveNode } from '../actions/moveNode'
import { deleteNode } from '../actions/deleteNode'
//util
import dragElement from '../util/dragElement'
import getNode from '../util/getNode'

class WorkspaceContainer extends Component {
  constructor(props){
    super(props);
    this.handleMouseDown=this.handleMouseDown.bind(this);
  }

  handleMouseDown(e){
    e = e || window.event;
    e.preventDefault();
    let id=e.target.dataset.id;
    switch(this.props.client.mode){
      case 'delete':
        this.props.deleteNode(id);
        break;
      case 'view':
        dragElement(
          getNode(id), //element being dragged
          e.pageX, //cursor current X position
          e.pageY, //cursor current Y position
          'onmouseup', //closing mouse event
          this.props.moveNode //callback
        );
      default:
    }
  }

  //translate file data to JSX
  constructIdeas(ideas){
    let ideaJSX=[];
    for(let key in ideas){
      let i=ideas[key];
      ideaJSX.push(
        <IdeaNode
          key={i.id}
          id={i.id}
          class='Node'
          dim={{
            top: i.dim.y,
            left: i.dim.x,
            height: i.dim.h,
            width: i.dim.w
          }}
          mousedown={this.handleMouseDown}
          text={i.text}
        />
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
    if(prevProps.uniqueID!==this.props.uniqueID){
      dragElement(
        getNode(prevProps.uniqueID),
        this.props.cursor.x,
        this.props.cursor.y,
        'onmousedown',
    //callback, make sure to make inner onmouseup to eliminate double hit errors
        (id,x,y)=>{
          document.onmouseup=(e)=>{
            document.onmouseup=null;
            this.props.moveNode(id,x,y);
          }
        }
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
  changeMode: (mode)=>dispatch(changeMode(mode)),
  moveNode: (id,x,y) => dispatch(moveNode(id,x,y)),
  deleteNode: (id) => dispatch(deleteNode(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);
