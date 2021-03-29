import React, { useState, Component } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  Alert, BackHandler
} from 'react-native';
import Cookie from 'react-native-cookie';
import Loader from '../shared/loader';
import { Toast } from 'native-base';
import Header from '../shared/header';
import { connect } from 'react-redux';
import { getAllUserAction } from '../action/userDataAction';
import Item from "../shared/Item";


const { width, height } = Dimensions.get('window')
class ContactDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      profile_id: '',
      loading: false,
      userData: [],
      userToken: '',
      refreshing: false,
      session: ''
    };
  }

  componentDidMount = async () => {
    this.checkSession()
    await this.getAllUsers();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };


  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  checkSession() {
    Cookie.get('https://api-bloodbank-v1.herokuapp.com/').then(cookie => {
      if (cookie && cookie._SESSION_ID_) {
        this.setState({ session: cookie._SESSION_ID_ })
      }
      else {
        this.props.navigation.navigate('Login')
      }
    })

  }

  getAllUsers = async () => {
    this.setState({ loading: true });
    await this.props.getAllUserAction(data => {
      if (data.success === true) {
        this.setState({ userData: data.data });
        this.setState({ loading: false });
      }
      else if (data.message === 'Access Denied' || data.message === 'Unauthorized Access') {
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
        this.props.navigation.navigate('Login')
      }
      else if (data.success === false && (data.message !== 'Access Denied' || data.message !== 'Unauthorized Access')) {
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
      }
    });
  };

  onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.getAllUsers();
    this.setState({ refreshing: false })

  }

  render() {
    const { userData, loading, refreshing } = this.state
    return (
      <View>
        <Header
          title="Contact Donor"
          parentProps={this.props}
          navigation={this.props.navigation}
        />
        {!loading ?
          <SafeAreaView style={{ marginBottom: height * 0.28, backgroundColor: '#f3f3f3' }}>
            {userData && <FlatList
              data={userData}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              keyExtractor={item => item._id}
              renderItem={({ item }) => <Item item={item} />}
            />}
          </SafeAreaView>
          : <Loader loading={loading} />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { userData } = state.userReducer;
  const { metaData } = state.metaDataReducer;
  return {
    userData,
    metaData
  };
};

ContactDonorComp = connect(
  mapStateToProps,
  { getAllUserAction },
)(ContactDonor);
export default ContactDonorComp;
