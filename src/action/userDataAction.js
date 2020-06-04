import {CONTACT_DONOR} from './actionTypes';
import apiUrl from '../config/apiUrl';
import {Toast} from 'native-base';

export const getAllUserAction = (userToken, callback) => {
  return dispatch => {
    fetch(apiUrl.getAllusers, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userToken}`,
      },
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        if (data.success == true) {
          dispatch({type: CONTACT_DONOR, payload: data.data});
          callback({success: true, message: data.message, data: data.data});
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
