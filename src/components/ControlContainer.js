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
    e.preventDefault();
    //add new node at location of cursor
    this.props.addNode(this.props.uniqueID, e.pageX, e.pageY);
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
