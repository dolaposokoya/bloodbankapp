import {Platform} from 'react-native';
// const apiEndpoint = 'https://bloodbank-api-v1.herokuapp.com/';

let apiEndpoint;
if (Platform.OS == 'ios') {
  apiEndpoint = 'http://localhost:5000/';
} else {
  apiEndpoint = 'http://10.0.2.2:5000/';
}
export default {
  userLoginUrl: apiEndpoint + 'user/login-user',
  userRegistrationUrl: apiEndpoint + 'user/create-user',
  getAllusers: apiEndpoint + 'user/get-all-user',
  getMetaData: apiEndpoint + 'request/blood-all-group',
  makeRequest: apiEndpoint + 'request/create-request',
};
