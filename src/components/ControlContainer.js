import React, { Component } from 'react';
import {connect} from 'react-redux';
//components
import Control from './Control';
//actions
import { addNode } from '../actions/addNode';

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
      this.props.addNode(this.props.uniqueID, e.pageX, e.pageY);
      button.onmouseup=null;
    };
    //add new node at location of cursor
  }

  render(){
    return(
      <Control
        addNode={this.handleAddNode}
      />
    );
  }
}

const mapStateToProps = state => ({
  uniqueID: state.node.uniqueID
});

const mapDispatchToProps = dispatch => ({
  addNode: (id,x,y)=>dispatch(addNode(id,x,y))
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlContainer);
