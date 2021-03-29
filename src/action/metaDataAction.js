import { GET_METADATA } from './actionTypes';
import { apiUrl } from '../config/apiUrl';


export const metaDataAction = callback => {
  return dispatch => {
    fetch(apiUrl.getMetaData, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${apiUrl.basicAuth}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success == true) {
          dispatch({ type: GET_METADATA, payload: data.data.response[0]});
          callback({ success: true, message: data.message, data: data.data.response[0] });
        } else {
          callback({ success: false, message: data.message });
        }
      })
      .catch(error => {
        dispatch({ type: GET_METADATA, payload: error.message });
        callback({ error: true, message: error.message, type: 'error' });
      });
  };
};
