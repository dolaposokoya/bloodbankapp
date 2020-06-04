import {CONTACT_DONOR} from '../action/actionTypes';
const initial_state = {
  userData: {},
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case CONTACT_DONOR:
      return {...state, userData: action.payload};
    default:
      return state;
  }
};

export default userReducer;
