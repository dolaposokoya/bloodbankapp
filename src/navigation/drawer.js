import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerComponent from './DrawerComponent'
import Login from '../screen/login';
import ContactDonorComp from '../screen/contactDonor';
import RequestComp from '../screen/requestBlood';
import Register from '../screen/Register';
import Profile from '../screen/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerNavigation = createDrawerNavigator();

const Drawer = (props) => {

  const [user, setuser] = useState({})
  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const user_info = await AsyncStorage.getItem('@user_info')
      if (user_info != null) {
        const userData = JSON.parse(user_info)
        setuser(userData)
        console.warn('User Drwaer', userData.first_name)
      }
      else {
        setuser({})
      }
    } catch (error) {
      Alert.alert(error.message)
    }
  }
  return (
    <DrawerNavigation.Navigator
      initialRouteName={Login}
      drawerContent={props => <DrawerComponent {...props} user={user} />}
    >
      <DrawerNavigation.Screen name="Login" component={Login} />
      <DrawerNavigation.Screen name="Contact" component={ContactDonorComp} />
      <DrawerNavigation.Screen name="Request" component={RequestComp} />
      <DrawerNavigation.Screen name="Register" component={Register} />
      <DrawerNavigation.Screen name="Profile" component={Profile} />
    </DrawerNavigation.Navigator>
  )
}



export default DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  )
};
