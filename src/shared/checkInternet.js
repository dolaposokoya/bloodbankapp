import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Toast} from 

class CheckInternet extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      connection_status: '',
    };
  }
  UNSAFE_componentWillMount() {
    NetInfo.addEventListener(state => {
      if (state.isConnected || state.isInternetReachable == true) {
        this.setState({connection_status: 'Online'});
      } else {
        this.setState({connection_status: 'Offline'});
      }
    });
  }

  //   componentWillMount() {
  //     NetInfo.re
  //   }

  handleConnectivityChange = isConnected => {
    if (isConnected == true) {
      this.setState({connection_status: 'Online'});
    } else {
      this.setState({connection_status: 'Offline'});
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        {/* <Text>You internet connection is {this.state.connection_status}</Text> */}
        {Toast.show({
          text: 'login successful',
          position: 'top',
          type: 'success',
          buttonText: 'Okay',
          buttonTextStyle: {
            color: 'black',
            fontSize: 15,
            textAlign: 'center',
          },
          buttonStyle: {backgroundColor: '#9a0901'},
          duration: 3000,
        })}
        <View>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },

  TextStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
});
export default CheckInternet;
