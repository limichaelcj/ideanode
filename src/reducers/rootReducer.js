import {combineReducers} from 'redux'
import nodeReducer from './nodeReducer'
import clientReducer from './clientReducer'

export default combineReducers({
  node: nodeReducer,
  client: clientReducer
});
