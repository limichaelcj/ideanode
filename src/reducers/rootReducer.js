import {combineReducers} from 'redux';
import nodeReducer from './nodeReducer';

export default combineReducers({
  node: nodeReducer
});
