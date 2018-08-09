function dragElement(elem,ix,iy,closeEvent,action){
  var cx=ix;
  var cy=iy;
  document.onmousemove=(e)=>requestAnimationFrame(()=>dragMove(e));
  document[closeEvent]=closeDrag;
  function dragMove(e){
    e = e || window.event;
    e.preventDefault();
    var ox=cx-e.pageX;
    var oy=cy-e.pageY;
    cx=e.pageX;
    cy=e.pageY;
    elem.style.top=(elem.offsetTop-oy)+'px';
    elem.style.left=(elem.offsetLeft-ox)+'px';
  }
  function closeDrag(){
    document.onmousemove=null;
    document[closeEvent]=null;
    //store position in state
    action(elem.id.slice(4),elem.offsetLeft,elem.offsetTop);
  }
}

export default dragElement;
