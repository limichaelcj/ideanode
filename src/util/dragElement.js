function dragElement(elem,ix,iy,action){
  var cx=ix;
  var cy=iy;
  document.onmousemove=dragMove;
  document.onmouseup=closeDrag;
  function dragMove(e){
    e = e || window.event;
    e.preventDefault();
    var ox=cx-e.clientX;
    var oy=cy-e.clientY;
    cx=e.clientX;
    cy=e.clientY;
    elem.style.top=(elem.offsetTop-oy)+'px';
    elem.style.left=(elem.offsetLeft-ox)+'px';
  }
  function closeDrag(){
    document.onmousemove=null;
    document.onmouseup=null;
  }
}

export default dragElement;
