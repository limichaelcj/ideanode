export default (state = {
  ideas: {},
  connections: [],
  uniqueID: 1
}, action) => {
  switch(action.type){
    case 'ADD_NODE':
      var id=action.payload.id;
      return {
        ...state,
        file: {
          ...state.file,
          ideas: {
            ...state.file.ideas,
            [id]: action.payload
          },
          uniqueID: id+1
        }
      }
    case 'MOVE_NODE':
      var id=action.payload.id;
      return {
        ...state,
        file: {
          ...state.file,
          ideas: {
            ...state.file.ideas,
            [id]: {
              ...state.file.ideas[id],
              dim: {
                ...state.file.ideas[id].dim,
                x: action.payload.x,
                y: action.payload.y
              }
            }
          }
        }
      }
    default:
      return state;
  }
}
