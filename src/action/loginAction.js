import { LOGIN_REQUEST, LOGIN_SUCCESS } from './actionTypes';
import { apiUrl } from '../config/apiUrl';



export const LoginAction = (loginData, callback) => {
    return dispatch => {
        dispatch({ type: LOGIN_REQUEST });
        fetch(apiUrl.userLoginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Basic ${apiUrl.basicAuth}`,
            },
            body: JSON.stringify(loginData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == false) {
                    dispatch({ type: LOGIN_SUCCESS, payload: data });
                    callback({ error: true, message: data.message });
                } else if (data.success === true) {
                    dispatch({ type: LOGIN_SUCCESS, payload: data });
                    callback({ error: false, message: data.message, data: data.data });
                }
            })
            .catch(error => {
                dispatch({ type: LOGIN_SUCCESS, payload: error.message });
                callback({
                    error: true,
                    message: error.message,
                    type: error,
                });
            });
    };
};