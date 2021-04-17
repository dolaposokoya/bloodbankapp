import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LoginAction } from '../action/loginAction';
import { metaDataAction } from '../action/metaDataAction';
import Style from '../assets/style/style';
import StyleView from '../assets/style/sidebarstyle';
import Loader from '../shared/loader';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import Cookie from 'react-native-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      bloodgroup: '',
      state: '',
      session: ''
    };
  }

  componentDidMount = async () => {
    await this.checkInternet()
  }

  checkInternet = async () => {
    try {
      NetInfo.addEventListener(async (state) => {
        if (state.isConnected === true || state.isInternetReachable === true) {
          this.checkSession()
          await this.getMetaData()
        } else {
          this.setState({ connection_status: state.isConnected });
          Toast.show({
            text: 'Check your internet connection',
            position: 'top',
            type: 'warning',
            buttonText: 'Okay',
            buttonTextStyle: { color: 'black', fontSize: 15, textAlign: 'center' },
            buttonStyle: { backgroundColor: '#9a0901' },
            duration: 7000,
          });
        }
      });
    }
    catch (error) {
      Toast.show({
        text: error.message,
        position: 'top',
        type: 'warning',
        buttonText: 'Okay',
        buttonTextStyle: { color: 'black', fontSize: 15, textAlign: 'center' },
        buttonStyle: { backgroundColor: '#9a0901' },
        duration: 7000,
      });
    }
  }

  checkSession() {
    Cookie.get('https://api-bloodbank-v1.herokuapp.com/').then(cookie => {
      if (cookie && cookie._SESSION_ID_) {
        this.setState({ session: cookie._SESSION_ID_ })
      }
      if (this.state.session) {
        this.props.navigation.navigate('TabBar', {
          screen: 'Contact'
        });
      }
    })
  }

  getMetaData = async () => {
    try {
      await this.props.metaDataAction(data => {
        if (data.success === true) {
          this.setState({
            bloodgroup: data.data.bloodgroup, state: data.data.state, loading: false
          });
        } else {
          this.setState({ loading: false });
        }
      });
    }
    catch (error) {
      Toast.show({
        text: error.message,
        position: 'top',
        type: 'warning',
        buttonText: 'Okay',
        buttonTextStyle: { color: 'black', fontSize: 15, textAlign: 'center' },
        buttonStyle: { backgroundColor: '#9a0901' },
        duration: 7000,
      });
    }
  }

  async loginUser() {
    this.setState({ loading: true });
    try {
      let formData = {
        email: this.state.email,
        password: this.state.password,
      };
      this.setState({ loading: false });
      if (formData.email === '') {
        Toast.show({
          text: 'Email is empty',
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: { color: 'black', fontSize: 15, textAlign: 'center' },
          buttonStyle: { backgroundColor: '#9a0901' },
          duration: 7000,
          useNativeDriver: true
        });
        this.setState({ loading: false });
      } else if (formData.password === '') {
        Toast.show({
          text: 'Password is empty',
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: { color: 'black', fontSize: 15, textAlign: 'center' },
          buttonStyle: { backgroundColor: '#9a0901' },
          duration: 7000,
        });
        this.setState({ loading: false });
      } else {
        let self = this;
        self.props.LoginAction(formData, async (data) => {
          if (data.error === true) {
            Toast.show({
              text: data.message,
              position: 'top',
              type: 'warning',
              buttonText: 'Okay',
              buttonTextStyle: { color: 'black', fontSize: 15, textAlign: 'center' },
              buttonStyle: { backgroundColor: '#9a0901' },
              duration: 7000,
            });
            this.setState({ loading: false });
          } else if (data.error === false) {
            const user_info = JSON.stringify(data.data)
            await AsyncStorage.setItem('@user_info', user_info)
            this.setState({ loading: false });
            this.props.navigation.navigate('TabBar', {
              screen: 'Contact'
            });
          }
        });
      }
    } catch (error) {
      Toast.show({
        text: error.message,
        position: 'top',
        type: 'warning',
        buttonText: 'Okay',
        buttonTextStyle: { color: 'black', fontSize: 15, textAlign: 'center' },
        buttonStyle: { backgroundColor: '#9a0901' },
        duration: 7000,
      });
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <View style={Style.container}>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <View style={Style.content}>
          <View style={StyleView.loginInputView}>
            <TextInput
              style={StyleView.loginInput}
              placeholderTextColor="black"
              placeholder="Email"
              onChangeText={value => {
                this.setState({ email: value });
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
                this.setState({ password: value });
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
        <View style={Style.regBtn}>
          <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}> New Here ?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Register')
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginLeft: 5,
                fontWeight: 'bold',
                fontSize: 18,
                borderBottomWidth: 1
              }}>
              Click here
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const mapStateToProps = state => {
  const { loginstate } = state.LoginReducer;
  const { metaData } = state.metaDataReducer;
  return {
    loginstate,
    metaData,
  };
};

LoginComp = connect(
  mapStateToProps,
  { LoginAction, metaDataAction },
)(Login);
export default LoginComp;
