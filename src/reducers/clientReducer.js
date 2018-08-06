export default (state = {
  mode: 'view',
  x: 0,
  y: 0
},action) => {
  switch (action.type){
    case 'SAVE_CLIENT_XY':
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y
      }
    case 'CHANGE_MODE':
      return {
        ...state,
        mode: action.payload
      }
    default:
      return state;
  }
}
