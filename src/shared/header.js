import React, { useState, useEffect, Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

import Style from '../assets/style/style';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerOpen: false
    }
  }
  toggleDrawer = () => {
    const { drawerOpen } = this.state
    if (drawerOpen === false) {
      this.props.navigation.openDrawer();
      this.setState({ drawerOpen: true })
    }
    else {
      this.props.navigation.closeDrawer();
      this.setState({ drawerOpen: false })
    }
  };

  render() {
    const { drawerOpen } = this.state
    return (
      <View>
        {Platform.OS === 'ios' && (
          <View style={Style.headerIos}>
            {/* <TouchableOpacity
              style={Style.iconIos}
              onPress={() => {
                this.toggleDrawer();
              }}>
              < Image
                resizeMode="contain"
                style={{
                  top: 3,
                  left: 7,
                  bottom: 8,
                  width: 90,
                  height: 20,
                  marginBottom: 10,
                }}
                source={require('../assets/images/menu.png')}
              />
            </TouchableOpacity> */}
            <Text style={Style.headerTextIos}>{this.props.title}</Text>
            <View>{this.props.children}</View>
          </View>
        )}
        {Platform.OS === 'android' && (
          <View style={Style.header}>
            {/* <TouchableOpacity
              style={Style.icon}
              onPress={() => {
                this.toggleDrawer();
              }}>
              <Image
                resizeMode="contain"
                style={{ width: 40, height: 30 }}
                source={require('../assets/images/menu.png')}
              />
            </TouchableOpacity> */}
            <Text style={Style.headerText}>{this.props.title}</Text>
            <View>{this.props.children}</View>
          </View>
        )}
      </View>
    );
  }
}

export default Header;
