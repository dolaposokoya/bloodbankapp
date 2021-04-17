import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window')
const Style = StyleSheet.create({
  scrollView: {
    marginBottom: 110,
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#F5F2F0',
    // backgroundColor: 'linear-gradient(197deg, rgba(167, 167, 167, 0.55) 12.91%, rgba(67, 53, 57, 0) 99.5%)',
    justifyContent: 'center'
  },
  content: {
    margin: 20
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerIos: {
    height: 90,
    // backgroundColor: 'white',
    backgroundColor: '#8B0000',
    marginLeft: -10,
  },
  header: {
    height: 70,
    backgroundColor: '#8B0000',
    // backgroundColor: 'white',
    marginLeft: -10,
  },
  headerTextIos: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 55,
    paddingTop: 40,
    alignSelf: 'center',
    color: '#fff',
    letterSpacing: 1,
  },
  headerText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 30,
    alignSelf: 'center',
    color: '#fff',
    letterSpacing: 1,
  },
  iconIos: {
    top: 38,
    // bottom: 9,
    position: 'absolute',
    left: 5,
  },
  icon: {
    top: 20,
    // bottom: 9,
    position: 'absolute',
    left: 17,
  },
  iconImage: {
    width: 18,
    height: 18,
    right: 1,
    paddingRight: 40
  },
  userContent: {
    flexDirection: 'row',
    paddingTop: 10,
    alignContent: 'center',
    marginLeft: 5,
  },
  loginBtn: {
    display: 'flex',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    width: '100%',
    marginTop: 40,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#000000',
  },

  reqBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '95%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#f3f3f3',
    // color: '#000000',
    borderWidth: 2,
    borderColor: 'black',
  },
  regBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#e3e3e3',
    padding: 10,
    margin: 7
  },
  item: {
    // padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
  },
});

export default Style;
