/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Drawer from './src/navigation/drawer';
import {Provider} from 'react-redux';
import store from './src/config/store';
import {Root} from 'native-base';

const App = props => {
  return (
    <Root>
      <Provider store={store}>
        <Drawer />
      </Provider>
    </Root>
  );
};

export default App;
