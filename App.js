import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import TabBar from './src/navigation/TabBar';
import HomeNavigation from './src/navigation/HomeStack';
import { Provider } from 'react-redux';
import store from './src/config/store';
import { Root } from 'native-base';
import { LogBox } from 'react-native';
import Spinner from "./src/component/Spinner";
import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import firebase from '@react-native-firebase/app';
import { credentials } from './Credentials'
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';





const App = props => {
  // LogBox.ignoreLogs()
  let updatedValue = 0;
  const [loading, setloading] = useState(false)
  useEffect(() => {

    const seconds = new Date().getMilliseconds()
    updatedValue += seconds
    const config = {
      name: `Blood bank-${updatedValue}`,
    };

    if (firebase.app.length > 0) {
      return false
    }
    else {
      firebase.initializeApp(credentials, config);
    }

    PushNotification.createChannel(
      {
        channelId: "Blood_Bank", // (required)
        channelName: "Blood Bank", // (required)
        channelDescription: "Blood Bank notification", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => {
        if (created) {
          return true
        }
        else {
          return `Channel already exist '${created}'`
        }
      }
    );
    PushNotification.getChannels(function (channel_ids) {
      return channel_ids
    });
    connfigureApp()
  }, [])


  const connfigureApp = () => {
    PushNotification.configure({
      onRegister: function (token) {
      },
      onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        return notification.action
        // process the action
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: credentials.clientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });

  }


  return (
    <>
      {!loading ? <Root>
        <Provider store={store}>
          <HomeNavigation />
        </Provider>
      </Root> : <Spinner />}
    </>
  );
};

export default App;
