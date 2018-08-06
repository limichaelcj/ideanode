export default (state = {
  file: {
    ideas: {},
    connections: []
  },
  uniqueID: 1,
  client: {
    x: 0,
    y: 0
  }
}, action) => {
  switch(action.type){
    case 'ADD_NODE':
      var id=action.payload.idea.id;
      return {
        ...state,
        file: {
          ...state.file,
          ideas: {
            ...state.file.ideas,
            [id]: action.payload.idea
          }
        },
        uniqueID: id+1,
        client: {
          ...state.client,
          x: action.payload.client.x,
          y: action.payload.client.y
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
