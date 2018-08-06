import React, { Component } from 'react';

//css
import '../css/Workspace.css';

const Workspace = (props) => {
  return(
    <div id='Workspace'>
      <svg id='Linkspace' className='Linkspace' x='0' y='0' width='2000' height='1000'>
      </svg>
      <div id='Nodespace' className='Nodespace'>
        {props.file}
      </div>
    </div>
  )
}

export default Workspace;
