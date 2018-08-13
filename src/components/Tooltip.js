import React, { Component } from 'react'
import {connect} from 'react-redux'

import '../css/Tooltip.css'

class Tooltip extends Component {
  constructor(props){
    super(props)
    this.icon='';
  }

  handleMove(e){
    e = e || window.event;
    e.preventDefault();
    requestAnimationFrame(()=>{
      let tip = document.getElementById('tooltip');
      this.x=e.pageX+12;
      this.y=e.pageY+16;
      tip.style.left = this.x+'px';
      tip.style.top = this.y+'px';
    })
  }

  componentDidUpdate(){
    //add move listener for tooltip when changing to non-view mode
    if(this.props.mode!=='view'){
      document.onmousemove=this.handleMove;
    }
  }

  componentWillUpdate(nextProps){

    document.onmousemove=null;
    let tip = document.getElementById('tooltip');
    if (nextProps.mode!=='view'){
      tip.style.left = this.props.x + 12;
      tip.style.top = this.props.y + 16;
      tip.style.display = 'inline-block';
      if (nextProps.mode==='delete'){
        this.icon='far fa-trash-alt';
      }
    } else {
      tip.style.display = 'none';
      this.icon='';
    }
  }

  render(){
    return(
      <i
        id='tooltip'
        className={this.icon}
      />
    );
  }
}

const mapStateToProps = (state) => ({...state.client});

export default connect(mapStateToProps)(Tooltip);
