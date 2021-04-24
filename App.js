import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import TabBar from './src/navigation/TabBar';
import HomeNavigation from './src/navigation/HomeStack';
import { Provider } from 'react-redux';
import store from './src/config/store';
import { Root } from 'native-base';
import { LogBox } from 'react-native';
import Spinner from "./src/component/Spinner";
import { connfigureApp, initializePushNotification } from './AppConfig'


const App = props => {
  // LogBox.ignoreLogs()
  const [loading, setloading] = useState(false)
  useEffect(() => {
    initializePushNotification()
    connfigureApp()
  }, [])

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
