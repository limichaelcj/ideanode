import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore(){
  let initialState = {
    node: {
      file: {
        ideas: {},
        connections: []
      },
      uniqueID: 1
    }
  }
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
