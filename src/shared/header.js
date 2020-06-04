import React, {useState, useEffect, Component} from 'react';
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
  }
  toggleDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View>
        {Platform.OS === 'ios' && (
          <View style={Style.headerIos}>
            <TouchableOpacity
              style={Style.iconIos}
              onPress={() => {
                this.toggleDrawer();
              }}>
              {/* <Icon name="close" /> */}
              <Image
                resizeMode="contain"
                style={{
                  top: 3,
                  left: 7,
                  bottom: 8,
                  width: 35,
                  height: 20,
                  marginBottom: 10,
                }}
                source={require('../assets/images/menu.png')}
              />
            </TouchableOpacity>
            <Text style={Style.headerTextIos}>{this.props.title}</Text>
            <View>{this.props.children}</View>
          </View>
        )}
        {Platform.OS === 'android' && (
          <View style={Style.header}>
            <TouchableOpacity
              style={Style.icon}
              onPress={() => {
                this.toggleDrawer();
              }}>
              {/* <Icon name="close" /> */}
              <Image
                resizeMode="contain"
                style={{width: 50, height: 20}}
                source={require('../assets/images/menu.png')}
              />
            </TouchableOpacity>
            <Text style={Style.headerText}>{this.props.title}</Text>
            <View>{this.props.children}</View>
          </View>
        )}
      </View>
    );
  }
}

export default Header;
