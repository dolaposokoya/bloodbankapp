import { Platform } from 'react-native';
import base64 from 'react-native-base64'
import firestore from '@react-native-firebase/firestore';


const environment = 'pro'
const { REACT_APP_ENVIRONMENT, REACT_APP_AUTH } = process.env;

const basicAuth = base64.encode(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)

let apiEndpoint;
let baseURL;
if (Platform.OS === 'ios') {
  apiEndpoint = environment === 'development' ? ` http://10.0.2.2:5000/api/` : `https://api-bloodbank-v1.herokuapp.com/api/`;
  baseURL = environment === 'development' ? ` http://10.0.2.2:5000/` : `https://api-bloodbank-v1.herokuapp.com/`;

} else {
  apiEndpoint = environment === 'development' ? `http://10.0.2.2:5000/api/` : `https://api-bloodbank-v1.herokuapp.com/api/`;
  baseURL = environment === 'development' ? ` http://10.0.2.2:5000/images` : `https://api-bloodbank-v1.herokuapp.com/images`;
}

export const apiUrl = {
  basicAuth,
  baseURL,
  userLoginUrl: `${apiEndpoint}user/loginUser`,
  logOut: `${apiEndpoint}user/logOutUser`,
  getOneUser: `${apiEndpoint}user/getUserById`,
  userRegistrationUrl: `${apiEndpoint}user/createUser`,
  getAllusers: `${apiEndpoint}user/getAllUser`,
  getMetaData: `${apiEndpoint}bloodgroup/bloodAllGroup`,
  makeRequest: `${apiEndpoint}request/createRequest`
};
export const chatsRef = firestore().collection('messages')
export const usersRef = firestore().collection('users')
export const THEME_COLOR = "#8B0000";