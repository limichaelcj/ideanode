import React, { Component } from 'react'
import {connect} from 'react-redux'
//components
import Control from './Control'
//actions
import { addNode } from '../actions/addNode'
import { saveClientXY } from '../actions/saveClientXY'
import { changeMode } from '../actions/changeMode'

class ControlContainer extends Component {
  constructor(props){
    super(props);
    this.handleAddNode=this.handleAddNode.bind(this);
    this.handleDeleteNode=this.handleDeleteNode.bind(this);
  }

  handleAddNode(e){
    e = e || window.event;
    e.preventDefault();
    let button=e.target;
    button.onmouseup=(e)=>{
      this.props.saveClientXY(e.pageX,e.pageY);
      this.props.addNode(this.props.uniqueID, e.pageX, e.pageY);
      button.onmouseup=null;
    };
    //add new node at location of cursor
  }

  handleDeleteNode(e){
    if(this.props.mode==='view'){
      this.props.saveClientXY(e.pageX,e.pageY);
      this.props.changeMode('delete');
    }
  }

  componentDidUpdate(prevProps){
    //if not in view mode, add click listener to control area to revert to view mode
    if(this.props.mode !== 'view'){
      document.getElementById('App-header').onclick=()=>this.props.changeMode('view');
    }
  }

  componentWillUpdate(nextProps){
    if (nextProps.mode === 'view'){
      document.getElementById('App-header').onclick=null;
    }
  }

  render(){
    //only insert button functionality in view mode
    return(
      <Control
        addNode={this.props.mode==='view'?this.handleAddNode:null}
        deleteNode={this.props.mode==='view'?this.handleDeleteNode:null}
      />
    );
  }
}

const mapStateToProps = state => ({
  uniqueID: state.node.uniqueID,
  mode: state.client.mode
});

const mapDispatchToProps = dispatch => ({
  addNode: (id,x,y)=>dispatch(addNode(id,x,y)),
  saveClientXY: (x,y)=>dispatch(saveClientXY(x,y)),
  changeMode: (mode)=>dispatch(changeMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlContainer);
