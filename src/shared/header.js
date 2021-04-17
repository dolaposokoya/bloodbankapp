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
    const { title, children, navigation } = this.props
    return (
      <View>
        {Platform.OS === 'ios' && (
          <View style={Style.headerIos}>
            {/* {title === "Make Request" && <TouchableOpacity
              style={Style.iconIos}
              onPress={() => {
                navigation.goBack()
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
                source={require('../assets/images/back2.png')}
              />
            </TouchableOpacity>} */}
            <Text style={Style.headerTextIos}>{this.props.title}</Text>
            <View>{children}</View>
          </View>
        )}
        {Platform.OS === 'android' && (
          <View style={Style.header}>
            {/* {title === "Make Request" && <TouchableOpacity
              style={Style.icon}
              onPress={() => {
                navigation.goBack()
              }}>
              <Image
                resizeMode="contain"
                style={{ width: 40, height: 30 }}
                source={require('../assets/images/back2.png')}
              />
            </TouchableOpacity>} */}
            <Text style={Style.headerText}>{title}</Text>
            <View>{children}</View>
          </View>
        )}
      </View>
    );
  }
}

export default Header;
