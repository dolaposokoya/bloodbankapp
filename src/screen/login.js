import React, {useState, Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {LoginAction} from '../action/loginAction';
import {metaDataAction} from '../action/metaDataAction';
import Style from '../assets/style/style';
import StyleView from '../assets/style/sidebarstyle';
import Loader from '../shared/loader';
import {connect} from 'react-redux';
import {Toast} from 'native-base';
import NetInfo from '@react-native-community/netinfo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      bloodgroup: '',
    };
  }

  async UNSAFE_componentWillMount() {
    this.setState({loading: true});
    NetInfo.addEventListener(state => {
      if (state.isConnected || state.isInternetReachable == true) {
        console.log('Internet connection', state.isConnected);
        Toast.show({
          text: 'You are online',
          position: 'top',
          type: 'success',
          duration: 3000,
        });
        this.setState({connection_status: 'Online'});
        this.setState({loading: false});
      } else {
        Toast.show({
          text: 'You are offline',
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: {
            color: 'black',
            fontSize: 15,
            textAlign: 'center',
          },
          buttonStyle: {backgroundColor: '#9a0901'},
          duration: 10000,
        });
        this.setState({connection_status: 'Offline'});
        console.log('Internet connection', state.isConnected);
        this.setState({loading: false});
      }
    });
    await this.props.metaDataAction(data => {
      if (data.success == true) {
        this.setState({bloodgroup: data.data.bloodgroup});
        this.setState({loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  }

  async loginUser() {
    try {
      this.setState({loading: true});
      let formData = {
        email: this.state.email,
        password: this.state.password,
      };
      if (formData.email === '') {
        Toast.show({
          text: 'Email is empty',
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: {color: 'black', fontSize: 15, textAlign: 'center'},
          buttonStyle: {backgroundColor: '#9a0901'},
          duration: 7000,
        });
        this.setState({loading: false});
      } else if (formData.password === '') {
        Toast.show({
          text: 'Password is empty',
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: {color: 'black', fontSize: 15, textAlign: 'center'},
          buttonStyle: {backgroundColor: '#9a0901'},
          duration: 7000,
        });
        this.setState({loading: false});
      } else {
        let self = this;
        self.props.LoginAction(formData, data => {
          if (data.error == true) {
            Alert.alert(data.message);
            this.setState({loading: false});
          } else if (data.error == false) {
            Toast.show({
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
            });
            this.setState({loading: false});
            this.props.navigation.navigate('DonateComp');
          }
        });
      }
    } catch (error) {
      this.setState({loading: false});
    }
  }
  render() {
    return (
      <View style={Style.container}>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <View style={Style.content}>
          <Text style={Style.text}>Login Page</Text>
          <View style={StyleView.loginInputView}>
            <TextInput
              style={StyleView.loginInput}
              placeholderTextColor="black"
              placeholder="Email"
              onChangeText={value => {
                this.setState({email: value});
              }}
            />
          </View>
          <View style={StyleView.loginInputView}>
            <TextInput
              style={StyleView.loginInput}
              secureTextEntry={true}
              placeholderTextColor="black"
              placeholder="Password"
              onChangeText={value => {
                this.setState({password: value});
              }}
            />
          </View>
          <TouchableOpacity
            style={Style.loginBtn}
            onPress={() => {
              this.loginUser();
            }}>
            <Text
              style={{
                textAlign: 'center',
                margin: 12,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {loginstate} = state.LoginReducer;
  const {metaData} = state.metaDataReducer;
  return {
    loginstate,
    metaData,
  };
};

LoginComp = connect(
  mapStateToProps,
  {LoginAction, metaDataAction},
)(Login);
export default LoginComp;
