import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import TabBar from './src/navigation/TabBar';
import HomeNavigation from './src/navigation/HomeStack';
import { Provider } from 'react-redux';
import store from './src/config/store';
import { Root } from 'native-base';
import { Animated, Text } from 'react-native';
import Spinner from "./src/component/Spinner";


const App = props => {

  const [loading, setloading] = useState(false)


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
