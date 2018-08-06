//visually, does nothing
//moving nodes on screen will change the css styling
//this action will update the redux store with the final position

export const moveNode=(id, x, y)=>{
  return {
    type: 'MOVE_NODE',
    payload: {
      id: id,
      x: x,
      y: y
    }
  }
}
