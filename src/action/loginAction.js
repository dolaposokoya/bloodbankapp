import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {LOGIN_REQUEST, LOGIN_SUCCESS} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import apiUrl from '../config/apiUrl';
import {Toast} from 'native-base';

export const LoginAction = (loginData, callback) => {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST});
    fetch(apiUrl.userLoginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(userData => {
        if (
          userData.success == false &&
          userData.message == "Email or password doesn't match"
        ) {
          let res = {
            status: userData.status,
            message: userData.message,
          };
          dispatch({type: LOGIN_SUCCESS, payload: res});
          callback({error: true, message: userData.message});
        } else if (userData.message == 'User not present') {
          let res = {
            message: userData.message,
          };
          dispatch({type: LOGIN_SUCCESS, payload: res});
          callback({error: true, message: userData.message});
        } else if (
          userData.success == false &&
          userData.message == "Email doesn't exist"
        ) {
          let res = {
            status: userData.status,
            message: userData.message,
          };
          dispatch({type: LOGIN_SUCCESS, payload: res});
          callback({error: true, message: userData.message});
        } else if (userData.message == 'Login Successful') {
          var res = {
            status: userData.status,
            token: userData.token,
            profile_id: userData.profile_id,
            message: userData.message,
          };
          AsyncStorage.setItem('token', userData.token);
          AsyncStorage.setItem('profile_id', userData.profile_id);
          // AsyncStorage.setItem('email', loginData.email);
          dispatch({type: LOGIN_SUCCESS, payload: userData});
          callback({error: false, userInfo: res});
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
