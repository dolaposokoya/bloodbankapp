import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Login from '../screen/login';
import DonateComp from '../screen/donateBlood';
import ContactDonorComp from '../screen/contactDonor';
import RequestComp from '../screen/requestBlood';
import Sidebar from './index';

const DrawerNavigation = createDrawerNavigator(
  {
    DonateComp: {
      screen: DonateComp,
    },
    Login: {
      screen: Login,
      headerShown: false,
    },
    ContactDonorComp: {
      screen: ContactDonorComp,
    },
    RequestComp: {
      screen: RequestComp,
    },
  },
  {
    initialRouteName: 'Login',
    drawerBackgroundColor: '#9090',
    drawerType: 'front',
    drawerWidth: '70%',
    contentComponent: props => <Sidebar {...props} />,
  },
);

export default createAppContainer(DrawerNavigation);
