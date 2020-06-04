import React from 'react';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {NavigationActions} from 'react-navigation';
import Sidestyle from '../assets/style/sidebarstyle';

const Index = props => {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
    props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View style={{justifyContent: 'center'}}>
      <View style={Sidestyle.navContainer}>
        <View style={Sidestyle.navText}>
          <TouchableOpacity onPress={navigateToScreen('DonateComp')}>
            <Text style={Sidestyle.drawerText}>DONATE</Text>
          </TouchableOpacity>
        </View>
        {Platform.OS == 'ios' && <View style={Sidestyle.navText}>
          <TouchableOpacity onPress={navigateToScreen('ContactDonorComp')}>
            <Text style={Sidestyle.drawer2Text}>CONTACT DONOR</Text>
          </TouchableOpacity>
        </View>}
        {Platform.OS == 'android' && <View style={Sidestyle.navText}>
          <TouchableOpacity onPress={navigateToScreen('ContactDonorComp')}>
            <Text style={Sidestyle.drawer2Text}>CONTACT DONOR</Text>
          </TouchableOpacity>
        </View>}
        <View style={Sidestyle.navText}>
          <TouchableOpacity onPress={navigateToScreen('RequestComp')}>
            <Text style={Sidestyle.drawer3Text}>MAKE REQUEST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Index;
