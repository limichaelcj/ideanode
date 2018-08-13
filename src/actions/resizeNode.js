//visually, does nothing
//moving nodes on screen will change the css styling
//this action will update the redux store with the final position

export const resizeNode=(id,w,h)=>{
  return {
    type: 'RESIZE_NODE',
    payload: {
      id,
      w,
      h
    }
  }
}
