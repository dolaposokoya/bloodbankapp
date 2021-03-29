import { CONTACT_DONOR } from './actionTypes';
import { apiUrl } from '../config/apiUrl';
import { Toast } from 'native-base';

export const getAllUserAction = (callback) => {
  return dispatch => {
    fetch(apiUrl.getAllusers, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${apiUrl.basicAuth}`,
      },
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        if (data.success === true) {
          // alert(data.data)
          dispatch({ type: CONTACT_DONOR, payload: data.data });
          callback({ success: true, message: data.message, data: data.data });
        } else {
          dispatch({ type: CONTACT_DONOR, payload: data.message });
          callback({ success: false, message: data.message });
        }
      })
      .catch(error => {
        dispatch({ type: CONTACT_DONOR, payload: error.message });
        callback({ error: true, message: error.message, type: error });
      });
  };
};
