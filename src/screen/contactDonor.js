import React, { useState, Component } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Image
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
      backUpData: [],
      userToken: '',
      refreshing: false,
      session: '',
      offset: 0,
      perPage: 5,
      pageCount: 0,
    };
  }

  componentDidMount = async () => {
    this.checkSession()
    await this.getAllUsers();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  backAction = () => {
    const { navigation } = this.props
    if (!navigation.isFocused()) {
      return false
    }
    else {
      BackHandler.exitApp()
      return true;
    }
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
        const slice = data.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          backUpData: data.data,
          userData: slice,
          pageCount: Math.ceil(data.data.length / this.state.perPage),
        })
        this.setState({ offset: 1 })
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
    this.setState({ offset: 0 })
    this.setState({ refreshing: true })
    await this.getAllUsers();
    this.setState({ refreshing: false })
  }

  loadMoreData = async () => {
    this.setState({ loading: true });
    const { backUpData, offset, pageCount } = this.state
    if (offset === pageCount) {
      console.warn('Offes', offset === pageCount)
      this.setState({ offset: 0 })
      await this.getAllUsers();
    }
    else {
      const slice = backUpData.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        userData: slice
      })
      this.setState({ offset: offset + 1 })
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }
  }
  render() {
    const { userData, loading, refreshing, offset, pageCount } = this.state
    return (
      <View>
        <Header
          title="Contact Donor"
          parentProps={this.props}
          navigation={this.props.navigation}
        />
        {!loading ?
          <ScrollView style={{ marginBottom: height * 0.10, backgroundColor: '#f3f3f3' }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <FlatList
              data={userData}
              keyExtractor={item => item._id}
              renderItem={({ item }) => <Item item={item} />}
            />
            <TouchableOpacity
              onPress={() => this.loadMoreData()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30
              }}>
              {(userData.length > 0 || userData.length > 5) && offset === pageCount ? <Image source={require('../assets/images/uparrow.png')} style={{
                width: 25, height: 25
              }} /> : <Image source={require('../assets/images/downarrow.png')} style={{
                width: 25, height: 25
              }} />}
            </TouchableOpacity>
          </ScrollView>
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
