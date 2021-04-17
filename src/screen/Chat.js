import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import Header from '../shared/header';

const { height, width } = Dimensions.get('window')
export default class Chat extends Component {
    render() {
        return (
            <>
                <Header
                    title="Chat App"
                    parentProps={this.props}
                    navigation={this.props.navigation}
                />
                <GiftedChat />
            </>
        )
    }
}
