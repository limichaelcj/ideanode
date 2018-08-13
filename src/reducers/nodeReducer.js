export default (state = {
  file: {
    ideas: {},
    connections: []
  },
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
          }
        },
        uniqueID: id+1
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
    case 'RESIZE_NODE':
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
                w: action.payload.w,
                h: action.payload.h
              }
            }
          }
        }
      }
    case 'DELETE_NODE':
      var id=action.payload;
      var ideas={...state.file.ideas}
      delete ideas[id];
      return {
        ...state,
        file: {
          ...state.file,
          ideas: ideas
        }
      }
    case 'CHANGE_TEXT':
      var id=action.payload.id;
      return {
        ...state,
        file: {
          ...state.file,
          ideas: {
            ...state.file.ideas,
            [id]: {
              ...state.file.ideas[id],
              text: {
                head: action.payload.head,
                body: action.payload.body,
                foot: action.payload.foot
              }
            }
          }
        }
      }
    default:
      return state;
  }
}
