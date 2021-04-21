import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, Dimensions, Image } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import ChatHeader from '../shared/ChatHeader';

export default function Chat(props) {

    const { navigation, route } = props
    const { user } = route.params

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: '#D4F5FF'
                },
                right: {
                    backgroundColor: '#587387'
                },
            }}
        />
    )
    const renderSend = (props) => (
        <Send
            {...props}
        >
            <View>
                <Image source={require('../assets/images/send-button.png')} style={{
                    width: 32,
                    height: 32,
                    marginBottom: 5, marginRight: 5
                }} />
            </View>
        </Send>
    )

    const scrollBottom = (props) => (
        <Image source={require('../assets/images/scroll.png')} style={{
            width: 32,
            height: 32,
        }} />
    )
    return (
        <>
            <ChatHeader
                title={user.name}
                parentProps={props}
                navigation={navigation}
            />
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user._id,
                }}
                alwaysShowSend
                renderBubble={renderBubble}
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollBottom}
            />
        </>
    )
}
