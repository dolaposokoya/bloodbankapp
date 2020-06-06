import {GET_METADATA} from './actionTypes';
import apiUrl from '../config/apiUrl';
import {Toast} from 'native-base';

export const metaDataAction = callback => {
  return dispatch => {
    fetch(apiUrl.getMetaData, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success == true) {
          dispatch({type: GET_METADATA, payload: data.data[0]});
          callback({success: true, message: data.message, data: data.data[0]});
        } else {
          callback({success: false, message: data.message});
        }
      })
      .catch(error => {
        Toast.show({
          text: 'Check your internet connection',
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: {
            color: 'black',
            fontSize: 15,
            textAlign: 'center',
          },
          buttonStyle: {backgroundColor: '#9a0901'},
          duration: 10000,
        });
        callback({
          error: true,
          message: 'Check your internet connection',
          type: error,
        });
      });
  };
};
