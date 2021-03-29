import React, {useState, Component} from 'react';
import {Modal, ActivityIndicator, View, StyleSheet} from 'react-native';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      animating: true,
    };
  }
  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          loading: false,
        }),
        10000,
    );
  UNSAFE_componentWillMount() {
    this.closeActivityIndicator;
  }
  render() {
    return (
      <View>
        <Modal
          // animated={true}
          animationType="slide"
          transparent={true}
          visible={true}>
          <View style={styles.container}>
            <View style={styles.viewContainer}>
              <ActivityIndicator
                // time={this.closeActivityIndicator}
                animating={this.state.animating}
                size="large"
                color="#8e2000"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  viewContainer: {
    justifyContent: 'space-around',
  },
});
export default Loader;
