import React, { Component } from 'react';

//css
import '../css/Control.css';

class Control extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div id='Control'>
        <button
          id='button-addNode'
          onClick={this.props.addNode}
        >Add Node
        </button>
      </div>
    );
  }
}

export default Control;
