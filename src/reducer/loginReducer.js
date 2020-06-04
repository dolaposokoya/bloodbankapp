import {LOGIN_SUCCESS, LOGIN_REQUEST} from '../action/actionTypes';

const INITIAL_STATE = {
  loginstate: {},
};
const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state};
    case LOGIN_SUCCESS:
      return {...state, loginstate: action.payload};
    default:
      return state;
  }
};
export default LoginReducer;
