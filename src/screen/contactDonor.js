import React, {useState, Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import Style from '../assets/style/style';
import StyleView from '../assets/style/sidebarstyle';
import Loader from '../shared/loader';
import Header from '../shared/header';
import {connect} from 'react-redux';
import {getAllUserAction} from '../action/userDataAction';
import AsyncStorage from '@react-native-community/async-storage';

class ContactDonor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      profile_id: '',
      loading: false,
      modalView: false,
      modelViewData: {},
      userData: [],
      userToken: '',
    };
  }

  UNSAFE_componentWillMount = async () => {
    this.setState({loading: true});
    let id = await AsyncStorage.getItem('profile_id');
    let token = await AsyncStorage.getItem('token');
    this.setState({profile_id: id});
    this.setState({userToken: token});
    await this.props.getAllUserAction(token, data => {
      if (data.success == true) {
        this.setState({userData: data.data});
        this.setState({loading: false});
      } else {
        Toast.show({
          text: data.message,
          position: 'top',
          type: 'warning',
          buttonText: 'Okay',
          buttonTextStyle: {color: 'black', fontSize: 15, textAlign: 'center'},
          buttonStyle: {backgroundColor: '#9a0901'},
          duration: 7000,
        });
        this.setState({loading: false});
      }
    });
  };

  contactDonor = item => {
    this.setState({modalView: true});
    this.setState({modelViewData: item});
  };
  render() {
    return (
      <View>
        <View>
          <Modal
            animationType="slide"
            visible={this.state.modalView}
            transparent={true}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <View style={StyleView.modalView}>
                <Text style={StyleView.modalContent}>
                  <Image
                    style={Style.iconImage}
                    resizeMode="contain"
                    source={require('../assets/images/user.png')}
                  />{' '}
                  {this.state.modelViewData.first_name}
                  {'\n'}
                  <Image
                    style={Style.iconImage}
                    resizeMode="contain"
                    source={require('../assets/images/mail.png')}
                  />{' '}
                  {this.state.modelViewData.email}
                </Text>
                <TouchableOpacity
                  style={StyleView.touchClose}
                  onPress={() => {
                    this.setState({modalView: false, modelViewData: {}});
                  }}>
                  <Text style={StyleView.modalClose}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <Header
          title="Contact Donor"
          parentProps={this.props}
          navigation={this.props.navigation}
          profile_id={this.state.profile_id}
        />
        {this.state.loading && <Loader loading={this.state.loading} />}
        <ScrollView style={{marginBottom: 100}}>
          <View>
            <View style={StyleView.profileId}>
              <Text style={StyleView.textContainer}>
                Profile ID: {this.state.profile_id}
              </Text>
            </View>
            <View>
              <FlatList
                extraData={this.state.userData}
                data={this.state.userData}
                keyExtractor={item => item._id}
                renderItem={item => {
                  return (
                    <View style={StyleView.contact}>
                      <View style={Style.userContent}>
                        <Text style={StyleView.textContent}>
                          <Image
                            style={Style.iconImage}
                            source={require('../assets/images/user.png')}
                            resizeMode="contain"
                          />{' '}
                          {item.item.first_name}
                        </Text>
                      </View>
                      <View style={Style.userContent}>
                        <Text style={StyleView.textContent}>
                          <Image
                            style={Style.iconImage}
                            resizeMode="contain"
                            source={require('../assets/images/blood.png')}
                          />{' '}
                          {item.item.blood_group}
                        </Text>
                      </View>
                      <View style={Style.userContent}>
                        <Text style={StyleView.textContent}>
                          <Image
                            style={Style.iconImage}
                            resizeMode="contain"
                            source={require('../assets/images/pin.png')}
                          />{' '}
                          {item.item.city} {', '} {item.item.state}
                        </Text>
                      </View>
                      <View style={Style.userContent}>
                        <Text style={StyleView.textContent}>
                          <Image
                            style={Style.iconImage}
                            resizeMode="contain"
                            source={require('../assets/images/gender.png')}
                          />{' '}
                          {item.item.gender}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[StyleView.profileId, {marginBottom: 10}]}
                        onPress={() => {
                          console.log('Item', item.item);
                          this.contactDonor(item.item);
                        }}>
                        <Text style={StyleView.textContainer}>
                          CONTACT DONOR
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {userData} = state.userReducer;
  return {
    userData,
  };
};

ContactDonorComp = connect(
  mapStateToProps,
  {getAllUserAction},
)(ContactDonor);
export default ContactDonorComp;
