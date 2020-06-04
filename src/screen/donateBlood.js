import React, {Component} from 'react';
import {View, ScrollView, Text, Image, TextInput} from 'react-native';
import Header from '../shared/header';
import StyleView from '../assets/style/sidebarstyle';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginAction} from '../action/loginAction';
import {metaDataAction} from '../action/metaDataAction';
import {Picker, Toast} from 'native-base';
import {connect} from 'react-redux';
import Loader from '../shared/loader';

class DonateBlood extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      profile_id: '',
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('profile_id');
    this.setState({profile_id: token});
  }
  render() {
    return (
      <View>
        <Header
          title="Donate Blood"
          parentProps={this.props}
          navigation={this.props.navigation}
          profile_id={this.state.profile_id}
        />
        {/* {this.state.loading && <Loader loading={this.state.loading} />} */}
        <ScrollView>
          <View style={StyleView.container}>
            <View style={StyleView.profileId}>
              <Text style={StyleView.textContainer}>
                Profile ID: {this.state.profile_id}
              </Text>
            </View>
            <View style={StyleView.reg_main}>
              <View style={StyleView.inputView}>
                <TextInput
                  style={StyleView.inputField}
                  placeholder="Full Name"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  style={StyleView.inputField}
                  placeholder="Hospital Name"
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  style={StyleView.inputField}
                  placeholder="Age"
                  keyboardType={'numeric'}
                />
              </View>
              <View style={StyleView.inputView}>
                <TextInput style={StyleView.inputField} placeholder="Gender" />
              </View>
              <View style={StyleView.inputView}>
                <TextInput style={StyleView.inputField} placeholder="Mobile" />
              </View>
              <View style={StyleView.inputView}>
                <TextInput
                  style={StyleView.inputField}
                  placeholder="Weight(kg)"
                  numeric
                  keyboardType={'numeric'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {loginstate} = state.LoginReducer;
  return {
    loginstate,
  };
};
DonateComp = connect(
  mapStateToProps,
  {LoginAction, metaDataAction},
)(DonateBlood);
export default DonateComp;
// export default DonateBlood;
