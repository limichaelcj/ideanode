import React, { Component } from 'react'
import {connect} from 'react-redux'
//components
import Control from './Control'
//actions
import { addNode } from '../actions/addNode'
import { saveClientXY } from '../actions/saveClientXY'

class ControlContainer extends Component {
  constructor(props){
    super(props);
    this.handleAddNode=this.handleAddNode.bind(this);
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

  handleDeleteNode(){

  }

  render(){
    return(
      <Control
        addNode={this.handleAddNode}
        deleteNode={this.handleDeleteNode}
      />
    );
  }
}

const mapStateToProps = state => ({
  uniqueID: state.node.uniqueID
});

const mapDispatchToProps = dispatch => ({
  addNode: (id,x,y)=>dispatch(addNode(id,x,y)),
  saveClientXY: (x,y)=>dispatch(saveClientXY(x,y))
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlContainer);
