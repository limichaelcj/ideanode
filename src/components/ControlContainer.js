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
    console.log(this.props.file);
    let id=this.props.file.uniqueID;
    this.props.addNode(id);

  }

  render(){
    return(
      <Control
        file={this.props.file}
        addNode={this.handleAddNode}
      />
    );
  }
}

const mapStateToProps = state => ({...state.node});

const mapDispatchToProps = dispatch => ({
  addNode: (id)=>dispatch(addNode(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlContainer);
