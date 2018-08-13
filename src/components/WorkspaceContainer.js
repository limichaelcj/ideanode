import React, { Component } from 'react'
import {connect} from 'react-redux'
//components
import Workspace from './Workspace'
import IdeaNode from './IdeaNode'
//actions
import { changeMode } from '../actions/changeMode'
import { moveNode } from '../actions/moveNode'
import { resizeNode } from '../actions/resizeNode'
import { deleteNode } from '../actions/deleteNode'
import { changeText } from '../actions/changeText'
//util
import dragElement from '../util/dragElement'
import getNode from '../util/getNode'

class WorkspaceContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: null
    }
    this.handleMouseDown=this.handleMouseDown.bind(this);
    this.handleEditButton=this.handleEditButton.bind(this);
    this.clickCheck=this.clickCheck.bind(this);
  }

  handleMouseDown(e){
    e = e || window.event;
    let id=e.target.dataset.id;
    switch(this.props.client.mode){
      case 'delete':
        this.props.deleteNode(id);
        break;
      case 'view':
        e.preventDefault();
        if(e.target.dataset.op==='overlay'){
          dragElement(
            getNode(id), //element being dragged
            e.pageX, //cursor current X position
            e.pageY, //cursor current Y position
            'drag', //the operation type for the drag
            {xLower: 0, xUpper: 1900, yLower: 0, yUpper: 900},
            'onmouseup', //closing mouse event
            this.props.moveNode //callback
          );
        } else if (e.target.dataset.op==='resizer'){
          dragElement(
            getNode(id), //element being dragged
            e.pageX, //cursor current X position
            e.pageY, //cursor current Y position
            'resize', //the operation type for the drag
            {xLower: 100, xUpper: 800, yLower: 100, yUpper: 800},
            'onmouseup', //closing mouse event
            this.props.resizeNode //callback
          );
        }
        break;
      default:
    }
  }

  handleEditButton(e){
    this.state.edit = e.target.dataset.id;
    this.props.changeMode('edit');
  }

  //translate file data to JSX
  constructIdeas(ideas){
    let ideaJSX=[];
    let mode=this.props.client.mode;
    for(let key in ideas){
      let i=ideas[key];
      let editing = (this.state.edit===key);
      //conditional renders for texts
      let text= [];
      if (editing) {
        text.push(<input className='Node-head' data-id={i.id}
          data-section='head' defaultValue={i.text.head}
          id={'node'+i.id+'-head'} />);
        text.push(<textarea className='Node-body' data-id={i.id}
          data-section='body' defaultValue={i.text.body}
          id={'node'+i.id+'-body'} />);
        text.push(<input className='Node-foot' data-id={i.id}
          data-section='foot' defaultValue={i.text.foot}
          id={'node'+i.id+'-foot'} />);
      } else {
        text.push(<p className='Node-head' id={'node'+i.id+'-head'}
          data-id={i.id} >{i.text.head}</p>);
        text.push(<p className='Node-body' id={'node'+i.id+'-body'}
          data-id={i.id} >{i.text.body}</p>);
        text.push(<p className='Node-foot' id={'node'+i.id+'-foot'}
          data-id={i.id} >{i.text.foot}</p>);
      }
      //class: if local state.edit == node's id, give it edit mode style
      //overlay: only render if in view mode
      //editButton: only show if in view mode
      ideaJSX.push(
        <IdeaNode
          key={i.id}
          id={i.id}
          class={editing?'Node Node-edit':'Node Node-view'}
          dim={{
            top: i.dim.y,
            left: i.dim.x,
            height: i.dim.h,
            width: i.dim.w
          }}
          editing={editing}
          head={i.text.head}
          body={i.text.body}
          foot={i.text.foot}
          overlay={
            mode==='view' || mode==='delete'?
            <div
              className="Node-overlay"
              onMouseDown={this.handleMouseDown}
              data-id={i.id} data-op='overlay'
              style={mode==='view'?{cursor: 'move'}:null}
            /> : null
          }
          editButton={mode==='view'?
            <div className='Node-edit-button' data-id={i.id}
              onMouseDown={this.handleEditButton}
            ><i className='fa fa-edit' data-id={i.id}></i></div> : null
          }
          resizer={mode==='view'?
            <div className='Node-resizer' data-id={i.id}
              data-op='resizer' onMouseDown={this.handleMouseDown} />
            : null
          }
        />
      );
    }
    return ideaJSX;
  }

  clickCheck(e){
    if(this.props.client.mode==='edit' && this.state.edit!=e.target.dataset.id){
      this.props.changeMode('view');
    }
  }

  componentDidMount(){
    document.addEventListener('click', this.clickCheck);
  }

  shouldComponentUpdate(nextProps){
    if (this.props.cursor !== nextProps.cursor){
      return false;
    } else return true;
  }

  componentDidUpdate(prevProps){
    console.log('Update: Workspace -- ' + this.props.client.mode)
    //When adding new node, enter drag element for new node
    if(prevProps.uniqueID!==this.props.uniqueID){
      dragElement(
        getNode(prevProps.uniqueID),
        this.props.cursor.x,
        this.props.cursor.y,
        'drag',
        {xLower: 0, xUpper: 1900, yLower: 0, yUpper: 900},
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
    //when going into edit mode
    if(prevProps.client.mode==='view'&&this.props.client.mode==='edit'){
      document.querySelectorAll("[data-section='body']")[0].focus();
    }
  }

  componentWillUpdate(nextProps, nextState){
    //switch from edit to view mode
    if (this.props.client.mode==='edit' && nextProps.client.mode==='view') {
      let id=this.state.edit;
      let head=document.getElementById('node'+id+'-head').value;
      let body=document.getElementById('node'+id+'-body').value;
      let foot=document.getElementById('node'+id+'-foot').value;
      this.props.changeText(id, head, body, foot);
      this.state.edit=null;
    }
  }

  componentWillUnmout(){
    document.removeEventListener('click', this.clickCheck);
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
  resizeNode: (id,w,h) => dispatch(resizeNode(id,w,h)),
  deleteNode: (id) => dispatch(deleteNode(id)),
  changeText: (id,head,body,foot) => dispatch(changeText(id,head,body,foot))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);
