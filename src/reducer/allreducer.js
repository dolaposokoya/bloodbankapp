import LoginReducer from './loginReducer';
import userReducer from './userDataReducer';
import metaDataReducer from './metaDataReducer';
import {combineReducers} from 'redux';

const allReducer = combineReducers({
  LoginReducer,
  userReducer,
  metaDataReducer,
});

export default allReducer;
