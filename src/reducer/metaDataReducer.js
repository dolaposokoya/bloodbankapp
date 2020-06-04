import {GET_METADATA} from '../action/actionTypes';

const INITIAL_STATE = {
  metaData: {},
};
const metaDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_METADATA:
      return {...state, metaData: action.payload};
    default:
      return state;
  }
};

export default metaDataReducer;
