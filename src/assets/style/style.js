import React from 'react';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 30,
    margin: 20,
    marginTop: '50%',
    height: '50%',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerIos: {
    height: 90,
    backgroundColor: 'lightgray',
    marginLeft: -10,
  },
  header: {
    height: 70,
    backgroundColor: 'lightgray',
    marginLeft: -10,
  },
  headerTextIos: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 40,
    alignSelf: 'center',
    color: '#333',
    letterSpacing: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 30,
    alignSelf: 'center',
    color: '#333',
    letterSpacing: 1,
  },
  iconIos: {
    top: 38,
    // bottom: 9,
    position: 'absolute',
    left: 5,
  },
  icon: {
    top: 30,
    // bottom: 9,
    position: 'absolute',
    left: 5,
  },
  iconImage: {
    width: 18,
    height: 18,
    right: 1,
    paddingRight: 40,
  },
  userContent: {
    flexDirection: 'row',
    paddingTop: 10,
    alignContent: 'center',
    marginLeft: 5,
  },
  loginBtn: {
    backgroundColor: '#9a0901',
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
    marginRight: '27%',
    marginLeft: '27%',
  },
});

export default Style;
