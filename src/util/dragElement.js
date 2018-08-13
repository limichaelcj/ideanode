//move and resize

const dragElement = (elem,ix,iy,operation,bounds,closeEvent,callback)=>{
  //initial cursor position
  var cx=ix;
  var cy=iy;
  var dimX,dimY;
  switch(operation){
    case 'drag':
      dimX = 'Left';
      dimY = 'Top';
      break;
    case 'resize':
      dimX = 'Width';
      dimY = 'Height';
      break;
    default:
  }
  document.onmousemove=(e)=>requestAnimationFrame(()=>dragMove(e));
  document[closeEvent]=closeDrag;
  function dragMove(e){
    e = e || window.event;
    e.preventDefault();
    var nextX,nextY;
    var ox=cx-e.pageX;
    var oy=cy-e.pageY;
    cx=e.pageX;
    cy=e.pageY;
    nextX = elem['offset'+dimX]-ox;
    nextY = elem['offset'+dimY]-oy
    if(nextX < bounds.xLower) nextX = bounds.xLower;
    else if (nextX > bounds.xUpper) nextX = bounds.xUpper;
    if(nextY < bounds.yLower) nextY = bounds.yLower;
    else if (nextY > bounds.yUpper) nextY = bounds.yUpper;
    elem.style[dimX.toLowerCase()]=nextX+'px';
    elem.style[dimY.toLowerCase()]=nextY+'px';
  }
  function closeDrag(){
    document.onmousemove=null;
    document[closeEvent]=null;
    //store dimensions in state
    callback(elem.id.slice(4),elem['offset'+dimX],elem['offset'+dimY]);
  }
}

export default dragElement;
