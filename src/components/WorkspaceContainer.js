import React, { Component } from 'react'
import {connect} from 'react-redux'
//components
import Workspace from './Workspace'
import IdeaNode from './IdeaNode'
//actions
import { changeMode } from '../actions/changeMode'
import { moveNode } from '../actions/moveNode'
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
    this.handleChangeText=this.handleChangeText.bind(this);
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

  handleEditButton(e){
    this.state.edit = e.target.dataset.id;
    this.props.changeMode('edit');
  }

  handleChangeText(e){
    let id=e.target.dataset.id;
    let section=e.target.dataset.section;
    let text=e.target.value;
    this.props.changeText(id,section,text);
  }

  //translate file data to JSX
  constructIdeas(ideas){
    let ideaJSX=[];
    let mode=this.props.client.mode;
    for(let key in ideas){
      let i=ideas[key];
      let editing = (this.state.edit===key);
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
          head={editing?
            <input className='Node-head' data-id={i.id}
              data-section='head' value={i.text.head}
              onChange={this.handleChangeText}
            />
            : <p className='Node-head' data-id={i.id}>{i.text.head}</p>
          }
          body={editing?
            <textarea className='Node-body' data-id={i.id}
              data-section='body' value={i.text.body}
              onChange={this.handleChangeText}
            />
            : <p className='Node-body' data-id={i.id}>{i.text.body}</p>
          }
          foot={editing?
            <input className='Node-foot' data-id={i.id}
              data-section='foot' value={i.text.foot}
              onChange={this.handleChangeText}
            />
            : <p className='Node-foot' data-id={i.id}>{i.text.foot}</p>
          }
          overlay={
            mode==='view' || mode==='delete'?
            <div
              className="Node-overlay"
              onMouseDown={this.handleMouseDown}
              data-id={i.id}
              style={mode==='view'?{cursor: 'move'}:null}
            /> : null
          }
          editButton={mode==='view'?
            <div className='Node-edit-button'
              data-id={i.id}
              onMouseDown={this.handleEditButton}
            ><i className='fa fa-edit' data-id={i.id}></i></div> : null
          }
          text={i.text}
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

  componentWillUpdate(nextProps, nextState){
    if (nextProps.client.mode==='view') this.state.edit=null;
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
  deleteNode: (id) => dispatch(deleteNode(id)),
  changeText: (id,section,text) => dispatch(changeText(id,section,text))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);
